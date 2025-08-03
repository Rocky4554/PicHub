import React, { useState, useEffect, useRef } from "react";
import { PacmanLoader } from "react-spinners";
import PromptForm from "../components/PromptForm";
import ImageDisplay from "../components/ImageDisplay";
import DashboardLayout from "../Pages/Dashboardlayout.jsx";
import {
  fetchSavedImages,
  handleImageCreate,
  handleImageEdit,
  handleSaveImage,
  handleDownloadImage,
  handleNewImage,
} from "../Actions/image-actions.jsx";
import {
  syncUserWithDatabase,
  fetchUserProfile,
  updateUserProStatus,
} from "../Actions/user-actions.jsx";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState("create");
  const [savedImages, setSavedImages] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isUserLoading, setIsUserLoading] = useState(true);

  // Refs for auto-scrolling
  const loadingRef = useRef(null);
  const imageDisplayRef = useRef(null);
  const containerRef = useRef(null);
  const topRef = useRef(null); // Add ref for top of page

  const { userId, isLoaded } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Enhanced smooth scroll function
  const scrollToElement = (elementRef, offset = 0) => {
    if (elementRef.current) {
      // Try multiple scroll methods for better compatibility
      const element = elementRef.current;
      
      // Method 1: scrollIntoView (most reliable)
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      });
      
      // Method 2: Manual scroll calculation as fallback
      setTimeout(() => {
        const container = containerRef.current || document.documentElement;
        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        if (container.scrollTo) {
          const scrollTop = container.scrollTop + elementRect.top - containerRect.top - offset;
          container.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
          });
        } else {
          // Fallback for older browsers
          container.scrollTop = container.scrollTop + elementRect.top - containerRect.top - offset;
        }
      }, 100);
    }
  };

  // Alternative scroll to top using scrollIntoView
  const scrollToTopAlternative = () => {
    console.log('Using alternative scroll method with topRef');
    if (topRef.current) {
      topRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest' 
      });
    }
  };

  // Enhanced scroll to top function with more aggressive methods
  const scrollToTop = () => {
    console.log('Attempting to scroll to top...');
    
    // Try the alternative method first
    scrollToTopAlternative();
    
    // Method 1: Force scroll on containerRef with multiple attempts
    if (containerRef.current) {
      console.log('Scrolling via containerRef');
      const container = containerRef.current;
      
      // Try smooth scroll first
      container.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Force immediate scroll as backup
      setTimeout(() => {
        container.scrollTop = 0;
      }, 100);
      
      // Another attempt after a longer delay
      setTimeout(() => {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }, 200);
      
      return;
    }
    
    // Method 2: Find scrollable parent element
    const scrollableElements = document.querySelectorAll('[class*="overflow-y-auto"], .overflow-auto, [style*="overflow"]');
    if (scrollableElements.length > 0) {
      console.log('Found scrollable elements, attempting scroll');
      scrollableElements.forEach(element => {
        element.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => element.scrollTop = 0, 100);
      });
      return;
    }
    
    // Method 3: Using window scroll
    console.log('Scrolling via window');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Method 4: Fallback direct assignment
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollY = 0;
    }, 300);
  };

  // Auto-scroll when loading starts
  useEffect(() => {
    if (isLoading && loadingRef.current) {
      console.log('Scrolling to loading state...');
      setTimeout(() => {
        scrollToElement(loadingRef, 100);
      }, 200);
    }
  }, [isLoading]);

  // Auto-scroll when image is loaded
  useEffect(() => {
    if (!isLoading && (image || uploadedImage) && imageDisplayRef.current) {
      console.log('Scrolling to image display...');
      setTimeout(() => {
        scrollToElement(imageDisplayRef, 50);
      }, 500);
    }
  }, [image, uploadedImage, isLoading]);

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate("/sign-in");
    }
  }, [isLoaded, userId, navigate]);

  // Handle loaded image from navigation state (from SavedImagesPage)
  useEffect(() => {
    if (location.state?.loadedImage) {
      const loadedImage = location.state.loadedImage;
      setImage(loadedImage);
      setCurrentPrompt(loadedImage.prompt);
      setMode('edit');
      setUploadedImage(null);
      setError(null);
      
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, location.pathname]);

  useEffect(() => {
    const handleUserSync = async () => {
      if (user && userId) {
        setIsUserLoading(true);
        try {
          const syncedUser = await syncUserWithDatabase(user);
          if (syncedUser) {
            setUserProfile(syncedUser);
          } else {
            const existingUser = await fetchUserProfile(userId);
            if (existingUser) {
              setUserProfile(existingUser);
            }
          }
        } catch (error) {
          console.error("Error handling user sync:", error);
        } finally {
          setIsUserLoading(false);
        }
      }
    };

    handleUserSync();
  }, [user, userId]);

  const handleProStatusToggle = async () => {
    if (!userProfile || !userId) return;
    const newProStatus = !userProfile.isPro;
    const updatedUser = await updateUserProStatus(userId, newProStatus);
    if (updatedUser) {
      setUserProfile(updatedUser);
    }
  };

  // Handle image upload from PromptForm
  const handleImageUpload = (imageData) => {
    setUploadedImage(imageData);
    if (imageData) {
      setMode('edit');
      setImage(null);
      setError(null);
    } else {
      setMode('create');
    }
  };

  // Enhanced save handler with scroll to top
  const handleSaveImageWithScroll = async (imageData) => {
    console.log('Save button clicked, will scroll to top after save');
    await handleSaveImage(
      imageData,
      setIsSaving,
      setSavedImages,
      () => {},
      fetchSavedImages,
      userId
    );
    // Scroll to top after saving
    setTimeout(() => {
      console.log('Save completed, scrolling to top');
      scrollToTop();
    }, 800); // Increased delay to ensure save is complete
  };

  // Enhanced download handler with scroll to top
  const handleDownloadImageWithScroll = async (imageData) => {
    console.log('Download button clicked, will scroll to top after download');
    handleDownloadImage(imageData); // Remove await as this might not be async
    // Scroll to top after download
    setTimeout(() => {
      console.log('Download completed, scrolling to top');
      scrollToTop();
    }, 300);
  };

  // Add edit handler for generated images
  const handleEditImage = () => {
    console.log('Edit button clicked, scrolling to top');
    setMode('edit');
    // Scroll to top when entering edit mode
    setTimeout(() => {
      scrollToTop();
    }, 200);
  };

  // Enhanced prompt submit handler
  const handlePromptSubmit = async (prompt) => {
    if (uploadedImage) {
      const imageForEdit = {
        base64: uploadedImage.base64,
        mimeType: uploadedImage.mimeType,
        prompt: currentPrompt
      };
      
      await handleImageEdit(
        prompt,
        imageForEdit,
        setIsLoading,
        setError,
        setImage,
        setCurrentPrompt
      );
    } else if (image && mode === 'edit') {
      let imageForEdit;
      
      if (image.isImageKitUrl) {
        try {
          setIsLoading(true);
          const response = await fetch(image.imageUrl);
          const blob = await response.blob();
          const base64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              const base64Data = reader.result.split(',')[1];
              resolve(base64Data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
          
          imageForEdit = {
            base64: base64,
            mimeType: image.mimeType,
            prompt: currentPrompt
          };
        } catch (error) {
          console.error('Error converting ImageKit URL to base64:', error);
          setError('Failed to load image for editing');
          setIsLoading(false);
          return;
        }
      } else {
        imageForEdit = {
          base64: image.base64,
          mimeType: image.mimeType,
          prompt: currentPrompt
        };
      }
      
      await handleImageEdit(
        prompt,
        imageForEdit,
        setIsLoading,
        setError,
        setImage,
        setCurrentPrompt
      );
    } else {
      await handleImageCreate(
        prompt,
        setIsLoading,
        setError,
        setImage,
        setMode,
        setCurrentPrompt
      );
    }
  };

  // Handle creating new image (reset everything)
  const handleNewImageCreation = () => {
    console.log('New Image button clicked, scrolling to top');
    handleNewImage(setImage, setMode, setCurrentPrompt, setError);
    setUploadedImage(null);
    
    // Scroll to top with multiple fallback methods
    setTimeout(() => {
      scrollToTop();
    }, 200);
  };

  if (!isLoaded || isUserLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <PacmanLoader color="#6366F1" size={30} />
        <span className="ml-4 text-gray-600">Loading user data...</span>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-900 text-white flex overflow-hidden">
        <div className="flex-1 relative z-10">
          <div 
            ref={containerRef}
            className="p-6 overflow-y-auto h-full scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* Top anchor for scrolling */}
            <div ref={topRef} id="top-anchor" className="absolute top-0"></div>
            
            {/* User Welcome Info */}
            {userProfile && (
              <div className="bg-cyan-900 p-4 rounded-md mb-6 border border-gray-700 text-black">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      Welcome, {userProfile.name}!
                    </h2>
                  </div>
                  <div className="text-sm text-white"> 
                    <div>
                      Member since:{" "}
                      {new Date(userProfile.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      Last login:{" "}
                      {new Date(userProfile.lastLogin).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mode Indicator */}
            {(uploadedImage || (image && mode === 'edit')) && (
              <div className="mb-4 p-3 bg-blue-900/50 border border-blue-700 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm text-blue-200">
                      Edit Mode: Ready to modify your {uploadedImage ? 'uploaded' : (image && image.isImageKitUrl ? 'saved' : 'generated')} image
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setImage(null);
                      setMode('create');
                      setCurrentPrompt('');
                      setError(null);
                    }}
                    className="text-xs text-blue-300 hover:text-blue-100 underline"
                  >
                    Switch to Create Mode
                  </button>
                </div>
              </div>
            )}

            {/* Enhanced Prompt Form with Upload */}
            <PromptForm
              onSubmit={handlePromptSubmit}
              onImageUpload={handleImageUpload}
              mode={mode}
              currentPrompt={currentPrompt}
              uploadedImage={uploadedImage}
              loadedImage={image && mode === 'edit' ? image : null}
              isPro={userProfile?.isPro}
            />

            {/* Status Messages */}
            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded-lg mb-6 mt-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <p>Error: {error}</p>
                </div>
              </div>
            )}

            {/* Loading State with scroll target */}
            {isLoading && (
              <div 
                ref={loadingRef}
                className="flex flex-col justify-center items-center my-12 p-8 bg-gray-800/50 rounded-xl"
                id="loading-section"
              >
                <PacmanLoader color="#6366F1" size={30} />
                <p className="mt-4 text-gray-300">
                  {uploadedImage || (image && mode === 'edit') ? 'Editing your image...' : 'Generating your image...'}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  This may take a few moments
                </p>
              </div>
            )}

            {/* Image Display with scroll target */}
            {!isLoading && (image || uploadedImage) && (
              <div 
                ref={imageDisplayRef} 
                className="mt-8"
                id="image-section"
              >
                <ImageDisplay
                  image={
                    image 
                      ? (image.isImageKitUrl ? image.imageUrl : `data:${image.mimeType};base64,${image.base64}`)
                      : uploadedImage
                      ? `data:${uploadedImage.mimeType};base64,${uploadedImage.base64}`
                      : null
                  }
                  onSave={() => handleSaveImageWithScroll(image || uploadedImage)}
                  onDownload={() => handleDownloadImageWithScroll(image || uploadedImage)}
                  onNewImage={handleNewImageCreation}
                  onEditImage={handleEditImage}
                  isSaving={isSaving}
                  isPro={userProfile?.isPro}
                  isOriginalUpload={!image && uploadedImage}
                  mode={mode}
                />
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !image && !uploadedImage && !error && (
              <div className="mt-12 text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-300 mb-2">
                  Ready to Create Amazing Images
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Upload an image to edit with AI, or describe what you want to create using the prompt above.
                </p>
              </div>
            )}
            
            {/* Extra padding at bottom for better scrolling */}
            <div className="h-20"></div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;