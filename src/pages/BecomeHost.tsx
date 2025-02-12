import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Car, AlertCircle, CreditCard, Camera } from "lucide-react";
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

  const handleContinue = () => {
    setShowPrerequisites(false);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          is_host: true,
          host_since: new Date().toISOString(),
          host_description: description,
        })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success!",
        description: "You are now registered as a host.",
      });

      navigate('/profile');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to register as host. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
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
            Sign up as a Host Today
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Turn your car into a second income by sharing it on KARVO
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-accent hover:bg-accent/90 text-lg px-8 py-6"
            >
              Sign up as Host
            </Button>
            <Button 
              variant="outline"
              className="border-2 border-accent text-accent hover:bg-accent/10 text-lg px-8 py-6"
            >
              Calculate earnings
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
              Ready, set, list
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              This will take about 10 minutes, and you'll need:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-6 space-y-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">License plate number</h3>
                <p className="text-sm text-muted-foreground">
                  We need this to ensure your car is protected by our vehicle protection packages.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Photos of your car</h3>
                <p className="text-sm text-muted-foreground">
                  Guests need to see your car before they book it. Don't worry about this yet — we'll coach you on taking high quality photos later.
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

      {showForm && (
        <AuthGuard>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-6 pt-24"
          >
            <div className="max-w-2xl mx-auto">
              <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold text-center mb-2">Host Sign Up</h2>
                  <p className="text-muted-foreground text-center mb-8">
                    Start your journey as a KARVO host today
                  </p>

                  {error && (
                    <Alert variant="destructive" className="mb-6">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="description">Tell us about yourself as a host</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Share a bit about yourself, your experience with cars, and what makes you a great host..."
                        className="h-32"
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setShowForm(false)}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Signing up..." : "Complete Sign Up"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </AuthGuard>
      )}

      {!showForm && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">
              Why share your car on KARVO?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center p-6"
              >
                <div className="text-accent text-4xl mb-4">💰</div>
                <h3 className="text-xl font-semibold mb-3">Earn Extra Income</h3>
                <p className="text-gray-600">Turn your car into a money-making asset when you're not using it</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center p-6"
              >
                <div className="text-accent text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-3">Insurance Coverage</h3>
                <p className="text-gray-600">Your car is protected with comprehensive insurance coverage</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center p-6"
              >
                <div className="text-accent text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Flexible Schedule</h3>
                <p className="text-gray-600">You're in control - share your car whenever it suits you</p>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BecomeHost;
