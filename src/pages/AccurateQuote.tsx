import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Tag, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { validateRequired, validatePhone, ValidationError } from "@/lib/error-handler";

interface Section {
  id: string;
  name: string;
  height: string;
  length: string;
  boardWidth: "3" | "4" | "5";
}

const AccurateQuote = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [sections, setSections] = useState<Section[]>([]);
  const [currentSection, setCurrentSection] = useState({
    name: "",
    height: "",
    length: "",
    boardWidth: "5" as "3" | "4" | "5",
  });
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSaveSection = () => {
    const newErrors: Record<string, string> = {};

    try {
      validateRequired(currentSection.name, "Section name");
    } catch (err) {
      if (err instanceof ValidationError) newErrors.sectionName = err.message;
    }

    try {
      validateRequired(currentSection.height, "Height");
      if (currentSection.height && parseFloat(currentSection.height) <= 0) {
        newErrors.height = "Height must be greater than 0";
      }
    } catch (err) {
      if (err instanceof ValidationError) newErrors.height = err.message;
    }

    try {
      validateRequired(currentSection.length, "Length");
      if (currentSection.length && parseFloat(currentSection.length) <= 0) {
        newErrors.length = "Length must be greater than 0";
      }
    } catch (err) {
      if (err instanceof ValidationError) newErrors.length = err.message;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all section details correctly.",
      });
      return;
    }

    const newSection: Section = {
      id: Date.now().toString(),
      ...currentSection,
    };
    setSections([...sections, newSection]);
    setCurrentSection({
      name: "",
      height: "",
      length: "",
      boardWidth: "5",
    });
    setShowSectionForm(false);
    setErrors({});
    
    toast({
      title: "Section Added",
      description: `${newSection.name} has been added successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
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
        <div className="bg-accent/10 border-l-4 border-accent px-6 py-3 mb-8 flex items-center gap-2">
          <Tag className="w-5 h-5 text-accent" />
          <span className="font-bold text-accent">Advanced Pricing Mode</span>
        </div>

        {/* Form */}
        <div className="px-4 space-y-8">
          {/* 1. Your Details */}
          <div>
            <h2 className="text-lg font-extrabold text-foreground mb-6">1. YOUR DETAILS</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                  Name
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
              <div>
                <Label htmlFor="phone" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                  Phone
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
            </div>
          </div>

          {/* 2. Scaffold Parts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-extrabold text-foreground">2. SCAFFOLD PARTS</h2>
              <span className="text-sm text-primary">{sections.length} parts added</span>
            </div>

            {/* Added Sections */}
            {sections.length > 0 && (
              <div className="space-y-3 mb-6">
                {sections.map((section) => (
                  <div key={section.id} className="bg-card border border-border rounded-lg p-4">
                    <h3 className="font-bold text-foreground mb-2">{section.name}</h3>
                    <div className="text-sm text-muted-foreground">
                      {section.height}m × {section.length}m • {section.boardWidth} Board
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Section Form */}
            {showSectionForm ? (
              <div className="space-y-4 bg-card/50 p-4 rounded-xl border border-border">
                <div>
                  <Label htmlFor="sectionName" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                    Section Name
                  </Label>
                  <Input
                    id="sectionName"
                    placeholder="e.g. Rear Chimney"
                    value={currentSection.name}
                    onChange={(e) => {
                      setCurrentSection({ ...currentSection, name: e.target.value });
                      if (errors.sectionName) setErrors({ ...errors, sectionName: "" });
                    }}
                    className={`h-14 bg-background border-border text-foreground placeholder:text-muted-foreground/50 ${
                      errors.sectionName ? "border-destructive" : ""
                    }`}
                  />
                  {errors.sectionName && (
                    <p className="text-sm text-destructive mt-1">{errors.sectionName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                      Height (M)
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="6"
                      value={currentSection.height}
                      onChange={(e) => {
                        setCurrentSection({ ...currentSection, height: e.target.value });
                        if (errors.height) setErrors({ ...errors, height: "" });
                      }}
                      className={`h-14 bg-background border-border text-foreground placeholder:text-muted-foreground/50 ${
                        errors.height ? "border-destructive" : ""
                      }`}
                    />
                    {errors.height && (
                      <p className="text-sm text-destructive mt-1">{errors.height}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="length" className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                      Length (M)
                    </Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="10"
                      value={currentSection.length}
                      onChange={(e) => {
                        setCurrentSection({ ...currentSection, length: e.target.value });
                        if (errors.length) setErrors({ ...errors, length: "" });
                      }}
                      className={`h-14 bg-background border-border text-foreground placeholder:text-muted-foreground/50 ${
                        errors.length ? "border-destructive" : ""
                      }`}
                    />
                    {errors.length && (
                      <p className="text-sm text-destructive mt-1">{errors.length}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 block">
                    Board Width
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["3", "4", "5"] as const).map((width) => (
                      <Button
                        key={width}
                        type="button"
                        variant={currentSection.boardWidth === width ? "default" : "outline"}
                        onClick={() => setCurrentSection({ ...currentSection, boardWidth: width })}
                        className={`h-12 font-bold ${
                          currentSection.boardWidth === width
                            ? "bg-accent text-accent-foreground"
                            : "bg-background text-muted-foreground border-border hover:border-accent/30"
                        }`}
                      >
                        {width} Board
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Button
                    onClick={handleSaveSection}
                    variant="hero"
                    className="h-12 font-bold"
                  >
                    SAVE SECTION
                  </Button>
                  <Button
                    onClick={() => setShowSectionForm(false)}
                    variant="hero-secondary"
                    className="h-12 font-bold"
                  >
                    CANCEL
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowSectionForm(true)}
                variant="outline"
                className="w-full h-14 border-dashed border-2 border-border hover:border-primary/50"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Section
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Submit Button - Fixed at bottom */}
      {sections.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-sm border-t border-border">
          <div className="max-w-2xl mx-auto">
            <Button
              variant="hero"
              size="lg"
              className="w-full h-14 font-extrabold text-lg"
            >
              GET ACCURATE QUOTE
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccurateQuote;
