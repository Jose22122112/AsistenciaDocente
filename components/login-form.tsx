"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LockKeyhole, User } from "lucide-react"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // En un sistema real, esto se conectaría a una API para autenticar
    // Por ahora, usamos credenciales de demostración
    if (username === "admin" && password === "admin123") {
      // Simular un retraso de red
      setTimeout(() => {
        // Guardar el estado de sesión
        localStorage.setItem("isLoggedIn", "true")
        // Redirigir al dashboard
        router.push("/dashboard")
      }, 1000)
    } else {
      setError("Credenciales incorrectas. Por favor, inténtelo de nuevo.")
      setLoading(false)
    }
  }

  return (
    <Card className="w-full border-green-100 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-t-lg">
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription className="text-green-100">Ingrese sus credenciales para acceder al sistema</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Usuario</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Nombre de usuario"
                className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Contraseña"
                className="pl-10 border-gray-300 focus:border-green-500 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={loading}>
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center text-sm text-gray-500 bg-gray-50 rounded-b-lg">
        <p>Para demostración: usuario "admin", contraseña "admin123"</p>
      </CardFooter>
    </Card>
  )
}
