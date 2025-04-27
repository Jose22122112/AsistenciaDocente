import { LoginForm } from "@/components/login-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-green-50 to-white">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl border border-green-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-700">Instituto Superior Gustavo Allende Llavería</h1>
          <div className="h-1 w-20 bg-green-600 mx-auto my-3 rounded-full"></div>
          <p className="mt-2 text-gray-600">Sistema de Gestión de Asistencia Docente</p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
