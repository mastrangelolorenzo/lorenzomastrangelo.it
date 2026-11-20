import type { ReactNode } from "react"

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid scroll-mt-6 gap-6 border-t border-prism-border py-14 md:grid-cols-[13rem_1fr] md:gap-12 md:py-20"
    >
      <h2 id={`${id}-title`} className="text-xl font-bold leading-tight">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}
