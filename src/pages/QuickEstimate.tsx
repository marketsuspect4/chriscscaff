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
    <div className="min-h-screen bg-gradient-to-br from-[hsl(0,0%,8%)] via-[hsl(0,0%,12%)] to-[hsl(200,8%,15%)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="p-6 flex items-center gap-4 mb-6">
          <Button
            variant="steel"
            size="icon"
            onClick={() => navigate("/quote-selection")}
            className="rounded-2xl h-12 w-12"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-brand-gold to-brand-gold-light bg-clip-text text-transparent">GET A PRICE</h1>
            <p className="text-brand-steel text-xs uppercase tracking-widest font-bold">Quote Builder</p>
          </div>
        </div>

        {/* Mode Banner */}
        <div className="bg-gradient-to-r from-brand-gold/20 to-brand-gold-light/20 border-l-4 border-brand-gold px-6 py-4 mb-8 flex items-center gap-3 backdrop-blur-sm">
          <div className="bg-brand-gold/20 p-2 rounded-lg">
            <Zap className="w-5 h-5 text-brand-gold" />
          </div>
          <span className="font-extrabold text-brand-gold tracking-wide">Quick Estimate Mode</span>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="px-6 space-y-8">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-4 block">
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
              className={`h-16 bg-brand-black/40 border-2 border-brand-steel/40 text-brand-gold placeholder:text-brand-steel/50 rounded-xl font-medium focus:border-brand-gold/60 transition-colors ${
                errors.name ? "border-destructive" : ""
              }`}
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-2 font-medium">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-4 block">
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
              className={`h-16 bg-brand-black/40 border-2 border-brand-steel/40 text-brand-gold placeholder:text-brand-steel/50 rounded-xl font-medium focus:border-brand-gold/60 transition-colors ${
                errors.phone ? "border-destructive" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-sm text-destructive mt-2 font-medium">{errors.phone}</p>
            )}
          </div>

          {/* Job Type */}
          <div>
            <Label className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-4 block">
              Job Type
            </Label>
            {errors.jobType && (
              <p className="text-sm text-destructive mb-3 font-medium">{errors.jobType}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              {jobTypes.map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={selectedJobType === type ? "default" : "steel"}
                  onClick={() => {
                    setSelectedJobType(type);
                    if (errors.jobType) setErrors({ ...errors, jobType: "" });
                  }}
                  className={`h-16 font-extrabold text-base rounded-xl ${
                    selectedJobType === type
                      ? ""
                      : "bg-brand-black/40 border-2 border-brand-steel/40 text-brand-steel hover:border-brand-gold/40 hover:text-brand-gold"
                  }`}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-4 block">
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
              className={`min-h-40 bg-brand-black/40 border-2 border-brand-steel/40 text-brand-gold placeholder:text-brand-steel/50 rounded-xl resize-none font-medium focus:border-brand-gold/60 transition-colors ${
                errors.description ? "border-destructive" : ""
              }`}
            />
            {errors.description && (
              <p className="text-sm text-destructive mt-2 font-medium">{errors.description}</p>
            )}
          </div>
        </form>
      </motion.div>

      {/* Submit Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[hsl(0,0%,8%)] to-transparent backdrop-blur-md border-t border-brand-steel/20">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={onSubmit}
            variant="hero"
            size="lg"
            disabled={isLoading}
            className="w-full h-16 font-extrabold text-lg rounded-2xl shadow-[var(--shadow-gold)]"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                SUBMITTING...
              </>
            ) : (
              <>
                <Send className="w-6 h-6 mr-2" />
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
