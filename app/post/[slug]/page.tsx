export const dynamic = 'force-dynamic';
import { prisma } from "../../../lib/prisma"
import { notFound } from "next/navigation"

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {

  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  const post = await prisma.post.findUnique({
    where: {
      slug: currentSlug,
    },
  })

  if (!post || !post.published) {
    notFound()
  }
  return (
    <main className="min-h-screen p-10 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">

        {/* Back Button */}
        <a href="/" className="text-blue-600 hover:underline mb-8 inline-block">
          &larr; Back to Home
        </a>

        <article>
          <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>
          <p className="text-gray-400 text-sm mb-8 border-b pb-4">
            Published on {post.createdAt.toLocaleDateString()}
          </p>

          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap">
            {post.content}
          </div>
        </article>

      </div>
    </main>
  )
}
