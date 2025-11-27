import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface VideoBackgroundProps {
  onVideoEnd: () => void;
}

export const VideoBackground = ({ onVideoEnd }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsVideoEnded(true);
      onVideoEnd();
    };

    video.addEventListener("ended", handleEnded);
    
    // Ensure video plays
    video.play().catch(err => {
      console.log("Video autoplay prevented:", err);
      // If autoplay fails, still show content after a delay
      setTimeout(() => {
        setIsVideoEnded(true);
        onVideoEnd();
      }, 100);
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [onVideoEnd]);

  return (
    <motion.div
      className="fixed inset-0 z-0"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVideoEnded ? 0 : 1 }}
      transition={{ duration: 1, delay: isVideoEnded ? 0.5 : 0 }}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/hero-animation.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/20" />
    </motion.div>
  );
};
