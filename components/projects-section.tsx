import Image from "next/image"
import { Section } from "./section"

type Project = { name: string; url: string; text: string }

const defied: Project = {
  name: "Defied",
  url: "https://defied.dev",
  text: "Il gruppo di sviluppo che ho fondato: creiamo software per aziende e privati, trasparente e senza vincoli.",
}

const undefied: Project = {
  name: "Undefied",
  url: "https://un.defied.dev",
  text: "Un allarme intelligente pensato per la tua privacy: tutto resta in casa tua, protetto, e lo controlli solo tu.",
}

const clients: (Project & { image: string })[] = [
  {
    name: "Cassa Connessa",
    url: "https://app.cassaconnessa.com",
    image: "/progetti/cassa.jpg",
    text: "Il sistema con cui molti ristoranti di Pescara gestiscono cassa, ordini, prenotazioni e clienti in un unico posto.",
  },
  {
    name: "MRM Studio",
    url: "https://mrmstudio.it",
    image: "/progetti/mrm.jpg",
    text: "Il sito di uno studio di architettura e ingegneria tra Pescara e Castel di Sangro.",
  },
  {
    name: "Defra System",
    url: "https://defrasystem.it",
    image: "/progetti/defra.jpg",
    text: "Sito per un'azienda abruzzese di registratori di cassa e sistemi POS, cliente con cui collaboro stabilmente.",
  },
  {
    name: "Leledan Builds",
    url: "https://leledanbuilds.com",
    image: "/progetti/leledan.jpg",
    text: "Il negozio online di un creativo digitale: mostra i suoi lavori, riceve ordini su commissione e incassa i pagamenti online.",
  },
]

const host = (url: string) => new URL(url).host

export function ProjectsSection() {
  return (
    <Section id="progetti" title="Progetti">
      <h3 className="text-xl font-bold">Le mie aziende</h3>

      <div className="mt-6 max-w-2xl">
        <h4 className="text-4xl font-extrabold leading-none tracking-[-0.01em] [font-stretch:125%] sm:text-5xl">
          {defied.name}
        </h4>
        <p className="mt-2 text-sm font-semibold">Fondatore e CEO</p>
        <p className="mt-2 leading-relaxed text-prism-muted-fg">{defied.text}</p>
        <a href={defied.url} className="mt-1 inline-block text-sm text-prism-link underline underline-offset-4 hover:text-prism-link-hover">
          {host(defied.url)}
        </a>

        <div className="relative ml-4 mt-2 pl-10 pt-6 before:absolute before:left-0 before:top-0 before:h-[2.25rem] before:w-7 before:rounded-bl-prism-lg before:border-b-2 before:border-l-2 before:border-prism-link">
          <h5 className="text-2xl font-extrabold leading-none [font-stretch:125%]">{undefied.name}</h5>
          <p className="mt-2 text-sm font-semibold">Parte di Defied</p>
          <p className="mt-2 leading-relaxed text-prism-muted-fg">{undefied.text}</p>
          <a href={undefied.url} className="mt-1 inline-block text-sm text-prism-link underline underline-offset-4 hover:text-prism-link-hover">
            {host(undefied.url)}
          </a>
        </div>
      </div>

      <h3 className="mt-16 border-t border-prism-border pt-12 text-xl font-bold">Per i clienti</h3>
      <ul className="mt-6 grid gap-5 sm:grid-cols-2">
        {clients.map((p) => (
          <li key={p.url}>
            <a
              href={p.url}
              className="group block h-full overflow-hidden rounded-[1.5rem] border border-prism-border bg-prism-bg/70 transition-colors hover:border-prism-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prism-ring"
            >
              <div className="overflow-hidden border-b border-prism-border">
                <Image
                  src={p.image}
                  alt={`Il sito ${p.name}`}
                  width={1200}
                  height={750}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold">{p.name}</h4>
                <p className="text-sm text-prism-link underline underline-offset-4 group-hover:text-prism-link-hover">{host(p.url)}</p>
                <p className="mt-3 leading-relaxed text-prism-muted-fg">{p.text}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
