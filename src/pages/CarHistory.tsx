
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { ListingProgress } from "@/components/ListingProgress";
import Footer from "@/components/Footer";

const CarHistory = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taxesPaid, setTaxesPaid] = useState<boolean | null>(null);
  const [noSalvageTitle, setNoSalvageTitle] = useState(false);

  const handleSubmit = async () => {
    if (taxesPaid === null) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please indicate whether you paid applicable sales taxes.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('cars')
        .update({
          taxes_paid: taxesPaid,
          no_salvage_title: noSalvageTitle,
        })
        .eq('id', carId);

      if (error) throw error;

      toast({
        title: "Information saved",
        description: "Let's continue with listing your car.",
      });

      // Navigate to the next step (photos)
      navigate(`/list-your-car/photos/${carId}`);
    } catch (error) {
      console.error('Error saving car history:', error);
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
              step={4} 
              totalSteps={11} 
              label="Car History" 
            />

            <h1 className="text-3xl font-bold text-center mb-8">
              Car History
            </h1>

            <div className="max-w-xl mx-auto space-y-8">
              <div className="space-y-4">
                <p className="text-lg">
                  I certify I paid applicable sales or related taxes on the purchase of this vehicle
                </p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-primary"
                  onClick={() => {
                    toast({
                      title: "Sales Tax Information",
                      description: "This refers to any applicable sales or transfer taxes paid when you purchased the vehicle.",
                    });
                  }}
                >
                  Learn more
                </Button>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="taxes-yes"
                      name="taxes"
                      checked={taxesPaid === true}
                      onChange={() => setTaxesPaid(true)}
                      className="h-4 w-4"
                    />
                    <label htmlFor="taxes-yes">Yes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="taxes-no"
                      name="taxes"
                      checked={taxesPaid === false}
                      onChange={() => setTaxesPaid(false)}
                      className="h-4 w-4"
                    />
                    <label htmlFor="taxes-no">No</label>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="salvage"
                    checked={noSalvageTitle}
                    onCheckedChange={(checked) => setNoSalvageTitle(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor="salvage"
                      className="text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      My car has never had a branded or salvage title
                    </label>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-primary block"
                      onClick={() => {
                        toast({
                          title: "Salvage Title Information",
                          description: "A salvage title is issued when a vehicle has been damaged and deemed a total loss by an insurance company.",
                        });
                      }}
                    >
                      Learn more
                    </Button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || taxesPaid === null}
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

export default CarHistory;
