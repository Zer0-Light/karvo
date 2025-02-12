
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const GCC_COUNTRIES = ["UAE", "United Arab Emirates", "Oman", "Kuwait", "Bahrain", "Qatar"];

const locationFormSchema = z.object({
  street_address: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required")
    .refine(value => GCC_COUNTRIES.some(country => 
      country.toLowerCase() === value.toLowerCase()
    ), {
      message: "Sorry, we currently only operate in UAE, Oman, Kuwait, Bahrain, and Qatar."
    }),
});

const ListYourCar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof locationFormSchema>>({
    resolver: zodResolver(locationFormSchema),
    defaultValues: {
      street_address: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof locationFormSchema>) => {
    setIsSubmitting(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to list a car",
      });
      return;
    }

    // Create a new car entry with location information
    const { data: carData, error } = await supabase.from('cars').insert({
      host_id: session.user.id,
      location: `${values.city}, ${values.state}`,
      street_address: values.street_address,
      city: values.city,
      state: values.state,
      postal_code: values.postal_code,
      country: values.country,
      status: 'unlisted',
      make: '', // Required fields with placeholder values
      model: '',
      price_per_day: 0,
      year: new Date().getFullYear() // Current year as placeholder
    }).select();

    setIsSubmitting(false);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save location information. Please try again.",
      });
      return;
    }

    toast({
      title: "Location saved",
      description: "Let's continue with listing your car.",
    });
    
    // Navigate to the VIN segment with the car ID
    navigate(`/list-your-car/vin/${carData[0].id}`);
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
                <span>Step 1 of 11</span>
                <span>Location Details</span>
              </div>
              <Progress value={9.09} className="h-2" /> {/* 100/11 ≈ 9.09% */}
            </div>

            <h1 className="text-3xl font-bold text-center mb-8">
              List Your Car
            </h1>
            <div className="text-center text-lg text-muted-foreground mb-12">
              Before we begin, we need to know where your car is located. This helps us ensure we can operate in your area.
            </div>

            <div className="max-w-xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="street_address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Main St" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Dubai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State/Emirate</FormLabel>
                        <FormControl>
                          <Input placeholder="Dubai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="postal_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="UAE" {...field} />
                        </FormControl>
                        <FormMessage className="text-destructive" />
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

export default ListYourCar;
