
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
import { Input } from "@/components/ui/input";
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
  );
};
