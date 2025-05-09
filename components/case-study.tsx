import type React from "react"
import Image from "next/image"

interface CaseStudyProps {
  number: string
  title: string
  subtitle?: string
  description: string
  clientLogo?: string
  challenge?: {
    title: string
    description: string
    bulletPoints?: string[]
  }
  solution?: {
    title: string
    description: string
  }
  functionality?: {
    title: string
    bulletPoints: string[]
  }
  technology?: {
    title: string
    bulletPoints: string[]
  }
  asItIs?: {
    title: string
    description: string
    bulletPoints: string[]
  }
  toBe?: {
    title: string
    description: string
    bulletPoints: string[]
  }
  advantages?: {
    title: string
    bulletPoints: string[]
  }
  taskTypes?: {
    title: string
    bulletPoints: string[]
  }
  pros?: {
    title: string
    bulletPoints: string[]
  }
  interfaces?: {
    title: string
    bulletPoints: string[]
  }
  systemSpec?: {
    title: string
    description: string
  }
  bgColor?: string
  textColor?: string
}

export const CaseStudy: React.FC<CaseStudyProps> = ({
  number,
  title,
  subtitle,
  description,
  clientLogo,
  challenge,
  solution,
  functionality,
  technology,
  asItIs,
  toBe,
  advantages,
  taskTypes,
  pros,
  interfaces,
  systemSpec,
}) => {
  // Split title into parts if it contains "Of The" or similar connecting words
  const titleParts = title.split(/(Of The|Of|For)/gi)

  const formattedTitle = titleParts.map((part, index) => {
    if (part.match(/(Of The|Of|For)/gi)) {
      return (
        <span key={index} className="text-gray-300">
          {part}
        </span>
      )
    }
    return <span key={index}>{part}</span>
  })

  return (
    <section className="py-24 px-6 bg-white text-black rounded-[60px] my-6 border-4 border-black/10 backdrop-blur-md shadow-xl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <div className="text-4xl font-light mb-8">{number}</div>

          <h2 className="text-5xl md:text-6xl font-light mb-8">
            {formattedTitle}
            {subtitle && <span className="block text-5xl md:text-6xl font-light">{subtitle}</span>}
          </h2>

          <div className="max-w-2xl text-lg mb-16 glass-card p-6 rounded-[30px]">{description}</div>

          {clientLogo && (
            <div className="mb-16">
              <Image
                src={clientLogo || "/placeholder.svg"}
                alt="Client logo"
                width={120}
                height={60}
                className="opacity-80"
              />
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          <div className="space-y-16">
            {challenge && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">
                  {challenge.title || "Challenge"}
                </h3>
                <p className="mb-6">{challenge.description}</p>
                {challenge.bulletPoints && (
                  <ul className="space-y-2">
                    {challenge.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {solution && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">{solution.title || "Solution"}</h3>
                <p>{solution.description}</p>
              </div>
            )}

            {asItIs && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">{asItIs.title || "As It Is"}</h3>
                <p className="mb-6">{asItIs.description}</p>
                {asItIs.bulletPoints && (
                  <ul className="space-y-2">
                    {asItIs.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {toBe && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">{toBe.title || "To Be"}</h3>
                <p className="mb-6">{toBe.description}</p>
                {toBe.bulletPoints && (
                  <ul className="space-y-2">
                    {toBe.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {advantages && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">
                  {advantages.title || "Advantages"}
                </h3>
                {advantages.bulletPoints && (
                  <ul className="space-y-2">
                    {advantages.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {pros && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">{pros.title || "Pros"}</h3>
                {pros.bulletPoints && (
                  <ul className="space-y-2">
                    {pros.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="space-y-16">
            {functionality && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">
                  {functionality.title || "Functionality"}
                </h3>
                {functionality.bulletPoints && (
                  <ul className="space-y-2">
                    {functionality.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {technology && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">
                  {technology.title || "Technology"}
                </h3>
                {technology.bulletPoints && (
                  <ul className="space-y-2">
                    {technology.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {taskTypes && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">
                  {taskTypes.title || "Task Types"}
                </h3>
                {taskTypes.bulletPoints && (
                  <ul className="space-y-2">
                    {taskTypes.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {interfaces && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">
                  {interfaces.title || "Interaction Interfaces"}
                </h3>
                {interfaces.bulletPoints && (
                  <ul className="space-y-2">
                    {interfaces.bulletPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {systemSpec && (
              <div className="glass-card p-8 rounded-[40px]">
                <h3 className="text-sm uppercase tracking-widest mb-6 text-gray-500">
                  {systemSpec.title || "System Specification"}
                </h3>
                <p>{systemSpec.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
