'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🌿 Welcome to LOONER THC Beverages!', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            Discover our premium collection of cannabis-infused beverages. Crafted for quality and taste.{' '}
            <a
              href="/search"
              className="text-green-600 hover:underline"
              target="_blank"
            >
              Shop Now
            </a>
            .
          </>
        )
      });
    }
  }, []);

  return null;
}
