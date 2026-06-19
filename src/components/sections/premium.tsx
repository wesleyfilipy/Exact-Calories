"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Crown } from "lucide-react";
import { Icons } from "@/components/icons";
import { useSiteConfig } from "@/hooks/use-site-config";

const perks = [
  "In-depth analytics and personalized insights",
  "Extended progress reports & trend analysis",
  "Custom alerts and smart reminders",
  "Advanced calorie and macro tracking",
  "Priority support & early access to features",
];

export default function PremiumSection() {
  const cfg = useSiteConfig();

  return (
    <section id="premium" className="py-20 md:py-28 bg-white">
      <div className="container grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="flex justify-center">
          <div className="relative w-full max-w-[340px] md:max-w-[420px]">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-rose-200/50 to-pink-100/50 blur-xl" />
            <Image
              src={cfg.premiumImage}
              alt="Exact Calories premium features"
              width={420}
              height={560}
              className="relative rounded-3xl shadow-2xl shadow-rose-200/60 object-cover w-full h-auto"
              unoptimized={cfg.premiumImage.startsWith("data:")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 w-fit">
            <Crown className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-semibold gold-gradient-text">Premium</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Unlock Your Full{" "}
            <span className="pink-gradient-text">Potential</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Premium unlocks advanced tools for users who demand maximum performance.
          </p>
          <ul className="space-y-3">
            {perks.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-rose-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-foreground/80">{perk}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Button
              size="lg"
              onClick={() => window.open(cfg.iosUrl, "_blank")}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-200 border-0 rounded-full px-8 font-semibold"
            >
              <Icons.apple className="h-5 w-5 mr-2" />
              Download &amp; Go Premium
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
