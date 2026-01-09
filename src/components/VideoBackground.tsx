import { useRef, useEffect, useState, useCallback } from "react";

interface VideoBackgroundProps {
  onVideoEnd: () => void;
}

export const VideoBackground = ({ onVideoEnd }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const hasEndedRef = useRef(false);

  const handleVideoEnd = useCallback(() => {
    if (!hasEndedRef.current) {
      hasEndedRef.current = true;
      onVideoEnd();
    }
  }, [onVideoEnd]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      handleVideoEnd();
    };

    const handleError = () => {
      console.error("Video failed to load");
      setHasError(true);
      handleVideoEnd();
    };

    const handleCanPlay = () => {
      video.playbackRate = 0.6;
      video.play().catch(err => {
        console.log("Video autoplay prevented:", err);
        setTimeout(handleVideoEnd, 100);
      });
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    video.addEventListener("canplay", handleCanPlay);

    // If video is already ready, try to play
    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [handleVideoEnd]);

  // Fallback gradient background if video fails
  if (hasError) {
    return (
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-background via-card to-background" />
    );
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-animation.mp4" type="video/mp4" />
      </video>
    </div>
  );
};