"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"

// Lista de docentes
const initialTeachers = [
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

export function TeachersList() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar docentes según término de búsqueda
  const filteredTeachers = initialTeachers.filter((teacher) => teacher.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar docente..."
            className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
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
            className="mr-2"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <line x1="19" y1="8" x2="19" y2="14"></line>
            <line x1="16" y1="11" x2="22" y2="11"></line>
          </svg>
          Agregar Docente
        </Button>
      </div>

      <div className="rounded-lg border shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-green-50">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeachers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                  No se encontraron docentes
                </TableCell>
              </TableRow>
            ) : (
              filteredTeachers.map((teacher, index) => {
                const [id, name] = teacher.split(". ")
                return (
                  <TableRow
                    key={teacher}
                    className={index % 2 === 0 ? "bg-slate-50 hover:bg-slate-100" : "hover:bg-slate-100"}
                  >
                    <TableCell className="font-medium">{id}</TableCell>
                    <TableCell>{name || teacher}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-blue-500 hover:text-blue-700 hover:bg-blue-50">
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
                          className="mr-1"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                          <path d="m15 5 4 4"></path>
                        </svg>
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
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
                          className="mr-1"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
