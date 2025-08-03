import React, { useEffect, useState } from "react";
import SavedImages from "../components/SavedImages";
import {
  fetchSavedImages,
  handleDeleteSavedImage,
} from "../Actions/image-actions";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Pages/Dashboardlayout.jsx";

const SavedImagesPage = () => {
  const [savedImages, setSavedImages] = useState([]);
  const { user, isLoaded } = useUser();
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchSavedImages(setSavedImages, userId);
    }
  }, [userId]);

  // Modified handleLoadSavedImage to navigate with image data
  const handleLoadSavedImage = async (imageId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/images/saved-images/${imageId}`);
      const data = await response.json();

      if (data.success) {
        // Navigate to Leonardo dashboard with the image data in state
        navigate('/sample', {
          state: {
            loadedImage: {
              imageUrl: data.image.imageKitUrl || data.image.previewUrl, // Use ImageKit URL
              mimeType: data.image.mimeType,
              prompt: data.image.prompt,
              isImageKitUrl: true, // Flag to indicate this is a URL, not base64
              imageId: data.image._id, // Store the original image ID
              name: data.image.name
            }
          }
        });
      }
    } catch (err) {
      console.error('Error loading saved image:', err);
    }
  };

  // Show message if user not logged in
  if (isLoaded && !userId) {
    return (
      <div className="text-center py-10 text-gray-500">
        Please sign in to view saved images.
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 min-h-screen bg-black">
        <SavedImages
          images={savedImages}
          onLoad={handleLoadSavedImage} // Use the modified function
          onDelete={(imageId) =>
            handleDeleteSavedImage(imageId, setSavedImages)
          }
          onRefresh={() => fetchSavedImages(setSavedImages, userId)}
        />
      </div>
    </DashboardLayout>
  );
};

export default SavedImagesPage;