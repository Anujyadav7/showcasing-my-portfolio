import React, { useState, useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

interface VideoCardProps {
  src: string;
  title?: string;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ src, title, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Generate video thumbnail from the first frame with improved handling
  useEffect(() => {
    if (!src) return;
    
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.preload = 'auto'; // Use 'auto' instead of 'metadata' for better loading
    video.playsInline = true;
    
    // Set up event listeners before setting the source
    const captureFrame = () => {
      try {
        // Create canvas and draw the video frame
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 640;
        canvas.height = video.videoHeight || 360;
        const ctx = canvas.getContext('2d');
        
        if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL('image/jpeg', 0.9);
          if (thumbnailUrl !== 'data:,') {
            setVideoThumbnail(thumbnailUrl);
            setIsLoading(false);
          } else {
            // If we got an empty data URL, try again with a different time
            video.currentTime = 1.0; // Try a frame at 1 second
          }
        } else {
          console.warn('Canvas context or video dimensions not available');
          // Try again with a slight delay
          setTimeout(() => {
            if (video.videoWidth > 0) captureFrame();
          }, 100);
        }
      } catch (error) {
        console.error('Error generating thumbnail:', error);
        setIsLoading(false);
      }
    };

    // Multiple event handlers to ensure we capture a frame
    video.onloadeddata = () => {
      video.currentTime = 0.1; // Seek to a small offset to ensure we get an actual frame
    };
    
    video.oncanplay = () => {
      if (!videoThumbnail) {
        video.currentTime = 0.1;
      }
    };
    
    video.onseeked = () => {
      captureFrame();
      
      // Clean up after successful capture
      if (videoThumbnail) {
        video.pause();
        video.src = '';
        video.load();
      }
    };
    
    // Handle errors
    video.onerror = () => {
      console.error('Error loading video for thumbnail');
      setIsLoading(false);
    };
    
    // Set the source after setting up all event handlers
    video.src = src;
    video.load();
    
    // Fallback if events don't trigger
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        console.log('Fallback: forcing thumbnail capture');
        if (video.readyState >= 2) { // HAVE_CURRENT_DATA or better
          captureFrame();
        } else {
          setIsLoading(false);
        }
      }
    }, 3000);
    
    return () => {
      clearTimeout(timeoutId);
      video.pause();
      video.src = '';
      video.load();
    };
  }, [src]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.error('Error playing video:', err));
    }
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
                alt={title || "Video preview"} 
                className="w-full h-full object-cover opacity-90"
              />
            ) : (
              <div className="w-full h-full bg-black/40 flex items-center justify-center">
                {isLoading ? (
                  <span className="text-white/70 text-sm">Loading preview...</span>
                ) : (
                  <span className="text-white/70 text-sm">Video Preview</span>
                )}
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
          ref={videoRef}
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