import { z } from 'zod';

export const workoutSchema = z.object({
  type: z.string().min(1, 'Workout type is required'),
  duration: z.number().positive('Duration must be positive'),
  caloriesBurned: z.number().nonnegative('Calories cannot be negative'),
  notes: z.string().optional(),
  date: z.coerce.date(),
});

export const mealSchema = z.object({
  name: z.string().min(1, 'Meal name is required'),
  calories: z.number().nonnegative('Calories cannot be negative'),
  protein: z.number().nonnegative('Protein cannot be negative'),
  carbs: z.number().nonnegative('Carbs cannot be negative'),
  fats: z.number().nonnegative('Fats cannot be negative'),
  mealType: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Snack']),
  date: z.coerce.date(),
});
