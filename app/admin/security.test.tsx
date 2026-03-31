import { render, screen } from '@testing-library/react'
import { redirect } from 'next/navigation'
import AdminDashboard from './page'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}))

describe('Admin Security', () => {
  it('redirects to login if the user is not authenticated', async () => {
    // for now null is treated as not authenticated
    // this is a placeholder for the logic
    await AdminDashboard()

    expect(redirect).toHaveBeenCalledWith('/api/auth/signin')
  })
})
