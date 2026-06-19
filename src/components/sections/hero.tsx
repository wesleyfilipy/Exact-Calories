"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden hero-gradient">
      {/* Decorative blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />

      <div className="container relative z-10 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Text side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 border border-pink-200 text-sm font-medium text-rose-600">
            <Sparkles className="h-4 w-4" />
            Personalized Nutrition, Elevated
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Take Control of
            <span className="block pink-gradient-text">Your Health,</span>
            <span className="block">Your Way.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
            Exact Calories is your complete and intelligent calorie tracker — designed to make nutrition management simple, fast, and beautifully effortless.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-200 border-0 rounded-full px-8 h-14 text-base font-semibold transition-all duration-300"
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
              className="border-rose-300 text-rose-600 hover:bg-rose-50 rounded-full px-8 h-14 text-base font-semibold transition-all duration-300"
            >
              <Link href="https://play.google.com/store/apps/details?id=com.wesleyf.exactcalories" target="_blank">
                <Icons.googlePlay className="h-5 w-5 mr-2 fill-current" />
                Google Play
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="text-rose-400">★★★★★</span> 5.0 Rating
            </span>
            <span className="w-px h-4 bg-border" />
            <span>Free to Download</span>
          </div>
        </div>

        {/* Video side — Wistia in phone frame */}
        <div className="flex justify-center md:justify-end">
          <div className="relative w-[200px] md:w-[220px]">
            <div className="phone-frame">
              {/* @ts-ignore */}
              <wistia-player
                media-id="e0md5zus5a"
                aspect="0.5625"
                autoplay="true"
                muted="true"
                loop="true"
                playbar="false"
                volume-control="false"
                fullscreen-button="false"
                playback-rate-control="false"
                settings-control="false"
                small-play-button="false"
                end-video-behavior="loop"
                sharing="false"
                download-button="false"
                plugin-share="false"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider mt-8" />
    </section>
  );
}
