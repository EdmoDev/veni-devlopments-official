'use client';

import { serviceItems } from '@/data/services';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { VeniLogo } from '@/components/ui/buttons';

// Get service data by slug
function getServiceBySlug(slug: string) {
  return serviceItems.find((item) => {
    const title = item.subtitle ? `${item.title} ${item.subtitle}` : item.title;
    const itemSlug = title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');
    return itemSlug === slug;
  });
}

// Format service title for display
function formatServiceTitle(service: string): string {
  return service
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const serviceData = getServiceBySlug(params.service);
  const serviceName = serviceData 
    ? (serviceData.subtitle ? `${serviceData.title} ${serviceData.subtitle}` : serviceData.title)
    : formatServiceTitle(params.service);
  
  const description = serviceData?.description || 
    `Expert ${serviceName} services from Veni Developments, Canada's leading digital agency. We create custom solutions for businesses across all provinces.`;

  // Dynamically generate content based on service type
  let serviceContent;
  if (params.service === 'web-development' || params.service === 'web-design') {
    serviceContent = (
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl font-light mb-6">Modern Web Solutions</h3>
          <p className="mb-6">
            We build fast, responsive, and scalable websites using the latest technologies like React, Next.js, and
            modern CSS frameworks. Our websites are designed to provide exceptional user experiences
            while meeting your business objectives.
          </p>
          <h3 className="text-2xl font-light mb-6">Our Web Development Process</h3>
          <ol className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="mr-4 font-bold">1.</span>
              <span>Discovery & Strategy: Understanding your business goals and target audience</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">2.</span>
              <span>Design: Creating wireframes and visual designs for your approval</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">3.</span>
              <span>Development: Building your website with clean, efficient code</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">4.</span>
              <span>Testing & QA: Ensuring your site works flawlessly across all devices</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">5.</span>
              <span>Launch & Maintenance: Deploying your site and providing ongoing support</span>
            </li>
          </ol>
        </div>
        <div>
          <h3 className="text-2xl font-light mb-6">Web Technologies We Excel In</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Frontend</h4>
              <ul className="space-y-1 text-sm">
                <li>React & Next.js</li>
                <li>Tailwind CSS</li>
                <li>TypeScript</li>
                <li>GSAP Animations</li>
                <li>Responsive Design</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Backend</h4>
              <ul className="space-y-1 text-sm">
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>PostgreSQL</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">E-Commerce</h4>
              <ul className="space-y-1 text-sm">
                <li>Shopify</li>
                <li>WooCommerce</li>
                <li>Custom Solutions</li>
                <li>Payment Gateways</li>
                <li>Inventory Management</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">CMS</h4>
              <ul className="space-y-1 text-sm">
                <li>WordPress</li>
                <li>Contentful</li>
                <li>Strapi</li>
                <li>Sanity.io</li>
                <li>Custom CMS</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (params.service === 'app-development') {
    serviceContent = (
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl font-light mb-6">Mobile App Solutions</h3>
          <p className="mb-6">
            We develop native and cross-platform mobile applications that help businesses engage with their customers, 
            streamline operations, and increase revenue. Our apps are built with scalability and performance in mind.
          </p>
          <h3 className="text-2xl font-light mb-6">App Development Expertise</h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="mr-3 text-2xl">•</span>
              <span>Native iOS development using Swift and SwiftUI</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">•</span>
              <span>Native Android development using Kotlin</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">•</span>
              <span>Cross-platform development with React Native and Flutter</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">•</span>
              <span>Progressive Web Apps for browser-based experiences</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">•</span>
              <span>Backend services and API development</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-light mb-6">Our App Development Process</h3>
          <ol className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="mr-4 font-bold">1.</span>
              <span>Strategy: Defining app goals, target audience, and competitive landscape</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">2.</span>
              <span>UX/UI Design: Creating intuitive and engaging user experiences</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">3.</span>
              <span>Development: Building your app with clean, maintainable code</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">4.</span>
              <span>Testing: Rigorous quality assurance across devices and conditions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">5.</span>
              <span>Launch: Deploying to app stores and implementing marketing strategies</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">6.</span>
              <span>Maintenance: Ongoing updates, feature additions, and performance optimization</span>
            </li>
          </ol>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-medium mb-4">Why Choose Veni for App Development?</h4>
            <p>
              Our team of experienced developers understands the Canadian market and creates apps that resonate with local users
              while maintaining global best practices. We focus on creating sustainable, scalable applications that grow with your business.
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    // Generic service content for other services
    serviceContent = (
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-2xl font-light mb-6">Our Approach</h3>
          <p className="mb-6">
            At Veni Developments, we approach {serviceName} with a focus on delivering measurable results for your business.
            Our team combines technical expertise with strategic thinking to create solutions that stand out in the market.
          </p>
          <h3 className="text-2xl font-light mb-6">Why Choose Us</h3>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="mr-3 text-2xl">•</span>
              <span>Experienced team specialized in {serviceName}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">•</span>
              <span>Custom solutions tailored to your specific business needs</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">•</span>
              <span>Transparent communication throughout the project</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">•</span>
              <span>Focus on delivering measurable business results</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-2xl">•</span>
              <span>Ongoing support and maintenance</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-light mb-6">Our Process</h3>
          <ol className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="mr-4 font-bold">1.</span>
              <span>Consultation: Understanding your business objectives and requirements</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">2.</span>
              <span>Strategy: Developing a customized approach for your project</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">3.</span>
              <span>Implementation: Executing the strategy with precision and care</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">4.</span>
              <span>Testing: Ensuring everything works as expected</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">5.</span>
              <span>Launch: Taking your project live</span>
            </li>
            <li className="flex items-start">
              <span className="mr-4 font-bold">6.</span>
              <span>Review & Optimize: Continuous improvement based on results</span>
            </li>
          </ol>
        </div>
      </div>
    );
  }

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

      {/* Service Hero */}
      <section className="pt-32 pb-16 px-6 min-h-[50vh] flex flex-col justify-center relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs uppercase tracking-widest mb-6 text-gray-500">
            Professional Services
          </div>

          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-extralight leading-tight">
              <span className="block">{serviceName}</span>
            </h1>
          </div>

          <div className="max-w-2xl">
            <p className="text-xl mb-8">{description}</p>

            <Link href="#contact" className="btn-primary">
              Discuss Your Project <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Details */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extralight mb-12">{serviceName} Expertise</h2>
          
          {serviceContent}
        </div>
      </section>

      {/* Service Benefits */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extralight mb-12">Benefits of Our {serviceName} Services</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-light mb-4">Tailored Solutions</h3>
              <p>We create custom {serviceName.toLowerCase()} solutions that align perfectly with your business objectives and target audience.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-light mb-4">Technical Excellence</h3>
              <p>Our team brings years of expertise and follows best practices to ensure your project is built with quality and precision.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-2xl font-light mb-4">Ongoing Support</h3>
              <p>We don't just deliver and disappear. Our team provides continuous support to ensure your success over the long term.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Canadian Advantage */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extralight mb-12">The Canadian Advantage</h2>
          
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-xl mb-6">As a Canadian digital agency, we understand the unique needs of businesses across all provinces. Our {serviceName.toLowerCase()} services are designed with the Canadian market in mind, providing you with a competitive edge.</p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">•</span>
                  <span>Deep understanding of Canadian business requirements and regulations</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">•</span>
                  <span>Bilingual capabilities for serving both English and French-speaking markets</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">•</span>
                  <span>Local support in your time zone</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 text-2xl">•</span>
                  <span>Experience working with businesses across all provinces</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col justify-center">
              <blockquote className="text-2xl font-light italic">
                "We combine global best practices with local market knowledge to deliver {serviceName.toLowerCase()} solutions that truly resonate with Canadian audiences."
              </blockquote>
              <div className="mt-4 text-gray-500">— Veni Developments Team</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-extralight mb-6">Ready to Start Your {serviceName} Project?</h2>
          <p className="text-xl max-w-2xl mb-12">Contact us today to discuss how our {serviceName.toLowerCase()} services can help your business grow and succeed in the digital landscape.</p>
          
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black text-white rounded-t-[60px]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <VeniLogo />
            <div className="mt-4 text-sm opacity-70">Canadian Digital Agency</div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Services</h4>
            <ul className="space-y-2 opacity-70">
              <li>
                <Link href="/services/web-development">Web Development</Link>
              </li>
              <li>
                <Link href="/services/app-development">App Development</Link>
              </li>
              <li>
                <Link href="/services/e-commerce">E-Commerce</Link>
              </li>
              <li>
                <Link href="/services/digital-marketing">Digital Marketing</Link>
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
            <h4 className="font-medium mb-4">Locations</h4>
            <ul className="space-y-2 opacity-70">
              <li>
                <Link href="/locations/ontario">Ontario</Link>
              </li>
              <li>
                <Link href="/locations/quebec">Quebec</Link>
              </li>
              <li>
                <Link href="/locations/british-columbia">British Columbia</Link>
              </li>
              <li>
                <Link href="/locations/alberta">Alberta</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-sm opacity-50">
          © {new Date().getFullYear()} Veni Developments Lab. All rights reserved.
        </div>
      </footer>
    </main>
  );
}