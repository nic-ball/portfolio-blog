import { createPost } from "./postActions";

// Mock Prisma
vi.mock('../../../lib/prisma', () => ({
  prisma: {
    post: {
      create: vi.fn().mockResolvedValue({
        id: 'new-id-123',
        title: 'My New Test Post',
        slug: 'my-new-test-post',
        content: 'This is the content',
        published: true,
      }),
    },
  },
}))

vi.mock('../../../auth', () => ({
  auth: vi.fn().mockResolvedValue({ user: { name: 'Admin', email: 'admin@test.com' } }),
}))

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

describe('Server Actions: createPost', () => {
  it('successfully creates a new post in the database', async () => {

    // Simulate FormData Obj coming from browser
    const formData = new FormData()
    formData.append('title', 'My New Test Post')
    formData.append('slug', 'my-new-test-post')
    formData.append('content', 'This is the content')

    // Call the action
    const result = await createPost(formData)

    expect(result.success).toBe(true)
    expect(result.postId).toBe('new-id-123')
  })
})
