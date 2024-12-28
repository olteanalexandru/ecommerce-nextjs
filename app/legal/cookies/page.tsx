import Prose from 'components/prose';

export default function CookiePolicyPage() {
  const content = `
    <h1>Cookie Policy</h1>

    <p>Last updated: ${new Date().toLocaleDateString()}</p>

    <h2>What Are Cookies</h2>
    <p>Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us make your experience better by:</p>
    <ul>
      <li>Remembering your preferences and settings</li>
      <li>Keeping you signed in</li>
      <li>Understanding how you use our website</li>
      <li>Improving our services based on this information</li>
    </ul>

    <h2>Types of Cookies We Use</h2>
    
    <h3>Essential Cookies</h3>
    <p>These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and shopping cart functionality. The website cannot function properly without these cookies.</p>

    <h3>Performance Cookies</h3>
    <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve how our website works.</p>

    <h3>Functionality Cookies</h3>
    <p>These cookies allow the website to remember choices you make (such as your language preference or the region you are in) and provide enhanced features.</p>

    <h3>Targeting/Advertising Cookies</h3>
    <p>These cookies are used to deliver advertisements more relevant to you and your interests. They are also used to limit the number of times you see an advertisement and help measure the effectiveness of advertising campaigns.</p>

    <h2>Managing Cookies</h2>
    <p>Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may impact your overall user experience. Some features of the website may not function properly if the ability to accept cookies is disabled.</p>

    <h2>Your Consent</h2>
    <p>By continuing to use our website, you consent to our use of cookies as described in this policy. You can withdraw your consent at any time by adjusting your browser settings to reject cookies.</p>

    <h2>Changes to This Policy</h2>
    <p>We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>

    <h2>Contact Us</h2>
    <p>If you have any questions about our Cookie Policy, please contact us through our contact form or email us at support@example.com.</p>
  `;

  return (
    <Prose html={content} className="mb-8 mt-8 px-4" />
  );
}
