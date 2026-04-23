import { prisma } from '../../../lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostStatistics } from '../../../utils/postStats'

export const dynamic = 'force-dynamic';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Resolve the params (Next.js 15 requirement)
  const resolvedParams = await params;
  const currentSlug = resolvedParams.slug;

  // Fetch the current post
  const post = await prisma.post.findUnique({
    where: { slug: currentSlug },
  })

  if (!post || !post.published) {
    notFound()
  }

  // Fetch other posts for the "Read Next" random recommendation
  const otherPosts = await prisma.post.findMany({
    where: {
      published: true,
      NOT: { id: post.id } // Don't recommend the post we are currently reading
    }
  })

  // Calculate our math stats
  const stats = getPostStatistics(post.content, otherPosts);

  return (
    <main className="min-h-screen p-10 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">

        <Link href="/" className="text-blue-600 hover:underline mb-8 inline-block font-semibold">
          &larr; Back to Home
        </Link>

        <article>
          <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>

          {/* Display the calculated Math Stats here! */}
          <div className="flex flex-wrap gap-4 text-gray-500 text-sm mb-8 border-b pb-4">
            <p>📅 {post.createdAt.toLocaleDateString()}</p>
            {stats && (
              <>
                <p>⏱️ {stats.readingTime} min read ({stats.wordCount} words)</p>
                <p>🧠 Complexity Score: {stats.complexity}</p>
              </>
            )}
          </div>

          <div className="prose max-w-none text-gray-700 whitespace-pre-wrap mb-12">
            {post.content}
          </div>
        </article>

        {/* Display the Randomly selected post */}
        {stats?.recommendedPost && (
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-2">Read Next:</h3>
            <Link href={`/post/${stats.recommendedPost.slug}`} className="text-blue-700 hover:underline text-xl font-bold">
              {stats.recommendedPost.title} &rarr;
            </Link>
          </div>
        )}

      </div>
    </main>
  )
}
