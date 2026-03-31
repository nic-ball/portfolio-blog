import { render, screen, cleanup } from '@testing-library/react'
import AdminDashboard from './page'

// Mock db (Admin requires to see all posts, even unpublished drafts)
vi.mock('../../lib/prisma', () => ({
  prisma: {
    post: {
      findMany: vi.fn().mockResolvedValue([
        { id: '1', title: 'Published Post', published: true },
        { id: '2', title: 'Secret Draft', published: false },
      ]),
    },
  },
}))

vi.mock('../../auth', () => ({
  auth: vi.fn().mockResolvedValue({ user: { name: 'Admin', email: 'admin@test.com' } }),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

describe('Admin Dashboard', () => {
  it('renders the dashboard heading and a create button', async () => {
    const ResolvedPage = await AdminDashboard()
    render(ResolvedPage)

    const heading = screen.getByRole('heading', { level: 1, name: 'Admin Dashboard' })
    expect(heading).toBeInTheDocument()

    const createBtn = screen.getByRole('link', { name: /Create New Post/i })
    expect(createBtn).toBeInTheDocument()
  })

  it('renders all posts including drafts', async () => {
    const ResolvedPage = await AdminDashboard()
    render(ResolvedPage)

    expect(screen.getByText('Published Post')).toBeInTheDocument()
    expect(screen.getByText('Secret Draft')).toBeInTheDocument()
  })
})
