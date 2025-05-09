interface FeatureListProps {
  title: string
  items: string[]
}

export function FeatureList({ title, items }: FeatureListProps) {
  return (
    <div>
      <h4 className="uppercase text-sm tracking-widest mb-4 text-gray-500">{title}</h4>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 flex-shrink-0">•</span>
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
