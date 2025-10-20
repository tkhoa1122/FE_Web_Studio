'use client';
import React, { useState } from 'react';
import { X, ZoomIn, Camera, Video, Play } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  title: string;
  type: 'photo' | 'video';
  category?: string;
}

interface GalleryGridProps {
  images: GalleryImage[];
  title?: string;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ images, title = "BEHIND THE SCENES" }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="py-12">
      {title && (
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-[#667EEA] to-[#764BA2] bg-clip-text text-transparent">
          {title}
        </h2>
      )}
      <p className="text-center text-gray-600 mb-12 text-lg">
        Khám phá không gian và thiết bị chuyên nghiệp của chúng tôi
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group"
            onClick={() => handleImageClick(image)}
          >
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#667EEA]/80 to-[#764BA2]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <ZoomIn className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Type Badge */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-gradient-to-r from-[#667EEA] to-[#764BA2] text-white px-3 py-1.5 rounded-full flex items-center space-x-1.5 text-xs font-bold shadow-lg backdrop-blur-sm">
                {image.type === 'photo' ? (
                  <>
                    <Camera className="w-3.5 h-3.5" />
                    <span>Ảnh</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Video</span>
                  </>
                )}
              </div>
            </div>

            {/* Category Badge & Title */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
              {image.category && (
                <div className="bg-white/90 backdrop-blur-sm text-[#667EEA] px-3 py-1 rounded-lg text-xs font-bold inline-block mb-2">
                  {image.category}
                </div>
              )}
              <h3 className="text-white font-bold text-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {image.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Modal */}
      {isOpen && selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={handleClose}
        >
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 bg-gradient-to-r from-[#667EEA] to-[#764BA2] hover:from-[#764BA2] hover:to-[#667EEA] text-white p-3 rounded-full transition-all z-20 hover:scale-110 shadow-xl"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-5xl w-full animate-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-[#667EEA]/20 to-[#764BA2]/20 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto"
              />
              <div className="p-6 bg-gradient-to-r from-[#667EEA] to-[#764BA2]">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedImage.title}
                </h3>
                <div className="flex items-center space-x-4 text-white/80">
                  <span className="flex items-center space-x-2">
                    {selectedImage.type === 'photo' ? (
                      <>
                        <Camera className="w-4 h-4" />
                        <span>Ảnh chụp</span>
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4" />
                        <span>Video</span>
                      </>
                    )}
                  </span>
                  {selectedImage.category && (
                    <>
                      <span className="text-white/40">•</span>
                      <span>{selectedImage.category}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGrid;
