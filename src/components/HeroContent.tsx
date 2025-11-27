import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface HeroContentProps {
  show: boolean;
}

export const HeroContent = ({ show }: HeroContentProps) => {
  const navigate = useNavigate();
  
  if (!show) return null;

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-end min-h-screen px-4 pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        {/* Main CTA Button */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 20,
            delay: 0.3 
          }}
        >
          <Button
            variant="hero"
            size="lg"
            onClick={() => navigate("/quote-selection")}
            className="w-full flex-col h-auto py-6 gap-1"
          >
            <span className="text-2xl font-extrabold tracking-tight">
              GET A QUOTE
            </span>
            <span className="flex items-center gap-2 text-sm font-semibold opacity-90">
              <Zap className="w-4 h-4" />
              Same Day Response
            </span>
          </Button>
        </motion.div>

        {/* Secondary Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              delay: 0.5 
            }}
          >
            <Button
              variant="hero-secondary"
              size="default"
              className="flex-col h-auto py-4 gap-0.5 w-full"
            >
              <span className="text-base font-extrabold tracking-tight">
                TAKE A LOOK
              </span>
              <span className="text-xs font-medium opacity-80">
                FIND OUT MORE
              </span>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              delay: 0.5 
            }}
          >
            <Button
              variant="hero-secondary"
              size="default"
              onClick={() => navigate("/dashboard")}
              className="flex-col h-auto py-4 gap-0.5 w-full"
            >
              <span className="text-base font-extrabold tracking-tight">
                LOG IN
              </span>
              <span className="text-xs font-medium opacity-80">
                MANAGE JOBS
              </span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
