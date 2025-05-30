
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Calendar, Loader2 } from "lucide-react";
import { useMeasurements, useWorkouts, useNutrition } from "../hooks/useApiData";

const Progress = () => {
  const { data: measurements = [], isLoading: measurementsLoading, error: measurementsError } = useMeasurements();
  const { data: workouts = [], isLoading: workoutsLoading } = useWorkouts();
  const { data: nutrition = [], isLoading: nutritionLoading } = useNutrition();

  // Process measurements data for weight tracking
  const weightData = measurements
    .filter((m: any) => m.weight)
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-8) // Last 8 measurements
    .map((m: any, index: number) => ({
      week: `Week ${index + 1}`,
      weight: m.weight,
      bodyFat: m.bodyFat || 0,
    }));

  // Process workout data for calories burned
  const caloriesData = workouts
    .slice(-7) // Last 7 workouts
    .map((w: any, index: number) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] || `Day ${index + 1}`,
      calories: w.caloriesBurned || 0,
    }));

  // Calculate protein data
  const todayNutrition = nutrition.filter((n: any) => {
    const today = new Date().toDateString();
    const nutritionDate = new Date(n.date).toDateString();
    return today === nutritionDate;
  });

  const totalProteinToday = todayNutrition.reduce((sum: number, n: any) => sum + (n.protein || 0), 0);
  const proteinGoal = 150;
  const proteinData = [
    { name: "Consumed", value: Math.min(totalProteinToday, proteinGoal), color: "#3b82f6" },
    { name: "Remaining", value: Math.max(proteinGoal - totalProteinToday, 0), color: "#e5e7eb" },
  ];

  // Workout frequency data
  const workoutFrequencyData = [
    { month: "Jan", workouts: 12 },
    { month: "Feb", workouts: 15 },
    { month: "Mar", workouts: 18 },
    { month: "Apr", workouts: 20 },
    { month: "May", workouts: workouts.length },
  ];

  // Calculate progress metrics
  const latestWeight = measurements.length > 0 ? measurements[measurements.length - 1]?.weight : 0;
  const previousWeight = measurements.length > 1 ? measurements[measurements.length - 2]?.weight : latestWeight;
  const weightChange = latestWeight - previousWeight;
  
  const latestBodyFat = measurements.length > 0 ? measurements[measurements.length - 1]?.bodyFat : 0;
  const previousBodyFat = measurements.length > 1 ? measurements[measurements.length - 2]?.bodyFat : latestBodyFat;
  const bodyFatChange = latestBodyFat - previousBodyFat;

  const avgCaloriesPerDay = workouts.length > 0 ? 
    workouts.reduce((sum: number, w: any) => sum + (w.caloriesBurned || 0), 0) / workouts.length : 0;

  if (measurementsLoading || workoutsLoading || nutritionLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Loading progress data...</span>
      </div>
    );
  }

  if (measurementsError) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">
          <p>Error loading progress data. Please make sure your backend is running on http://localhost:5000</p>
          <p className="text-sm mt-2">{(measurementsError as Error).message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Progress</h1>
          <p className="text-slate-600">Track your fitness journey with detailed analytics</p>
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="week">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Weight Change</p>
                <p className="text-2xl font-bold text-slate-800">
                  {weightChange > 0 ? '+' : ''}{weightChange.toFixed(1)} kg
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {weightChange < 0 ? (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${weightChange < 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs((weightChange / (previousWeight || 1)) * 100).toFixed(1)}% change
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Body Fat</p>
                <p className="text-2xl font-bold text-slate-800">{latestBodyFat?.toFixed(1) || 0}%</p>
                <div className="flex items-center gap-1 mt-1">
                  {bodyFatChange <= 0 ? (
                    <TrendingDown className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${bodyFatChange <= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(bodyFatChange).toFixed(1)}% change
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Avg Calories/Day</p>
                <p className="text-2xl font-bold text-slate-800">{avgCaloriesPerDay.toFixed(0)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-500">From {workouts.length} workouts</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Workouts</p>
                <p className="text-2xl font-bold text-slate-800">{workouts.length}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-500">Keep it up!</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weight & Body Fat Tracking */}
        <Card>
          <CardHeader>
            <CardTitle>Weight & Body Fat Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weightData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Weight (kg)"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="bodyFat" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="Body Fat (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Calories Burned */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Calories Burned</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={caloriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Bar dataKey="calories" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Protein Intake */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Protein Goal</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={proteinData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {proteinData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-800">
                {((totalProteinToday / proteinGoal) * 100).toFixed(0)}%
              </span>
              <span className="text-sm text-slate-600">
                {totalProteinToday.toFixed(0)}g / {proteinGoal}g
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Workout Frequency */}
        <Card>
          <CardHeader>
            <CardTitle>Workout Frequency Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={workoutFrequencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Line 
                  type="monotone" 
                  dataKey="workouts" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Workout Consistency</h4>
                <p className="text-sm text-slate-600">Completed {workouts.length} workouts</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Data Tracking</h4>
                <p className="text-sm text-slate-600">{measurements.length} measurements recorded</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Nutrition Tracking</h4>
                <p className="text-sm text-slate-600">{nutrition.length} meals logged</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Progress;
