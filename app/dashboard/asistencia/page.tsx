import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AttendanceTable } from "@/components/attendance-table"
import { Card } from "@/components/ui/card"

export default function AsistenciaPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Registro de Asistencia" text="Gestione la asistencia de los docentes" />

      <Card>
        <AttendanceTable />
      </Card>
    </DashboardShell>
  )
}
