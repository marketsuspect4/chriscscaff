import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const QuoteSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(0,0%,8%)] via-[hsl(0,0%,12%)] to-[hsl(200,8%,15%)] p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto pt-8"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Button
            variant="steel"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-2xl h-12 w-12"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-extrabold bg-gradient-to-r from-brand-gold to-brand-gold-light bg-clip-text text-transparent"
            >
              GET A PRICE
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-brand-steel text-sm uppercase tracking-widest font-bold"
            >
              Quote Builder
            </motion.p>
          </div>
        </div>

        {/* Question */}
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold text-brand-gold mb-3">
            How detailed do you need to be?
          </h2>
          <p className="text-brand-steel-light font-medium">Choose the best option for your job.</p>
        </div>

        {/* Options */}
        <div className="space-y-5">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/quick-estimate")}
            className="w-full group bg-gradient-to-br from-brand-black/60 to-brand-dark/60 backdrop-blur-sm border-2 border-brand-gold/30 hover:border-brand-gold/50 p-8 rounded-3xl flex items-start gap-6 transition-all hover:shadow-[var(--shadow-gold)]"
          >
            <div className="bg-gradient-to-br from-brand-gold to-brand-gold-light p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-brand-black" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-2xl font-extrabold text-brand-gold mb-3 group-hover:text-brand-gold-light transition-colors">QUICK ESTIMATE</h3>
              <p className="text-brand-steel-light text-sm font-medium leading-relaxed">
                Rough price based on a description. Best for simple jobs.
              </p>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/accurate-quote")}
            className="w-full group bg-gradient-to-br from-brand-black/60 to-brand-dark/60 backdrop-blur-sm border-2 border-brand-steel/40 hover:border-brand-gold/50 p-8 rounded-3xl flex items-start gap-6 transition-all hover:shadow-[var(--shadow-steel)]"
          >
            <div className="bg-gradient-to-br from-brand-steel to-brand-steel-light p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
              <Tag className="w-8 h-8 text-white" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-2xl font-extrabold text-brand-gold mb-3 group-hover:text-brand-gold-light transition-colors">ACCURATE QUOTE</h3>
              <p className="text-brand-steel-light text-sm font-medium leading-relaxed">
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
