
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Car, AlertCircle, CreditCard, Camera, Wallet, Shield, Clock, Star, DollarSign, Users, CarTaxiFront, Heart, Laugh } from "lucide-react";
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
          className="max-w-4xl mx-auto text-center pt-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Share your car, earn up to $1,500/month
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Turn your car into a second income. Control your schedule, set your own prices, and earn money sharing your car when you're not using it.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={handleGetStarted}
              className="bg-accent hover:bg-accent/90 text-lg px-8 py-6"
            >
              Start Earning Today
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">$1,500</h3>
              <p className="text-gray-600">Average monthly earnings for cars shared 15+ days</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">50K+</h3>
              <p className="text-gray-600">Active hosts on our platform</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary mb-2">$1M</h3>
              <p className="text-gray-600">Insurance protection included</p>
            </div>
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

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">
            Maximize Your Car's Potential
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Steady Income</h3>
              <p className="text-gray-600">Earn consistent monthly income by sharing your car. Set competitive prices and earn more during peak seasons.</p>
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
              <p className="text-gray-600">Every trip includes $1M insurance coverage, 24/7 roadside assistance, and comprehensive driver screening.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dedicated Support</h3>
              <p className="text-gray-600">Our host support team is available 24/7 to help you succeed and maximize your earnings.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">
            How Much Can You Earn?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-4">Economy Cars</h3>
              <p className="text-4xl font-bold text-accent mb-2">$500-700</p>
              <p className="text-gray-600 mb-4">Monthly average</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Honda Civic</li>
                <li>• Toyota Corolla</li>
                <li>• Hyundai Elantra</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-4">SUVs & Luxury</h3>
              <p className="text-4xl font-bold text-accent mb-2">$800-1,200</p>
              <p className="text-gray-600 mb-4">Monthly average</p>
              <ul className="text-gray-600 space-y-2">
                <li>• BMW 3 Series</li>
                <li>• Tesla Model 3</li>
                <li>• Toyota RAV4</li>
              </ul>
            </Card>
            <Card className="p-6">
              <h3 className="text-2xl font-bold text-primary mb-4">Premium</h3>
              <p className="text-4xl font-bold text-accent mb-2">$1,300+</p>
              <p className="text-gray-600 mb-4">Monthly average</p>
              <ul className="text-gray-600 space-y-2">
                <li>• Porsche Cayenne</li>
                <li>• Range Rover</li>
                <li>• Mercedes G-Class</li>
              </ul>
            </Card>
          </div>
          <p className="text-center text-gray-600">*Earnings vary based on your car's make, model, location, and availability</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">
            Getting Started Is Easy
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-4">1</div>
              <h3 className="text-lg font-semibold mb-2">List Your Car</h3>
              <p className="text-gray-600">Create your listing in under 10 minutes</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-4">2</div>
              <h3 className="text-lg font-semibold mb-2">Set Your Terms</h3>
              <p className="text-gray-600">Choose your availability and requirements</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-4">3</div>
              <h3 className="text-lg font-semibold mb-2">Welcome Guests</h3>
              <p className="text-gray-600">Connect with verified guests</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-4">4</div>
              <h3 className="text-lg font-semibold mb-2">Get Paid</h3>
              <p className="text-gray-600">Earn money directly to your bank account</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Ready to Start Earning?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful hosts who are earning extra income by sharing their cars on KARVO.
          </p>
          <Button 
            onClick={handleGetStarted}
            className="bg-accent hover:bg-accent/90 text-lg px-8 py-6"
          >
            List Your Car Now
          </Button>
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
                  • 15 years old or newer
                  • Fewer than 150,000 miles
                  • Clean title (no salvage)
                  • Must pass safety inspection
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Required Documents</h3>
                <p className="text-sm text-muted-foreground">
                  • Valid driver's license
                  • Proof of insurance
                  • Vehicle registration
                  • Bank account for payments
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
                  • Clear exterior photos
                  • Interior photos
                  • Current mileage
                  • Any existing damage
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
    </div>
  );
};

export default BecomeHost;
