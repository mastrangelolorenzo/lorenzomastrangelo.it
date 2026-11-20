import { Resend } from "resend"
import { NextResponse } from "next/server"

const field = (value: unknown, max: number) =>
  typeof value === "string" && value.trim() && value.length <= max ? value.trim() : null

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>

  if (body.website) return NextResponse.json({ success: true })

  const name = field(body.name, 100)?.replace(/[\r\n]+/g, " ")
  const email = field(body.email, 254)
  const message = field(body.message, 5000)

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Compila nome, email e messaggio (il messaggio può avere al massimo 5000 caratteri)." },
      { status: 400 },
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "L'indirizzo email non è valido." }, { status: 400 })
  }

  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("contact: RESEND_API_KEY is not set")
    return NextResponse.json({ error: "Il modulo non è disponibile. Chiamami o scrivimi su WhatsApp." }, { status: 500 })
  }

  try {
    const { error } = await new Resend(key).emails.send({
      from: "Portfolio <noreply@lorenzomastrangelo.dev>",
      to: "lory9098@gmail.com",
      subject: `Contatto da ${name}`,
      replyTo: email,
      text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    })
    if (error) {
      console.error("contact: resend error", error)
      return NextResponse.json({ error: "Il messaggio non è partito. Chiamami o scrivimi su WhatsApp." }, { status: 502 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("contact: send failed", err)
    return NextResponse.json({ error: "Il messaggio non è partito. Chiamami o scrivimi su WhatsApp." }, { status: 500 })
  }
}
