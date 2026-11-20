"use client"

import { useState, type FormEvent } from "react"
import { Section } from "./section"
import { Field, FieldLabel } from "./ui/Field"
import { Input } from "./ui/Input"
import { Textarea } from "./ui/Textarea"
import { Button } from "./ui/Button"
import { Alert, AlertContent, AlertDescription, AlertTitle } from "./ui/Alert"

const link = "whitespace-nowrap text-prism-link underline underline-offset-4 hover:text-prism-link-hover"
const empty = { name: "", email: "", message: "" }

export function ContactSection() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm(empty)
        return
      }
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? "Il messaggio non è partito.")
    } catch {
      setError("Connessione assente. Controlla la rete e riprova.")
    }
    setStatus("error")
  }

  const set = (key: keyof typeof empty) => (e: { target: { value: string } }) =>
    setForm({ ...form, [key]: e.target.value })

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
          </a>{" "}
          o scrivimi su{" "}
          <a href="https://wa.me/393482868800" className={link}>
            WhatsApp
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
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <Field required disabled={status === "loading"}>
              <FieldLabel>Nome</FieldLabel>
              <Input size="lg" fullWidth autoComplete="name" value={form.name} onChange={set("name")} />
            </Field>
            <Field required disabled={status === "loading"}>
              <FieldLabel>Email</FieldLabel>
              <Input size="lg" fullWidth type="email" autoComplete="email" value={form.email} onChange={set("email")} />
            </Field>
            <Field required disabled={status === "loading"}>
              <FieldLabel>Messaggio</FieldLabel>
              <Textarea
                fullWidth
                rows={5}
                resize="vertical"
                placeholder="Es. un gestionale per il mio negozio, da avere entro marzo"
                value={form.message}
                onChange={set("message")}
              />
            </Field>

            {status === "error" && (
              <Alert status="danger" urgent>
                <AlertContent>
                  <AlertDescription>{error}</AlertDescription>
                </AlertContent>
              </Alert>
            )}

            <Button type="submit" size="lg" loading={status === "loading"}>
              Invia il messaggio
            </Button>
          </form>
        )}
      </div>
    </Section>
  )
}
