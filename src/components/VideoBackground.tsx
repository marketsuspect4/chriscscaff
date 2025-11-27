import { useRef, useEffect } from "react";

interface VideoBackgroundProps {
  onVideoEnd: () => void;
}

export const VideoBackground = ({ onVideoEnd }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      onVideoEnd();
    };

    video.addEventListener("ended", handleEnded);
    
    // Ensure video plays
    video.play().catch(err => {
      console.log("Video autoplay prevented:", err);
      // If autoplay fails, still show content after a delay
      setTimeout(() => {
        onVideoEnd();
      }, 100);
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [onVideoEnd]);

  return (
    <div className="fixed inset-0 z-0">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-animation.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};
