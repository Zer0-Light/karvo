
import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";

const carFormSchema = z.object({
  year: z.string().min(4, "Please select a year"),
  make: z.string().min(1, "Please select a make"),
  model: z.string().min(1, "Please select a model"),
});

const MANUFACTURERS = [
  "Acura", "Audi", "BMW", "Chevrolet", "Chrysler", "Dodge", 
  "Ford", "GMC", "Honda", "Hyundai", "Infiniti", "Jeep", 
  "Kia", "Lexus", "Lincoln", "Mazda", "Mercedes-Benz", 
  "Mitsubishi", "Nissan", "Porsche", "Ram", "Subaru", 
  "Tesla", "Toyota", "Volkswagen", "Volvo"
];

// Sample models - in a real app, this would be dynamic based on make
const CAR_MODELS: { [key: string]: string[] } = {
  BMW: ["3 Series", "5 Series", "7 Series", "X3", "X5", "X7"],
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Land Cruiser", "Prius"],
  "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "S-Class", "GLE", "GLS"],
  // Add more makes and their models
};

const ListYourCarDetails = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

  const form = useForm<z.infer<typeof carFormSchema>>({
    resolver: zodResolver(carFormSchema),
    defaultValues: {
      year: "",
      make: "",
      model: "",
    },
  });

  // Update available models when make changes
  const watchMake = form.watch("make");
  useEffect(() => {
    if (watchMake && CAR_MODELS[watchMake]) {
      setAvailableModels(CAR_MODELS[watchMake]);
      form.setValue("model", ""); // Reset model when make changes
    }
  }, [watchMake, form]);

  const onSubmit = async (values: z.infer<typeof carFormSchema>) => {
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('cars')
      .update({
        year: parseInt(values.year),
        make: values.make,
        model: values.model,
      })
      .eq('id', carId);

    setIsSubmitting(false);

    if (error) {
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
    
    // Navigate to the next step
    navigate(`/list-your-car/location/${carId}`);
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
                <span>Step 2 of 10</span>
                <span>Car Details</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>

            <h1 className="text-3xl font-bold text-center mb-8">
              Car Details
            </h1>
            <div className="text-center text-lg text-muted-foreground mb-12">
              Please select your car's year, make, and model.
            </div>

            <div className="max-w-xl mx-auto">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="make"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Make</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select make" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {MANUFACTURERS.map((make) => (
                              <SelectItem key={make} value={make}>
                                {make}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Model</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          disabled={!watchMake}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {availableModels.map((model) => (
                              <SelectItem key={model} value={model}>
                                {model}
                              </SelectItem>
                            ))}
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
      </div>
    </AuthGuard>
  );
};

export default ListYourCarDetails;
