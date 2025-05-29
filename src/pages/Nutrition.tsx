
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
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Nutrition</h1>
          <p className="text-slate-600">Track your daily nutrition and get AI-powered advice</p>
        </div>
        
        <div className="flex gap-2">
          <Dialog open={aiChatOpen} onOpenChange={setAiChatOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[600px]">
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
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Meal
              </Button>
            </DialogTrigger>
            <DialogContent>
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

      {/* Daily Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Nutrition Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Calories</span>
                <span className="text-sm text-slate-600">{todaysTotals.calories}/{dailyGoals.calories}</span>
              </div>
              <Progress value={(todaysTotals.calories / dailyGoals.calories) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Protein</span>
                <span className="text-sm text-slate-600">{todaysTotals.protein}g/{dailyGoals.protein}g</span>
              </div>
              <Progress value={(todaysTotals.protein / dailyGoals.protein) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Carbs</span>
                <span className="text-sm text-slate-600">{todaysTotals.carbs}g/{dailyGoals.carbs}g</span>
              </div>
              <Progress value={(todaysTotals.carbs / dailyGoals.carbs) * 100} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Fats</span>
                <span className="text-sm text-slate-600">{todaysTotals.fats}g/{dailyGoals.fats}g</span>
              </div>
              <Progress value={(todaysTotals.fats / dailyGoals.fats) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Meals List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">Today's Meals</h2>
        {meals.map((meal) => (
          <Card key={meal.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{meal.mealType}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {meal.foodItems.map((food, index) => (
                      <Badge key={index} variant="secondary">{food}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-800">{meal.calories} cal</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-slate-600">Protein</p>
                  <p className="font-semibold text-blue-600">{meal.protein}g</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Carbs</p>
                  <p className="font-semibold text-green-600">{meal.carbs}g</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Fats</p>
                  <p className="font-semibold text-orange-600">{meal.fats}g</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Nutrition;
