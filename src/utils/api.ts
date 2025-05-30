
const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request function
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// User API functions
export const userApi = {
  createUser: (userData: { email: string; passwordHash: string; name: string; age?: number; height?: number; weight?: number; fitnessGoal?: string; unitsPreference?: 'metric' | 'imperial' }) =>
    apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  
  getAllUsers: () =>
    apiRequest('/users'),
};

// Exercise API functions
export const exerciseApi = {
  createExercise: (exerciseData: { name: string; category: string; type: 'strength' | 'cardio' | 'flexibility'; videoUrl?: string }) =>
    apiRequest('/exercises', {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    }),
  
  getUserExercises: (userId: string) =>
    apiRequest(`/exercises/user/${userId}`),
  
  updateExercise: (id: string, exerciseData: Partial<{ name: string; category: string; type: string; videoUrl?: string }>) =>
    apiRequest(`/exercises/${id}`, {
      method: 'PUT',
      body: JSON.stringify(exerciseData),
    }),
  
  deleteExercise: (id: string) =>
    apiRequest(`/exercises/${id}`, {
      method: 'DELETE',
    }),
};

// Workout API functions
export const workoutApi = {
  createWorkout: (workoutData: { userId: string; date: string; duration?: number; caloriesBurned?: number; notes?: string; entries: Array<{ exerciseId: string; sets: number; reps: number; weight: number; notes?: string }> }) =>
    apiRequest('/workouts', {
      method: 'POST',
      body: JSON.stringify(workoutData),
    }),
  
  getUserWorkouts: (userId: string) =>
    apiRequest(`/workouts/user/${userId}`),
  
  updateWorkout: (id: string, workoutData: Partial<{ date: string; duration?: number; caloriesBurned?: number; notes?: string }>) =>
    apiRequest(`/workouts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(workoutData),
    }),
  
  deleteWorkout: (id: string) =>
    apiRequest(`/workouts/${id}`, {
      method: 'DELETE',
    }),
};

// Measurement API functions
export const measurementApi = {
  createMeasurement: (measurementData: { userId: string; date: string; weight?: number; bodyFat?: number; waist?: number; chest?: number; arm?: number }) =>
    apiRequest('/measurements', {
      method: 'POST',
      body: JSON.stringify(measurementData),
    }),
  
  getUserMeasurements: (userId: string) =>
    apiRequest(`/measurements/user/${userId}`),
  
  updateMeasurement: (id: string, measurementData: Partial<{ date: string; weight?: number; bodyFat?: number; waist?: number; chest?: number; arm?: number }>) =>
    apiRequest(`/measurements/${id}`, {
      method: 'PUT',
      body: JSON.stringify(measurementData),
    }),
  
  deleteMeasurement: (id: string) =>
    apiRequest(`/measurements/${id}`, {
      method: 'DELETE',
    }),
};

// Nutrition API functions
export const nutritionApi = {
  createNutrition: (nutritionData: { userId: string; date: string; mealType: string; foodItems: any; calories: number; protein: number; carbs: number; fats: number; sugar?: number; vitamins?: any }) =>
    apiRequest('/nutrition', {
      method: 'POST',
      body: JSON.stringify(nutritionData),
    }),
  
  getUserNutrition: (userId: string) =>
    apiRequest(`/nutrition/user/${userId}`),
  
  updateNutrition: (id: string, nutritionData: Partial<{ date: string; mealType: string; foodItems: any; calories: number; protein: number; carbs: number; fats: number; sugar?: number; vitamins?: any }>) =>
    apiRequest(`/nutrition/${id}`, {
      method: 'PUT',
      body: JSON.stringify(nutritionData),
    }),
  
  deleteNutrition: (id: string) =>
    apiRequest(`/nutrition/${id}`, {
      method: 'DELETE',
    }),
};
