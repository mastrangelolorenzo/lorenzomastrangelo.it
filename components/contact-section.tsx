"use client"

import { useState, type FormEvent } from "react"
import { Section } from "./section"
import { Field, FieldLabel } from "./ui/Field"
import { Input } from "./ui/Input"
import { Textarea } from "./ui/Textarea"
import { Button } from "./ui/Button"
import { Alert, AlertContent, AlertDescription, AlertTitle } from "./ui/Alert"
import { needs, stages, timings } from "@/lib/contact"

const link = "whitespace-nowrap text-prism-link underline underline-offset-4 hover:text-prism-link-hover"
const empty = { need: "", stage: "", timing: "", name: "", phone: "", email: "", message: "" }
type Answers = typeof empty

function Choices({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string
  name: string
  options: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <fieldset>
      <legend className="text-lg font-semibold">{legend}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="peer sr-only"
            />
            <span className="inline-block rounded-prism-full border border-prism-border-strong px-4 py-2 font-medium transition-colors hover:border-prism-fg peer-checked:border-prism-primary peer-checked:bg-prism-primary peer-checked:text-prism-primary-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-prism-ring">
              {option}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export function ContactSection() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>(empty)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")

  const set = (key: keyof Answers) => (value: string) => setAnswers({ ...answers, [key]: value })
  const canContinue = [answers.need, answers.stage && answers.timing, answers.name.trim() && answers.phone.trim()][step]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (step < 2) {
      if (canContinue) setStep(step + 1)
      return
    }
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      })
      if (res.ok) {
        setStatus("success")
        setAnswers(empty)
        setStep(0)
        return
      }
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? "Il messaggio non è partito.")
    } catch {
      setError("Connessione assente. Controlla la rete e riprova.")
    }
    setStatus("error")
  }

  return (
    <Section id="contatti" title="Contatti">
      <div className="max-w-xl">
        <p className="text-lg leading-relaxed">
          Hai un progetto da far partire o una posizione aperta? Raccontami cosa ti serve.
        </p>
        <p className="mt-2 text-prism-muted-fg">
          Usa il modulo qui sotto, oppure chiamami al{" "}
          <a href="tel:+393482868800" className={link}>
            348 286 8800
          </a>
          , scrivimi su{" "}
          <a href="https://wa.me/393482868800" className={link}>
            WhatsApp
          </a>{" "}
          o a{" "}
          <a href="mailto:ciao@lorenzomastrangelo.it" className={link}>
            ciao@lorenzomastrangelo.it
          </a>
          .
        </p>

        {status === "success" ? (
          <Alert status="success" className="mt-8">
            <AlertContent>
              <AlertTitle>Messaggio inviato</AlertTitle>
              <AlertDescription>
                Ti rispondo il prima possibile.{" "}
                <button type="button" onClick={() => setStatus("idle")} className="underline underline-offset-4">
                  Scrivi un altro messaggio
                </button>
              </AlertDescription>
            </AlertContent>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            <p className="text-sm font-medium text-prism-muted-fg" aria-live="polite">
              Passo {step + 1} di 3
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-prism-full bg-prism-border">
              <div
                className="h-full rounded-prism-full bg-prism-primary transition-[width] duration-300"
                style={{ width: `${((step + 1) / 3) * 100}%` }}
              />
            </div>

            <div key={step} className="rise mt-6 space-y-7">
              {step === 0 && (
                <Choices legend="Di cosa hai bisogno?" name="need" options={needs} value={answers.need} onChange={set("need")} />
              )}
              {step === 1 && (
                <>
                  <Choices legend="A che punto sei?" name="stage" options={stages} value={answers.stage} onChange={set("stage")} />
                  <Choices legend="Entro quando?" name="timing" options={timings} value={answers.timing} onChange={set("timing")} />
                </>
              )}
              {step === 2 && (
                <div className="space-y-5">
                  <Field required disabled={status === "loading"}>
                    <FieldLabel>Come ti chiami?</FieldLabel>
                    <Input
                      size="lg"
                      fullWidth
                      autoComplete="name"
                      maxLength={100}
                      value={answers.name}
                      onChange={(e) => set("name")(e.target.value)}
                    />
                  </Field>
                  <Field required disabled={status === "loading"}>
                    <FieldLabel>Telefono</FieldLabel>
                    <Input
                      size="lg"
                      fullWidth
                      type="tel"
                      autoComplete="tel"
                      maxLength={30}
                      pattern="[+\d\s().\-]{6,30}"
                      title="Inserisci un numero di telefono, ad esempio 348 123 4567"
                      value={answers.phone}
                      onChange={(e) => set("phone")(e.target.value)}
                    />
                  </Field>
                  <Field disabled={status === "loading"}>
                    <FieldLabel>Email (facoltativa)</FieldLabel>
                    <Input
                      size="lg"
                      fullWidth
                      type="email"
                      autoComplete="email"
                      maxLength={254}
                      value={answers.email}
                      onChange={(e) => set("email")(e.target.value)}
                    />
                  </Field>
                  <Field disabled={status === "loading"}>
                    <FieldLabel>Vuoi aggiungere altro? (facoltativo)</FieldLabel>
                    <Textarea
                      fullWidth
                      rows={4}
                      resize="vertical"
                      maxLength={5000}
                      value={answers.message}
                      onChange={(e) => set("message")(e.target.value)}
                    />
                  </Field>
                </div>
              )}
            </div>

            {status === "error" && (
              <Alert status="danger" urgent className="mt-6">
                <AlertContent>
                  <AlertDescription>{error}</AlertDescription>
                </AlertContent>
              </Alert>
            )}

            <div className="mt-8 flex items-center gap-3">
              {step > 0 && (
                <Button type="button" variant="outline" size="lg" onClick={() => setStep(step - 1)} disabled={status === "loading"}>
                  Indietro
                </Button>
              )}
              <Button type="submit" size="lg" disabled={!canContinue} loading={status === "loading"}>
                {step < 2 ? "Avanti" : "Invia il messaggio"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Section>
  )
}
