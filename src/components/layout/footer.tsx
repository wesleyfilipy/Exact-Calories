import Link from "next/link";
import { Icons } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-rose-100 bg-gradient-to-b from-white to-rose-50/50">
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="h-6 w-6 text-rose-500" />
              <span className="font-bold text-lg pink-gradient-text" style={{ fontFamily: 'var(--font-playfair)' }}>
                Exact Calories
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your personalized calorie tracker — beautifully designed to help you reach your health goals.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm text-foreground">Download</h4>
            <a
              href="https://apps.apple.com/us/app/exact-calories/id6753726987"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-rose-500 transition-colors"
            >
              App Store (iOS)
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.wesleyf.exactcalories"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-rose-500 transition-colors"
            >
              Google Play (Android)
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-sm text-foreground">Legal &amp; Support</h4>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
              Terms of Use
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/politica-de-privacidade" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
              Política de Privacidade
            </Link>
            <a href="mailto:contato@exactcalories.com" className="text-sm text-muted-foreground hover:text-rose-500 transition-colors">
              Support
            </a>
          </div>
        </div>

        <div className="pt-8 border-t border-rose-100 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Exact Calories. Available on iOS & Android.</p>
          <p>Developer Site & Support URL for Exact Calories.</p>
        </div>
      </div>
    </footer>
  );
}
