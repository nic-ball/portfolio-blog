import 'dotenv/config'
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    console.log('seeding database...')

    // Create Post 1
    await prisma.post.upsert({
        where: { slug: 'my-first-post' },
        update: {},
        create: {
            title: 'My First TDD Blog Post',
            slug: 'my-first-post',
            content: 'This is the full content of my very first blog post. I built this using Next.js, Prisma and Test Driven Development!',
            published: true,
        },
    })

    // Create Post 2
    await prisma.post.upsert({
        where: { slug: 'my-tdd-rocks' },
        update: {},
        create: {
            title: 'Why Test-Driven Development Rocks',
            slug: 'why-tdd-rocks',
            content: 'TDD forces you to think about the requirements before you write the code. It results in fewer bugs and cleaner architecture.',
            published: true
        },
    })

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
