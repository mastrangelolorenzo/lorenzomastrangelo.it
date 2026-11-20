import Image from "next/image"
import { ArrowDown, Download } from "lucide-react"
const outline =
  "inline-flex min-h-11 items-center rounded-prism-full border border-prism-border-strong px-5 font-semibold transition-colors hover:border-prism-fg"

export function HeroSection() {
  return (
    <section className="relative grid min-h-svh items-center gap-12 pb-16 pt-16 lg:pb-44 lg:grid-cols-[1fr_auto] lg:gap-16 lg:pt-20">
      <div className="order-2 lg:order-1">
        <h1 className="rise text-[clamp(2.5rem,9.5vw,6.25rem)] font-extrabold leading-[0.92] tracking-[-0.02em] [font-stretch:125%] lg:text-[clamp(3rem,6.6vw,6.25rem)]">
          Lorenzo
          <br />
          Mastrangelo
        </h1>

        <div className="rise mt-8 max-w-xl [animation-delay:120ms]">
          <p className="text-xl font-medium leading-snug md:text-2xl">
            Creo siti, gestionali e app per aziende e professionisti, a Pescara e da remoto.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-prism-muted-fg">
            Da piccolo cercavo sempre un modo per strutturare e monetizzare qualsiasi cosa. La programmazione mi ha dato
            gli strumenti per farlo sul serio.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="/Lorenzo%20Mastrangelo%20CV.pdf"
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-prism-full bg-prism-primary px-5 font-semibold text-prism-primary-fg transition-colors hover:bg-prism-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prism-ring"
            >
              <Download className="size-4" aria-hidden="true" />
              Scarica il CV
            </a>
            <a href="https://github.com/mastrangelolorenzo" className={outline}>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/lorenzo-mastrangelo-pescara" className={outline}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="rise relative order-1 w-fit justify-self-start [animation-delay:200ms] lg:order-2 lg:justify-self-end">
        <div
          aria-hidden="true"
          className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-fun-blue lg:translate-x-6 lg:translate-y-6"
        />
        <Image
          src="/lorenzo.jpg"
          alt="Lorenzo Mastrangelo"
          width={800}
          height={1000}
          priority
          className="relative aspect-[4/5] w-[clamp(11rem,45vw,20rem)] rounded-[2rem] object-cover"
        />
      </div>

      <a
        href="#chi-sono"
        aria-label="Scorri a Chi sono"
        className="absolute bottom-28 left-1/2 hidden size-11 lg:grid -translate-x-1/2 place-items-center rounded-prism-full border border-prism-border-strong text-prism-muted-fg transition-colors hover:border-prism-fg hover:text-prism-fg"
      >
        <ArrowDown className="nudge size-5" aria-hidden="true" />
      </a>
    </section>
  )
}
