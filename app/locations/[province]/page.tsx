'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { VeniLogo } from '@/components/ui/buttons';

// Province name formatting helper
function formatProvinceName(province: string): string {
  const formattedNames: Record<string, string> = {
    'ontario': 'Ontario',
    'quebec': 'Quebec',
    'british-columbia': 'British Columbia',
    'alberta': 'Alberta',
    'manitoba': 'Manitoba',
    'saskatchewan': 'Saskatchewan',
    'nova-scotia': 'Nova Scotia',
    'new-brunswick': 'New Brunswick',
    'newfoundland-and-labrador': 'Newfoundland and Labrador',
    'prince-edward-island': 'Prince Edward Island'
  };
  
  return formattedNames[province] || province.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Province descriptions with strong SEO content
const provinceDescriptions: Record<string, string> = {
  'ontario': "Ontario tech hub needs digital solutions that scale. Veni Developments delivers custom web and app development services tailored to Ontario businesses, from Toronto startups to Ottawa enterprises.",
  'quebec': "Quebec businesses require bilingual digital solutions. Veni Developments creates stunning websites and powerful applications that respect Quebec's unique cultural landscape and business environment.",
  'british-columbia': "From Vancouver's tech scene to Victoria's growing businesses, British Columbia companies trust Veni Developments for innovative digital solutions that showcase the west coast advantage.",
  'alberta': "Alberta's entrepreneurial spirit deserves powerful digital tools. Veni Developments helps Calgary and Edmonton businesses build web platforms and applications that fuel growth across sectors.",
  'manitoba': "Manitoba businesses looking to expand their digital presence find the perfect partner in Veni Developments. We create custom websites and applications that help Winnipeg companies thrive.",
  'saskatchewan': "Saskatchewan's growing economy needs strong digital foundations. Veni Developments provides Regina and Saskatoon businesses with web and app solutions built for prairie success.",
  'nova-scotia': "Nova Scotia businesses connect globally with Veni Developments' custom digital solutions. Our web and app development services help Halifax companies showcase Maritime excellence.",
  'new-brunswick': "New Brunswick entrepreneurs trust Veni Developments to build digital platforms that reach beyond borders. Our custom websites and apps help Fredericton and Saint John businesses grow.",
  'newfoundland-and-labrador': "Newfoundland and Labrador businesses overcome geographical challenges with Veni Developments' digital solutions. We create websites and apps that help St. John's companies connect globally.",
  'prince-edward-island': "Prince Edward Island's unique businesses deserve custom digital experiences. Veni Developments helps Charlottetown entrepreneurs create web and app solutions that highlight island innovation."
};

export default function ProvincePage({ params }: { params: { province: string } }) {
  const provinceName = formatProvinceName(params.province);
  const provinceDesc = provinceDescriptions[params.province] || 
    `Custom web development and app design services for ${provinceName} businesses. Veni Developments creates innovative digital solutions tailored to the ${provinceName} market.`;

  return (
    <main className="min-h-screen bg-white text-black overflow-x-hidden font-light">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 bg-white/80 backdrop-blur-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <VeniLogo />
          </Link>

          <nav className="hidden md:flex space-x-10 items-center">
            <Link href="/#about" className="hover:text-gray-600 transition-colors">
              About
            </Link>
            <Link href="/#services" className="hover:text-gray-600 transition-colors">
              Services
            </Link>
            <Link href="/#work" className="hover:text-gray-600 transition-colors">
              Our Work
            </Link>
            <Link href="/#contact" className="hover:text-gray-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Province Hero */}
      <section className="pt-32 pb-16 px-6 min-h-[50vh] flex flex-col justify-center relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-widest mb-6 text-gray-500">
            Digital Solutions in {provinceName}
          </div>

          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-extralight leading-tight">
              <span className="block">Expert Web & App</span>
              <span className="block">Development in</span>
              <span className="block">{provinceName}</span>
            </h1>
          </div>

          <div className="max-w-2xl">
            <p className="text-xl mb-8">{provinceDesc}</p>

            <Link href="#contact" className="btn-primary">
              Start Your {provinceName} Project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services for this province */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extralight mb-12">Our Services in {provinceName}</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-light mb-4">Web Development</h3>
              <p className="mb-6">Custom websites that perfectly represent your {provinceName} business online, optimized for local search.</p>
              <Link href={`/locations/${params.province}/web-development`} className="text-black flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-light mb-4">App Development</h3>
              <p className="mb-6">Native and cross-platform mobile applications built for {provinceName} businesses and consumers.</p>
              <Link href={`/locations/${params.province}/app-development`} className="text-black flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-light mb-4">E-Commerce</h3>
              <p className="mb-6">Online stores that help {provinceName} businesses sell products and services locally and beyond.</p>
              <Link href={`/locations/${params.province}/e-commerce`} className="text-black flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local Advantage */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extralight mb-12">The {provinceName} Advantage</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-xl mb-6">Working with a development team that understands the {provinceName} market gives your business a competitive edge. At Veni Developments, we combine:</p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">•</span>
                  <span>Deep knowledge of {provinceName}'s business landscape and customer expectations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">•</span>
                  <span>Technical expertise that delivers cutting-edge digital solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">•</span>
                  <span>Local support and ongoing partnership throughout your project</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">•</span>
                  <span>Strategic insight to help you outperform competitors in {provinceName}</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col justify-center">
              <blockquote className="text-2xl font-light italic">
                "We help {provinceName} businesses transform their digital presence with solutions designed specifically for local success and global reach."
              </blockquote>
              <div className="mt-4 text-gray-500">— Veni Developments Team</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 px-6 bg-gray-50 rounded-t-[40px]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extralight mb-6">Start Your {provinceName} Project</h2>
          <p className="text-xl max-w-2xl mb-12">Ready to elevate your digital presence in {provinceName}? Let's discuss how Veni Developments can help your business succeed online.</p>
          
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black text-white rounded-t-[60px]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <VeniLogo />
            <div className="mt-4 text-sm opacity-70">Digital Solutions for {provinceName}</div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2 opacity-70">
              <li>
                <Link href={`/locations/${params.province}/web-development`}>Web Development</Link>
              </li>
              <li>
                <Link href={`/locations/${params.province}/app-development`}>App Development</Link>
              </li>
              <li>
                <Link href={`/locations/${params.province}/e-commerce`}>E-Commerce</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2 opacity-70">
              <li>
                <span>hello@venidevelopments.ca</span>
              </li>
              <li>
                <span>+1 (888) 123-4567</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">{provinceName} Service Areas</h4>
            <p className="opacity-70">Proudly serving businesses throughout {provinceName} and across Canada.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-sm opacity-50">
          © {new Date().getFullYear()} Veni Developments Lab. All rights reserved.
        </div>
      </footer>
    </main>
  );
}