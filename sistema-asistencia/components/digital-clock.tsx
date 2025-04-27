"use client"

import { useEffect, useState } from "react"

export function DigitalClock() {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return date.toLocaleDateString("es-ES", options)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl font-bold text-green-700">{formatTime(date)}</div>
      <div className="text-sm text-muted-foreground mt-1 capitalize">{formatDate(date)}</div>
      <div className="mt-3 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-300 transition-all duration-1000"
          style={{ width: `${(date.getSeconds() / 60) * 100}%` }}
        ></div>
      </div>
    </div>
  )
}
