
import React, { useState } from 'react';

const ImageCard = ({ image, onLoad, onDelete, onDownload }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleLoad = (e) => {
    e.stopPropagation();
    onLoad?.(image._id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this image?')) {
      onDelete?.(image._id);
    }
  };

  const handleDownload = async (e) => {
    e.stopPropagation();
    if (!isDownloading && onDownload) {
      setIsDownloading(true);
      try {
        await onDownload(image);
      } catch (error) {
        console.error('Download failed:', error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  return (
    <div className="break-inside-avoid bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group cursor-pointer">
      <div className="relative aspect-square overflow-hidden group">
        {image.previewUrl ? (
          <img
            src={image.previewUrl}
            alt={image.name}
            className="w-full h-full object-cover transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="text-gray-400 text-sm w-full h-full flex items-center justify-center bg-gray-200">
            No preview available
          </div>
        )}

        {/* Slide-up Overlay */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gray-900/40 backdrop-blur-sm text-white p-4 flex flex-col justify-between h-full">
          <div className="overflow-y-auto max-h-[70%] scrollbar-hide">
            <h3 className="font-semibold text-sm mb-1 truncate">
              {image.name || 'Untitled'}
            </h3>
            {image.prompt && (
              <p className="text-gray-200 text-xs line-clamp-2 mb-2">
                <strong>Prompt:</strong> {image.prompt}
              </p>
            )}
            <div className="text-gray-300 text-xs space-y-1">
              <p>Created: {formatDate(image.createdAt)}</p>
              <p>Type: {image.mimeType}</p>
              {image.fileSize && (
                <p>Size: {Math.round(image.fileSize / 1024)} KB</p>
              )}
            </div>
          </div>

          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleLoad}
              className="flex-1 bg-indigo-600/80 backdrop-blur-sm hover:bg-indigo-700 text-white px-3 py-2 rounded text-sm transition"
              title="Load image"
            >
              Edit
            </button>
            
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 bg-green-600/80 backdrop-blur-sm hover:bg-green-700 text-white px-3 py-2 rounded text-sm transition disabled:opacity-50"
              title="Download image"
            >
              {isDownloading ? 'Downloading...' : 'Download'}
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 bg-red-600/80 backdrop-blur-sm hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition"
              title="Delete image"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ImageCard;