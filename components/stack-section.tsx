import { Section } from "./section"

const stack = [
  { area: "Siti e gestionali", tools: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { area: "Server", tools: ["Java", "Spring Boot", "Node.js", "API REST"] },
  { area: "App", tools: ["Kotlin", "Android"] },
  { area: "Database", tools: ["PostgreSQL", "MySQL", "Redis", "MongoDB"] },
  { area: "Infrastruttura", tools: ["Linux", "Docker", "nginx", "Cloudflare", "GitHub Actions"] },
]

export function StackSection() {
  return (
    <Section id="stack" title="Stack">
      <dl className="divide-y divide-prism-border">
        {stack.map((group) => (
          <div key={group.area} className="grid gap-1 py-4 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="text-sm text-prism-muted-fg sm:pt-0.5">{group.area}</dt>
            <dd className="font-medium">{group.tools.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
