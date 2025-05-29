
const API_BASE_URL = 'http://localhost:5000/api';

// Users API
export const usersApi = {
  createUser: async (userData: any) => {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return response.json();
  },
  
  getUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users`);
    return response.json();
  },
};

// Exercises API
export const exercisesApi = {
  createExercise: async (exerciseData: any) => {
    const response = await fetch(`${API_BASE_URL}/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exerciseData),
    });
    return response.json();
  },
  
  getUserExercises: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/exercises/user/${userId}`);
    return response.json();
  },
  
  updateExercise: async (id: string, exerciseData: any) => {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(exerciseData),
    });
    return response.json();
  },
  
  deleteExercise: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// Workouts API
export const workoutsApi = {
  createWorkout: async (workoutData: any) => {
    const response = await fetch(`${API_BASE_URL}/workouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutData),
    });
    return response.json();
  },
  
  getUserWorkouts: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/workouts/user/${userId}`);
    return response.json();
  },
  
  updateWorkout: async (id: string, workoutData: any) => {
    const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutData),
    });
    return response.json();
  },
  
  deleteWorkout: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/workouts/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// Measurements API
export const measurementsApi = {
  createMeasurement: async (measurementData: any) => {
    const response = await fetch(`${API_BASE_URL}/measurements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(measurementData),
    });
    return response.json();
  },
  
  getUserMeasurements: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/measurements/user/${userId}`);
    return response.json();
  },
  
  updateMeasurement: async (id: string, measurementData: any) => {
    const response = await fetch(`${API_BASE_URL}/measurements/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(measurementData),
    });
    return response.json();
  },
  
  deleteMeasurement: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/measurements/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// Nutrition API
export const nutritionApi = {
  createMeal: async (mealData: any) => {
    const response = await fetch(`${API_BASE_URL}/nutrition`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mealData),
    });
    return response.json();
  },
  
  getUserMeals: async (userId: string) => {
    const response = await fetch(`${API_BASE_URL}/nutrition/user/${userId}`);
    return response.json();
  },
  
  updateMeal: async (id: string, mealData: any) => {
    const response = await fetch(`${API_BASE_URL}/nutrition/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mealData),
    });
    return response.json();
  },
  
  deleteMeal: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/nutrition/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

// OpenAI API for nutrition advice
export const openaiApi = {
  getChatResponse: async (messages: any[]) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // Replace with actual API key
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: messages,
        max_tokens: 500,
      }),
    });
    return response.json();
  },
};
