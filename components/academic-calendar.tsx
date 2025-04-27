"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { es } from "date-fns/locale"

// Meses del año
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

export function AcademicCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [view, setView] = useState<"day" | "week" | "month" | "year">("month")
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Generar años para el selector
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-green-700">Calendario Académico {currentYear}</h2>

        <div className="flex items-center gap-2">
          <Select value={currentYear.toString()} onValueChange={(value) => setCurrentYear(Number.parseInt(value))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Año" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={view} onValueChange={(v) => setView(v as any)} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="day">Día</TabsTrigger>
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="month">Mes</TabsTrigger>
          <TabsTrigger value="year">Año</TabsTrigger>
        </TabsList>

        <TabsContent value="day">
          <Card>
            <CardContent className="p-6">
              <Calendar mode="single" selected={date} onSelect={setDate} locale={es} className="mx-auto" />
              <div className="mt-4 p-4 border rounded-md">
                <h3 className="font-medium mb-2">
                  Eventos para {date?.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
                </h3>
                <p className="text-muted-foreground text-sm">No hay eventos programados para este día.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week">
          <Card>
            <CardContent className="p-6">
              <Calendar mode="single" selected={date} onSelect={setDate} locale={es} className="mx-auto" />
              <div className="mt-4 grid gap-2">
                {Array.from({ length: 7 }).map((_, i) => {
                  const day = new Date(date || new Date())
                  day.setDate(day.getDate() - day.getDay() + i + 1)
                  return (
                    <div key={i} className="p-2 border rounded-md">
                      <h4 className="font-medium">
                        {day.toLocaleDateString("es-ES", { weekday: "long", day: "numeric" })}
                      </h4>
                      <p className="text-xs text-muted-foreground">No hay eventos</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="month">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {months.map((month, index) => (
                  <Button
                    key={month}
                    variant="outline"
                    className={`h-24 flex flex-col items-center justify-center ${
                      index === (date?.getMonth() || 0) ? "border-green-500 bg-green-50" : ""
                    }`}
                    onClick={() => {
                      const newDate = new Date(date || new Date())
                      newDate.setMonth(index)
                      setDate(newDate)
                      setView("day")
                    }}
                  >
                    <span className="text-lg font-medium">{month}</span>
                    <span className="text-xs text-muted-foreground">{currentYear}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="year">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {years.map((year) => (
                  <Button
                    key={year}
                    variant="outline"
                    className={`h-16 ${year === currentYear ? "border-green-500 bg-green-50" : ""}`}
                    onClick={() => {
                      setCurrentYear(year)
                      setView("month")
                    }}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex flex-wrap gap-2">
        {months.map((month, index) => (
          <Button
            key={month}
            variant="outline"
            size="sm"
            className={`${index === (date?.getMonth() || 0) ? "bg-green-100 text-green-700" : ""}`}
            onClick={() => {
              const newDate = new Date(date || new Date())
              newDate.setMonth(index)
              setDate(newDate)
              setView("day")
            }}
          >
            {month}
          </Button>
        ))}
      </div>
    </div>
  )
}
