
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const CarHistory = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [taxesPaid, setTaxesPaid] = useState<boolean | null>(null);
  const [noSalvageTitle, setNoSalvageTitle] = useState(false);
  const [isTaxDialogOpen, setIsTaxDialogOpen] = useState(false);
  const [isSalvageDialogOpen, setIsSalvageDialogOpen] = useState(false);

  const handleSubmit = async () => {
    if (taxesPaid === null) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please indicate whether you paid applicable sales taxes.",
      });
      return;
    }

    if (!noSalvageTitle) {
      toast({
        variant: "destructive",
        title: "Vehicle Not Eligible",
        description: "We cannot accept vehicles with branded or salvage titles on Karvo.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const updateData = {
        taxes_paid: taxesPaid,
        no_salvage_title: noSalvageTitle,
      } as const;

      const { error } = await supabase
        .from('cars')
        .update(updateData)
        .eq('id', carId);

      if (error) throw error;

      toast({
        title: "Information saved",
        description: "Let's continue with listing your car.",
      });

      navigate(`/vehicle-value/${carId}`);
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
                  onClick={() => setIsTaxDialogOpen(true)}
                >
                  Learn more
                </Button>

                <Dialog open={isTaxDialogOpen} onOpenChange={setIsTaxDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Vehicle Sales Tax Information</DialogTitle>
                      <DialogDescription className="pt-2">
                        Taxes apply to most vehicle purchases in the United States, but some hosts may qualify for an exemption. If your vehicle purchase was tax-exempt, let us know so we can apply the correct tax rate when you list it on Karvo.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>

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
                      onClick={() => setIsSalvageDialogOpen(true)}
                    >
                      Learn more
                    </Button>
                  </div>
                </div>

                <Dialog open={isSalvageDialogOpen} onOpenChange={setIsSalvageDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Salvage Title Information</DialogTitle>
                      <DialogDescription className="pt-2">
                        A branded or salvage title means a vehicle has had major damage or may be unsafe to drive. For safety reasons, cars with these titles are not allowed on Karvo.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || taxesPaid === null || !noSalvageTitle}
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
