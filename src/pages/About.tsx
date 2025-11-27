import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Award, Users, Wrench } from "lucide-react";
import vehicle1 from "@/assets/vehicle-1.png";
import vehicle2 from "@/assets/vehicle-2.png";
import vehicle3 from "@/assets/vehicle-3.png";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Building Your Future, Safely"
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "Professional scaffolding solutions"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced & certified professionals"
    },
    {
      icon: Wrench,
      title: "Full Service",
      description: "From setup to takedown"
    }
  ];

  return (
    <div className="min-h-screen bg-[hsl(220,25%,18%)] text-foreground">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[hsl(0,0%,8%)] to-transparent backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-brand-gold hover:text-brand-gold-light"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back Home
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-gold bg-clip-text text-transparent">
            Chris.C Scaffolding
          </h1>
        </motion.div>
      </div>

      {/* Vehicle Gallery */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-brand-gold">
            Our Fleet
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {[vehicle1, vehicle2, vehicle3].map((vehicle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
                className="group relative overflow-hidden rounded-xl border-2 border-brand-gold/30 hover:border-brand-gold transition-all duration-500 shadow-lg hover:shadow-gold"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={vehicle}
                    alt={`Chris.C Scaffolding Vehicle ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                  <div className="p-6 w-full">
                    <p className="text-brand-gold font-bold text-lg">Professional Equipment</p>
                    <p className="text-brand-steel-light text-sm">Ready for any project</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-brand p-6 rounded-lg border border-brand-gold/20 hover:border-brand-gold/50 transition-all duration-300 hover:shadow-gold"
            >
              <feature.icon className="w-12 h-12 text-brand-gold mb-4" />
              <h3 className="text-xl font-bold mb-2 text-brand-gold">{feature.title}</h3>
              <p className="text-brand-steel-light">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-brand p-8 md:p-12 rounded-2xl border border-brand-gold/30 shadow-gold text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-brand-gold">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-brand-steel-light mb-8">
            Contact us today for a quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate("/quote-selection")}
              className="bg-gradient-gold hover:scale-105 transition-transform duration-300 shadow-gold"
            >
              Get a Quote
            </Button>
            <Button
              variant="steel"
              size="lg"
              onClick={() => navigate("/dashboard")}
            >
              View Dashboard
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Footer Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default About;
