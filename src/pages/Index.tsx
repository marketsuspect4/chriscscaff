import { useState } from "react";
import { VideoBackground } from "@/components/VideoBackground";
import { HeroContent } from "@/components/HeroContent";
import logo from "@/assets/logo.png";

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <VideoBackground onVideoEnd={() => setShowContent(true)} />
      
      {/* Logo at top */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
        <img src={logo} alt="Logo" className="h-16 md:h-20 w-auto" />
      </div>
      
      <HeroContent show={showContent} />
    </div>
  );
};

export default Index;
