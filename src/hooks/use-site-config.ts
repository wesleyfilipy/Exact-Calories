"use client";

import { useState, useEffect } from "react";
import { defaultConfig, SiteConfig } from "@/lib/site-config";

const STORAGE_KEY = "exactcalories_admin_config";

export function useSiteConfig(): SiteConfig {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setConfig(JSON.parse(stored)); } catch {}
    }
  }, []);

  return config;
}
