"use server"

import { prisma } from '../../../lib/prisma'
import { revalidatePath } from 'next/cache'
import { auth } from '../../../auth'

export async function createPost(formData: FormData) {
  // 1. Check Auth (Return error instead of throwing)
  const session = await auth()
  if (!session) return { success: false, error: "Unauthorized: Please log in again." }

  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string

  if (!title || !slug || !content) {
    return { success: false, error: "All fields are required." }
  }

  try {
    // 2. Save to database
    await prisma.post.create({
      data: { title, slug, content, published: true },
    })

    // 3. Clear cache
    revalidatePath('/')
    revalidatePath('/admin')

    // 4. Return success instead of redirecting!
    return { success: true }

  } catch (error) {
    console.error("Database error:", error)
    return { success: false, error: "Database error. That slug might already exist!" }
  }
}
