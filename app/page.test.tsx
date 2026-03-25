import { render, screen, cleanup } from '@testing-library/react'
import Page from './page'

// Ensure DOM is wiped clean after each test
afterEach(() => {
    cleanup()
})

describe('Blog Homepage', () => {
    it('renders the main heading', () => {
        render(<Page />)
        const heading = screen.getByRole('heading', { level: 1, name: /Nic's Work in Progress Blog/i })
        expect(heading).toBeInTheDocument()
    })

    it('renders exactly two blog posts', () => {
        render(<Page />)
        // getAllByRole returns an array of matching DOM elements
        const articles = screen.getAllByRole('article')

        // Log the actual HTML if it fails again so we can see the ghost!
        if (articles.length !== 2) {
            screen.debug()
        }

        expect(articles).toHaveLength(2)
    })
})
