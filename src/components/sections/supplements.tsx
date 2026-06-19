"use client";

import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useSiteConfig } from "@/hooks/use-site-config";

export default function SupplementsSection() {
  const { supplements } = useSiteConfig();

  return (
    <section id="supplements" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-rose-400">Supplements</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-playfair)" }}>
            Recommended <span className="pink-gradient-text">Supplements</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Boost your results with our curated selection of high-quality supplements.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {supplements.map((s: any) => (
            <Card key={s.id} className="luxury-card group relative overflow-hidden flex flex-col rounded-2xl">
              <a href={s.link} target="_blank" rel="noopener noreferrer" className="block h-full flex flex-col">
                <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                  {s.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.imageUrl} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div className="w-full h-full bg-rose-50 flex items-center justify-center">
                      <ImagePlus className="h-12 w-12 text-rose-200" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4 flex-grow flex flex-col justify-center items-center">
                  <CardTitle className="text-base text-center">{s.name}</CardTitle>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
