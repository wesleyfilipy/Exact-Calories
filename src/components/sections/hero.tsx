"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Sparkles, Volume2, VolumeX } from "lucide-react";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    _wq: any[];
    fbq: (...args: any[]) => void;
  }
}

function trackDownload(store: "ios" | "android") {
  try {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Lead", {
        content_name: store === "ios" ? "AppStore Download" : "GooglePlay Download",
        content_category: "App Download",
      });
    }
  } catch {}
  fetch("/api/fb-conversion", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ store, url: window.location.href }),
  }).catch(() => {});
}

export default function HeroSection() {
  const [muted, setMuted] = useState(true);
  const [wistiaPlayer, setWistiaPlayer] = useState<any>(null);

  useEffect(() => {
    window._wq = window._wq || [];
    window._wq.push({
      id: "e0md5zus5a",
      onReady: (video: any) => {
        setWistiaPlayer(video);
        video.mute();
        video.play();
      },
    });
  }, []);

  const toggleSound = () => {
    if (!wistiaPlayer) return;
    if (muted) {
      wistiaPlayer.unmute();
      wistiaPlayer.volume(1);
    } else {
      wistiaPlayer.mute();
    }
    setMuted((m) => !m);
  };

  return (
    <section id="home" className="relative overflow-hidden hero-gradient">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />

      <div className="container relative z-10 py-12 md:py-28 grid md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Text side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 md:gap-8 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-100 border border-pink-200 text-xs sm:text-sm font-medium text-rose-600">
            <Sparkles className="h-3.5 w-3.5 flex-shrink-0" />
            Personalized Nutrition, Elevated
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Take Control of
            <span className="block pink-gradient-text">Your Health,</span>
            <span className="block">Your Way.</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
            Exact Calories is your complete and intelligent calorie tracker — designed to make nutrition management simple, fast, and beautifully effortless.
          </p>

          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <Button
              size="lg"
              onClick={() => {
                trackDownload("ios");
                window.open("https://apps.apple.com/us/app/exact-calories/id6753726987", "_blank");
              }}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg shadow-rose-200 border-0 rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold transition-all duration-300 w-full xs:w-auto"
            >
              <Icons.apple className="h-5 w-5 mr-2 flex-shrink-0" />
              App Store
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                trackDownload("android");
                window.open("https://play.google.com/store/apps/details?id=com.wesleyf.exactcalories", "_blank");
              }}
              className="border-rose-300 text-rose-600 hover:bg-rose-50 rounded-full px-6 sm:px-8 h-12 sm:h-14 text-sm sm:text-base font-semibold transition-all duration-300 w-full xs:w-auto"
            >
              <Icons.googlePlay className="h-5 w-5 mr-2 fill-current flex-shrink-0" />
              Google Play
            </Button>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="text-rose-400">★★★★★</span> 5.0 Rating
            </span>
            <span className="w-px h-4 bg-border" />
            <span>Free to Download</span>
          </div>
        </div>

        {/* Video side */}
        <div className="flex justify-center md:justify-end order-1 md:order-2">
          <div className="relative w-[160px] sm:w-[190px] md:w-[210px]">
            <div className="phone-frame">
              <div
                className="wistia_embed wistia_async_e0md5zus5a videoFoam=true autoPlay=true endVideoBehavior=loop playbar=false volumeControl=false fullscreenButton=false playbackRateControl=false settingsControl=false smallPlayButton=false"
                style={{ height: "100%", position: "relative", width: "100%" }}
              />
            </div>
            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white border border-rose-200 rounded-full px-3 py-1.5 text-xs font-medium text-rose-500 shadow-md hover:bg-rose-50 transition-colors whitespace-nowrap"
              aria-label={muted ? "Ativar som" : "Silenciar"}
            >
              {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              {muted ? "Ativar Som" : "Silenciar"}
            </button>
          </div>
        </div>
      </div>

      <div className="section-divider mt-10" />
    </section>
  );
}
