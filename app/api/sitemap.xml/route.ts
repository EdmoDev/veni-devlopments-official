// Use Next.js Response API for dynamic route
import { serviceItems } from '@/data/services';

// Create dynamic sitemap with server-side logic for maximum SEO optimization
export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.venidevelopments.ca';
  
  // Canadian provinces
  const provinces = [
    'ontario',
    'quebec',
    'british-columbia',
    'alberta',
    'manitoba',
    'saskatchewan',
    'nova-scotia',
    'new-brunswick',
    'newfoundland-and-labrador',
    'prince-edward-island'
  ];

  // Major cities in each province for hyper-local targeting
  const citiesByProvince: Record<string, string[]> = {
    'ontario': ['toronto', 'ottawa', 'mississauga', 'brampton', 'hamilton', 'london', 'markham', 'vaughan', 'kitchener', 'windsor'],
    'quebec': ['montreal', 'quebec-city', 'laval', 'gatineau', 'longueuil', 'sherbrooke', 'saguenay', 'levis', 'trois-rivieres'],
    'british-columbia': ['vancouver', 'surrey', 'burnaby', 'richmond', 'abbotsford', 'coquitlam', 'kelowna', 'victoria', 'nanaimo'],
    'alberta': ['calgary', 'edmonton', 'red-deer', 'lethbridge', 'fort-mcmurray', 'medicine-hat', 'grande-prairie', 'airdrie'],
    'manitoba': ['winnipeg', 'brandon', 'steinbach', 'thompson', 'portage-la-prairie', 'winkler'],
    'saskatchewan': ['saskatoon', 'regina', 'prince-albert', 'moose-jaw', 'swift-current', 'yorkton'],
    'nova-scotia': ['halifax', 'dartmouth', 'sydney', 'truro', 'new-glasgow', 'bridgewater'],
    'new-brunswick': ['moncton', 'saint-john', 'fredericton', 'miramichi', 'edmundston', 'bathurst'],
    'newfoundland-and-labrador': ['st-johns', 'mount-pearl', 'corner-brook', 'grand-falls-windsor', 'gander'],
    'prince-edward-island': ['charlottetown', 'summerside', 'stratford', 'cornwall']
  };

  // Service page slugs
  const servicePageSlugs = serviceItems.map(item => {
    const title = item.subtitle ? `${item.title} ${item.subtitle}` : item.title;
    return title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
  });

  // Current date for lastmod
  const currentDate = new Date().toISOString();

  // Start building the sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
              http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

  // Core pages
  const corePages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/services', priority: '0.9', changefreq: 'monthly' },
    { url: '/work', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog', priority: '0.8', changefreq: 'weekly' },
  ];

  // Add core pages to sitemap
  corePages.forEach(page => {
    sitemap += `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  // Add service pages to sitemap
  servicePageSlugs.forEach(slug => {
    sitemap += `  <url>
    <loc>${siteUrl}/services/${slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  // Add province pages to sitemap
  provinces.forEach(province => {
    sitemap += `  <url>
    <loc>${siteUrl}/locations/${province}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;

    // Add service pages for each province
    servicePageSlugs.forEach(service => {
      sitemap += `  <url>
    <loc>${siteUrl}/locations/${province}/${service}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    });

    // Add city pages for each province
    (citiesByProvince[province] || []).forEach(city => {
      sitemap += `  <url>
    <loc>${siteUrl}/locations/${province}/${city}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;

      // Add main service pages for each city
      ['web-development', 'app-development', 'e-commerce'].forEach(service => {
        sitemap += `  <url>
    <loc>${siteUrl}/locations/${province}/${city}/${service}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;
      });
    });
  });

  // Add blog posts (placeholders - in a real implementation, you'd generate these from your actual blog posts)
  const blogPosts = [
    'web-development-trends-canada-2024',
    'app-development-cost-guide-canada',
    'seo-optimization-techniques-canadian-businesses',
    'react-vs-angular-for-canadian-businesses',
    'ecommerce-platforms-comparison-for-canadian-retailers'
  ];

  blogPosts.forEach(post => {
    sitemap += `  <url>
    <loc>${siteUrl}/blog/${post}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  // Close the sitemap
  sitemap += `</urlset>`;

  // Return the XML with appropriate headers
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200'
    }
  });
}