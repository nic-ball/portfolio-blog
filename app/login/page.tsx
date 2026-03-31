"use client"

import { signIn } from 'next-auth/react'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleLogin(formData: FormData) {
    setError(null)

    startTransition(async () => {
      try {
        // set redirect: false so we can handle the error manually here
        const res = await signIn("credentials", {
          username: formData.get("username"),
          password: formData.get("password"),
          redirect: false,
        })

        if (res?.error) {
          setError("Invalid username or password")
        } else {
          // Manually redirect on success
          router.push("/admin")
        }
      } catch (e) {
        setError("An unexpected error occurred")
      }
    })
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h1>

        <form action={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              name="username"
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className={`w-full p-2 rounded-md font-bold text-white transition ${isPending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
          >
            {isPending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  )
}
