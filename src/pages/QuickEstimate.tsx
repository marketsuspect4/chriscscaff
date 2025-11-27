import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import logo from "@/assets/logo.png";

const QuickEstimate = () => {
  const navigate = useNavigate();
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });

  const jobTypes = ["New Build", "Renovation", "Roofing", "Painting"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log({ ...formData, jobType: selectedJobType });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Logo */}
      <div className="flex justify-center pt-6 pb-2">
        <img src={logo} alt="Logo" className="h-16 md:h-20 w-auto" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="p-4 flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/quote-selection")}
            className="rounded-full bg-white/10 hover:bg-white/20"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-extrabold text-foreground">GET A PRICE</h1>
            <p className="text-muted-foreground text-xs uppercase tracking-wider">Quote Builder</p>
          </div>
        </div>

        {/* Mode Banner */}
        <div className="bg-primary/10 border-l-4 border-primary px-6 py-3 mb-8 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          <span className="font-bold text-primary">Quick Estimate Mode</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="Joe Bloggs"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
              Phone Number
            </Label>
            <Input
              id="phone"
              placeholder="07700 900000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-14 bg-card border-border text-foreground placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Job Type */}
          <div>
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
              Job Type
            </Label>
            <div className="grid grid-cols-2 gap-3">
              {jobTypes.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={selectedJobType === type ? "default" : "outline"}
                  onClick={() => setSelectedJobType(type)}
                  className={`h-14 font-bold ${
                    selectedJobType === type
                      ? "bg-brand-dark text-foreground border-brand-dark"
                      : "bg-card text-muted-foreground border-border hover:border-brand-gold/30"
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Roughly what do you need? e.g. Front of house for painting, 2 lifts..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="min-h-32 bg-card border-border text-foreground placeholder:text-muted-foreground/50 resize-none"
            />
          </div>
        </form>
      </motion.div>

      {/* Submit Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleSubmit}
            variant="hero"
            size="lg"
            className="w-full h-14 font-extrabold text-lg"
          >
            <Send className="w-5 h-5 mr-2" />
            GET ESTIMATE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickEstimate;
