
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

const vinFormSchema = z.object({
  vin: z.string()
    .min(17, "VIN must be exactly 17 characters")
    .max(17, "VIN must be exactly 17 characters")
    .regex(/^[A-HJ-NPR-Z0-9]+$/, "Invalid VIN format"),
});

const ListYourCarVin = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof vinFormSchema>>({
    resolver: zodResolver(vinFormSchema),
    defaultValues: {
      vin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof vinFormSchema>) => {
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('cars')
      .update({ vin: values.vin })
      .eq('id', carId);

    setIsSubmitting(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save VIN. Please try again.",
      });
      return;
    }

    toast({
      title: "VIN saved",
      description: "Let's continue with listing your car.",
    });
    
    // Next step will be implemented later
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
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

        <main className="container max-w-4xl mx-auto py-8 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Progress Section */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step 1 of 10</span>
                <span>Vehicle Identification</span>
              </div>
              <Progress value={10} className="h-2" /> {/* 100/10 = 10% */}
            </div>

            <h1 className="text-3xl font-bold text-center mb-8">
              Enter Your Car's VIN
            </h1>
            <div className="text-center text-lg text-muted-foreground mb-12">
              Please enter your vehicle's 17-character Vehicle Identification Number (VIN). 
              You can find this on your registration card or on the driver's side dashboard.
            </div>

            <div className="max-w-xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="vin"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Identification Number (VIN)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="1HGCM82633A123456" 
                            {...field} 
                            className="uppercase"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Continue"}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </main>
      </div>
    </AuthGuard>
  );
};

export default ListYourCarVin;
