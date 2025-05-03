
import React from 'react';

interface ImageCardProps {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, title, description }) => {
  return (
    <div className="image-container card-hover">
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      {(title || description) && (
        <div className="image-overlay">
          {title && <h3 className="text-lg font-medium text-white">{title}</h3>}
          {description && <p className="text-sm text-white/90">{description}</p>}
        </div>
      )}
    </div>
  );
};

export default ImageCard;
