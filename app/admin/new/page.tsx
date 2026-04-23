"use client"

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation' // <--- IMPORT THIS
import { createPost } from '../actions/postActions'

export default function NewPostPage() {
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter() // <--- INITIALIZE ROUTER

  function handleSubmit(formData: FormData) {
    setError(null)

    startTransition(async () => {
      try {
        const result = await createPost(formData)

        if (result && result.success) {
          // THE FIX: Redirect safely on the client!
          router.push('/admin')
          router.refresh() // Force the dashboard to fetch the new post
        } else {
          setError(result?.error || "Failed to create post.")
        }
      } catch (err) {
        setError("A critical error occurred while contacting the server.")
      }
    })
  }

  return (
    <main className="min-h-screen p-10 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-8">Create New Post</h1>

        <form action={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-bold text-gray-700">Title</label>
            <input id="title" name="title" type="text" required className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-bold text-gray-700">Slug (URL path)</label>
            <input id="slug" name="slug" type="text" required placeholder="my-new-post" className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-bold text-gray-700">Content (Markdown supported)</label>
            <textarea id="content" name="content" rows={10} required className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" />
          </div>

          {error && (
            <div className="p-3 bg-red-100 text-red-700 font-bold rounded border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className={`w-full p-3 rounded-md font-bold text-white transition ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
              }`}
          >
            {isPending ? 'Publishing...' : 'Publish Post'}
          </button>
        </form>
      </div>
    </main>
  )
}
