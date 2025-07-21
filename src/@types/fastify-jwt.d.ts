import '@fastify/jwt'
// docs: https://github.com/fastify/fastify-jwt

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub: string
    }
  }
}
