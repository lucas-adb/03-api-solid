import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const name = 'John Doe'
    const email = 'johndoe@example.com'
    const password = '123456'

    await request(app.server).post('/users').send({
      name,
      email,
      password,
    })

    const response = await request(app.server).post('/sessions').send({
      email,
      password,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
