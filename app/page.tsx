export const dynamic = 'force-dynamic';
import { prisma } from '../lib/prisma'
import { Post } from '@prisma/client'
import Link from 'next/link'

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main className="min-h-screen p-10 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 border-b pb-4">
          Nic's Work in Progress Blog
        </h1>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts yet. Check back soon!</p>
          ) : (
            posts.map((post: Post) => (
              <article key={post.id} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <Link href={`/post/${post.slug}`}>
                  <h2 className="text-2xl font-bold mb-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600">{post.content}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  )
}
