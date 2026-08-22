import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// Use Supabase pooled connection string (port 6543 / 5432) with SSL for serverless environments
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:%21Poonam%400203@db.rtrhiahpdxdryzqwirci.supabase.co:6543/postgres'

const pool = new pg.Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
