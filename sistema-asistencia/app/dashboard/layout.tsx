"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  // Mejorar el diseño del layout del dashboard y optimizar la carga

  // Añadir un estado para controlar la carga de la página
  const [pageLoading, setPageLoading] = useState(false)

  // Modificar el useEffect para mejorar la experiencia de carga
  useEffect(() => {
    // Verificar si el usuario está autenticado
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

    if (!isLoggedIn) {
      router.push("/")
    } else {
      setLoading(false)
    }

    // Añadir evento para mostrar indicador de carga durante navegación
    const handleStart = () => setPageLoading(true)
    const handleComplete = () => setPageLoading(false)

    router.events?.on("routeChangeStart", handleStart)
    router.events?.on("routeChangeComplete", handleComplete)
    router.events?.on("routeChangeError", handleComplete)

    return () => {
      router.events?.off("routeChangeStart", handleStart)
      router.events?.off("routeChangeComplete", handleComplete)
      router.events?.off("routeChangeError", handleComplete)
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  // Reemplazar el return con esta versión mejorada
  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 overflow-auto p-4 relative">
        {pageLoading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
              <p className="mt-2 text-sm text-gray-600">Cargando...</p>
            </div>
          </div>
        )}
        {children}
      </main>
    </div>
  )
}
