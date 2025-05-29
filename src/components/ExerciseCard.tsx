
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Target, Weight } from "lucide-react";

interface ExerciseCardProps {
  exercise: {
    id: string;
    name: string;
    category: string;
    type: string;
    sets?: number;
    reps?: number;
    weight?: number;
    duration?: number;
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const ExerciseCard = ({ exercise, onEdit, onDelete }: ExerciseCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'strength': return 'bg-blue-100 text-blue-800';
      case 'cardio': return 'bg-green-100 text-green-800';
      case 'flexibility': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-semibold text-slate-800">{exercise.name}</h4>
            <p className="text-sm text-slate-600">{exercise.category}</p>
          </div>
          <Badge className={getTypeColor(exercise.type)}>
            {exercise.type}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-slate-600">
          {exercise.sets && exercise.reps && (
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              <span>{exercise.sets} × {exercise.reps}</span>
            </div>
          )}
          {exercise.weight && (
            <div className="flex items-center gap-1">
              <Weight className="w-4 h-4" />
              <span>{exercise.weight}kg</span>
            </div>
          )}
          {exercise.duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{exercise.duration}min</span>
            </div>
          )}
        </div>
        
        {(onEdit || onDelete) && (
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" size="sm" onClick={onDelete}>
                Delete
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;
