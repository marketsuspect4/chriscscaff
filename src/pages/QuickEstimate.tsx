import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAsync } from "@/hooks/use-async";
import { validateRequired, validatePhone, ValidationError } from "@/lib/error-handler";

const QuickEstimate = () => {
  const navigate = useNavigate();
  const [selectedJobType, setSelectedJobType] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const jobTypes = ["New Build", "Renovation", "Roofing", "Painting"];

  const submitEstimate = async (data: typeof formData & { jobType: string }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Estimate submitted:', data);
    return data;
  };

  const { execute: handleSubmit, isLoading } = useAsync(submitEstimate, {
    showSuccessToast: true,
    successMessage: "Estimate request submitted successfully!",
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    try {
      validateRequired(formData.name, "Name");
    } catch (err) {
      if (err instanceof ValidationError) newErrors.name = err.message;
    }

    try {
      validateRequired(formData.phone, "Phone number");
      if (formData.phone && !validatePhone(formData.phone)) {
        newErrors.phone = "Please enter a valid phone number";
      }
    } catch (err) {
      if (err instanceof ValidationError) newErrors.phone = err.message;
    }

    try {
      validateRequired(formData.description, "Description");
    } catch (err) {
      if (err instanceof ValidationError) newErrors.description = err.message;
    }

    if (!selectedJobType) {
      newErrors.jobType = "Please select a job type";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
      return;
    }

    await handleSubmit({ ...formData, jobType: selectedJobType });
  };

  return (
    <div className="min-h-screen bg-background">
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
        <form onSubmit={onSubmit} className="px-4 space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="Joe Bloggs"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: "" });
              }}
              className={`h-14 bg-card border-border text-foreground placeholder:text-muted-foreground/50 ${
                errors.name ? "border-destructive" : ""
              }`}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
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
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (errors.phone) setErrors({ ...errors, phone: "" });
              }}
              className={`h-14 bg-card border-border text-foreground placeholder:text-muted-foreground/50 ${
                errors.phone ? "border-destructive" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Job Type */}
          <div>
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
              Job Type
            </Label>
            {errors.jobType && (
              <p className="text-sm text-destructive mb-2">{errors.jobType}</p>
            )}
            <div className="grid grid-cols-2 gap-3">
              {jobTypes.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={selectedJobType === type ? "default" : "outline"}
                  onClick={() => {
                    setSelectedJobType(type);
                    if (errors.jobType) setErrors({ ...errors, jobType: "" });
                  }}
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
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: "" });
              }}
              className={`min-h-32 bg-card border-border text-foreground placeholder:text-muted-foreground/50 resize-none ${
                errors.description ? "border-destructive" : ""
              }`}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-1">{errors.description}</p>
            )}
          </div>
        </form>
      </motion.div>

      {/* Submit Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={onSubmit}
            variant="hero"
            size="lg"
            disabled={isLoading}
            className="w-full h-14 font-extrabold text-lg"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                SUBMITTING...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                GET ESTIMATE
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickEstimate;
