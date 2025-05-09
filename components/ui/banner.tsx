"use client";

import React from 'react';
import { cn } from '@/lib/utils'; // Assuming you have a cn utility

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'glass';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full' | 'default' | 'super'; // Added 'super'
  padding?: 'default' | 'sm' | 'lg';
}

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  ({ className, children, variant = 'default', rounded = 'default', padding = 'default', ...props }, ref) => {
    const baseStyles = "w-full";
    
    const variantStyles = {
      default: "bg-background text-foreground border border-border",
      glass: "bg-white/30 dark:bg-black/30 backdrop-blur-md border border-white/20 dark:border-black/40 shadow-lg",
    };

    const roundedStyles = {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      default: "rounded-lg", // Default to 'lg' as per your example
      lg: "rounded-lg",
      full: "rounded-full",
      super: "rounded-[40px]", // "very rounded"
    };

    const paddingStyles = {
      default: "p-4 md:p-6",
      sm: "p-2 md:p-3",
      lg: "p-6 md:p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          roundedStyles[rounded],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Banner.displayName = 'Banner';

export { Banner };