import { z } from 'zod';

const CategorySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
});

export function createCategory(category) {
  return CategorySchema.parse(category);
}

export function isValidCategory(category) {
  return CategorySchema.safeParse(category).success;
}