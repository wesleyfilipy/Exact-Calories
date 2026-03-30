import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HowItWorksSection() {
  const howItWorksImage = PlaceHolderImages.find((img) => img.id === "how-it-works");

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-secondary/50">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Understand Your Nutrition Like Never Before
          </h2>
          <p className="text-muted-foreground">
            The food diary and nutrition log make it easy to see patterns in your eating habits. By understanding your calorie intake and nutrition balance, you can make smarter choices every day. Whether you’re tracking macros, organizing a new diet plan, or monitoring how specific foods affect your progress, Exact Calories adapts to your goals and helps you stay on track.
          </p>
        </div>
        <div className="flex justify-center">
          {howItWorksImage && (
            <Image
              src={howItWorksImage.imageUrl}
              alt={howItWorksImage.description}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              data-ai-hint={howItWorksImage.imageHint}
            />
          )}
        </div>
      </div>
    </section>
  );
}
