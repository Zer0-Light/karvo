
import { z } from "zod";

export const odometerFormSchema = z.object({
  odometer_reading: z.string()
    .min(1, "Odometer reading is required")
    .refine(val => !isNaN(Number(val)), "Must be a valid number")
    .refine(val => Number(val) >= 0, "Odometer reading must be positive")
    .refine(val => Number(val) <= 999999, "Odometer reading too high"),
  transmission_type: z.enum(["automatic", "manual"], {
    required_error: "Please select a transmission type",
  }),
});

export type OdometerFormValues = z.infer<typeof odometerFormSchema>;
