import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-20">
          <div className="prose lg:prose-xl mx-auto max-w-4xl">
            <h1 className="font-headline">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <p>Exact Calories (“we,” “our,” “us”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your data when you use our app or website.</p>

            <h2>1. Information we collect</h2>
            <ul>
              <li><strong>Account/Profile Information:</strong> Name, Email, Photo (if provided)</li>
              <li><strong>Nutrition/Food Data:</strong> Logged meals, calories, daily goals</li>
              <li><strong>Usage data:</strong> usage time, resources accessed, errors, anonymous logs</li>
              <li><strong>Subscriptions and Payments:</strong> Subscription History, Subscription Status</li>
              <li><strong>Device permissions:</strong> access to the photo gallery (if you choose profile picture), notifications (if we use them), etc.</li>
            </ul>

            <h2>2. Use of information</h2>
            <p>We use the collected data to:</p>
            <ul>
              <li>Offer app functionality (calculate calories, view history)</li>
              <li>Manage Subscriptions (Apple IAP)</li>
              <li>Improve the app based on aggregated usage</li>
              <li>Send helpful notifications and alerts</li>
              <li>Respond to support requests</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Data sharing</h2>
            <p>We do not sell or rent your personal data. We may share:</p>
            <ul>
              <li>With third-party providers/services that support the app (e.g., servers, analytics)</li>
              <li>With legal authorities if required by law</li>
              <li>With payment providers (to validate signatures)</li>
            </ul>

            <h2>4. Storage and security</h2>
            <ul>
              <li>We store data on secure servers with encryption</li>
              <li>We only allow access to data by restricted staff</li>
              <li>Backup and redundancy procedures</li>
            </ul>

            <h2>5. Data retention</h2>
            <p>We retain your data for as long as your account exists or until you request deletion. Some data may be retained for legally required periods.</p>

            <h2>6. Your rights</h2>
            <p>You can:</p>
            <ul>
              <li>Request access to or correction of your data</li>
              <li>Request account deletion</li>
              <li>Limit or revoke consent (where applicable)</li>
              <li>Disable notifications</li>
            </ul>

            <h2>7. Policy Changes</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes via the app or email.</p>

            <h2>8. Contact</h2>
            <p>For questions, requests or complaints:</p>
            <p>Email: ExactCalories@gmail.com</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
