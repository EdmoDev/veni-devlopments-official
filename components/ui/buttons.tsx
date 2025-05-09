import type React from "react"
import Link from "next/link"

export const LetsTalkButton = () => (
  <Link
    href="#contact"
    className="inline-flex items-center rounded-full px-6 py-3 bg-black text-white hover:bg-gray-900 transition-colors"
  >
    Let&apos;s Talk
  </Link>
)

export const OutlineButton = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <Link
    href={href}
    className="inline-flex items-center space-x-2 border border-gray-300 rounded-full px-6 py-2 hover:bg-black hover:text-white hover:border-black transition-all data-hoverable"
  >
    {children}
  </Link>
)

export const VeniLogo = () => (
  <div className="flex items-center text-2xl font-bold data-hoverable">
    <div className="w-8 h-8 relative mr-1 bg-black text-white flex items-center justify-center">V</div>
    <span>eni</span>
  </div>
)
