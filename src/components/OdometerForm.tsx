
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import { odometerFormSchema, type OdometerFormValues } from "@/schemas/odometerFormSchema";

interface OdometerFormProps {
  onSubmit: (values: OdometerFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const MILEAGE_RANGES = [
  "0-10,000",
  "10,001-20,000",
  "20,001-30,000",
  "30,001-40,000",
  "40,001-50,000",
  "50,001-60,000",
  "60,001-70,000",
  "70,001-80,000",
  "80,001-90,000",
  "90,001-100,000",
  "100,001-110,000",
  "110,001-120,000",
  "120,001-130,000",
  "130,000+"
];

export const OdometerForm = ({ onSubmit, isSubmitting }: OdometerFormProps) => {
  const form = useForm<OdometerFormValues>({
    resolver: zodResolver(odometerFormSchema),
    defaultValues: {
      odometer_reading: "",
      transmission_type: undefined,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="odometer_reading"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Mileage Range</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mileage range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MILEAGE_RANGES.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range} miles
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
  );
};
