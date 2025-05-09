interface TextSectionProps {
  title: string
  content?: string
  bulletPoints?: string[]
}

export function TextSection({ title, content, bulletPoints }: TextSectionProps) {
  return (
    <div>
      <h4 className="uppercase text-sm tracking-widest mb-4 text-gray-500">{title}</h4>
      {content && <p className="mb-4">{content}</p>}
      {bulletPoints && (
        <ul className="space-y-3">
          {bulletPoints.map((point, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2 flex-shrink-0">•</span>
              <span className="flex-1">{point}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
