import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Camera, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const Nutrition = () => {
  const [meals, setMeals] = useState([
    {
      id: 1,
      mealType: "Breakfast",
      foodItems: ["Oatmeal", "Banana", "Almonds"],
      calories: 350,
      protein: 12,
      carbs: 58,
      fats: 8,
      date: "2024-05-27"
    },
    {
      id: 2,
      mealType: "Lunch",
      foodItems: ["Grilled Chicken", "Rice", "Vegetables"],
      calories: 520,
      protein: 45,
      carbs: 40,
      fats: 15,
      date: "2024-05-27"
    }
  ]);

  const [newMeal, setNewMeal] = useState({
    mealType: "",
    foodItems: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: ""
  });

  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI nutrition assistant. Ask me about meal planning, nutrition advice, or upload a photo of your meal for analysis!" }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");

  const dailyGoals = {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65
  };

  const todaysTotals = meals.reduce((totals, meal) => ({
    calories: totals.calories + meal.calories,
    protein: totals.protein + meal.protein,
    carbs: totals.carbs + meal.carbs,
    fats: totals.fats + meal.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

  const handleCreateMeal = () => {
    const meal = {
      id: Date.now(),
      mealType: newMeal.mealType,
      foodItems: newMeal.foodItems.split(",").map(item => item.trim()),
      calories: parseInt(newMeal.calories),
      protein: parseInt(newMeal.protein),
      carbs: parseInt(newMeal.carbs),
      fats: parseInt(newMeal.fats),
      date: new Date().toISOString().split('T')[0]
    };
    setMeals([...meals, meal]);
    setNewMeal({ mealType: "", foodItems: "", calories: "", protein: "", carbs: "", fats: "" });
  };

  const sendMessage = () => {
    if (!currentMessage.trim()) return;
    
    setChatMessages([...chatMessages, 
      { role: "user", content: currentMessage },
      { role: "assistant", content: "Thanks for your question! As an AI assistant, I'd recommend focusing on balanced nutrition with adequate protein, healthy fats, and complex carbohydrates. Would you like specific meal suggestions?" }
    ]);
    setCurrentMessage("");
  };

  return (
    <div className="min-h-screen relative">
      {/* Beautiful nutrition-themed background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`,
        }}
      />
      
      {/* Gradient overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-blue-900/40 to-slate-900/50" />
      
      <div className="relative z-10 p-4 sm:p-6 space-y-4 sm:space-y-6 pb-20 sm:pb-6">
        {/* Header - Mobile responsive */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">Nutrition</h1>
            <p className="text-blue-100 text-sm sm:text-base">Track your daily nutrition and get AI-powered advice</p>
          </div>
          
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <Dialog open={aiChatOpen} onOpenChange={setAiChatOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[600px] mx-4">
                <DialogHeader>
                  <DialogTitle>AI Nutrition Assistant</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col h-[500px]">
                  <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-50 rounded-lg">
                    {chatMessages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.role === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-white border'
                        }`}>
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Input
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      placeholder="Ask about nutrition or upload a meal photo..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage}>Send</Button>
                    <Button variant="outline" size="icon">
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Meal
                </Button>
              </DialogTrigger>
              <DialogContent className="mx-4">
                <DialogHeader>
                  <DialogTitle>Log New Meal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="mealType">Meal Type</Label>
                    <Select value={newMeal.mealType} onValueChange={(value) => setNewMeal({...newMeal, mealType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                        <SelectItem value="Lunch">Lunch</SelectItem>
                        <SelectItem value="Dinner">Dinner</SelectItem>
                        <SelectItem value="Snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="foodItems">Food Items (comma separated)</Label>
                    <Input
                      id="foodItems"
                      value={newMeal.foodItems}
                      onChange={(e) => setNewMeal({...newMeal, foodItems: e.target.value})}
                      placeholder="e.g., Chicken breast, Rice, Broccoli"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        value={newMeal.calories}
                        onChange={(e) => setNewMeal({...newMeal, calories: e.target.value})}
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="protein">Protein (g)</Label>
                      <Input
                        id="protein"
                        type="number"
                        value={newMeal.protein}
                        onChange={(e) => setNewMeal({...newMeal, protein: e.target.value})}
                        placeholder="30"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="carbs">Carbs (g)</Label>
                      <Input
                        id="carbs"
                        type="number"
                        value={newMeal.carbs}
                        onChange={(e) => setNewMeal({...newMeal, carbs: e.target.value})}
                        placeholder="45"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fats">Fats (g)</Label>
                      <Input
                        id="fats"
                        type="number"
                        value={newMeal.fats}
                        onChange={(e) => setNewMeal({...newMeal, fats: e.target.value})}
                        placeholder="15"
                      />
                    </div>
                  </div>
                  <Button onClick={handleCreateMeal} className="w-full">
                    Log Meal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Daily Summary - Enhanced with glass effect */}
        <Card className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white text-lg sm:text-xl">Today's Nutrition Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-blue-100">Calories</span>
                  <span className="text-xs sm:text-sm text-blue-200">{todaysTotals.calories}/{dailyGoals.calories}</span>
                </div>
                <Progress value={(todaysTotals.calories / dailyGoals.calories) * 100} className="h-2 bg-white/20" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-blue-100">Protein</span>
                  <span className="text-xs sm:text-sm text-blue-200">{todaysTotals.protein}g/{dailyGoals.protein}g</span>
                </div>
                <Progress value={(todaysTotals.protein / dailyGoals.protein) * 100} className="h-2 bg-white/20" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-blue-100">Carbs</span>
                  <span className="text-xs sm:text-sm text-blue-200">{todaysTotals.carbs}g/{dailyGoals.carbs}g</span>
                </div>
                <Progress value={(todaysTotals.carbs / dailyGoals.carbs) * 100} className="h-2 bg-white/20" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-blue-100">Fats</span>
                  <span className="text-xs sm:text-sm text-blue-200">{todaysTotals.fats}g/{dailyGoals.fats}g</span>
                </div>
                <Progress value={(todaysTotals.fats / dailyGoals.fats) * 100} className="h-2 bg-white/20" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meals List - Enhanced design */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white drop-shadow-lg">Today's Meals</h2>
          <div className="space-y-4">
            {meals.map((meal) => (
              <Card key={meal.id} className="bg-white/10 backdrop-blur-md border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{meal.mealType}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {meal.foodItems.map((food, index) => (
                          <Badge key={index} variant="secondary" className="bg-emerald-600/20 text-emerald-100 border-emerald-400/30">
                            {food}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-lg font-semibold text-white">{meal.calories} cal</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                    <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                      <p className="text-xs sm:text-sm text-blue-200">Protein</p>
                      <p className="font-semibold text-blue-300 text-sm sm:text-base">{meal.protein}g</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                      <p className="text-xs sm:text-sm text-green-200">Carbs</p>
                      <p className="font-semibold text-green-300 text-sm sm:text-base">{meal.carbs}g</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-2 sm:p-3">
                      <p className="text-xs sm:text-sm text-orange-200">Fats</p>
                      <p className="font-semibold text-orange-300 text-sm sm:text-base">{meal.fats}g</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;
