import { Resend } from "resend"
import { NextResponse } from "next/server"
import { needs, stages, timings } from "@/lib/contact"

const field = (value: unknown, max: number) =>
  typeof value === "string" && value.trim() && value.length <= max ? value.trim() : null

const choice = (value: unknown, options: string[]) =>
  typeof value === "string" && options.includes(value) ? value : null

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>

  const need = choice(body.need, needs)
  const stage = choice(body.stage, stages)
  const timing = choice(body.timing, timings)
  const name = field(body.name, 100)?.replace(/[\r\n]+/g, " ")
  const contact = field(body.contact, 254)
  const message = body.message ? field(body.message, 5000) : ""

  if (!need || !stage || !timing || !name || !contact || message === null) {
    return NextResponse.json({ error: "Controlla le risposte: manca qualcosa o il testo è troppo lungo." }, { status: 400 })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("contact: RESEND_API_KEY is not set")
    return NextResponse.json({ error: "Il modulo non è disponibile. Chiamami o scrivimi su WhatsApp." }, { status: 500 })
  }

  try {
    const { data, error } = await new Resend(key).emails.send({
      from: "Portfolio <noreply@lorenzomastrangelo.it>",
      to: "lory9098@gmail.com",
      subject: `Contatto da ${name}: ${need}`,
      ...(isEmail(contact) ? { replyTo: contact } : {}),
      text: [
        `Nome: ${name}`,
        `Contatto: ${contact}`,
        "",
        `Di cosa ha bisogno: ${need}`,
        `A che punto è: ${stage}`,
        `Entro quando: ${timing}`,
        ...(message ? ["", message] : []),
      ].join("\n"),
    })
    if (error) {
      console.error("contact: resend error", error)
      return NextResponse.json({ error: "Il messaggio non è partito. Chiamami o scrivimi su WhatsApp." }, { status: 502 })
    }
    console.log("contact: sent", data?.id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("contact: send failed", err)
    return NextResponse.json({ error: "Il messaggio non è partito. Chiamami o scrivimi su WhatsApp." }, { status: 500 })
  }
}
