"use client";

import { useState, useEffect } from "react";
import { defaultConfig, SiteConfig } from "@/lib/site-config";

const defaultSupplements = [
  { id: "supplement-whey", name: "Whey Protein", link: "#", imageUrl: "https://images.unsplash.com/photo-1693996045369-781799bbaea0?w=400&q=80" },
  { id: "supplement-creatine", name: "Creatine", link: "#", imageUrl: "https://images.unsplash.com/photo-1693996045838-980674653385?w=400&q=80" },
  { id: "supplement-preworkout", name: "Pre-Workout", link: "#", imageUrl: "https://images.unsplash.com/photo-1704650311981-419f841421cc?w=400&q=80" },
];

let _cache: { config: SiteConfig; supplements: any[] } | null = null;

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [supplements, setSupplements] = useState(defaultSupplements);

  useEffect(() => {
    if (_cache) {
      setConfig(_cache.config);
      setSupplements(_cache.supplements);
      return;
    }
    fetch("/api/config")
      .then(r => r.json())
      .then(data => {
        const cfg = data.config ?? defaultConfig;
        const supps = data.supplements ?? defaultSupplements;
        _cache = { config: cfg, supplements: supps };
        setConfig(cfg);
        setSupplements(supps);
      })
      .catch(() => {});

    const handler = () => { _cache = null; };
    window.addEventListener("supplements-updated", handler);
    return () => window.removeEventListener("supplements-updated", handler);
  }, []);

  return { config, supplements };
}
