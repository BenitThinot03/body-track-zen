
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Filter, Clock, Flame } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([
    {
      id: 1,
      name: "Upper Body Strength",
      date: "2024-05-27",
      duration: 45,
      caloriesBurned: 320,
      exercises: ["Push-ups", "Pull-ups", "Bench Press"],
      notes: "Great session, feeling strong"
    },
    {
      id: 2,
      name: "Cardio HIIT",
      date: "2024-05-26",
      duration: 30,
      caloriesBurned: 280,
      exercises: ["Burpees", "Mountain Climbers", "Jump Squats"],
      notes: "High intensity, good sweat"
    },
    {
      id: 3,
      name: "Leg Day",
      date: "2024-05-25",
      duration: 60,
      caloriesBurned: 410,
      exercises: ["Squats", "Deadlifts", "Lunges"],
      notes: "Legs are burning!"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newWorkout, setNewWorkout] = useState({
    name: "",
    duration: "",
    caloriesBurned: "",
    notes: ""
  });

  const filteredWorkouts = workouts.filter(workout =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateWorkout = () => {
    const workout = {
      id: Date.now(),
      name: newWorkout.name,
      date: new Date().toISOString().split('T')[0],
      duration: parseInt(newWorkout.duration),
      caloriesBurned: parseInt(newWorkout.caloriesBurned),
      exercises: [],
      notes: newWorkout.notes
    };
    setWorkouts([workout, ...workouts]);
    setNewWorkout({ name: "", duration: "", caloriesBurned: "", notes: "" });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Workouts</h1>
          <p className="text-slate-600">Track and manage your workout sessions</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              New Workout
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Workout</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Workout Name</Label>
                <Input
                  id="name"
                  value={newWorkout.name}
                  onChange={(e) => setNewWorkout({...newWorkout, name: e.target.value})}
                  placeholder="e.g., Upper Body Strength"
                />
              </div>
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
              <Button onClick={handleCreateWorkout} className="w-full">
                Create Workout
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
                  {workouts.reduce((sum, w) => sum + w.duration, 0)}m
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
                  {workouts.reduce((sum, w) => sum + w.caloriesBurned, 0)}
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
        {filteredWorkouts.map((workout) => (
          <Card key={workout.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-1">{workout.name}</h3>
                  <p className="text-slate-500">{new Date(workout.date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">{workout.duration} min</p>
                  <p className="text-sm text-slate-600">{workout.caloriesBurned} cal</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {workout.exercises.map((exercise, index) => (
                  <Badge key={index} variant="secondary">{exercise}</Badge>
                ))}
              </div>
              
              {workout.notes && (
                <p className="text-slate-600 text-sm italic">"{workout.notes}"</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Workouts;
