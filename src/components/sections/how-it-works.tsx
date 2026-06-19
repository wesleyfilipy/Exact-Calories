import Image from "next/image";

const steps = [
  { number: "01", title: "Scan Your Meal", description: "Use the AI-powered scanner to identify food and get instant nutrition data." },
  { number: "02", title: "Track Your Day", description: "Watch your daily totals update in real time as you log each meal." },
  { number: "03", title: "Reach Your Goal", description: "Stay within your personalized target and hit your health milestones." },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 luxury-gradient">
      <div className="container grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="flex flex-col gap-8">
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-rose-400">
              How It Works
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
              Understand Your Nutrition{" "}
              <span className="pink-gradient-text">Like Never Before</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The food diary and nutrition log make it effortless to see patterns in your eating habits. Make smarter choices every day with elegant, clear insights.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {steps.map((step) => (
              <div key={step.number} className="flex gap-5 items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-rose-200">
                  {step.number}
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="relative w-full max-w-[340px] md:max-w-[420px]">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-pink-200/50 to-rose-100/50 blur-xl" />
            <Image
              src="/foto/Gemini_Generated_Image_m2486sm2486sm248.png"
              alt="App nutrition tracking screen"
              width={420}
              height={560}
              className="relative rounded-3xl shadow-2xl shadow-rose-200/60 object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
