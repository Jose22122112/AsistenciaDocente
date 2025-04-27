import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { TeachersList } from "@/components/teachers-list"
import { Card } from "@/components/ui/card"

export default function DocentesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Gestión de Docentes" text="Administre la información de los docentes" />

      <Card>
        <TeachersList />
      </Card>
    </DashboardShell>
  )
}
