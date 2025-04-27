"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { es } from "date-fns/locale"

interface CalendarViewProps {
  view: "day" | "week" | "month" | "year"
}

export function CalendarView({ view }: CalendarViewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <Calendar
            mode={view === "day" ? "single" : "single"}
            selected={date}
            onSelect={setDate}
            locale={es}
            className="rounded-md border"
          />
        </div>
      </CardContent>
    </Card>
  )
}
