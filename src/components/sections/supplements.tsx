'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import { ImagePlus } from 'lucide-react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

type Supplement = {
  id: string;
  name: string;
  link: string;
  imageUrl: string | null;
};

const initialSupplements: Supplement[] = [
  { id: 'supplement-whey', name: 'Whey Protein', link: '#', imageUrl: 'https://images.unsplash.com/photo-1693996045369-781799bbaea0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx3aGV5JTIwcHJvdGVpbnxlbnwwfHx8fDE3NjQ3ODE1NzB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'supplement-creatine', name: 'Creatine', link: '#', imageUrl: 'https://images.unsplash.com/photo-1693996045838-980674653385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjcmVhdGluZSUyMHN1cHBsZW1lbnR8ZW58MHx8fHwxNzY0NzgxNTcxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 'supplement-preworkout', name: 'Pre-Workout', link: '#', imageUrl: 'https://images.unsplash.com/photo-1704650311981-419f841421cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwcmUlMjB3b3Jrb3V0fGVufDB8fHx8MTc2NDc4MTU3MHww&ixlib=rb-4.1.0&q=80&w=1080' },
];

const SUPP_KEY = 'exactcalories_supplements';

function getSupplements(): Supplement[] {
  if (typeof window === 'undefined') return initialSupplements;
  try {
    const saved = localStorage.getItem(SUPP_KEY);
    const parsed = saved ? JSON.parse(saved) : initialSupplements;
    return Array.isArray(parsed) ? parsed : initialSupplements;
  } catch {
    return initialSupplements;
  }
}

export function saveSupplements(supplements: Supplement[]) {
  localStorage.setItem(SUPP_KEY, JSON.stringify(supplements));
}

export function getSupplementsData(): Supplement[] {
  return getSupplements();
}

export default function SupplementsSection() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);

  useEffect(() => {
    setSupplements(getSupplements());
    // Listen for admin updates
    const handler = () => setSupplements(getSupplements());
    window.addEventListener('supplements-updated', handler);
    return () => window.removeEventListener('supplements-updated', handler);
  }, []);

  return (
    <section id="supplements" className="py-20 md:py-28 bg-white">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest text-rose-400">Supplements</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
            Recommended <span className="pink-gradient-text">Supplements</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Boost your results with our curated selection of high-quality supplements.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {supplements.map((supplement) => (
            <Card key={supplement.id} className="luxury-card group relative overflow-hidden flex flex-col rounded-2xl">
              <a href={supplement.link} target="_blank" rel="noopener noreferrer" className="block h-full flex flex-col">
                <div className="relative w-full h-40 sm:h-48 overflow-hidden">
                  {supplement.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={supplement.imageUrl} alt={supplement.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <div className="w-full h-full bg-rose-50 flex items-center justify-center">
                      <ImagePlus className="h-12 w-12 text-rose-200" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4 flex-grow flex flex-col justify-center items-center">
                  <CardTitle className="text-base text-center">{supplement.name}</CardTitle>
                </CardContent>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
