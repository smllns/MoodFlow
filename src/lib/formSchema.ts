import { z } from 'zod';

export const FormSchema = z.object({
  factors: z.array(z.string()).min(1, 'Please select at least one factor.'),
});

export type FormValues = z.infer<typeof FormSchema>;
