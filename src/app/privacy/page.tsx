import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "Privacy Policy | Exact Calories",
  description: "Privacy Policy for the Exact Calories app.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-20">
          <div className="prose lg:prose-xl mx-auto max-w-4xl">
            <h1 className="font-headline">Privacy Policy — Exact Calories</h1>
            <p className="text-muted-foreground">Last updated: June 2026</p>

            <p>Exact Calories ("we," "our," "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your data when you use our app or website.</p>

            <h2>1. Information We Collect</h2>
            <ul>
              <li><strong>Account / Profile Information:</strong> Name, email address, profile photo (if provided)</li>
              <li><strong>Nutrition & Food Data:</strong> Logged meals, calories, macros, daily goals</li>
              <li><strong>Usage Data:</strong> Usage time, resources accessed, anonymous error logs</li>
              <li><strong>Subscription & Payment:</strong> Subscription status and history (no card numbers stored)</li>
              <li><strong>Device Permissions:</strong> Photo gallery (optional, for profile picture), notifications (optional)</li>
            </ul>

            <h2>2. Use of Information</h2>
            <p>We use collected data to:</p>
            <ul>
              <li>Provide app functionality (calorie tracking, history, goals)</li>
              <li>Manage subscriptions (Apple IAP / Google Play Billing)</li>
              <li>Improve the app based on aggregated usage analytics</li>
              <li>Send helpful notifications and reminders (if enabled)</li>
              <li>Respond to support requests</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>3. Data Sharing</h2>
            <p>We do not sell or rent your personal data. We may share data:</p>
            <ul>
              <li>With third-party service providers that support app infrastructure (e.g., cloud hosting, analytics)</li>
              <li>With legal authorities when required by law</li>
              <li>With payment processors solely to validate subscription signatures</li>
            </ul>

            <h2>4. Storage and Security</h2>
            <ul>
              <li>Data is stored on secure, encrypted servers</li>
              <li>Access is restricted to authorized personnel only</li>
              <li>Backup and redundancy procedures are in place</li>
            </ul>

            <h2>5. Data Retention</h2>
            <p>We retain your data for as long as your account is active or until you request deletion. Certain data may be retained for legally required periods after deletion.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to or correction of your personal data</li>
              <li>Request deletion of your account and all associated data</li>
              <li>Withdraw consent where applicable</li>
              <li>Disable notifications at any time via device settings</li>
            </ul>

            <h2>7. Data Deletion Request</h2>
            <p>You can request the deletion of your personal data and account at any time using one of the methods below:</p>
            <ul>
              <li><strong>By email:</strong> Send a deletion request to <a href="mailto:wesleyfilipy454@gmail.com">wesleyfilipy454@gmail.com</a> with the subject line <em>"Data Deletion Request"</em> and your registered email address.</li>
              <li><strong>By in-app request:</strong> Contact us through the support option inside the Exact Calories app.</li>
            </ul>
            <p>Upon receiving your request, we will permanently delete your account and all associated personal data within <strong>30 days</strong>. You will receive a confirmation email once the deletion is complete.</p>
            <p>Please note: some data may be retained for a limited period where required by law or for legitimate business purposes (e.g., fraud prevention), after which it will also be deleted.</p>

            <h2>8. Children</h2>
            <p>Exact Calories is not directed at children under 13. We do not knowingly collect personal data from children.</p>

            <h2>9. Policy Changes</h2>
            <p>We may update this policy from time to time. We will notify you of significant changes via the app or email.</p>

            <h2>10. Contact</h2>
            <p>For questions, requests, or complaints regarding your privacy:</p>
            <p><strong>Email:</strong> <a href="mailto:wesleyfilipy454@gmail.com">wesleyfilipy454@gmail.com</a></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
