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
    <div className="min-h-screen bg-gradient-to-br from-[hsl(0,0%,8%)] via-[hsl(0,0%,12%)] to-[hsl(200,8%,15%)] pb-32">
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
        <div className="bg-gradient-to-r from-brand-steel/20 to-brand-steel-light/20 border-l-4 border-brand-steel-light px-6 py-4 mb-8 flex items-center gap-3 backdrop-blur-sm">
          <div className="bg-brand-steel/30 p-2 rounded-lg">
            <Tag className="w-5 h-5 text-brand-steel-light" />
          </div>
          <span className="font-extrabold text-brand-steel-light tracking-wide">Advanced Pricing Mode</span>
        </div>

        {/* Form */}
        <div className="px-6 space-y-10">
          {/* 1. Your Details */}
          <div>
            <h2 className="text-xl font-extrabold text-brand-gold mb-6 flex items-center gap-3">
              <span className="bg-gradient-to-br from-brand-gold to-brand-gold-light text-brand-black w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              YOUR DETAILS
            </h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-4 block">
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
                  className={`h-16 bg-brand-black/40 border-2 border-brand-steel/40 text-brand-gold placeholder:text-brand-steel/50 rounded-xl font-medium focus:border-brand-gold/60 transition-colors ${
                    errors.name ? "border-destructive" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-2 font-medium">{errors.name}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone" className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-4 block">
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
                  className={`h-16 bg-brand-black/40 border-2 border-brand-steel/40 text-brand-gold placeholder:text-brand-steel/50 rounded-xl font-medium focus:border-brand-gold/60 transition-colors ${
                    errors.phone ? "border-destructive" : ""
                  }`}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-2 font-medium">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* 2. Scaffold Parts */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-brand-gold flex items-center gap-3">
                <span className="bg-gradient-to-br from-brand-gold to-brand-gold-light text-brand-black w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                SCAFFOLD PARTS
              </h2>
              <span className="text-sm text-brand-gold font-bold bg-brand-gold/10 px-3 py-1 rounded-full">{sections.length} parts added</span>
            </div>

            {/* Added Sections */}
            {sections.length > 0 && (
              <div className="space-y-4 mb-6">
                {sections.map((section) => (
                  <div key={section.id} className="bg-brand-black/40 border-2 border-brand-steel/40 rounded-xl p-5 hover:border-brand-gold/40 transition-colors">
                    <h3 className="font-extrabold text-brand-gold mb-2 text-lg">{section.name}</h3>
                    <div className="text-sm text-brand-steel-light font-medium">
                      {section.height}m × {section.length}m • {section.boardWidth} Board
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Section Form */}
            {showSectionForm ? (
              <div className="space-y-6 bg-brand-black/60 p-6 rounded-2xl border-2 border-brand-steel/40 backdrop-blur-sm">
                <div>
                  <Label htmlFor="sectionName" className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-4 block">
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
                    className={`h-16 bg-brand-dark/60 border-2 border-brand-steel/40 text-brand-gold placeholder:text-brand-steel/50 rounded-xl font-medium focus:border-brand-gold/60 transition-colors ${
                      errors.sectionName ? "border-destructive" : ""
                    }`}
                  />
                  {errors.sectionName && (
                    <p className="text-sm text-destructive mt-2 font-medium">{errors.sectionName}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height" className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-4 block">
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
                      className={`h-16 bg-brand-dark/60 border-2 border-brand-steel/40 text-brand-gold placeholder:text-brand-steel/50 rounded-xl font-medium focus:border-brand-gold/60 transition-colors ${
                        errors.height ? "border-destructive" : ""
                      }`}
                    />
                    {errors.height && (
                      <p className="text-sm text-destructive mt-2 font-medium">{errors.height}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="length" className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-4 block">
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
                      className={`h-16 bg-brand-dark/60 border-2 border-brand-steel/40 text-brand-gold placeholder:text-brand-steel/50 rounded-xl font-medium focus:border-brand-gold/60 transition-colors ${
                        errors.length ? "border-destructive" : ""
                      }`}
                    />
                    {errors.length && (
                      <p className="text-sm text-destructive mt-2 font-medium">{errors.length}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-4 block">
                    Board Width
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["3", "4", "5"] as const).map((width) => (
                      <Button
                        key={width}
                        type="button"
                        variant={currentSection.boardWidth === width ? "default" : "steel"}
                        onClick={() => setCurrentSection({ ...currentSection, boardWidth: width })}
                        className={`h-14 font-extrabold rounded-xl ${
                          currentSection.boardWidth === width
                            ? ""
                            : "bg-brand-dark/60 border-2 border-brand-steel/40 text-brand-steel hover:border-brand-gold/40 hover:text-brand-gold"
                        }`}
                      >
                        {width} Board
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <Button
                    onClick={handleSaveSection}
                    variant="hero"
                    className="h-14 font-extrabold rounded-xl"
                  >
                    SAVE SECTION
                  </Button>
                  <Button
                    onClick={() => setShowSectionForm(false)}
                    variant="steel"
                    className="h-14 font-extrabold rounded-xl"
                  >
                    CANCEL
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setShowSectionForm(true)}
                variant="outline"
                className="w-full h-16 border-dashed border-2 border-brand-steel/50 hover:border-brand-gold/60 bg-brand-black/20 rounded-xl font-extrabold text-brand-steel hover:text-brand-gold"
              >
                <Plus className="w-6 h-6 mr-2" />
                Add Section
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Submit Button - Fixed at bottom */}
      {sections.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[hsl(0,0%,8%)] to-transparent backdrop-blur-md border-t border-brand-steel/20">
          <div className="max-w-2xl mx-auto">
            <Button
              variant="hero"
              size="lg"
              className="w-full h-16 font-extrabold text-lg rounded-2xl shadow-[var(--shadow-gold)]"
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
