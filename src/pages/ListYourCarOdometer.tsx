
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AuthGuard from "@/components/AuthGuard";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { odometerFormSchema } from "@/schemas/odometerFormSchema";
import Footer from "@/components/Footer";

const ListYourCarOdometer = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof odometerFormSchema>>({
    resolver: zodResolver(odometerFormSchema),
    defaultValues: {
      odometer_reading: "",
      transmission_type: undefined,
    },
  });

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
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Step 3 of 11</span>
                <span>Vehicle Details</span>
              </div>
              <Progress value={27.27} className="h-2" />
            </div>

            <h1 className="text-3xl font-bold text-center mb-8">
              Vehicle Details
            </h1>
            <div className="text-center text-lg text-muted-foreground mb-12">
              Please provide your car's current odometer reading and transmission type.
            </div>

            <div className="max-w-xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="odometer_reading"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Odometer Reading (km)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="Enter current mileage"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="transmission_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmission Type</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select transmission type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="automatic">Automatic</SelectItem>
                            <SelectItem value="manual">Manual</SelectItem>
                          </SelectContent>
                        </Select>
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
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default ListYourCarOdometer;
