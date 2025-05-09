"use client";

import React, { useState, useEffect } from 'react';
import { Button } from './button';
import { Banner } from './banner'; // Import the new Banner component
import { cn } from '@/lib/utils';

const COOKIE_CONSENT_KEY = 'veni_cookie_consent_v2'; // Changed key to re-trigger for users if needed

const CookieConsentBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if running in browser environment
    if (typeof window !== 'undefined') {
      const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consentGiven) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
      setIsVisible(false);
      // Trigger analytics initialization if configured
      console.log("Cookie consent accepted. Analytics can now be initialized.");
      // Example: window.dispatchEvent(new CustomEvent('cookieConsentGiven'));
    }
  };

  const handleDecline = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'declined');
      setIsVisible(false);
      console.log("Cookie consent declined.");
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-6 flex justify-center z-50 pointer-events-none">
      <Banner
        variant="glass"
        rounded="super" // "very rounded"
        className={cn(
          "shadow-2xl shadow-black/20 dark:shadow-black/40 max-w-2xl w-full pointer-events-auto",
          "border-white/40 dark:border-black/60" // Slightly more pronounced border for glass
        )}
        // Add a subtle animation for appearance
        style={{
            animation: isVisible ? 'fadeInUp 0.5s ease-out forwards' : 'none',
            opacity: 0, // Start hidden for animation
        }}
      >
        <div className="w-full">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p className="text-sm text-foreground/90 dark:text-foreground/80">
              We use cookies to improve your experience, analyze site usage, and show personalized content.
            </p>
            <div className="flex shrink-0 gap-3 max-md:flex-wrap">
              <Button onClick={handleAccept} size="sm" variant="default" className="bg-primary text-primary-foreground hover:bg-primary/90 flex-grow md:flex-grow-0">Accept</Button>
              <Button onClick={handleDecline} variant="outline" size="sm" className="border-foreground/30 hover:bg-foreground/5 text-foreground/80 flex-grow md:flex-grow-0">Decline</Button>
            </div>
          </div>
        </div>
      </Banner>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CookieConsentBanner;