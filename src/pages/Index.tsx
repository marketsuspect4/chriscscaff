import { useState } from "react";
import { VideoBackground } from "@/components/VideoBackground";
import { HeroContent } from "@/components/HeroContent";
import { AmbientEffects } from "@/components/AmbientEffects";

const Index = () => {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <VideoBackground onVideoEnd={() => setShowContent(true)} />
      <AmbientEffects />
      <HeroContent show={showContent} />
    </div>
  );
};

export default Index;