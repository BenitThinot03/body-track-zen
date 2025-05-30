
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  age?: number;
  height?: number;
  weight?: number;
  fitnessGoal?: string;
  unitsPreference?: 'metric' | 'imperial';
  createdAt: string;
  workoutSessions?: WorkoutSession[];
  nutritionEntries?: NutritionEntry[];
  measurements?: Measurement[];
  aiMessages?: AIMessageLog[];
}

export interface WorkoutSession {
  id: string;
  userId: string;
  date: string;
  duration?: number;
  caloriesBurned?: number;
  notes?: string;
  entries: WorkoutEntry[];
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  type: 'strength' | 'cardio' | 'flexibility';
  videoUrl?: string;
  entries?: WorkoutEntry[];
}

export interface WorkoutEntry {
  id: string;
  workoutSessionId: string;
  exerciseId: string;
  exercise?: Exercise;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
}

export interface NutritionEntry {
  id: string;
  userId: string;
  date: string;
  mealType: string;
  foodItems: any;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  sugar?: number;
  vitamins?: any;
}

export interface Measurement {
  id: string;
  userId: string;
  date: string;
  weight?: number;
  bodyFat?: number;
  waist?: number;
  chest?: number;
  arm?: number;
}

export interface AIMessageLog {
  id: string;
  userId: string;
  timestamp: string;
  messageType: 'user' | 'assistant';
  content: string;
}
