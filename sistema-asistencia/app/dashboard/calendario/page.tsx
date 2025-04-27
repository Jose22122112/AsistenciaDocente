import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { AcademicCalendar } from "@/components/academic-calendar"
import { Card } from "@/components/ui/card"

export default function CalendarioPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Calendario Académico" text="Visualice y gestione el calendario académico" />

      <Card>
        <AcademicCalendar />
      </Card>
    </DashboardShell>
  )
}
