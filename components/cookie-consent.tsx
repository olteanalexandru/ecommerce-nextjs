'use client';

import { useTranslations } from 'next-intl';
import CookieConsent from 'react-cookie-consent';

export function CookieConsentBanner() {
  const t = useTranslations('Cookie');

  return (
    <CookieConsent
      location="bottom"
      buttonText={t('accept')}
      declineButtonText={t('decline')}
      enableDeclineButton
      containerClasses="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-sm border-t border-primary/20 shadow-lg animate-fadeIn z-50"
      contentClasses="text-foreground font-medium max-w-3xl text-sm"
      buttonClasses="skate-button !py-2 !px-4 text-sm ml-4"
      declineButtonClasses="font-skate bg-background hover:bg-accent/10 border-2 border-primary/20 text-foreground 
        px-4 py-2 rounded-xl text-sm uppercase tracking-wider transition-all duration-300 hover:scale-105"
      expires={365}
      onAccept={() => {
        window.localStorage.setItem('cookieConsent', 'accepted');
      }}
      onDecline={() => {
        window.localStorage.setItem('cookieConsent', 'declined');
      }}
      buttonWrapperClasses="flex gap-2 flex-wrap items-center"
      style={{
        alignItems: 'center',
        textAlign: 'left',
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-primary">🍪</span>
        <p className="text-sm leading-relaxed">
          {t('message')}{' '}
          <a 
            href="/legal/cookies" 
            className="font-skate text-primary hover:text-primary/80 transition-all duration-200 inline-block"
          >
            {t('learnMore')} →
          </a>
        </p>
      </div>
    </CookieConsent>
  );
}
