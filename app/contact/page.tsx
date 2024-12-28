'use client';

import emailjs from '@emailjs/browser';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        'service_ynv83op',
        'template_3oljtxo',
        {
          to_email: 'oltean.alexandru11@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        '92Cb78cmp5MUyYktO'
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      console.error('Failed to send email:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="mb-8 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium">Phone:</h3>
          <a href="tel:+40755494691" className="text-primary hover:text-primary/80">
            +40 755 494 691
          </a>
        </div>
        
        <div>
          <h3 className="font-medium">Email:</h3>
          <a href="mailto:oltean.alexandru11@gmail.com" className="text-primary hover:text-primary/80">
            oltean.alexandru11@gmail.com
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={4}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
            value={formData.message}
            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80 transition-colors duration-200 disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-green-500 text-center">Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
        )}
      </form>
    </div>
  );
}
