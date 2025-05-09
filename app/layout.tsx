import type React from "react";
import "./globals.css";
import AmbientBackground from "@/components/ambient-background"; // Import AmbientBackground
import type { Metadata, Viewport } from "next";
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

// Define viewport export for better mobile optimization
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'light dark',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Veni Developments | Premium Web & App Development Services Canada",
    template: "%s | Veni Developments - Canadian Digital Agency",
  },
  description:
    "Veni Developments delivers extraordinary web design, app development, and digital marketing solutions across Canada. We create custom digital experiences that drive business growth for companies in all provinces including Ontario, Quebec, British Columbia, Alberta and beyond.",
  generator: "Veni Developments",
  applicationName: "Veni Developments",
  referrer: 'origin-when-cross-origin',
  keywords: [
    "App Development Canada",
    "Web Development Canada",
    "Mobile App Development Canada",
    "Web App Development Canada",
    "iOS App Development Canada",
    "Android App Development Canada",
    "Custom Software Development Canada",
    "Web Design Canada",
    "Digital Agency Canada",
    "E-commerce Development Canada",
    "React Development Canada",
    "Next.js Development",
    "Toronto Web Development",
    "Vancouver App Development",
    "Montreal Digital Agency",
    "Calgary Web Design",
    "Ottawa Web Development",
    "Edmonton App Developers",
    "Quebec City Web Design",
    "Winnipeg Digital Services",
    "Canada Software Companies",
    "Enterprise Web Solutions Canada",
    "Custom Business Applications Canada"
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
    canonical: '/',
    languages: {
      'en-CA': '/',
      'fr-CA': '/fr',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Add your Google verification code
    yandex: 'yandex-verification-code', // Add your Yandex verification code
    yahoo: 'yahoo-verification-code', // Add your Yahoo verification code
    bing: 'bing-verification-code', // Add your Bing verification code
  },
  openGraph: {
    title: "Veni Developments | Premium Web & App Development Across Canada",
    description: "Expert Canadian digital agency crafting exceptional web and app solutions that deliver real business results. Serving all provinces with custom development services.",
    url: siteUrl,
    siteName: "Veni Developments",
    images: [
      {
        url: `${siteUrl}/og-image.jpg`, // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: "Veni Developments - Canadian Digital Agency",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Veni Developments | Premium Web & App Development Across Canada",
    description: "Expert Canadian digital agency crafting exceptional web and app solutions that deliver real business results. Serving all provinces with custom development services.",
    creator: "@VeniDev",
    images: [`${siteUrl}/twitter-image.jpg`], // Replace with actual Twitter image
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  manifest: `${siteUrl}/site.webmanifest`,
  archives: [`${siteUrl}/blog/archive`],
  category: 'technology',
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Veni Developments",
  "url": siteUrl,
  "logo": `${siteUrl}/logo.png`,
  "description": "Premium web and mobile app development agency serving all Canadian provinces with custom digital solutions that drive business growth.",
  "slogan": "Elevating Canadian businesses through innovative digital solutions",
  "email": "hello@venidevelopments.ca",
  "telephone": "+1-888-123-4567",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+1-888-123-4567",
      "contactType": "Customer Service",
      "areaServed": "CA",
      "availableLanguage": ["en", "fr"],
      "hoursAvailable": "Mo,Tu,We,Th,Fr 09:00-17:00"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-888-123-4568",
      "contactType": "Technical Support",
      "areaServed": "CA",
      "availableLanguage": ["en", "fr"],
      "hoursAvailable": "Mo,Tu,We,Th,Fr 09:00-17:00"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+1-888-123-4569",
      "contactType": "Sales",
      "areaServed": "CA",
      "availableLanguage": ["en", "fr"],
      "hoursAvailable": "Mo,Tu,We,Th,Fr 09:00-17:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/venidevelopments",
    "https://twitter.com/VeniDev",
    "https://www.linkedin.com/company/veni-developments",
    "https://www.instagram.com/venidevelopments/",
    "https://github.com/veni-developments"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Innovation Drive",
    "addressLocality": "Toronto",
    "addressRegion": "ON",
    "postalCode": "M5V 2N4",
    "addressCountry": "CA"
  },
  "foundingDate": "2020-01-01",
  "founders": [
    {
      "@type": "Person",
      "name": "Veni Founder"
    }
  ],
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "25"
  },
  "award": [
    "Best Canadian Web Development Agency 2023",
    "Top Mobile App Developer in Canada 2022"
  ]
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Veni Developments",
  "url": siteUrl,
  "description": "Premium web and mobile app development agency serving businesses across Canada with custom digital solutions.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${siteUrl}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Veni Developments",
    "logo": {
      "@type": "ImageObject",
      "url": `${siteUrl}/logo.png`
    }
  }
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web and Mobile App Development",
  "provider": {
    "@type": "Organization",
    "name": "Veni Developments",
    "url": siteUrl
  },
  "description": "Professional web and app development services for Canadian businesses across all provinces.",
  "areaServed": [
    {
      "@type": "Country",
      "name": "Canada"
    },
    {
      "@type": "State",
      "name": "Ontario"
    },
    {
      "@type": "State",
      "name": "Quebec"
    },
    {
      "@type": "State",
      "name": "British Columbia"
    },
    {
      "@type": "State",
      "name": "Alberta"
    },
    {
      "@type": "State",
      "name": "Manitoba"
    },
    {
      "@type": "State",
      "name": "Saskatchewan"
    },
    {
      "@type": "State",
      "name": "Nova Scotia"
    },
    {
      "@type": "State",
      "name": "New Brunswick"
    },
    {
      "@type": "State",
      "name": "Newfoundland and Labrador"
    },
    {
      "@type": "State",
      "name": "Prince Edward Island"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Digital Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile App Development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "E-Commerce Development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Marketing"
        }
      }
    ]
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
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
