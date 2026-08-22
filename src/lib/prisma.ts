import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

// Force port 6543 (Supabase Transaction Pooler) on Vercel to prevent connection exhaustion
let rawConnectionString = process.env.DATABASE_URL || 'postgresql://postgres:%21Poonam%400203@db.rtrhiahpdxdryzqwirci.supabase.co:6543/postgres'

if (rawConnectionString.includes(':5432/')) {
  rawConnectionString = rawConnectionString.replace(':5432/', ':6543/')
}

const pool = new pg.Pool({ 
  connectionString: rawConnectionString,
  ssl: { rejectUnauthorized: false },
  max: 1, // Recommended for serverless single function instances
  connectionTimeoutMillis: 10000,
})

const adapter = new PrismaPg(pool)

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
