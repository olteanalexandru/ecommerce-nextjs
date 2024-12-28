import Prose from 'components/prose';

export default function TermsPage() {
  const content = `
    <h1>Terms and Conditions</h1>

    <p>Last updated: ${new Date().toLocaleDateString()}</p>

    <h2>1. Introduction</h2>
    <p>Welcome to our website. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>

    <h2>2. Use License</h2>
    <p>Permission is granted to temporarily access the materials (information or software) on our website for personal, non-commercial transitory viewing only.</p>
    <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
    <ul>
      <li>Modify or copy the materials</li>
      <li>Use the materials for any commercial purpose</li>
      <li>Attempt to decompile or reverse engineer any software contained on the website</li>
      <li>Remove any copyright or other proprietary notations from the materials</li>
      <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
    </ul>

    <h2>3. Product Information</h2>
    <p>We strive to display our products and their colors as accurately as possible. However, we cannot guarantee that your computer monitor's display of any color will be accurate.</p>
    <p>We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products are subject to change at any time without notice, at our sole discretion.</p>

    <h2>4. Pricing and Payment</h2>
    <p>All prices are subject to change without notice. We reserve the right to modify or discontinue any product without notice.</p>
    <p>We accept various forms of payment, including major credit cards and other secure payment methods. By submitting your order, you represent and warrant that you are authorized to use the designated payment method.</p>

    <h2>5. Shipping and Delivery</h2>
    <p>Shipping times and costs vary depending on the delivery location and selected shipping method. We are not responsible for any delays caused by customs or other factors outside our control.</p>

    <h2>6. Returns and Refunds</h2>
    <p>We accept returns within 30 days of delivery. Items must be unused and in their original packaging. Certain items may be exempt from returns.</p>
    <p>Refunds will be processed using the original payment method once we receive and inspect the returned items.</p>

    <h2>7. Account Responsibilities</h2>
    <p>If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>

    <h2>8. Privacy Policy</h2>
    <p>Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.</p>

    <h2>9. Disclaimer</h2>
    <p>The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

    <h2>10. Limitations</h2>
    <p>In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>

    <h2>11. Governing Law</h2>
    <p>These terms and conditions are governed by and construed in accordance with the laws, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>

    <h2>12. Changes to Terms</h2>
    <p>We reserve the right to modify these terms at any time. Please review these terms periodically for changes. Your continued use of our website following the posting of changes constitutes acceptance of those changes.</p>

    <h2>13. Contact Information</h2>
    <p>If you have any questions about our Terms and Conditions, please contact us through our contact form or email us at support@example.com.</p>
  `;

  return (
    <Prose html={content} className="mb-8 mt-8 px-4" />
  );
}
