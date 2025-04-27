"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Lista de docentes
const teachers = [
  "1. Neisy Castro",
  "2. Hilario",
  "3. Salvatierra",
  "4. Contrato Arosemena",
  "5. Contrato Campos",
  "6. Ledesma",
  "7. Véliz",
  "8. Canchihuaman",
  "9. García",
  "10. Delgado",
  "11. Francisco Cruz",
  "12. Chávez",
  "13. Guere",
  "14. Koochoi",
  "15. Mandujano",
  "16. Javier Castillón",
  "17. Goyas",
  "18. Caparachín",
  "19. Córdova",
  "20. López",
  "21. Mauro C.",
  "22. Bellido",
  "23. Torres",
  "24. Aguilar",
  "25. Almonacid",
  "26. Castro",
]

// Añadir más mejoras visuales a la tabla de asistencia

// Reemplazar la definición de attendanceTypes con esta versión mejorada
const attendanceTypes = [
  { id: "A", label: "Asistió", color: "bg-green-500 hover:bg-green-600" },
  { id: "N", label: "No asistió", color: "bg-gray-300 hover:bg-gray-400" },
  { id: "E", label: "Enfermedad", color: "bg-blue-500 hover:bg-blue-600" },
  { id: "P", label: "Permiso", color: "bg-amber-300 hover:bg-amber-400" },
  { id: "V", label: "Vacaciones", color: "bg-purple-300 hover:bg-purple-400" },
]

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

// Días de la semana
const weekDays = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"]

export function AttendanceTable() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Generar días del mes actual
  const getDaysInMonth = (year: number, month: number) => {
    // Obtener el número de días en el mes (0-11)
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      const dayOfWeek = weekDays[date.getDay() === 0 ? 6 : date.getDay() - 1]
      days.push({ day: i, dayOfWeek })
    }

    return days
  }

  const days = getDaysInMonth(currentYear, currentMonth)

  // Cambiar mes
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Estado para almacenar la asistencia
  const [attendance, setAttendance] = useState<Record<string, Record<string, string>>>(() => {
    // Recuperar datos guardados en localStorage al iniciar
    if (typeof window !== "undefined") {
      const savedAttendance = localStorage.getItem("teacherAttendance")
      return savedAttendance ? JSON.parse(savedAttendance) : {}
    }
    return {}
  })

  // Manejar cambio de asistencia
  const handleAttendanceChange = (teacher: string, day: number, value: string) => {
    setAttendance((prev) => {
      const newAttendance = {
        ...prev,
        [teacher]: {
          ...(prev[teacher] || {}),
          [day]: value,
        },
      }

      // Guardar en localStorage
      localStorage.setItem("teacherAttendance", JSON.stringify(newAttendance))
      return newAttendance
    })
  }

  // Añadir un efecto para mejorar el rendimiento con memoización
  useEffect(() => {
    // Guardar en localStorage cuando cambie el estado
    if (Object.keys(attendance).length > 0) {
      localStorage.setItem("teacherAttendance", JSON.stringify(attendance))
    }
  }, [attendance])

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-green-700">
            {months[currentMonth]} {currentYear}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Reemplazar la sección de leyenda con esta versión mejorada */}
        <div className="flex flex-wrap gap-3 mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          {attendanceTypes.map((type) => (
            <div key={type.id} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-md ${type.color.split(" ")[0]} flex items-center justify-center text-white font-medium shadow-sm`}
              >
                {type.id}
              </div>
              <span className="text-sm">{type.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reemplazar la sección de la tabla con esta versión optimizada */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-100">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px] bg-green-50 sticky left-0 z-20">Nombre del Docente</TableHead>
              {days.map(({ day, dayOfWeek }) => (
                <TableHead key={day} className="text-center w-12 p-1">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500">{dayOfWeek}</span>
                    <span className="text-sm">{day}</span>
                  </div>
                </TableHead>
              ))}
              <TableHead className="text-center bg-green-50">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher, index) => (
              <TableRow
                key={teacher}
                className={index % 2 === 0 ? "bg-slate-50 hover:bg-slate-100" : "hover:bg-slate-100"}
              >
                <TableCell className="font-medium sticky left-0 bg-inherit z-10">{teacher}</TableCell>
                {days.map(({ day }) => (
                  <TableCell key={day} className="p-1 text-center">
                    <Select
                      value={attendance[teacher]?.[day] || ""}
                      onValueChange={(value) => handleAttendanceChange(teacher, day, value)}
                    >
                      <SelectTrigger className="h-8 w-8 p-0 border-0 hover:bg-slate-100 transition-colors">
                        <SelectValue placeholder="">
                          {attendance[teacher]?.[day] && (
                            <Badge
                              className={`w-6 h-6 rounded-md flex items-center justify-center p-0 ${
                                attendanceTypes.find((t) => t.id === attendance[teacher][day])?.color.split(" ")[0] ||
                                "bg-gray-200"
                              } shadow-sm`}
                            >
                              {attendance[teacher][day]}
                            </Badge>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="-">-</SelectItem>
                        {attendanceTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              <div className={`w-4 h-4 rounded-md ${type.color.split(" ")[0]}`}></div>
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                ))}
                <TableCell className="text-center font-medium">
                  <div className="bg-green-100 rounded-full px-3 py-1 text-green-800 font-semibold">
                    {Object.values(attendance[teacher] || {}).filter((v) => v === "A").length}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
