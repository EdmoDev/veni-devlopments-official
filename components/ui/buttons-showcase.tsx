import { BlackWhiteButton } from "./black-white-button"
import { ArrowRight, Play, Download, RotateCw, Settings, Star } from "lucide-react"

export function ButtonsShowcase() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-light mb-12">Button Elements</h2>

        <div className="mb-16">
          <h3 className="text-2xl font-light mb-6">Rectangle Buttons</h3>
          <div className="flex flex-wrap gap-8">
            <div className="bg-black w-[134px] h-[144px] rounded-[50px] border border-white/10 flex items-center justify-center text-white shadow-lg">
              <Play size={36} />
            </div>

            <div className="bg-black w-[134px] h-[144px] rounded-[50px] border border-white/10 flex items-center justify-center text-white shadow-lg">
              <Download size={36} />
            </div>

            <div className="bg-black w-[134px] h-[144px] rounded-[50px] border border-white/10 flex items-center justify-center text-white shadow-lg">
              <RotateCw size={36} />
            </div>

            <div className="bg-black w-[134px] h-[144px] rounded-[50px] border border-white/10 flex items-center justify-center text-white shadow-lg">
              <Settings size={36} />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-light mb-6">Black & White Buttons</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <BlackWhiteButton variant="black" icon={<ArrowRight size={24} />}>
                Next
              </BlackWhiteButton>
              <p className="mt-4 text-sm text-gray-500">Black Button</p>
            </div>

            <div className="flex flex-col items-center">
              <BlackWhiteButton variant="white" icon={<Download size={24} />}>
                Download
              </BlackWhiteButton>
              <p className="mt-4 text-sm text-gray-500">White Button</p>
            </div>

            <div className="flex flex-col items-center">
              <BlackWhiteButton variant="black" icon={<Play size={24} />} width={120} height={120}>
                Play
              </BlackWhiteButton>
              <p className="mt-4 text-sm text-gray-500">Custom Size</p>
            </div>

            <div className="flex flex-col items-center">
              <BlackWhiteButton variant="black" icon={<Star size={24} />} href="#featured">
                Featured
              </BlackWhiteButton>
              <p className="mt-4 text-sm text-gray-500">With Link</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
