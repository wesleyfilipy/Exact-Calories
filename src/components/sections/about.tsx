import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 luxury-gradient">
      <div className="container grid md:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-rose-200/60 to-pink-100/60 blur-xl" />
            <Image
              src="/foto/Gemini_Generated_Image_3yh3d63yh3d63yh3.png"
              alt="Exact Calories app mockup"
              width={420}
              height={560}
              className="relative rounded-3xl shadow-2xl shadow-rose-200/60 object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-rose-400">
            About the App
          </span>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            Your Personal{" "}
            <span className="pink-gradient-text">Wellness</span>{" "}
            Companion
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            With a clean, intuitive, and modern interface, Exact Calories allows you to log meals in seconds and instantly see how they fit into your daily goals. The app was built to help you stay consistent, offering clear insights and powerful tools that make healthy living more accessible — even with a busy routine.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            You&apos;ll always know how many calories you&apos;ve consumed, how many you have left, and how your choices impact your progress. Beauty meets function, every single day.
          </p>
          <div className="flex gap-8 mt-2">
            <div>
              <p className="text-3xl font-bold pink-gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>500K+</p>
              <p className="text-sm text-muted-foreground mt-1">Meals Logged</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-3xl font-bold pink-gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>50K+</p>
              <p className="text-sm text-muted-foreground mt-1">Happy Users</p>
            </div>
            <div className="w-px bg-border" />
            <div>
              <p className="text-3xl font-bold pink-gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>5★</p>
              <p className="text-sm text-muted-foreground mt-1">App Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
