import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function TermsOfUsePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-20">
          <div className="prose lg:prose-xl mx-auto max-w-4xl">
            <h1 className="font-headline">Terms of Use</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>These Terms of Use/Terms of Service apply to your use of the “Exact Calories” app and the website. By using the app or website, you agree to these terms.</p>

            <h2>1. Acceptance of terms</h2>
            <p>By using this app, you agree to be bound by these terms, our Privacy Policy, and any future modifications.</p>

            <h2>2. License to use</h2>
            <p>We grant you a limited, personal, non-exclusive, non-transferable license to use the app for your personal purposes.</p>

            <h2>3. Restrictions on use</h2>
            <p>You must not:</p>
            <ul>
              <li>Reproduce, distribute, modify, or sell parts of the app</li>
              <li>Interfere with the operation or security of the platform</li>
              <li>Use for illegal activities</li>
              <li>Attempting to breach security or circumvent imposed limitations</li>
            </ul>

            <h2>4. Subscriptions and payments</h2>
            <ul>
              <li>The app offers automatic subscriptions via Apple In-App Purchases</li>
              <li>You will be automatically charged until you cancel.</li>
              <li>You agree to the pricing, subscription periods and renewal policy</li>
              <li>We do not provide refunds via the app; if you experience any issues, please contact us.</li>
            </ul>

            <h2>5. Links to Privacy and Terms</h2>
            <ul>
              <li>We have included functional links to our Privacy Policy and Terms of Use in the app and website.</li>
              <li>You acknowledge that you may access these documents in the app before registering.</li>
            </ul>

            <h2>6. Use by minors</h2>
            <p>If you are a minor under local law, you need parental or guardian consent to use the app.</p>

            <h2>7. Disclaimer</h2>
            <p>The app provides nutritional estimates and education, but is not a substitute for professional medical or nutritional advice. Use at your own risk.</p>
            
            <h2>8. Changes and Termination</h2>
            <ul>
              <li>We may modify the Terms at any time and will take effect on a specific date.</li>
              <li>We may suspend or terminate your account if you violate these terms.</li>
              <li>Users have the right to refuse changes and stop using the app.</li>
            </ul>

            <h2>9. Applicable law</h2>
            <p>These terms will be governed by the laws of the country where the company is registered (e.g., Brazil). Any disputes will be resolved in the competent courts located in the company&apos;s location.</p>

            <h2>10. Contact</h2>
            <p>For questions about these terms:</p>
            <p>Email: ExactCalories@gmail.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
