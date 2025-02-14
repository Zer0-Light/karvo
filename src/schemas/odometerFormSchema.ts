
import { z } from "zod";

export const odometerFormSchema = z.object({
  odometer_reading: z.string({
    required_error: "Please select a mileage range",
  }),
  transmission_type: z.enum(["automatic", "manual"], {
    required_error: "Please select a transmission type",
  }),
});

export type OdometerFormValues = z.infer<typeof odometerFormSchema>;
