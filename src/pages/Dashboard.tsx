import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Home, Clock, Hammer, Plus, AlertCircle, LogOut } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isChangesDialogOpen, setIsChangesDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [changeDescription, setChangeDescription] = useState("");

  // Template data - no authentication required
  const userName = "Mr Smith";

  const ongoingJobs = [
    { id: "1", address: "42 Riverside Drive", type: "Extension" },
    { id: "2", address: "19 High Street", type: "Chimney Stack Repair" }
  ];

  const handleSubmitChanges = () => {
    if (!selectedJob || !contactMethod || !changeDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Close the form dialog
    setIsChangesDialogOpen(false);
    
    // Reset form
    setSelectedJob("");
    setContactMethod("");
    setChangeDescription("");

    // Show success message
    toast({
      title: "Request Submitted",
      description: "We aim to respond within 24 hours",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[hsl(0,0%,8%)] via-[hsl(0,0%,12%)] to-[hsl(200,8%,15%)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto p-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold bg-clip-text text-transparent mb-2"
            >
              My Projects
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-brand-steel-light text-lg font-medium"
            >
              Welcome back, {userName}
            </motion.p>
          </div>
          <Button
            variant="steel"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-xl h-12 w-12"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>

        {/* Next Site Visit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-brand-black/80 to-brand-dark/80 backdrop-blur-sm border-2 border-brand-gold/20 rounded-3xl p-8 mb-10 flex items-center gap-6 shadow-[var(--shadow-gold)] hover:border-brand-gold/30 transition-all"
        >
          <div className="bg-gradient-to-br from-brand-gold to-brand-gold-light p-5 rounded-2xl shadow-lg">
            <Clock className="w-10 h-10 text-brand-black" />
          </div>
          <div className="flex-1">
            <h2 className="text-4xl font-extrabold text-brand-gold mb-1">8AM</h2>
            <p className="text-brand-steel-light uppercase text-sm tracking-widest font-bold">Next Site Visit</p>
          </div>
          <div className="bg-brand-gold/15 backdrop-blur-sm px-6 py-3 rounded-xl border border-brand-gold/30">
            <span className="text-brand-gold font-extrabold uppercase text-base tracking-wide">Tuesday</span>
          </div>
        </motion.div>

        {/* Ongoing Jobs Section */}
        <div className="mb-10">
          <h2 className="text-xs font-extrabold text-brand-steel-light uppercase tracking-widest mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-steel to-transparent"></div>
            Ongoing Jobs
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-steel to-transparent"></div>
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group bg-gradient-to-br from-brand-black/60 to-brand-dark/60 backdrop-blur-sm border-2 border-brand-steel/30 rounded-2xl p-6 hover:border-brand-gold/40 transition-all cursor-pointer hover:shadow-[var(--shadow-brand)]"
            >
              <div className="flex items-start gap-5 mb-4">
                <div className="bg-gradient-to-br from-brand-gold to-brand-gold-light p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Hammer className="w-7 h-7 text-brand-black" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-brand-gold mb-1 group-hover:text-brand-gold-light transition-colors">
                    42 Riverside Drive
                  </h3>
                  <p className="text-brand-steel-light text-sm font-medium uppercase tracking-wide">Extension</p>
                </div>
              </div>
              
              <div className="space-y-3 border-t border-brand-steel/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-brand-steel-light text-xs uppercase tracking-wider">Started</span>
                  <span className="text-brand-gold-light font-bold">15 Nov 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-steel-light text-xs uppercase tracking-wider">Completion</span>
                  <span className="text-brand-gold-light font-bold">28 Feb 2025</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-brand-steel-light text-xs uppercase tracking-wider">Progress</span>
                    <span className="text-brand-gold-light font-bold">65%</span>
                  </div>
                  <div className="w-full bg-brand-steel/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-brand-gold to-brand-gold-light h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="inline-block bg-brand-gold/20 text-brand-gold px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">On Schedule</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group bg-gradient-to-br from-brand-black/60 to-brand-dark/60 backdrop-blur-sm border-2 border-brand-steel/30 rounded-2xl p-6 hover:border-brand-gold/40 transition-all cursor-pointer hover:shadow-[var(--shadow-brand)]"
            >
              <div className="flex items-start gap-5 mb-4">
                <div className="bg-gradient-to-br from-brand-steel to-brand-steel-light p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Hammer className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold text-brand-gold mb-1 group-hover:text-brand-gold-light transition-colors">
                    19 High Street
                  </h3>
                  <p className="text-brand-steel-light text-sm font-medium uppercase tracking-wide">Chimney Stack Repair</p>
                </div>
              </div>
              
              <div className="space-y-3 border-t border-brand-steel/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-brand-steel-light text-xs uppercase tracking-wider">Started</span>
                  <span className="text-brand-gold-light font-bold">02 Jan 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-brand-steel-light text-xs uppercase tracking-wider">Completion</span>
                  <span className="text-brand-gold-light font-bold">15 Mar 2025</span>
                </div>
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-brand-steel-light text-xs uppercase tracking-wider">Progress</span>
                    <span className="text-brand-gold-light font-bold">35%</span>
                  </div>
                  <div className="w-full bg-brand-steel/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-brand-steel to-brand-steel-light h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="inline-block bg-amber-500/20 text-amber-400 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">Weather Delay</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-5">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate("/quote-selection")}
            className="group bg-gradient-to-br from-brand-black/60 to-brand-dark/60 backdrop-blur-sm border-2 border-brand-gold/30 hover:border-brand-gold/50 rounded-2xl p-8 text-left transition-all hover:shadow-[var(--shadow-gold)] hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-gradient-to-br from-brand-gold to-brand-gold-light p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Plus className="w-7 h-7 text-brand-black" />
              </div>
              <h3 className="text-2xl font-extrabold text-brand-gold group-hover:text-brand-gold-light transition-colors">New Quote</h3>
            </div>
            <p className="text-brand-steel-light text-sm font-medium leading-relaxed">
              Request a price estimate for a new project
            </p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => setIsChangesDialogOpen(true)}
            className="group bg-gradient-to-br from-brand-black/60 to-brand-dark/60 backdrop-blur-sm border-2 border-brand-steel/40 hover:border-brand-gold/50 rounded-2xl p-8 text-left transition-all hover:shadow-[var(--shadow-steel)] hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="bg-gradient-to-br from-brand-steel to-brand-steel-light p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <AlertCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-brand-gold group-hover:text-brand-gold-light transition-colors">Need Changes?</h3>
            </div>
            <p className="text-brand-steel-light text-sm font-medium leading-relaxed">
              Request adaptations or strike on current jobs
            </p>
          </motion.button>
        </div>

        {/* Need Changes Dialog */}
        <Dialog open={isChangesDialogOpen} onOpenChange={setIsChangesDialogOpen}>
          <DialogContent className="bg-gradient-to-br from-brand-black to-brand-dark border-2 border-brand-gold/30 text-foreground max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-extrabold text-brand-gold">Request Changes</DialogTitle>
              <DialogDescription className="text-brand-steel-light">
                Let us know what changes you need for your project
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="job" className="text-brand-gold-light font-semibold">Select Job</Label>
                <Select value={selectedJob} onValueChange={setSelectedJob}>
                  <SelectTrigger id="job" className="bg-brand-dark/50 border-brand-steel/30 text-foreground">
                    <SelectValue placeholder="Choose a job" />
                  </SelectTrigger>
                  <SelectContent className="bg-brand-dark border-brand-steel/30">
                    {ongoingJobs.map((job) => (
                      <SelectItem key={job.id} value={job.id} className="text-foreground hover:bg-brand-gold/20">
                        {job.address} - {job.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-brand-gold-light font-semibold">Preferred Contact Method</Label>
                <Input
                  id="contact"
                  placeholder="e.g., Phone: 07123 456789 or Email: user@example.com"
                  value={contactMethod}
                  onChange={(e) => setContactMethod(e.target.value)}
                  className="bg-brand-dark/50 border-brand-steel/30 text-foreground placeholder:text-brand-steel-light"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-brand-gold-light font-semibold">Description of Changes</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe the changes you'd like to request..."
                  value={changeDescription}
                  onChange={(e) => setChangeDescription(e.target.value)}
                  rows={5}
                  className="bg-brand-dark/50 border-brand-steel/30 text-foreground placeholder:text-brand-steel-light resize-none"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsChangesDialogOpen(false)}
                className="border-brand-steel/40 text-brand-steel-light hover:bg-brand-steel/20"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitChanges}
                className="bg-gradient-to-r from-brand-gold to-brand-gold-light text-brand-black font-bold hover:opacity-90"
              >
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default Dashboard;
