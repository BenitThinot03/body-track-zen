import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Clock, Flame, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useWorkouts, useCreateWorkout, useExercises } from "../hooks/useApiData";
import { useToast } from "@/hooks/use-toast";

const MOCK_USER_ID = 'user-123';

const Workouts = () => {
  const { data: workouts = [], isLoading: workoutsLoading, error: workoutsError } = useWorkouts();
  const { data: exercises = [], isLoading: exercisesLoading } = useExercises();
  const createWorkoutMutation = useCreateWorkout();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    duration: "",
    caloriesBurned: "",
    notes: "",
    selectedExercises: [] as Array<{ exerciseId: string; sets: number; reps: number; weight: number; notes: string }>
  });

  const filteredWorkouts = workouts.filter((workout: any) =>
    workout.notes?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    workout.entries?.some((entry: any) => entry.exercise?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateWorkout = async () => {
    try {
      const workoutData = {
        userId: MOCK_USER_ID,
        date: new Date().toISOString(),
        duration: newWorkout.duration ? parseInt(newWorkout.duration) : undefined,
        caloriesBurned: newWorkout.caloriesBurned ? parseInt(newWorkout.caloriesBurned) : undefined,
        notes: newWorkout.notes,
        entries: newWorkout.selectedExercises.map(ex => ({
          exerciseId: ex.exerciseId,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
          notes: ex.notes
        }))
      };

      await createWorkoutMutation.mutateAsync(workoutData);
      setNewWorkout({ name: "", duration: "", caloriesBurned: "", notes: "", selectedExercises: [] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Success",
        description: "Workout created successfully!",
      });
    } catch (error) {
      console.error('Error creating workout:', error);
      toast({
        title: "Error",
        description: "Failed to create workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const addExerciseToWorkout = () => {
    setNewWorkout(prev => ({
      ...prev,
      selectedExercises: [...prev.selectedExercises, { exerciseId: "", sets: 1, reps: 1, weight: 0, notes: "" }]
    }));
  };

  const updateExerciseInWorkout = (index: number, field: string, value: any) => {
    setNewWorkout(prev => ({
      ...prev,
      selectedExercises: prev.selectedExercises.map((ex, i) => 
        i === index ? { ...ex, [field]: value } : ex
      )
    }));
  };

  const removeExerciseFromWorkout = (index: number) => {
    setNewWorkout(prev => ({
      ...prev,
      selectedExercises: prev.selectedExercises.filter((_, i) => i !== index)
    }));
  };

  if (workoutsLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading workouts...</span>
      </div>
    );
  }

  if (workoutsError) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          <p>Error loading workouts. Please make sure your backend is running on http://localhost:5000</p>
          <p className="text-sm mt-2">{(workoutsError as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Workouts</h1>
          <p className="text-slate-600">Track and manage your workout sessions</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              New Workout
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Workout</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newWorkout.duration}
                    onChange={(e) => setNewWorkout({...newWorkout, duration: e.target.value})}
                    placeholder="45"
                  />
                </div>
                <div>
                  <Label htmlFor="calories">Calories Burned</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={newWorkout.caloriesBurned}
                    onChange={(e) => setNewWorkout({...newWorkout, caloriesBurned: e.target.value})}
                    placeholder="320"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newWorkout.notes}
                  onChange={(e) => setNewWorkout({...newWorkout, notes: e.target.value})}
                  placeholder="How did the workout feel?"
                />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-3">
                  <Label>Exercises</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addExerciseToWorkout}>
                    <Plus className="w-4 h-4 mr-1" />
                    Add Exercise
                  </Button>
                </div>
                
                {newWorkout.selectedExercises.map((exercise, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-3 mb-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Exercise {index + 1}</Label>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeExerciseFromWorkout(index)}
                      >
                        Remove
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <Label>Exercise</Label>
                        <Select 
                          value={exercise.exerciseId} 
                          onValueChange={(value) => updateExerciseInWorkout(index, 'exerciseId', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select exercise" />
                          </SelectTrigger>
                          <SelectContent>
                            {exercises.map((ex: any) => (
                              <SelectItem key={ex.id} value={ex.id}>
                                {ex.name} ({ex.category})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Sets</Label>
                        <Input
                          type="number"
                          value={exercise.sets}
                          onChange={(e) => updateExerciseInWorkout(index, 'sets', parseInt(e.target.value) || 1)}
                          min="1"
                        />
                      </div>
                      
                      <div>
                        <Label>Reps</Label>
                        <Input
                          type="number"
                          value={exercise.reps}
                          onChange={(e) => updateExerciseInWorkout(index, 'reps', parseInt(e.target.value) || 1)}
                          min="1"
                        />
                      </div>
                      
                      <div>
                        <Label>Weight (kg)</Label>
                        <Input
                          type="number"
                          value={exercise.weight}
                          onChange={(e) => updateExerciseInWorkout(index, 'weight', parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.5"
                        />
                      </div>
                      
                      <div>
                        <Label>Notes</Label>
                        <Input
                          value={exercise.notes}
                          onChange={(e) => updateExerciseInWorkout(index, 'notes', e.target.value)}
                          placeholder="Optional notes"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleCreateWorkout} 
                className="w-full"
                disabled={createWorkoutMutation.isPending || newWorkout.selectedExercises.length === 0}
              >
                {createWorkoutMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Workout'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search workouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Workout Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Workouts</p>
                <p className="text-2xl font-bold text-slate-800">{workouts.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Time</p>
                <p className="text-2xl font-bold text-slate-800">
                  {workouts.reduce((sum: number, w: any) => sum + (w.duration || 0), 0)}m
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Calories Burned</p>
                <p className="text-2xl font-bold text-slate-800">
                  {workouts.reduce((sum: number, w: any) => sum + (w.caloriesBurned || 0), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workouts List */}
      <div className="space-y-4">
        {filteredWorkouts.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-slate-600">No workouts found. Create your first workout!</p>
            </CardContent>
          </Card>
        ) : (
          filteredWorkouts.map((workout: any) => (
            <Card key={workout.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-1">
                      Workout Session
                    </h3>
                    <p className="text-slate-500">{new Date(workout.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">{workout.duration || 0} min</p>
                    <p className="text-sm text-slate-600">{workout.caloriesBurned || 0} cal</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {workout.entries?.map((entry: any, index: number) => (
                    <Badge key={index} variant="secondary">
                      {entry.exercise?.name || 'Unknown Exercise'} - {entry.sets}x{entry.reps} @ {entry.weight}kg
                    </Badge>
                  ))}
                </div>
                
                {workout.notes && (
                  <p className="text-slate-600 text-sm italic">"{workout.notes}"</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Workouts;
