import { GoogleGenAI, Modality } from "@google/genai";
import Image from "../modals/imageModel.js";
import dotenv from "dotenv";
import imagekit from "../utils/imagekit.js";
import path from "path";
import axios from "axios";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// generate image
export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const imagePart = response.candidates[0].content.parts.find(
      (part) => part.inlineData
    );

    if (imagePart) {
      res.json({
        image: imagePart.inlineData.data,
        mimeType: imagePart.inlineData.mimeType,
        prompt: prompt,
      });
    } else {
      throw new Error("No image generated");
    }
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
};

//edit image
export const editImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const image = req.file;

    if (!image) {
      return res.status(400).json({ error: "No image provided" });
    }

    const base64Image = image.buffer.toString("base64");

    const contents = [
      { text: prompt },
      {
        inlineData: {
          mimeType: image.mimetype,
          data: base64Image,
        },
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: contents,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const imagePart = response.candidates[0].content.parts.find(
      (part) => part.inlineData
    );

    if (imagePart) {
      res.json({
        image: imagePart.inlineData.data,
        mimeType: imagePart.inlineData.mimeType,
        prompt: prompt,
      });
    } else {
      throw new Error("No image generated");
    }
  } catch (error) {
    console.error("Error editing image:", error);
    res.status(500).json({ error: "Failed to edit image" });
  }
};

export const saveImage = async (req, res) => {
  try {
    const { base64, mimeType, prompt, userId } = req.body;
    if (!base64 || !mimeType || !prompt || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const timestamp = Date.now();
    const extension = mimeType.split("/")[1];
    const name = `generated-image-${timestamp}.${extension}`;

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: `data:${mimeType};base64,${base64}`,
      fileName: name,
      folder: "/generated-images",
    });

    // ✅ Generate preview URL with resizing (e.g., 400x400)
    const previewUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        {
          height: 400,
          width: 400,
          crop: "maintain_ratio", // or 'fit' or 'force' depending on your use case
        },
      ],
    });

    // Save image metadata in DB
    const newImage = new Image({
      userId,
      name,
      mimeType,
      prompt,
      imageKitUrl: uploadResponse.url,
      imageKitFileId: uploadResponse.fileId,
      previewUrl: previewUrl, // 💡 Save preview URL
      fileName: name, // Save original file name for reference
    });

    const savedImage = await newImage.save();

    res.json({
      success: true,
      imageId: savedImage._id,
      message: "Image uploaded to ImageKit and saved successfully",
    });
  } catch (error) {
    console.error("❌ Error saving image:", error);
    res.status(500).json({ error: "Failed to upload and save image" });
  }
};

// Get all saved images
export const getSavedImages = async (req, res) => {
  try {
    const { userId } = req.query;

    // Build query based on userId
    const query = userId ? { userId } : {};

    const images = await Image.find(query)
      .sort({ createdAt: -1 })
      .select("-base64") // Exclude base64 data for performance
      .limit(50); // Limit to 50 images

    res.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("Error fetching saved images:", error);
    res.status(500).json({ error: "Failed to fetch saved images" });
  }
};

// Get a specific image by ID
export const getImageById = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    res.json({
      success: true,
      image,
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the image to get ImageKit file details
    const imageToDelete = await Image.findById(id);

    if (!imageToDelete) {
      return res.status(404).json({ error: 'Image not found' });
    }

    try {
      // Delete from ImageKit using fileId
      if (imageToDelete.imageKitFileId) {
        console.log('Deleting file with ID:', imageToDelete.imageKitFileId);
        await imagekit.deleteFile(imageToDelete.imageKitFileId);
        console.log('✅ Image deleted from ImageKit successfully');
      } else {
        // Fallback: use file path
        const filePath = `/generated-images/${imageToDelete.fileName}`;
        console.log('Deleting file with path:', filePath);
        await imagekit.deleteFile(filePath);
        console.log('✅ Image deleted from ImageKit using path');
      }
    } catch (imagekitError) {
      console.error('⚠️ Failed to delete from ImageKit:', imagekitError.message, imagekitError);
      // Log the full error for debugging
      // Optionally continue with DB deletion even if ImageKit fails
    }

    // Delete from database
    await Image.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Image deleted successfully from database' + (imageToDelete.imageKitFileId ? ' and ImageKit' : ''),
    });
  } catch (error) {
    console.error('❌ Error deleting image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};

// woroking downloadSavedImage function
// This function downloads a saved image by its fileName and looking for url imageKitUrl in the database
export const downloadSavedImage = async (req, res) => {
  try {
    const { fileName } = req.params;

    // Validate filename
    if (!fileName || fileName.includes("..") || fileName.includes("/")) {
      return res.status(400).json({ error: "Invalid filename" });
    }

    // Find image in database
    const image = await Image.findOne({
      $or: [{ fileName: fileName }, { name: fileName }],
    });

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Get the image URL (prioritize imageKitUrl)
    const imageUrl = image.imageKitUrl || image.url;

    if (!imageUrl) {
      return res.status(404).json({ error: "Image URL not found" });
    }

    // Download image from ImageKit
    const imageResponse = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      timeout: 30000,
      headers: {
        Accept: "image/*",
        "User-Agent": "YourApp/1.0",
      },
    });

    // Create buffer and set up response
    const imageBuffer = Buffer.from(imageResponse.data);
    const mimeType = image.mimeType || "image/png";
    const downloadFileName = image.fileName || image.name;

    // Set response headers
    res.setHeader("Content-Type", mimeType);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${downloadFileName}"`
    );
    res.setHeader("Content-Length", imageBuffer.length.toString());
    res.setHeader("Cache-Control", "no-cache");

    // Send the image
    res.send(imageBuffer);
  } catch (error) {
    console.error("Download error:", error);

    // Handle specific error types
    if (error.response?.status === 404) {
      return res
        .status(404)
        .json({ error: "Image not found on storage service" });
    }

    if (error.code === "ERR_INVALID_URL") {
      return res.status(400).json({ error: "Invalid image URL" });
    }

    if (error.code === "ECONNABORTED") {
      return res.status(408).json({ error: "Request timeout" });
    }

    // Generic error response
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to download image" });
    }
  }
};
