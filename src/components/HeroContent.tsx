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
      className="relative z-10 flex flex-col items-center justify-end min-h-screen px-4 pb-[calc(3rem+10vh)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center gap-4 w-full max-w-sm">
        {/* Main CTA Button */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.3, y: 80, rotateX: 45 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 120, 
            damping: 12,
            delay: 0.3,
            mass: 1.2
          }}
        >
          <Button
            variant="hero"
            size="lg"
            onClick={() => window.open("https://scaffquote.lovable.app", "_blank")}
            className="w-full flex-col h-auto py-3 gap-1"
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
            initial={{ opacity: 0, scale: 0.2, x: -100, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 10,
              delay: 0.6,
              mass: 1.5
            }}
          >
            <Button
              variant="hero-secondary"
              size="default"
              onClick={() => navigate("/about")}
              className="flex-col h-auto py-2 gap-0.5 w-full"
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
            initial={{ opacity: 0, scale: 0.2, x: 100, rotate: 15 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.6,
              mass: 1.5
            }}
          >
            <Button
              variant="hero-secondary"
              size="default"
              onClick={() => navigate("/dashboard")}
              className="flex-col h-auto py-2 gap-0.5 w-full"
            >
              <span className="text-base font-extrabold tracking-tight">
                CLIENT LOG IN
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
