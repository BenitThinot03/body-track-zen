
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Dumbbell, Trophy, Clock } from "lucide-react";

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const statsCards = [
    {
      title: "Weekly workouts",
      value: "5",
      change: "↑ 30%",
      changeColor: "text-green-500",
      icon: Activity,
      iconColor: "text-blue-500",
    },
    {
      title: "Total exercises",
      value: "42",
      change: "",
      changeColor: "",
      icon: Dumbbell,
      iconColor: "text-blue-500",
    },
    {
      title: "Active streak",
      value: "7 days",
      change: "",
      changeColor: "",
      icon: Trophy,
      iconColor: "text-blue-500",
    },
    {
      title: "Workout time",
      value: "4h 35m",
      change: "↑ 15%",
      changeColor: "text-green-500",
      icon: Clock,
      iconColor: "text-blue-500",
    },
  ];

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
        <p className="text-blue-100">Your fitness dashboard for {currentDate}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-600">{stat.title}</span>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</div>
              {stat.change && (
                <span className={`text-sm ${stat.changeColor}`}>{stat.change}</span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Weekly activity
            </CardTitle>
            <p className="text-sm text-slate-500">May 20 - May 27</p>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end h-32 mb-4">
              {weekDays.map((day, index) => (
                <div key={day} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-8 bg-blue-500 rounded-t"
                    style={{ height: `${Math.random() * 80 + 20}px` }}
                  ></div>
                  <span className="text-xs text-slate-500">{day}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a href="#" className="text-blue-500 text-sm hover:underline">
                View detailed progress →
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-blue-500" />
              Weekly goal
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeDasharray="70, 100"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-slate-800">70%</span>
              </div>
            </div>
            <p className="text-center text-slate-600 mb-2">5 / 7 days</p>
            <p className="text-center text-sm text-slate-500">
              You're on track to reach your weekly goal!
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Workouts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Upper Body Strength", date: "Today", duration: "45 min", calories: "320 cal" },
              { name: "Cardio HIIT", date: "Yesterday", duration: "30 min", calories: "280 cal" },
              { name: "Leg Day", date: "2 days ago", duration: "60 min", calories: "410 cal" },
            ].map((workout, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-slate-800">{workout.name}</h4>
                  <p className="text-sm text-slate-500">{workout.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">{workout.duration}</p>
                  <p className="text-xs text-slate-500">{workout.calories}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
