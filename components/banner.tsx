'use client';

import { useTranslations } from 'next-intl';

export function Banner() {
  const t = useTranslations('banner');

  return (
    <div className="relative overflow-hidden bg-background text-foreground py-12 mb-8 skew-y-1 transform-gpu">
      {/* Asymmetric background */}
      <div className="absolute inset-0 bg-foreground/5 -skew-x-6"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-noise mix-blend-overlay"></div>
      </div>
      
      {/* Glitch lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-[2px] bg-foreground/20 w-[120%] -left-[10%] top-1/4 -rotate-3 animate-glitch-slide"></div>
        <div className="absolute h-[2px] bg-foreground/20 w-[120%] -left-[10%] bottom-1/3 rotate-2 animate-glitch-slide-reverse"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 -skew-x-2">
        <h2 className="text-[4.5rem] font-normal font-skate mb-4 tracking-wide rotate-1 translate-x-6 hover:-rotate-1 transition-transform duration-300 uppercase">
          {t('title')}
        </h2>
        <p className="text-2xl font-skate max-w-2xl ml-auto -rotate-2 translate-y-2 hover:translate-y-0 transition-transform duration-300 pl-8">
          {t('message')}
        </p>
      </div>

      {/* Style for animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes track1 {
          0% { transform: translateX(-100%) rotate(-45deg); }
          100% { transform: translateX(100%) rotate(-45deg); }
        }
        @keyframes track2 {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        .animate-track-1 {
          animation: track1 8s linear infinite;
        }
        .animate-track-2 {
          animation: track2 8s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounceSlow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
