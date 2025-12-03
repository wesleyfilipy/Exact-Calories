
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function HeroSection() {
  return (
    <section id="home" className="py-20 md:py-32 bg-secondary/50">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            Take Control of Your Health, Your Way
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg">
            Exact Calories is your complete and intelligent calorie tracker designed to make nutrition management simple, fast, and efficient.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link href="https://apps.apple.com/us/app/exact-calories/id6753726987" target="_blank">
                <Icons.apple className="h-6 w-6 mr-2" />
                App Store
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="https://play.google.com/store/apps/details?id=com.wesleyf.exactcalories" target="_blank">
                <Icons.googlePlay className="h-6 w-6 mr-2 fill-current" />
                Google Play
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          {/* Image removed as requested */}
        </div>
      </div>
    </section>
  );
}
