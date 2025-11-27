import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, Clock, Hammer, Plus, AlertCircle, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  // Template data - no authentication required
  const userName = "Mr Smith";

  return (
    <div className="min-h-screen bg-[hsl(220,25%,18%)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto p-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-2">
              My Projects
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome back, {userName}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-xl bg-card border border-border hover:bg-card/80"
          >
            <Home className="w-5 h-5 text-brand-gold" />
          </Button>
        </div>

        {/* Next Site Visit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border-2 border-border rounded-2xl p-6 mb-8 flex items-center gap-6"
        >
          <div className="bg-brand-gold/20 p-4 rounded-xl">
            <Clock className="w-8 h-8 text-brand-gold" />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-foreground">8AM</h2>
            <p className="text-muted-foreground uppercase text-sm tracking-wider">Next Site Visit</p>
          </div>
          <div className="bg-brand-gold/10 px-4 py-2 rounded-lg">
            <span className="text-brand-gold font-bold uppercase text-sm">Tuesday</span>
          </div>
        </motion.div>

        {/* Ongoing Jobs Section */}
        <div className="mb-8">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
            Ongoing Jobs
          </h2>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 hover:bg-card/80 transition-colors cursor-pointer"
            >
              <div className="bg-primary/20 p-3 rounded-xl">
                <Hammer className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-extrabold text-foreground mb-1">
                  42 Riverside Drive
                </h3>
                <p className="text-muted-foreground text-sm">Extension</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card border border-border rounded-xl p-6 flex items-center gap-4 hover:bg-card/80 transition-colors cursor-pointer"
            >
              <div className="bg-accent/20 p-3 rounded-xl">
                <Hammer className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-extrabold text-foreground mb-1">
                  19 High Street
                </h3>
                <p className="text-muted-foreground text-sm">Chimney Stack</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate("/quote-selection")}
            className="bg-card border-2 border-border hover:border-primary/30 rounded-xl p-6 text-left transition-all group"
          >
            <div className="flex items-start gap-3 mb-3">
              <Plus className="w-6 h-6 text-brand-gold" />
              <h3 className="text-xl font-extrabold text-foreground">New Quote</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Request a price estimate for a new project
            </p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border-2 border-border hover:border-accent/30 rounded-xl p-6 text-left transition-all group"
          >
            <div className="flex items-start gap-3 mb-3">
              <AlertCircle className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-extrabold text-foreground">Need Changes?</h3>
            </div>
            <p className="text-muted-foreground text-sm">
              Request adaptations or strike on current jobs
            </p>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
