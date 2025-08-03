import { toast } from 'react-toastify';

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// fecthing saved images 
export const fetchSavedImages = async (setSavedImages, userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/images/saved-images?userId=${userId}`);
    const data = await response.json();
    if (data.success) {
      setSavedImages(data.images);
    }
  } catch (err) {
    console.error('Error fetching saved images:', err);
  }
};

export const handleImageCreate = async (prompt, setIsLoading, setError, setImage, setMode, setCurrentPrompt) => {
  setIsLoading(true);
  setError(null);
  setCurrentPrompt(prompt);

  try {
    const response = await fetch(`${API_BASE_URL}/api/images/create-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const data = await response.json();
    setImage({
      base64: data.image,
      mimeType: data.mimeType,
      prompt: prompt,
    });
    // Remove this line to keep it in create mode
    // setMode('edit'); 
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

// Function to handle image editing
export const handleImageEdit = async (prompt, image, setIsLoading, setError, setImage, setCurrentPrompt) => {
  if (!image) return;

  setIsLoading(true);
  setError(null);
  setCurrentPrompt(prompt);

  try {
    const formData = new FormData();
    formData.append('prompt', prompt);

    // Convert base64 image to blob
    const base64Data = image.base64;
    const blob = await fetch(`data:${image.mimeType};base64,${base64Data}`).then((res) => res.blob());
    formData.append('image', blob);

    const response = await fetch(`${API_BASE_URL}/api/images/edit-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to edit image');
    }

    const data = await response.json();
    setImage({
      base64: data.image,
      mimeType: data.mimeType,
      prompt: prompt,
    });
  } catch (err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};

// updated saveImage function to use imagekit
export const handleSaveImage = async (image, setIsSaving, setSavedImages, activeTab, fetchSavedImages, userId) => {
  if (!image) return;
  setIsSaving(true);

  try {
    const response = await fetch(`${API_BASE_URL}/api/images/save-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        base64: image.base64,
        mimeType: image.mimeType,
        prompt: image.prompt,
        userId,
      }),
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Image saved!");
      if (activeTab === "saved") {
        fetchSavedImages(setSavedImages, userId);
      }
    } else {
      throw new Error(data.error || "Save failed");
    }
  } catch (err) {
    toast.error("Save failed: " + err.message);
  } finally {
    setIsSaving(false);
  }
};


// Function to handle downloading an image
export const handleDownloadImage = (image) => {
  if (!image) return;

  const link = document.createElement('a');
  link.href = `data:${image.mimeType};base64,${image.base64}`;
  link.download = `generated-image-${Date.now()}.${image.mimeType.split('/')[1]}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Function to handle new image creation
export const handleNewImage = (setImage, setMode, setCurrentPrompt, setError) => {
  setImage(null);
  setMode('create');
  setCurrentPrompt('');
  setError(null);
};

// Function to handle loading a saved image
export const handleLoadSavedImage = async (imageId, setImage, setCurrentPrompt, setMode, setActiveTab) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/images/saved-images/${imageId}`);
    const data = await response.json();

    if (data.success) {
      setImage({
        base64: data.image.base64,
        mimeType: data.image.mimeType,
        prompt: data.image.prompt,
      });
      setCurrentPrompt(data.image.prompt);
      setMode('edit');
      setActiveTab('generate');
    }
  } catch (err) {
    console.error('Error loading saved image:', err);
  }
};

// Function to handle deleting a saved image
export const handleDeleteSavedImage = async (imageId, setSavedImages) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/images/saved-images/${imageId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (data.success) {
      setSavedImages((prev) => prev.filter((img) => img._id !== imageId));
    }
  } catch (err) {
    console.error('Error deleting image:', err);
  }
};