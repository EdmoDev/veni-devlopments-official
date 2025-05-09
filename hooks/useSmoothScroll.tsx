import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const useSmoothScroll = (smoothWrapperId: string = 'smooth-wrapper', smoothContentId: string = 'smooth-content') => {
  useEffect(() => {
    // Ensure the elements exist before trying to create the smoother
    const wrapper = document.getElementById(smoothWrapperId);
    const content = document.getElementById(smoothContentId);

    if (!wrapper || !content) {
      console.warn(`Smooth scroll wrapper ('${smoothWrapperId}') or content ('${smoothContentId}') not found. Smooth scrolling will not be initialized.`);
      return;
    }

    const smoother = ScrollSmoother.create({
      wrapper: `#${smoothWrapperId}`,
      content: `#${smoothContentId}`,
      smooth: 1.5, // Adjust smoothness (default is 1)
      effects: true, // Enable parallax effects if needed later
      // normalizeScroll: true, // Might be needed for touch devices, but can have performance implications
    });

    // Kill the smoother on component unmount to prevent memory leaks
    return () => {
      if (smoother) {
        smoother.kill();
      }
      // Also kill all ScrollTriggers associated with this smoother
      ScrollTrigger.getAll().forEach(st => {
        if (st.scroller === (smoother.wrapper as unknown as Element) || st.scroller === window) {
          // Check if the trigger is associated with the smoother or global window
          // This is a broad check; more specific checks might be needed if you have many ScrollTriggers
        }
      });
    };
  }, [smoothWrapperId, smoothContentId]);
};

export default useSmoothScroll;