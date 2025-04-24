/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes (fastify, options) {
  fastify.get('/account/:accountId', async (request, reply) => {
    return {
      accountId: request.params.accountId,
      balance: 1000
    }
  })
}

export default routes;