import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import logo from "@/assets/logo.png";

interface HeroContentProps {
  show: boolean;
}

export const HeroContent = ({ show }: HeroContentProps) => {
  if (!show) return null;

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="mb-12"
      >
        <img 
          src={logo} 
          alt="Chris.C Scaffolding" 
          className="w-48 md:w-64 h-auto drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-6 w-full max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        {/* Main CTA Button */}
        <Button
          variant="hero"
          size="hero"
          className="w-full max-w-md flex-col h-auto py-6 gap-2"
        >
          <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
            GET A QUOTE
          </span>
          <span className="flex items-center gap-2 text-sm font-semibold opacity-90">
            <Zap className="w-4 h-4" />
            Same Day Response
          </span>
        </Button>

        {/* Secondary Buttons */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <Button
            variant="hero-secondary"
            size="xl"
            className="flex-col h-auto py-4 gap-1"
          >
            <span className="text-lg md:text-xl font-extrabold tracking-tight">
              TAKE A LOOK
            </span>
            <span className="text-xs font-medium opacity-80">
              FIND OUT MORE ABOUT US
            </span>
          </Button>

          <Button
            variant="hero-secondary"
            size="xl"
            className="flex-col h-auto py-4 gap-1"
          >
            <span className="text-lg md:text-xl font-extrabold tracking-tight">
              LOG IN
            </span>
            <span className="text-xs font-medium opacity-80">
              MANAGE CURRENT JOBS
            </span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
