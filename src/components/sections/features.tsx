import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Apple, Dumbbell, Target, History, BarChart3, Bell } from "lucide-react";

const features = [
  {
    icon: <Apple className="h-8 w-8 text-primary" />,
    title: "Quickly Log Meals",
    description: "Quickly log meals, snacks, and drinks with a streamlined interface.",
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Personalized Goals",
    description: "Set personalized goals for weight loss, muscle building, or maintenance.",
  },
  {
    icon: <History className="h-8 w-8 text-primary" />,
    title: "Progress History",
    description: "Follow your progress through detailed charts, trends, and historical reports.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-primary" />,
    title: "Full Nutrition Details",
    description: "View full nutrition details and understand your daily intake.",
  },
  {
    icon: <Bell className="h-8 w-8 text-primary" />,
    title: "Smart Reminders",
    description: "Access smart reminders to stay motivated and consistent.",
  },
  {
    icon: <Dumbbell className="h-8 w-8 text-primary" />,
    title: "Track Calories Burned",
    description: "Track your daily calories consumed and calories burned.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Everything You Need to Succeed</h2>
          <p className="mt-4 text-muted-foreground">
            Exact Calories gives you everything you need to stay in control with ease. Track calories, monitor your meals, analyze your progress, and understand your nutrition like never before — all in one place.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 mb-4">
                <div className="bg-accent rounded-full p-3 mb-4 inline-flex">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardDescription>
                {feature.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
