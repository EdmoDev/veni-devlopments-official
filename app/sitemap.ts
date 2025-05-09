import { MetadataRoute } from 'next';
import { serviceItems } from '@/data/services'; // Adjust path as necessary

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.venidevelopments.ca'; // Ensure this is set in your env

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    // Add other static pages here, e.g., /about, /contact
    // {
    //   url: `${siteUrl}/contact`,
    //   lastModified: new Date(),
    //   changeFrequency: 'yearly',
    //   priority: 0.5,
    // },
  ];

  const servicePageSlugs = serviceItems.map(item => {
    // Create a slug from the title, e.g., "App Development" -> "app-development"
    // This assumes you will have individual pages for services at /services/[slug]
    // If your service pages have a different URL structure, adjust this.
    const title = item.subtitle ? `${item.title} ${item.subtitle}` : item.title;
    return title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  });

  const dynamicServicePages: MetadataRoute.Sitemap = servicePageSlugs.map(slug => ({
    url: `${siteUrl}/services/${slug}`, // Assuming a URL structure like /services/app-development
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // If you don't have individual service pages yet, you might just link to the #services section on homepage
  // or a general /services page. For now, I'm assuming individual pages will be created.

  return [
    ...staticPages,
    ...dynamicServicePages,
  ];
}
