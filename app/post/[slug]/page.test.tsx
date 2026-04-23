import { render, screen, cleanup } from '@testing-library/react'
import PostPage from './page'

// 1. MOCK THE DATABASE
vi.mock('../../../lib/prisma', () => ({
  prisma: {
    post: {
      // Mock the main article
      findUnique: vi.fn().mockResolvedValue({
        id: '1',
        title: 'My Awesome Dynamic Post',
        content: 'This is the full content of the article. It has some words.',
        published: true,
        createdAt: new Date('2026-03-26T12:00:00Z'),
      }),
      // THE FIX: Mock the "Read Next" articles so it doesn't crash!
      findMany: vi.fn().mockResolvedValue([
        { id: '2', title: 'Random Recommended Post', slug: 'random-post', published: true }
      ]),
    },
  },
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('Single Blog Post Page', () => {
  it('renders the post title, content, and AC4.3 stats', async () => {
    // 2. RENDER THE ASYNC PAGE
    const ResolvedPage = await PostPage({ params: Promise.resolve({ slug: 'my-awesome-dynamic-post' }) })
    render(ResolvedPage)

    // 3. ASSERTIONS
    const title = screen.getByRole('heading', { level: 1, name: 'My Awesome Dynamic Post' })
    expect(title).toBeInTheDocument()

    expect(screen.getByText(/This is the full content/i)).toBeInTheDocument()

    // 4. Verify the Math Stats are rendering!
    expect(screen.getByText(/min read/i)).toBeInTheDocument()
    expect(screen.getByText(/Complexity Score:/i)).toBeInTheDocument()

    // Verify the random recommendation is rendering
    expect(screen.getByText('Random Recommended Post')).toBeInTheDocument()
  })
})
