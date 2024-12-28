import Prose from 'components/prose';

export default function FAQPage() {
  const content = `
    <h1>Frequently Asked Questions</h1>

    <h2>Ordering & Shipping</h2>
    <h3>How long does shipping take?</h3>
    <p>Shipping times vary depending on your location. Typically, orders are delivered within:</p>
    <ul>
      <li>Domestic orders: 5-10 business days</li>
      <li>International orders: 10-20 business days</li>
    </ul>

    <h3>Do you ship internationally?</h3>
    <p>Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.</p>

    <h3>How can I track my order?</h3>
    <p>Once your order ships, you'll receive a tracking number via email to monitor your package's journey.</p>

    <h2>Returns & Refunds</h2>
    <h3>What's your return policy?</h3>
    <p>We accept returns within 30 days of delivery. Items must be unused and in their original packaging.</p>

    <h3>How do I initiate a return?</h3>
    <p>Contact our customer service team through the contact form with your order number to start the return process.</p>

    <h2>Product Information</h2>
    <h3>Are your product descriptions accurate?</h3>
    <p>We strive to provide accurate descriptions and images. However, slight variations in color may occur due to different screen settings.</p>

    <h3>What if an item is out of stock?</h3>
    <p>Out-of-stock items are marked on the website. You can sign up for notifications when the item becomes available.</p>

    <h2>Payment & Security</h2>
    <h3>What payment methods do you accept?</h3>
    <p>We accept major credit cards, PayPal, and other secure payment methods.</p>

    <h3>Is my payment information secure?</h3>
    <p>Yes, we use industry-standard encryption to protect your payment information.</p>

    <h2>Contact</h2>
    <h3>How can I contact customer service?</h3>
    <p>You can reach us through our contact form or email us at support@example.com. We aim to respond within 24 hours.</p>
  `;

  return (
    <Prose html={content} className="mb-8 mt-8 px-4" />
  );
}
