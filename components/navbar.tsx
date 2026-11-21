"use client"

import { useEffect, useRef, useState } from "react"
import { Briefcase, FolderOpen, Layers, Mail, User, Wrench } from "lucide-react"

const links = [
  { name: "Chi sono", id: "chi-sono", Icon: User },
  { name: "Cosa creo", id: "servizi", Icon: Wrench },
  { name: "Progetti", id: "progetti", Icon: FolderOpen },
  { name: "Esperienza", id: "esperienza", Icon: Briefcase },
  { name: "Stack", id: "stack", Icon: Layers },
  { name: "Contatti", id: "contatti", Icon: Mail },
]

export function Navbar() {
  const [active, setActive] = useState(-1)
  const lockUntil = useRef(0)

  useEffect(() => {
    const update = () => {
      if (Date.now() < lockUntil.current) return
      const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 4
      let current = -1
      links.forEach((l, i) => {
        const top = document.getElementById(l.id)?.getBoundingClientRect().top
        if (top !== undefined && top <= innerHeight * 0.45) current = i
      })
      setActive(atBottom ? links.length - 1 : current)
    }
    update()
    addEventListener("scroll", update, { passive: true })
    addEventListener("resize", update)
    return () => {
      removeEventListener("scroll", update)
      removeEventListener("resize", update)
    }
  }, [])

  return (
    <nav aria-label="Sezioni" className="glass fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-prism-full p-1.5">
      <div className="relative flex gap-0.5">
        <span
          aria-hidden="true"
          className="glass-pill absolute inset-y-0 left-0 w-[3.375rem] rounded-prism-full transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.34,1.3,0.64,1)] sm:w-20"
          style={{
            translate: `calc(${Math.max(active, 0)} * (100% + 0.125rem)) 0`,
            opacity: active < 0 ? 0 : 1,
          }}
        />
        {links.map(({ name, id, Icon }, i) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={i === active ? "location" : undefined}
            onClick={() => {
              lockUntil.current = Date.now() + 1000
              setActive(i)
            }}
            className="relative flex w-[3.375rem] flex-col items-center gap-0.5 rounded-prism-full py-1.5 text-[10px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-prism-ring aria-[current]:text-prism-link sm:w-20 sm:text-[11px]"
          >
            <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
            {name}
          </a>
        ))}
      </div>
    </nav>
  )
}
