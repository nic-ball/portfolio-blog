import { render, screen, cleanup } from '@testing-library/react'
import PostPage from './page'

// Mock the database
jest.mock('../../../lib/prisma', () => ({
    prisma: {
        post: {
            // Mock findUnique instead of findMany
            findUnique: jest.fn().mockResolvedValue({
                id: '1',
                title: 'A Dynamic Post',
                content: 'This is the full content of the article',
                published: true,
                createdAt: new Date('2026-03-26T12:00:00Z'),
            }),
        },
    },
}))

afterEach(() => {
    cleanup()
    jest.clearAllMocks()
})

describe('Single Blog Post Page', () => {
    it('render the specific blog post title and content', async () => {
        const ResolvedPage = await PostPage({ params: Promise.resolve({ slug: 'A dynamic Post' }) })
        render(ResolvedPage)

        const title = screen.getByRole('heading', { level: 1, name: 'A Dynamic Post' })
        const content = screen.getByText('This is the full content of the article')

        expect(title).toBeInTheDocument()
        expect(content).toBeInTheDocument()
    })
})
