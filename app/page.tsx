export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 border-b pb-4">
          Nic's Work in Progress Blog
        </h1>

        <div className="space-y-6">
          <article className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-2">My First College Post</h2>
            <p className="text-gray-600">This is the beginning of my TDD blog...</p>
          </article>

          <article className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-2">Understanding Next.js Server Components</h2>
            <p className="text-gray-600">Next.js is the industry standard for...</p>
          </article>
        </div>
      </div>
    </main>
  )
}
