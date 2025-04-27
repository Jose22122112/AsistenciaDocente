import { DigitalClock } from "@/components/digital-clock"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarView } from "@/components/calendar-view"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardStats } from "@/components/dashboard-stats"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Panel de Control" text="Bienvenido al Sistema de Gestión de Asistencia Docente" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-green-100 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fecha y Hora Actual</CardTitle>
          </CardHeader>
          <CardContent>
            <DigitalClock />
          </CardContent>
        </Card>

        <DashboardStats />
      </div>

      <div className="mt-6">
        <Tabs defaultValue="dia" className="w-full">
          <TabsList>
            <TabsTrigger value="dia">Día</TabsTrigger>
            <TabsTrigger value="semana">Semana</TabsTrigger>
            <TabsTrigger value="mes">Mes</TabsTrigger>
            <TabsTrigger value="año">Año</TabsTrigger>
          </TabsList>
          <TabsContent value="dia" className="mt-4">
            <CalendarView view="day" />
          </TabsContent>
          <TabsContent value="semana" className="mt-4">
            <CalendarView view="week" />
          </TabsContent>
          <TabsContent value="mes" className="mt-4">
            <CalendarView view="month" />
          </TabsContent>
          <TabsContent value="año" className="mt-4">
            <CalendarView view="year" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}
