import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/', '/tmp/', '/drafts/'],
    },
    sitemap: 'https://www.venidevelopments.ca/sitemap.xml',
    host: 'https://www.venidevelopments.ca',
  };
}