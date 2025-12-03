import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PremiumSection() {
  const premiumImage = PlaceHolderImages.find((img) => img.id === "premium-features");

  return (
    <section id="premium" className="py-20 md:py-28">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center">
          {premiumImage && (
            <Image
              src={premiumImage.imageUrl}
              alt={premiumImage.description}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              data-ai-hint={premiumImage.imageHint}
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">
            Unlock Your Full Potential with Premium
          </h2>
          <p className="text-muted-foreground">
            Premium features unlock advanced tools for users who want maximum performance. Gain access to in-depth analytics, extended progress reports, custom alerts, and enhanced calorie tracking options.
          </p>
          <ul className="space-y-2 my-4">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>In-depth analytics and insights</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Extended progress reports</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              <span>Custom alerts and reminders</span>
            </li>
          </ul>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="#">Go Premium</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
