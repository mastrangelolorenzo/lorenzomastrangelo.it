import { Section } from "./section"
import { Age } from "./age"

const facts = [
  ["Disponibilità", "Freelance e full-time"],
  ["Lingue", "Italiano, inglese"],
]

export function AboutSection() {
  return (
    <Section id="chi-sono" title="Chi sono">
      <div className="max-w-2xl space-y-4 text-lg leading-relaxed">
        <p>
          Ho <Age /> anni e dal 2021 sviluppo software per aziende: programmi che usano ogni giorno e che non
          possono permettersi di fermarsi.
        </p>
        <p className="text-prism-muted-fg">
          Mi piace seguire un progetto dall&apos;inizio alla fine: capisco cosa ti serve, lo costruisco, lo metto online e
          lo tengo in piedi. Hai un solo riferimento, dall&apos;idea a quando è tutto funzionante.
        </p>
      </div>

      <dl className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
        {facts.map(([term, value]) => (
          <div key={term}>
            <dt className="text-sm text-prism-muted-fg">{term}</dt>
            <dd className="mt-1 font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
