"use client"

export function ageOn(now: Date) {
  const age = now.getFullYear() - 2007
  return now < new Date(now.getFullYear(), 10, 11) ? age - 1 : age
}

export function Age() {
  return <span suppressHydrationWarning>{ageOn(new Date())}</span>
}
