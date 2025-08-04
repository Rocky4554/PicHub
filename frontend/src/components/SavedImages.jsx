import React, { useState } from 'react';
import ImageCard from './ImageCard';

const SavedImages = ({ images, onLoad, onDelete, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

  const handleDownload = async (image) => {
    try {
      const button = document.activeElement;
      const originalText = button.textContent;
      button.textContent = 'Downloading...';
      button.disabled = true;

      const fileName = image.name;

      const response = await fetch(
        `${API_BASE_URL}/api/images/download-image/${encodeURIComponent(fileName)}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/octet-stream, image/*',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status} ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      button.textContent = originalText;
      button.disabled = false;
    } catch (error) {
      console.error('Download failed:', error);
      alert(`Download failed: ${error.message}`);
      const button = document.activeElement;
      button.textContent = 'Download';
      button.disabled = false;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Refresh failed:', error);
      alert('Failed to refresh images');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center px-4 py-12 text-gray-400">
        <p className="text-lg sm:text-xl mb-4">No saved images yet. Generate and save some images to see them here!</p>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
            isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isRefreshing ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Refreshing...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          Saved Images ({images.length})
        </h2>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2 ${
            isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isRefreshing ? (
            <>
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Refreshing...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>Refresh</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mx-0 max-w-full">
        {images.map((image) => (
          <ImageCard
            key={image._id}
            image={image}
            onLoad={onLoad}
            onDelete={onDelete}
            onDownload={handleDownload}
            showLoadButton={true}
            showDeleteButton={true}
            showDownloadButton={true}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedImages;


