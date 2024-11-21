import { z } from 'zod';
// Defining a schema for the form using 'zod'. The schema validates that the 'factors' field
// is an array of strings with at least one element. If the condition is not met, an error message
// will be shown ("Please select at least one factor.")
export const FormSchema = z.object({
  factors: z.array(z.string()).min(1, 'Please select at least one factor.'),
});
export type FormValues = z.infer<typeof FormSchema>;
