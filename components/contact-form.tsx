"use client"

import type React from "react"
import { useState, useEffect } from "react" // Added useEffect
import { ArrowRight } from "lucide-react"
import { serviceItems } from "@/data/services"; // Import service items

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    service: "", // Will be pre-filled or default
    budget: "$1-5K",
    email: "",
    message: "",
  })
  const [serviceOptions, setServiceOptions] = useState<string[]>([]);

  useEffect(() => {
    // Populate service options from serviceItems
    const options = serviceItems.map(item => item.subtitle ? `${item.title} ${item.subtitle}` : item.title);
    setServiceOptions(["Select a service...", ...options, "General Inquiry"]);
    setFormData(prev => ({ ...prev, service: "Select a service..." })); // Set default
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { // Added HTMLSelectElement
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="max-w-7xl mx-auto py-24">
      <h2 className="text-6xl md:text-7xl font-light mb-16">
        <span className="text-black">Ready to </span>
        <span className="text-gray-300">start</span>
        <br />
        <span className="text-black">your </span>
        <span className="text-gray-300">project</span>
        <span className="text-black">?</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <label className="text-3xl font-light">My name is</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="your name"
            className="flex-grow border-b border-gray-300 pb-2 focus:outline-none focus:border-black text-xl"
            required
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <label htmlFor="service" className="text-3xl font-light">I'm interested in</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="flex-grow appearance-none bg-transparent border-b border-input pb-2 text-xl focus:outline-none focus:border-primary focus:ring-0"
            required
            style={{ color: 'var(--foreground)', paddingRight: '2.5rem' /* Space for dropdown arrow */ }}
          >
            {serviceOptions.map(option => (
              <option
                key={option}
                value={option}
                disabled={option === "Select a service..."}
                style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }} // Style options for dark mode compatibility
              >
                {option}
              </option>
            ))}
          </select>
          {/* Custom dropdown arrow (optional, if you want to hide the native one and use your own) */}
          {/* <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div> */}
        </div>

        <div className="space-y-4">
          <label className="text-3xl font-light block">My project budget</label>
          <div className="flex gap-4">
            <button
              type="button"
              className={`border rounded-full px-6 py-2 ${
                formData.budget === "$1-5K" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, budget: "$1-5K" }))}
            >
              $1-5K
            </button>
            <button
              type="button"
              className={`border rounded-full px-6 py-2 ${
                formData.budget === "$5-10K" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, budget: "$5-10K" }))}
            >
              $5-10K
            </button>
            <button
              type="button"
              className={`border rounded-full px-6 py-2 ${
                formData.budget === "$10K+" ? "bg-black text-white" : "hover:bg-black hover:text-white"
              }`}
              onClick={() => setFormData((prev) => ({ ...prev, budget: "$10K+" }))}
            >
              $10K+
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
          <label className="text-3xl font-light">You can reach me at</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="flex-grow border-b border-gray-300 pb-2 focus:outline-none focus:border-black text-xl"
            required
          />
        </div>

        <div className="space-y-4">
          <label className="text-3xl font-light block">Tell us about your project:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Share your goals, timeline, and any specific requirements..."
            className="w-full border-b border-gray-300 pb-2 focus:outline-none focus:border-black text-xl"
            rows={4}
          />
        </div>

        <div>
          <button
            type="submit"
            className="btn-primary"
          >
            <span>Send Request</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  )
}
