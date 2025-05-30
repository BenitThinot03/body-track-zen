
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workoutApi, exerciseApi, nutritionApi, measurementApi } from '../utils/api';
import { WorkoutSession, Exercise, NutritionEntry, Measurement } from '../types';

// Mock user ID for now - in a real app this would come from authentication
const MOCK_USER_ID = 'user-123';

// Workout hooks
export const useWorkouts = () => {
  return useQuery({
    queryKey: ['workouts', MOCK_USER_ID],
    queryFn: () => workoutApi.getUserWorkouts(MOCK_USER_ID),
  });
};

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: workoutApi.createWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts', MOCK_USER_ID] });
    },
  });
};

export const useUpdateWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => workoutApi.updateWorkout(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts', MOCK_USER_ID] });
    },
  });
};

export const useDeleteWorkout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: workoutApi.deleteWorkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workouts', MOCK_USER_ID] });
    },
  });
};

// Exercise hooks
export const useExercises = () => {
  return useQuery({
    queryKey: ['exercises', MOCK_USER_ID],
    queryFn: () => exerciseApi.getUserExercises(MOCK_USER_ID),
  });
};

export const useCreateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: exerciseApi.createExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises', MOCK_USER_ID] });
    },
  });
};

export const useUpdateExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => exerciseApi.updateExercise(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises', MOCK_USER_ID] });
    },
  });
};

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: exerciseApi.deleteExercise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises', MOCK_USER_ID] });
    },
  });
};

// Nutrition hooks
export const useNutrition = () => {
  return useQuery({
    queryKey: ['nutrition', MOCK_USER_ID],
    queryFn: () => nutritionApi.getUserNutrition(MOCK_USER_ID),
  });
};

export const useCreateNutrition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: nutritionApi.createNutrition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutrition', MOCK_USER_ID] });
    },
  });
};

export const useUpdateNutrition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => nutritionApi.updateNutrition(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutrition', MOCK_USER_ID] });
    },
  });
};

export const useDeleteNutrition = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: nutritionApi.deleteNutrition,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nutrition', MOCK_USER_ID] });
    },
  });
};

// Measurement hooks
export const useMeasurements = () => {
  return useQuery({
    queryKey: ['measurements', MOCK_USER_ID],
    queryFn: () => measurementApi.getUserMeasurements(MOCK_USER_ID),
  });
};

export const useCreateMeasurement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: measurementApi.createMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['measurements', MOCK_USER_ID] });
    },
  });
};

export const useUpdateMeasurement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => measurementApi.updateMeasurement(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['measurements', MOCK_USER_ID] });
    },
  });
};

export const useDeleteMeasurement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: measurementApi.deleteMeasurement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['measurements', MOCK_USER_ID] });
    },
  });
};
