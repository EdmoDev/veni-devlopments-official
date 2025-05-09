import type React from "react";
import "./globals.css";
import AmbientBackground from "@/components/ambient-background"; // Import AmbientBackground
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CustomCursor from "@/components/custom-cursor";
import { ThemeProvider } from "@/components/theme-provider";
import SmoothScrollWrapper from "@/components/smooth-scroll-wrapper";
import CookieConsentBanner from "@/components/ui/cookie-consent-banner"; // Import Cookie Banner
import Script from 'next/script'; // For GA

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const siteUrl = "https://www.venidevelopments.ca"; // Replace with your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // Important for resolving relative Open Graph image paths
  title: {
    default: "Veni Developments | Custom App & Web Development Canada",
    template: "%s | Veni Developments Canada",
  },
  description:
    "Veni Developments: Your expert Canadian partner for innovative app development (iOS, Android, Web Apps), custom web design, and strategic digital solutions. Based in Canada, serving businesses nationwide.",
  generator: "Veni Developments", // Changed from v0.dev
  applicationName: "Veni Developments",
  referrer: 'origin-when-cross-origin',
  keywords: [
    "App Development Canada",
    "Mobile App Development Canada",
    "Web App Development Canada",
    "iOS App Development Canada",
    "Android App Development Canada",
    "Custom Software Canada",
    "Web Design Canada",
    "Digital Agency Canada",
    "Veni Developments",
    "Software Development Companies in Canada",
    "App Developers Canada",
    "Hire App Developers Canada"
  ],
  authors: [{ name: 'Veni Developments', url: siteUrl }],
  creator: 'Veni Developments',
  publisher: 'Veni Developments',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/', // Self-referencing canonical for the homepage
    // languages: { // If you add internationalization later
    //   'en-CA': '/en-CA',
    // },
  },
  openGraph: {
    title: "Veni Developments | Custom App & Web Development Canada",
    description: "Expert Canadian app (iOS, Android, Web) and web development services. Let's build your next digital product.",
    url: siteUrl,
    siteName: "Veni Developments",
    images: [
      {
        url: `${siteUrl}/placeholder-logo.svg`, // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Veni Developments Logo",
      },
    ],
    locale: "en_CA", // Specify Canadian English
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veni Developments | Custom App & Web Development Canada",
    description: "Expert Canadian app (iOS, Android, Web) and web development services. Let's build your next digital product.",
    // siteId: "YourTwitterSiteId", // If you have one
    creator: "@YourTwitterHandle", // Replace with your Twitter handle
    // creatorId: "YourTwitterCreatorId",
    images: [`${siteUrl}/placeholder-logo.svg`], // Replace with your actual Twitter image URL
  },
  // icons: { // Add if you have specific favicons beyond the default
  //   icon: '/favicon.ico',
  //   shortcut: '/shortcut-icon.png',
  //   apple: '/apple-icon.png',
  //   other: {
  //     rel: 'apple-touch-icon-precomposed',
  //     url: '/apple-touch-icon-precomposed.png',
  //   },
  // },
  // manifest: `${siteUrl}/site.webmanifest`, // If you have a web app manifest
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Veni Developments",
  "url": siteUrl,
  "logo": `${siteUrl}/placeholder-logo.svg`, // Replace with your actual logo URL
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX", // Replace with your actual phone number
    "contactType": "Customer Service",
    "areaServed": "CA",
    "availableLanguage": ["en"]
  },
  "sameAs": [
    // "https://www.facebook.com/YourPage",
    // "https://twitter.com/YourTwitterHandle",
    // "https://www.linkedin.com/company/YourCompanyPage"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Innovation Drive", // Replace if applicable
    "addressLocality": "Tech City",
    "addressRegion": "ON",
    "postalCode": "M5A 1A1",
    "addressCountry": "CA"
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Veni Developments",
  "url": siteUrl,
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Google Analytics (GA4) - Replace G-XXXXXXXXXX with your Measurement ID */}
        {/* This basic setup loads GA4 directly. For consent-based loading, you'd conditionally render this or use a tag manager. */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="ga4-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <AmbientBackground /> {/* Add AmbientBackground here */}
        <CustomCursor variant="default" />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollWrapper>
            {children}
            {/* Scroll Fading Overlay - consider moving inside smooth-content if it should scroll with content */}
            <div className="scroll-overlay left-right"></div>
          </SmoothScrollWrapper>
        </ThemeProvider>
        <CookieConsentBanner /> {/* Add Cookie Consent Banner here */}
      </body>
    </html>
  );
}
