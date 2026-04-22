"use client"

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 px-4 py-2 rounded-md font-bold transition"
    >
      Sign Out
    </button>
  )
}
