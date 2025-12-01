import { motion } from "framer-motion";
import { Play, BookOpen, Star, CheckCircle, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const levels = [
  {
    id: 1,
    title: "Beginner: The Basics",
    description: "Master the 3x3 grid and simple loop patterns.",
    lessons: 5,
    completed: 2,
    color: "bg-green-100 text-green-800",
    icon: Star,
    isLocked: false,
    modules: [
      { title: "Understanding the Dot Grid", duration: "2 min", type: "Video" },
      { title: "Connecting Dots: Lines vs Curves", duration: "5 min", type: "Practice" },
      { title: "Your First 3x3 Loop", duration: "10 min", type: "Project" },
    ]
  },
  {
    id: 2,
    title: "Intermediate: Sikku Kolam",
    description: "Learn the art of curved lines and symmetry.",
    lessons: 8,
    completed: 0,
    color: "bg-blue-100 text-blue-800",
    icon: BookOpen,
    isLocked: false,
    modules: [
      { title: "The 5x5 Interlaced Grid", duration: "5 min", type: "Video" },
      { title: "Symmetry Rules", duration: "8 min", type: "Theory" },
    ]
  },
  {
    id: 3,
    title: "Advanced: Geometric Complexity",
    description: "Create large 9x9 masterpieces and mandalas.",
    lessons: 12,
    completed: 0,
    color: "bg-purple-100 text-purple-800",
    icon: Lock,
    isLocked: true,
    modules: []
  }
];

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">Master the Art of Kolam</h1>
        <p className="text-muted-foreground text-lg">
          From simple dots to complex masterpieces. Follow our step-by-step curriculum to become a Kolam artist.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`h-full relative overflow-hidden transition-all hover:shadow-lg ${level.isLocked ? 'opacity-75 grayscale' : ''}`}>
              <div className={`absolute top-0 right-0 p-4 ${level.isLocked ? 'text-muted-foreground' : 'text-primary'}`}>
                {level.isLocked ? <Lock className="w-6 h-6" /> : <level.icon className="w-6 h-6" />}
              </div>
              <CardHeader>
                <Badge variant="outline" className={`w-fit mb-2 ${level.color} border-transparent`}>
                  Level {level.id}
                </Badge>
                <CardTitle className="font-serif text-xl">{level.title}</CardTitle>
                <CardDescription>{level.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Progress</span>
                      <span>{Math.round((level.completed / level.lessons) * 100)}%</span>
                    </div>
                    <Progress value={(level.completed / level.lessons) * 100} className="h-2" />
                  </div>
                  
                  <div className="pt-4 space-y-3">
                    {level.modules.map((mod, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center shadow-sm group-hover:text-primary transition-colors">
                            <Play className="w-3 h-3 fill-current" />
                          </div>
                          <span className="text-sm font-medium">{mod.title}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{mod.duration}</span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full mt-4" disabled={level.isLocked} variant={level.isLocked ? "outline" : "default"}>
                    {level.isLocked ? "Locked" : "Continue Learning"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
