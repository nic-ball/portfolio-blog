import { prisma } from '../../lib/prisma'
import Link from 'next/link'
import { auth } from '../../auth'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react';
import SignOutButton from '../components/SignOutButton';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {

  const session = await auth()
  if (!session) {
    redirect('/login') // Kick to login page
  }

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen p-10 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-4xl font-extrabold mb-8 border-b pb-4">
            Admin Dashboard
          </h1>
          <div className="flex gap-4">
            <Link href="/admin/new">
              <button className="mb-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Create New Post
              </button>
            </Link>

            {/* Sign Out */}
            <SignOutButton />
          </div>
        </div>

        <div className="space-y-4">
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts found.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50 transition">
                <div>
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p className="text-sm mt-1">
                    Status: {post.published ? (
                      <span className="text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded text-xs">Published</span>
                    ) : (
                      <span className="text-amber-600 font-semibold bg-amber-50 px-2 py-0.5 rounded text-xs">Draft</span>
                    )}
                  </p>
                </div>

                {/* Build edit page later! */}
                <Link
                  href={`/admin/edit/${post.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold underline"
                >
                  Edit Post
                </Link>
              </div>
            ))
          )}
        </div>

      </div>
    </main>
  )
}
