import { useRef, useEffect, useState } from "react";

interface VideoBackgroundProps {
  onVideoEnd: () => void;
}

export const VideoBackground = ({ onVideoEnd }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Prevent double-play in React StrictMode / dev by using a global flag
    const win = window as typeof window & { __heroVideoInitialized?: boolean };
    if (win.__heroVideoInitialized) {
      // If we've already initialized once in this session, just reveal content
      onVideoEnd();
      return;
    }
    win.__heroVideoInitialized = true;

    const handleEnded = () => {
      onVideoEnd();
    };

    const handleError = () => {
      console.error("Video failed to load");
      setHasError(true);
      // Show content immediately if video fails
      onVideoEnd();
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    
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
      video.removeEventListener("error", handleError);
    };
  }, [onVideoEnd]);

  // Fallback gradient background if video fails
  if (hasError) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-background via-card to-background" />
    );
  }

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
    </div>
  );
};
