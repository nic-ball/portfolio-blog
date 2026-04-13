"use server"

import { prisma } from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { auth } from '../../../auth'

export async function createPost(formData: FormData) {
  // Security: Check if user is logged in before saving
  const session = await auth()
  if (!session) {
    throw new Error("Unauthorized")
  }

  // Extract data from form
  const title = formData.get('title') as string
  const slug = formData.get('slug') as string
  const content = formData.get('content') as string

  // Validation
  if (!title || !slug || !content) {
    return { success: false, error: "All fields are required" }
  }

  try {
    // Create the post in the database
    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        published: true, // default to published until I create the publish unpublish functionality
      },
    })
    // Clear next.js cache
    revalidatePath('/')
    revalidatePath('/admin')

    console.log(`Successfully created post: ${newPost.id}`)

    // For tests return the result
    if (process.env.NODE_ENV === 'test') {
      return { success: true, postId: newPost.id }
    }

  } catch (error) {
    console.error("Failed to create post:", error)
    return { success: false, error: "Database error. Slug might not be unique" }
  }
  // Redirect to Admin
  redirect('/admin')

}
