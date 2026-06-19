import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-400" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(350,100%,95%)_0%,_transparent_60%)] opacity-20" />

      <div className="container relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-7 text-white">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Start Your Healthy Journey Today
          </h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-md">
            Download Exact Calories and get a personalized calorie target based on your body. Scan your meals, track your day, and transform your health.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-rose-500 hover:bg-rose-50 border-0 rounded-full px-8 h-14 font-semibold shadow-xl"
            >
              <Link href="https://apps.apple.com/us/app/exact-calories/id6753726987" target="_blank">
                <Icons.apple className="h-5 w-5 mr-2" />
                App Store
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/50 text-white hover:bg-white/10 rounded-full px-8 h-14 font-semibold backdrop-blur-sm"
            >
              <Link href="https://play.google.com/store/apps/details?id=com.wesleyf.exactcalories" target="_blank">
                <Icons.googlePlay className="h-5 w-5 mr-2 fill-current" />
                Google Play
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-white/10 blur-xl" />
            <Image
              src="/foto/Gemini_Generated_Image_xpa3fyxpa3fyxpa3.png"
              alt="Exact Calories app preview"
              width={380}
              height={500}
              className="relative rounded-3xl shadow-2xl shadow-rose-900/30 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
