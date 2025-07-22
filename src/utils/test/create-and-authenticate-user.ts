import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin: boolean = false,
) {
  const name = 'John Doe'
  const email = 'johndoe@example.com'
  const password = '123456'

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: await hash(password, 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password,
  })

  const { token } = authResponse.body

  return { token }
}
