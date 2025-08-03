
import React from 'react';

const ImageDisplay = ({ 
  image, 
  onSave, 
  onDownload, 
  onNewImage, 
  onEditImage, // New prop for edit functionality
  isSaving,
  mode // Add mode prop to conditionally show edit button
}) => {
  if (!image) {
    return (
      <div className="text-center text-gray-500 py-12">
        <p>No image generated yet. Enter a prompt above to get started!</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-center mb-4">
        <img 
          src={image}
          alt="Generated"
          className="max-w-full h-auto rounded-lg shadow-lg"
          style={{ maxHeight: '500px' }}
        />
      </div>
             
      <div className="flex justify-center space-x-4 mt-6">
        <button
          onClick={onDownload}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download</span>
        </button>
                 
        <button
          onClick={onSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{isSaving ? 'Saving...' : 'Save'}</span>
        </button>

        {/* Edit button - only show when not in edit mode */}
        {mode !== 'edit' && onEditImage && (
          <button
            onClick={onEditImage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Edit Image</span>
          </button>
        )}
                 
        <button
          onClick={onNewImage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>New Image</span>
        </button>
      </div>
    </div>
  );
};

export default ImageDisplay;