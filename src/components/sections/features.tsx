import { Apple, Dumbbell, Target, History, BarChart3, Bell } from "lucide-react";

const features = [
  {
    icon: <Apple className="h-7 w-7 text-rose-500" />,
    title: "Quickly Log Meals",
    description: "Log meals, snacks, and drinks in seconds with a beautifully streamlined interface.",
  },
  {
    icon: <Target className="h-7 w-7 text-rose-500" />,
    title: "Personalized Goals",
    description: "Set personalized goals for weight loss, muscle building, or maintaining your ideal shape.",
  },
  {
    icon: <History className="h-7 w-7 text-rose-500" />,
    title: "Progress History",
    description: "Follow your journey through detailed charts, trends, and elegant historical reports.",
  },
  {
    icon: <BarChart3 className="h-7 w-7 text-rose-500" />,
    title: "Full Nutrition Details",
    description: "View complete nutrition details and truly understand your daily intake at a glance.",
  },
  {
    icon: <Bell className="h-7 w-7 text-rose-500" />,
    title: "Smart Reminders",
    description: "Access intelligent reminders to stay motivated, consistent, and always on track.",
  },
  {
    icon: <Dumbbell className="h-7 w-7 text-rose-500" />,
    title: "Calories Burned",
    description: "Track your daily calories consumed and burned — full picture, full control.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-widest text-rose-400">
            Features
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
            Everything You Need to{" "}
            <span className="pink-gradient-text">Succeed</span>
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Exact Calories gives you every tool to stay in control with elegance. Track calories, monitor meals, analyze progress, and understand your nutrition — all in one place.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="luxury-card rounded-2xl p-8 flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-100 flex items-center justify-center border border-rose-100">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
