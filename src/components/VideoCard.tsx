
import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';

interface VideoCardProps {
  src: string;
  title?: string;
  thumbnail?: string;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ src, title, thumbnail, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(thumbnail || null);
  
  // Generate random thumbnail placeholder if no thumbnail is provided
  useEffect(() => {
    if (!thumbnail) {
      // Use placeholder images from Unsplash
      const placeholders = [
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=640&q=80",
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=640&q=80",
        "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=640&q=80"
      ];
      
      const randomIndex = Math.floor(Math.random() * placeholders.length);
      setVideoThumbnail(placeholders[randomIndex]);
    }
  }, [thumbnail]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className={`video-container rounded-lg overflow-hidden bg-black/10 ${className}`}>
      {!isPlaying ? (
        <div className="relative w-full h-full aspect-[9/16] max-h-[500px]">
          <div 
            className="w-full h-full flex items-center justify-center cursor-pointer bg-black/20"
            onClick={handlePlay}
          >
            {videoThumbnail ? (
              <img 
                src={videoThumbnail} 
                alt={title || "Video thumbnail"} 
                className="w-full h-full object-cover opacity-90"
              />
            ) : (
              <div className="w-full h-full bg-black/40 flex items-center justify-center">
                <span className="text-white/70 text-sm">Video Preview</span>
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center hover:bg-black/40 transition-colors">
              <div className="rounded-full bg-primary/90 p-3 animate-pulse">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
            {title && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-sm font-medium">{title}</h3>
              </div>
            )}
          </div>
        </div>
      ) : (
        <video 
          src={src}
          className="w-full h-full object-cover aspect-[9/16] max-h-[500px]"
          controls
          autoPlay
          onPause={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
};

export default VideoCard;
