export default function NewPostPage() {
  return (
    <main className="min-h-screen p-10 bg-gray-50 text-gray-900">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-8">Create New Post</h1>

        <form className="space-y-6">
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

          <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md font-bold hover:bg-green-700 transition">
            Publish Post
          </button>
        </form>
      </div>
    </main>
  )
}
