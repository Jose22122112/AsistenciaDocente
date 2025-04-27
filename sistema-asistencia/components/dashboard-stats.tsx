"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users } from "lucide-react"

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

export function DashboardStats() {
  const [todayAttendance, setTodayAttendance] = useState(0)
  const [totalAttendance, setTotalAttendance] = useState(0)

  useEffect(() => {
    // Función para obtener las asistencias del día actual
    const getTodayAttendance = () => {
      if (typeof window === "undefined") return 0

      const savedAttendance = localStorage.getItem("teacherAttendance")
      if (!savedAttendance) return 0

      const attendanceData = JSON.parse(savedAttendance)

      // Obtener la fecha actual
      const today = new Date()
      const currentMonth = today.getMonth()
      const currentYear = today.getFullYear()
      const currentDay = today.getDate()

      // Contador para asistencias de hoy
      let todayCount = 0
      let totalCount = 0

      // Recorrer todos los docentes
      Object.keys(attendanceData).forEach((teacher) => {
        const teacherAttendance = attendanceData[teacher]

        // Contar asistencias totales
        Object.values(teacherAttendance).forEach((status) => {
          if (status === "A") totalCount++
        })

        // Verificar si hay asistencia para el día actual
        if (teacherAttendance[currentDay] === "A") {
          todayCount++
        }
      })

      return { today: todayCount, total: totalCount }
    }

    // Actualizar el estado con las asistencias
    const counts = getTodayAttendance()
    setTodayAttendance(counts.today)
    setTotalAttendance(counts.total)

    // Configurar un intervalo para actualizar las estadísticas cada minuto
    const interval = setInterval(() => {
      const updatedCounts = getTodayAttendance()
      setTodayAttendance(updatedCounts.today)
      setTotalAttendance(updatedCounts.total)
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Docentes</CardTitle>
          <Users className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{teachers.length}</div>
          <p className="text-xs text-muted-foreground">Docentes registrados en el sistema</p>
        </CardContent>
      </Card>

      <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Asistencia Hoy</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600"
          >
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            <path d="m9 14 2 2 4-4"></path>
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700">{todayAttendance}</div>
          <div className="flex items-center mt-1">
            <div className="h-2 bg-gray-200 rounded-full flex-1">
              <div
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${(todayAttendance / teachers.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs ml-2 text-muted-foreground">
              {Math.round((todayAttendance / teachers.length) * 100)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Docentes han registrado asistencia hoy</p>
        </CardContent>
      </Card>
    </>
  )
}
