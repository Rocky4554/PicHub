
import React, { useState, useEffect, useRef } from 'react';

const PromptForm = ({ 
  onSubmit, 
  onImageUpload, 
  mode = 'create', 
  currentPrompt, 
  uploadedImage,
  loadedImage // Prop for loaded saved images
}) => {
  const [prompt, setPrompt] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Example prompts that cycle through the placeholder
  const placeholderExamples = [
    "A serene mountain landscape at golden hour with misty valleys...",
    "Portrait of a person with vibrant colors and dramatic lighting...",
    "Futuristic cityscape with neon lights and flying vehicles...",
    "Abstract art with flowing shapes and gradient colors...",
    "Cozy coffee shop interior with warm lighting and plants...",
    "Majestic waterfall in a tropical rainforest setting..."
  ];

  // Editing prompts when in edit mode
  const editingPrompts = [
    "Make the lighting more dramatic and cinematic...",
    "Change the color palette to warm autumn tones...",
    "Add more detail and texture to the subject...",
    "Transform the background to a futuristic setting...",
    "Enhance the contrast and make it more vibrant...",
    "Apply an artistic oil painting style..."
  ];

  useEffect(() => {
    setPrompt(currentPrompt || '');
  }, [currentPrompt]);

  // Animate placeholder text
  useEffect(() => {
    const currentPrompts = mode === 'edit' ? editingPrompts : placeholderExamples;
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % currentPrompts.length);
        setIsAnimating(false);
      }, 200);
    }, 3000);

    return () => clearInterval(interval);
  }, [mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleExampleClick = (examplePrompt) => {
    setPrompt(examplePrompt);
  };

  // File upload handlers
  const handleFileSelect = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target.result.split(',')[1];
        const imageData = {
          base64: base64Data,
          mimeType: file.type,
          name: file.name
        };
        onImageUpload && onImageUpload(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onImageUpload && onImageUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const currentPrompts = mode === 'edit' ? editingPrompts : placeholderExamples;
  const currentPlaceholder = currentPrompts[placeholderIndex];

  // Example prompts based on mode
  const examplePrompts = mode === 'edit' 
    ? [
        "Make the lighting more dramatic",
        "Change to warm autumn colors", 
        "Add artistic oil painting style"
      ]
    : [
        "A serene mountain landscape at golden hour",
        "Portrait with dramatic lighting and vibrant colors", 
        "Futuristic cityscape with neon lights"
      ];

  // Determine if we have an image to show (either uploaded or loaded)
  const hasImage = uploadedImage || loadedImage;
  const displayImage = uploadedImage || loadedImage;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Image Upload Section - Show upload area only if no image is present */}
      {(mode === 'create' || mode === 'edit') && (
        <div className="mb-6">
          {/* Upload Area - Only show when no image is present */}
          {!hasImage && (
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50 bg-opacity-10' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              
              <div className="flex flex-col items-center space-y-4">
                <div className="p-3 bg-gray-800 rounded-full">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div>
                  <p className="text-gray-300 mb-2">
                    {mode === 'create' 
                      ? 'Upload an image to edit, or create a new one below'
                      : 'Upload an image to edit'
                    }
                  </p>
                  <p className="text-sm text-gray-500">
                    Drag & drop an image here, or{' '}
                    <button
                      type="button"
                      onClick={openFileDialog}
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      browse files
                    </button>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Image Preview - Show when we have an image (uploaded or loaded) */}
          {hasImage && (
            <div className="relative bg-gray-800 rounded-xl p-4">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={
                      displayImage.base64 
                        ? `data:${displayImage.mimeType};base64,${displayImage.base64}`
                        : displayImage.isImageKitUrl
                        ? displayImage.imageUrl
                        : displayImage
                    }
                    alt={uploadedImage ? "Uploaded" : "Loaded"}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-200 truncate">
                    {uploadedImage 
                      ? (uploadedImage.name || 'Uploaded image')
                      : 'Loaded saved image'
                    }
                  </p>
                  <p className="text-xs text-gray-400">
                    Ready to edit with AI
                  </p>
                </div>
                <button
                  type="button"
                  onClick={removeImage}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prompt Input Section */}
      <div className="mb-6">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <div className="relative">
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-12 py-5 pr-32 bg-black text-white border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 placeholder-gray-400"
                rows="2"
                required
              />
              
              {/* Icon inside input - changes based on mode */}
              <div className="absolute left-4 top-7 pointer-events-none">
                {hasImage ? (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              
              {/* Generate/Edit button inside input */}
              <button
                onClick={handleSubmit}
                disabled={!prompt.trim()}
                className="absolute right-4 top-5 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white text-sm font-medium rounded-full transition-colors duration-200 flex items-center space-x-2"
              >
                <span>
                  {hasImage ? 'Edit Image' : 'Generate Image'}
                </span>
              </button>
              
              {/* Animated placeholder */}
              {!prompt && (
                <div className="absolute inset-0 top-2 px-12 py-4 pointer-events-none">
                  <div 
                    className={`text-gray-400 transition-opacity duration-200 ${
                      isAnimating ? 'opacity-0' : 'opacity-100'
                    }`}
                  >
                    {currentPlaceholder}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Example Prompts */}
      <div className="flex gap-3 justify-center">
        {examplePrompts.map((examplePrompt, index) => (
          <button
            key={index}
            onClick={() => handleExampleClick(examplePrompt)}
            className="flex-1 px-4 py-3 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 hover:text-white rounded-lg transition-colors duration-200 border border-gray-600 hover:border-gray-500 text-center"
          >
            {examplePrompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptForm;