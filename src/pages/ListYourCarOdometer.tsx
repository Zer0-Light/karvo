
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { z } from "zod";
import { odometerFormSchema } from "@/schemas/odometerFormSchema";
import { supabase } from "@/integrations/supabase/client";
import { ListingProgress } from "@/components/ListingProgress";
import { OdometerForm } from "@/components/OdometerForm";
import Footer from "@/components/Footer";

const ListYourCarOdometer = () => {
  const navigate = useNavigate();
  const { carId } = useParams<{ carId: string }>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: z.infer<typeof odometerFormSchema>) => {
    if (!carId) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No car ID provided",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('cars')
        .update({
          odometer_reading: parseInt(values.odometer_reading),
          transmission_type: values.transmission_type,
        })
        .eq('id', carId);

      setIsSubmitting(false);

      if (error) {
        console.error('Error saving car details:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to save car details. Please try again.",
        });
        return;
      }

      toast({
        title: "Car details saved",
        description: "Let's continue with listing your car.",
      });
      
      // Navigate to the next step (photos)
      navigate(`/list-your-car/photos/${carId}`);
    } catch (error) {
      console.error('Error in submission:', error);
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
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
          <Button 
            variant="ghost"
            onClick={() => navigate("/")}
          >
            Exit
          </Button>
        </nav>

        <main className="container max-w-4xl mx-auto py-8 px-4 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ListingProgress 
              step={3} 
              totalSteps={11} 
              label="Vehicle Details" 
            />

            <h1 className="text-3xl font-bold text-center mb-8">
              Vehicle Details
            </h1>
            <div className="text-center text-lg text-muted-foreground mb-12">
              Please provide your car's current odometer reading and transmission type.
            </div>

            <div className="max-w-xl mx-auto">
              <OdometerForm 
                onSubmit={onSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default ListYourCarOdometer;
