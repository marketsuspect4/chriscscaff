import { useRef, useEffect } from "react";

interface VideoBackgroundProps {
  onVideoReady: () => void;
}

export const VideoBackground = ({ onVideoReady }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      onVideoReady();
    };

    video.addEventListener("canplay", handleCanPlay);
    
    // Ensure video plays
    video.play().catch(err => {
      console.log("Video autoplay prevented:", err);
      onVideoReady();
    });

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [onVideoReady]);

  return (
    <div className="fixed inset-0 z-0">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-animation.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
};
