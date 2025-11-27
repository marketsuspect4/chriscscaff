import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const QuoteSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Logo */}
      <div className="flex justify-center pt-6 pb-4">
        <img src={logo} alt="Logo" className="h-20 md:h-24 w-auto" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto pt-4"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full bg-white/10 hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold text-foreground">GET A PRICE</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-wider">Quote Builder</p>
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            How detailed do you need to be?
          </h2>
          <p className="text-muted-foreground">Choose the best option for your job.</p>
        </div>

        {/* Options */}
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/quick-estimate")}
            className="w-full bg-card hover:bg-card/80 p-6 rounded-2xl flex items-start gap-4 transition-all border-2 border-transparent hover:border-primary/20"
          >
            <div className="bg-primary/20 p-3 rounded-xl">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-xl font-extrabold text-foreground mb-2">QUICK ESTIMATE</h3>
              <p className="text-muted-foreground text-sm">
                Rough price based on a description. Best for simple jobs.
              </p>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/accurate-quote")}
            className="w-full bg-card hover:bg-card/80 p-6 rounded-2xl flex items-start gap-4 transition-all border-2 border-transparent hover:border-accent/20"
          >
            <div className="bg-accent/20 p-3 rounded-xl">
              <Tag className="w-6 h-6 text-accent" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-xl font-extrabold text-foreground mb-2">ACCURATE QUOTE</h3>
              <p className="text-muted-foreground text-sm">
                Detailed price based on specific measurements per section.
              </p>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuoteSelection;
