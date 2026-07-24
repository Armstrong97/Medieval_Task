export function PlaceholderPage({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="p-6">
      <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
        {title}
      </h1>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
        {description}
      </p>
    </div>
  )
}
