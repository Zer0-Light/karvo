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
    <div className="min-h-screen overflow-hidden">
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

      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-accent/5 via-white to-accent/10 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center pt-20 relative z-10"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold"
          >
            Join 50,000+ successful hosts
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold text-primary mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary"
          >
            Share your car, earn up to $1,500/month
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Turn your car into a second income. Control your schedule, set your own prices, and earn money sharing your car when you're not using it.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center mb-16"
          >
            <Button 
              onClick={handleGetStarted}
              className="bg-accent hover:bg-accent/90 text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <Laugh className="w-5 h-5 mr-2" />
              Start Earning Today
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { number: "$1,500", text: "Average monthly earnings", icon: DollarSign },
              { number: "50K+", text: "Active hosts on platform", icon: Users },
              { number: "$1M", text: "Insurance protection", icon: Shield },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  {React.createElement(stat.icon, { className: "w-6 h-6 text-accent" })}
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/10"
          />
          <img
            src="/lovable-uploads/09957f3f-713e-4d24-9c6f-b3e8f135dc3e.png"
            alt="Luxury car"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
      </section>

      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5"
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-primary text-center mb-16"
          >
            Maximize Your Car's Potential
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: DollarSign, title: "Steady Income", description: "Earn consistent monthly income by sharing your car. Set competitive prices and earn more during peak seasons." },
              { icon: Shield, title: "Complete Protection", description: "Every trip includes $1M insurance coverage, 24/7 roadside assistance, and comprehensive driver screening." },
              { icon: Heart, title: "Dedicated Support", description: "Our host support team is available 24/7 to help you succeed and maximize your earnings." }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-2xl bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                  {React.createElement(feature.icon, { className: "w-8 h-8 text-accent" })}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BecomeHost;
