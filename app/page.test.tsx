import { render, screen, cleanup } from '@testing-library/react'
import Page from './page'


// Mock the database
// Intercept calls to Prisma so tests don't hit the real database
vi.mock('../lib/prisma', () => ({
    prisma: {
        post: {
            findMany: vi.fn().mockResolvedValue([
                { id: '1', title: 'Dynamic Post 1', content: 'Testing...', published: true },
                { id: '2', title: 'Dynamic Post 2', content: 'Testing...', published: true },
            ]),
        },
    },
}))

// Ensure DOM is wiped clean after each test
afterEach(() => {
    cleanup()
})

describe('Blog Homepage', () => {
    it('renders dynamic posts from the database', async () => {
        const ResolvedPage = await Page()
        render(ResolvedPage)

        const title1 = screen.getByRole('heading', { level: 2, name: 'Dynamic Post 1' })
        const title2 = screen.getByRole('heading', { level: 2, name: 'Dynamic Post 2' })

        expect(title1).toBeInTheDocument()
        expect(title2).toBeInTheDocument()
    })
})
