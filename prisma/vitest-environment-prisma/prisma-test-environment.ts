import { prisma } from '@/lib/prisma'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest/environments'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL env variable')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    // Cria o banco de testes
    // função executada antes dos testes end-to-end
    const schema = randomUUID()
    const databaseUrl = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy')

    return {
      // Cria o banco de testes
      // função executada depois dos testes end-to-end
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()
      },
    }
  },
}
