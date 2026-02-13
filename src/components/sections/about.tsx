import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function AboutSection() {
  const aboutImage = PlaceHolderImages.find((img) => img.id === "about-app");

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          {aboutImage && (
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              data-ai-hint={aboutImage.imageHint}
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Your Personal Wellness Companion
          </h2>
          <p className="text-muted-foreground">
            With a clean, intuitive, and modern interface, Exact Calories allows you to log meals in seconds and instantly see how they fit into your daily goals. The app was built to help you stay consistent, offering clear insights and powerful tools that make healthy living more accessible, even with a busy routine. You’ll always know how many calories you’ve consumed, how many you have left, and how your choices impact your progress.
          </p>
        </div>
      </div>
    </section>
  );
}
