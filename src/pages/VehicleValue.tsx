
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ListingProgress } from "@/components/ListingProgress";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VehicleValue = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = async () => {
    if (!value || isNaN(Number(value))) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid vehicle value.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('cars')
        .update({ vehicle_value: Number(value) })
        .eq('id', carId);

      if (error) throw error;

      toast({
        title: "Information saved",
        description: "Let's continue with listing your car.",
      });

      navigate(`/list-your-car/photos/${carId}`);
    } catch (error) {
      console.error('Error saving vehicle value:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save information. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background flex flex-col">
        <nav className="w-full px-4 py-6 flex justify-between items-center border-b">
          <h1 
            onClick={() => navigate("/")} 
            className="text-2xl font-bold text-primary cursor-pointer"
          >
            KARVO
          </h1>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
            >
              Start over
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/")}
            >
              Exit
            </Button>
          </div>
        </nav>

        <main className="container max-w-4xl mx-auto py-8 px-4 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ListingProgress 
              step={5} 
              totalSteps={11} 
              label="Vehicle Value" 
            />

            <h1 className="text-3xl font-bold text-center mb-8">
              Vehicle Value
            </h1>

            <div className="max-w-xl mx-auto space-y-8">
              <div className="space-y-4">
                <Label htmlFor="value">What is your vehicle's estimated value?</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    id="value"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Enter vehicle value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Please provide the estimated current market value of your vehicle. This helps us determine appropriate insurance coverage.
                </p>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || !value}
                className="w-full"
              >
                Next
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default VehicleValue;
