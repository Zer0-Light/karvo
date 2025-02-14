
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ListingProgress } from "@/components/ListingProgress";
import { ListingNavBar } from "@/components/ListingNavBar";
import { VinForm } from "@/components/VinForm";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

const ListYourCarVin = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { toast } = useToast();

  useEffect(() => {
    const verifyCar = async () => {
      if (!carId) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No car ID provided",
        });
        navigate("/list-your-car");
        return;
      }

      try {
        const { data, error } = await supabase
          .from('cars')
          .select('id')
          .eq('id', carId)
          .maybeSingle();

        if (error) {
          console.error('Error verifying car:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to verify car ID",
          });
          navigate("/list-your-car");
          return;
        }

        if (!data) {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Invalid car ID",
          });
          navigate("/list-your-car");
          return;
        }
      } catch (error) {
        console.error('Error in car verification:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while verifying the car",
        });
        navigate("/list-your-car");
      }
    };

    verifyCar();
  }, [carId, navigate, toast]);

  if (!carId) return null;

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background flex flex-col">
        <ListingNavBar />
        
        <main className="container max-w-4xl mx-auto py-8 px-4 flex-1">
          <ListingProgress 
            step={2} 
            totalSteps={11} 
            label="Vehicle Identification" 
          />

          <h1 className="text-3xl font-bold text-center mb-8">
            Enter Your Car's VIN
          </h1>

          <VinForm carId={carId} />
        </main>

        <Footer />
      </div>
    </AuthGuard>
  );
};

export default ListYourCarVin;
