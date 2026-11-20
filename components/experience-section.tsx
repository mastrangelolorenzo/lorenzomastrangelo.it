import { Section } from "./section"

const jobs = [
  {
    period: "2025 – oggi",
    role: "Sviluppatore",
    org: "Defra System, collaborazione continuativa",
    text: "Sviluppo Cassa Connessa, il software per ristoranti di loro proprietà.",
  },
  {
    period: "2023 – oggi",
    role: "Sviluppatore e coordinatore",
    org: "TitanetMC",
    text: "Creo giochi online e coordino il team di sviluppatori.",
  },
  {
    period: "2021 – oggi",
    role: "Freelance",
    org: "Per aziende e creator",
    text: "Siti, programmi e app per startup, attività locali e creator.",
  },
]

export function ExperienceSection() {
  return (
    <Section id="esperienza" title="Esperienza">
      <ol className="divide-y divide-prism-border">
        {jobs.map((job) => (
          <li key={job.org} className="grid gap-1 py-5 first:pt-0 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <p className="text-sm tabular-nums text-prism-muted-fg sm:pt-1">{job.period}</p>
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold leading-snug">{job.role}</h3>
              <p className="text-sm font-medium">{job.org}</p>
              <p className="mt-2 leading-relaxed text-prism-muted-fg">{job.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
