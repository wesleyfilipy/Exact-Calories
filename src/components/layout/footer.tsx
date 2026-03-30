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
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms of Use
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/politica-de-privacidade" className="text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidade
            </Link>
            <a href="mailto:contato@exactcalories.com" className="text-muted-foreground hover:text-foreground transition-colors">
              Support
            </a>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Exact Calories. Developed for iOS & Android.</p>
          <p className="mt-2">Developer Site & Support URL for Exact Calories.</p>
        </div>
      </div>
    </footer>
  );
}
