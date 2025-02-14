
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const vinFormSchema = z.object({
  vin: z.string()
    .min(17, "VIN must be exactly 17 characters")
    .max(17, "VIN must be exactly 17 characters")
    .regex(/^[A-HJ-NPR-Z0-9]+$/, "Invalid VIN format"),
});

interface VinFormProps {
  carId: string;
}

export const VinForm = ({ carId }: VinFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof vinFormSchema>>({
    resolver: zodResolver(vinFormSchema),
    defaultValues: {
      vin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof vinFormSchema>) => {
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
        .update({ vin: values.vin.toUpperCase() })
        .eq('id', carId);

      setIsSubmitting(false);

      if (error) {
        console.error('Error saving VIN:', error);
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
      
      navigate(`/list-your-car/details/${carId}`);
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
  );
};
