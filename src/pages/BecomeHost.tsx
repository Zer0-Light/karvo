
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Car, AlertCircle, CreditCard, Camera, Wallet, Shield, Clock } from "lucide-react";
import AuthGuard from "@/components/AuthGuard";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

const BecomeHost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showPrerequisites, setShowPrerequisites] = useState(false);

  const handleGetStarted = () => {
    setShowPrerequisites(true);
  };

  const handleContinue = async () => {
    setShowPrerequisites(false);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/login');
        return;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          is_host: true,
          host_since: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      navigate('/list-your-car');
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register as host. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="absolute top-0 w-full px-4 py-6 flex justify-between items-center z-50">
        <h1 
          onClick={() => navigate("/")} 
          className="text-3xl font-bold text-primary cursor-pointer"
        >
          KARVO
        </h1>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate("/login")}
            className="bg-white hover:bg-accent/10"
          >
            Sign in
          </Button>
          <Button 
            onClick={() => navigate("/signup")}
            className="bg-accent hover:bg-accent/90"
          >
            Sign up
          </Button>
        </div>
      </nav>

      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Turn Your Car Into Income
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of car owners who are earning extra income by sharing their vehicles on KARVO. Get started in minutes and earn up to $1,000 per month.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-accent hover:bg-accent/90 text-lg px-8 py-6"
            >
              Start Earning Today
            </Button>
          </div>
        </motion.div>
        
        <div className="absolute inset-0 -z-10">
          <img
            src="/lovable-uploads/09957f3f-713e-4d24-9c6f-b3e8f135dc3e.png"
            alt="Luxury car"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </section>

      <AlertDialog open={showPrerequisites} onOpenChange={setShowPrerequisites}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-center">
              Ready to become a host?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              Here's what you'll need to get started:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-6 space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Car className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Eligible Vehicle</h3>
                <p className="text-sm text-muted-foreground">
                  Your car must be 15 years old or newer, have fewer than 150,000 miles, and pass our safety inspection.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Valid driver's license, proof of insurance, and vehicle registration papers.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Vehicle Photos</h3>
                <p className="text-sm text-muted-foreground">
                  Clear photos of your car's exterior and interior. We'll guide you through the process.
                </p>
              </div>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction 
              onClick={handleContinue}
              className="w-full bg-accent hover:bg-accent/90"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {!showPrerequisites && (
        <>
          <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">
                Why Host on KARVO?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Wallet className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Earn Extra Income</h3>
                  <p className="text-gray-600">Average hosts earn $500-$1,000 per month sharing their car part-time</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Complete Protection</h3>
                  <p className="text-gray-600">$1M insurance coverage, 24/7 roadside assistance, and driver screening</p>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Flexible Schedule</h3>
                  <p className="text-gray-600">You control your calendar and pricing. Share your car only when it works for you</p>
                </motion.div>
              </div>
            </div>
          </section>

          <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-8">
                How Hosting Works
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-4">1</div>
                  <h3 className="text-lg font-semibold mb-2">List Your Car</h3>
                  <p className="text-gray-600">Create your listing with photos and details about your car</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-4">2</div>
                  <h3 className="text-lg font-semibold mb-2">Set Your Terms</h3>
                  <p className="text-gray-600">Choose your availability, pricing, and rental requirements</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-4">3</div>
                  <h3 className="text-lg font-semibold mb-2">Get Bookings</h3>
                  <p className="text-gray-600">Qualified guests will request to book your car</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-4">4</div>
                  <h3 className="text-lg font-semibold mb-2">Earn Money</h3>
                  <p className="text-gray-600">Get paid directly to your bank account after each trip</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default BecomeHost;
