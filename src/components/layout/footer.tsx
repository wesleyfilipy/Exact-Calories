import Link from "next/link";
import { Icons } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold">Exact Calories</span>
          </div>
          <nav className="flex gap-4 sm:gap-6 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Use
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </nav>
        </div>
        <div className="mt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Exact Calories. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
