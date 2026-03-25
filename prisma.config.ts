import 'dotenv/config'
import { defineConfig } from '@prisma/config'

export default defineConfig({
  // Tell the Prisma CLI where to find the database for migrations
  datasource: {
    url: process.env.DATABASE_URL,
  }
})
