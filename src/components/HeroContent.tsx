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
      className="relative z-10 flex flex-col items-center justify-end min-h-screen px-4 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <img 
          src={logo} 
          alt="Chris.C Scaffolding" 
          className="w-40 md:w-48 h-auto drop-shadow-2xl"
        />
      </motion.div>

      <motion.div
        className="flex flex-col items-center gap-4 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Main CTA Button */}
        <Button
          variant="hero"
          size="lg"
          className="w-full flex-col h-auto py-4 gap-1"
        >
          <span className="text-xl font-extrabold tracking-tight">
            GET A QUOTE
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold opacity-90">
            <Zap className="w-3 h-3" />
            Same Day Response
          </span>
        </Button>

        {/* Secondary Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full">
          <Button
            variant="hero-secondary"
            size="default"
            className="flex-col h-auto py-3 gap-0.5"
          >
            <span className="text-sm font-extrabold tracking-tight">
              TAKE A LOOK
            </span>
            <span className="text-[10px] font-medium opacity-80">
              FIND OUT MORE
            </span>
          </Button>

          <Button
            variant="hero-secondary"
            size="default"
            className="flex-col h-auto py-3 gap-0.5"
          >
            <span className="text-sm font-extrabold tracking-tight">
              LOG IN
            </span>
            <span className="text-[10px] font-medium opacity-80">
              MANAGE JOBS
            </span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
