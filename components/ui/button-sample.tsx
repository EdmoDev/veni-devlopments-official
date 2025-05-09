import { BlackWhiteButton } from "./black-white-button"
import { ArrowRight, Download, Play, Star } from "lucide-react"

export function ButtonSamples() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
      <div className="flex flex-col items-center">
        <BlackWhiteButton variant="black" icon={<ArrowRight />}>
          Next
        </BlackWhiteButton>
        <p className="mt-4 text-sm text-gray-500">Black Button</p>
      </div>

      <div className="flex flex-col items-center">
        <BlackWhiteButton variant="white" icon={<Download />}>
          Download
        </BlackWhiteButton>
        <p className="mt-4 text-sm text-gray-500">White Button</p>
      </div>

      <div className="flex flex-col items-center">
        <BlackWhiteButton variant="black" icon={<Play />} width={120} height={120}>
          Play
        </BlackWhiteButton>
        <p className="mt-4 text-sm text-gray-500">Custom Size</p>
      </div>

      <div className="flex flex-col items-center">
        <BlackWhiteButton variant="black" icon={<Star />} href="#featured">
          Featured
        </BlackWhiteButton>
        <p className="mt-4 text-sm text-gray-500">With Link</p>
      </div>
    </div>
  )
}
