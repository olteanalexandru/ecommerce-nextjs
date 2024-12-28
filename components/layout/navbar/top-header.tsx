'use client';

import { useLanguage } from 'components/language-context';
import { LanguageSwitcher } from 'components/language-switcher';
import { ThemeToggle } from 'components/theme/theme-toggle';
import Link from 'next/link';

export function TopHeader() {
  const { messages } = useLanguage();

  return (
    <div className="w-full relative overflow-hidden text-foreground py-2.5 px-4 lg:px-6 backdrop-blur-sm bg-foreground/5">
      {/* Subtle noise texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.15] mix-blend-soft-light"></div>
      {/* Simple border */}
      <div className="absolute h-[1px] bg-foreground/10 w-full bottom-0"></div>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <a
            href="tel:+40755494691"
            className="text-sm font-marker hover:text-primary/80 transition-colors duration-200 flex items-center group relative"
          >
            <span className="hidden sm:flex items-center justify-center w-5 h-5 mr-2 bg-foreground/5 rounded">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-300 skew-x-1">+40 755 494 691</span>
          </a>
          <a
            href="mailto:oltean.alexandru11@gmail.com"
            className="text-sm font-marker hover:text-primary/80 transition-colors duration-200 flex items-center group relative"
          >
            <span className="hidden sm:flex items-center justify-center w-5 h-5 mr-2 bg-foreground/5 rounded">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </span>
            <span className="group-hover:translate-x-0.5 transition-transform duration-300 -skew-x-1">oltean.alexandru11@gmail.com</span>
          </a>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/contact"
            className="text-sm font-marker hover:text-primary/80 transition-colors duration-200 flex items-center relative group"
          >
            Contact
          </Link>
          <div className="flex space-x-4 border-l border-foreground/10 pl-4 relative">
            <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent"></div>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary/80 transition-colors duration-200 relative"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary/80 transition-colors duration-200 relative"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2.16c3.2,0,3.58,0,4.85.07,3.25.15,4.77,1.69,4.92,4.92.06,1.27.07,1.65.07,4.85s0,3.58-.07,4.85c-.15,3.23-1.66,4.77-4.92,4.92-1.27.06-1.65.07-4.85.07s-3.58,0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s0-3.58.07-4.85C2.38,3.92,3.9,2.38,7.15,2.23,8.42,2.18,8.8,2.16,12,2.16ZM12,0C8.74,0,8.33,0,7.05.07c-4.27.2-6.78,2.71-7,7C0,8.33,0,8.74,0,12s0,3.67.07,4.95c.2,4.27,2.71,6.78,7,7C8.33,24,8.74,24,12,24s3.67,0,4.95-.07c4.27-.2,6.78-2.71,7-7C24,15.67,24,15.26,24,12s0-3.67-.07-4.95c-.2-4.27-2.71-6.78-7-7C15.67,0,15.26,0,12,0Zm0,5.84A6.16,6.16,0,1,0,18.16,12,6.16,6.16,0,0,0,12,5.84ZM12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16ZM18.41,4.15a1.44,1.44,0,1,0,1.44,1.44A1.44,1.44,0,0,0,18.41,4.15Z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary/80 transition-colors duration-200 relative"
            >
              <span className="sr-only">Twitter</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.39,4.49A14,14,0,0,1,1.64,3.16,4.92,4.92,0,0,0,3.2,9.72,4.86,4.86,0,0,1,1,9.13v.06a4.93,4.93,0,0,0,3.95,4.83,4.86,4.86,0,0,1-2.22.08,4.93,4.93,0,0,0,4.6,3.42A9.87,9.87,0,0,1,0,19.54a13.94,13.94,0,0,0,7.55,2.21,13.9,13.9,0,0,0,14-13.73c0-.21,0-.42,0-.63A10,10,0,0,0,24,4.59Z"/>
              </svg>
            </a>
          </div>
          <div className="flex items-center space-x-3 border-l border-foreground/10 pl-4 relative">
            <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-foreground/20 to-transparent"></div>
            <div>
              <LanguageSwitcher />
            </div>
            <div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
