"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Calendar, ClipboardList, Home, LogOut, Menu, Users } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  const routes = [
    {
      label: "Panel de Control",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Registro de Asistencia",
      icon: ClipboardList,
      href: "/dashboard/asistencia",
      active: pathname === "/dashboard/asistencia",
    },
    {
      label: "Calendario Académico",
      icon: Calendar,
      href: "/dashboard/calendario",
      active: pathname === "/dashboard/calendario",
    },
    {
      label: "Docentes",
      icon: Users,
      href: "/dashboard/docentes",
      active: pathname === "/dashboard/docentes",
    },
  ]

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon" className="absolute left-4 top-4">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <SidebarContent routes={routes} handleLogout={handleLogout} />
        </SheetContent>
      </Sheet>

      <div className="hidden w-64 flex-col bg-white shadow-md md:flex">
        <SidebarContent routes={routes} handleLogout={handleLogout} />
      </div>
    </>
  )
}

// Mejorar el diseño del sidebar

// Reemplazar la función SidebarContent con esta versión mejorada
function SidebarContent({
  routes,
  handleLogout,
}: {
  routes: { label: string; icon: any; href: string; active: boolean }[]
  handleLogout: () => void
}) {
  return (
    <>
      <div className="flex h-16 items-center border-b px-4 bg-gradient-to-r from-green-700 to-green-600">
        <h2 className="text-lg font-semibold text-white">Instituto G.A.L.</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 p-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
                route.active
                  ? "bg-green-100 text-green-700 font-medium shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1"
              }`}
            >
              <route.icon className={`h-5 w-5 ${route.active ? "text-green-600" : ""}`} />
              {route.label}
            </Link>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-gray-50">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Cerrar Sesión
        </Button>
      </div>
    </>
  )
}
