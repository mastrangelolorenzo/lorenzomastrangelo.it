import { Section } from "./section"

const services = [
  {
    title: "Siti web",
    text: "Un sito pensato per vendere: trasforma chi lo visita in clienti che pagano.",
    tone: "bg-fun-blue text-fun-blue-fg",
  },
  {
    title: "Gestionali su misura",
    text: "Programmi per gestire ordini, clienti e magazzino senza fogli Excel.",
    tone: "bg-fun-yellow text-fun-yellow-fg",
  },
  {
    title: "App Android",
    text: "App per tablet e telefoni, da usare in negozio, in ufficio o fuori.",
    tone: "bg-fun-green text-fun-green-fg",
  },
  {
    title: "Online e sempre attivo",
    text: "Metto online il progetto e lo tengo aggiornato e funzionante nel tempo.",
    tone: "bg-fun-pink text-fun-pink-fg",
  },
]

export function ServicesSection() {
  return (
    <Section id="servizi" title="Cosa creo">
      <ul className="grid max-w-3xl gap-3 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.title} className={`rounded-prism-xl p-5 ${s.tone}`}>
            <h3 className="text-lg font-bold [font-stretch:112%]">{s.title}</h3>
            <p className="mt-1 leading-relaxed">{s.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
