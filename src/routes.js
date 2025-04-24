/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
import { getAccount } from "./model/accounts.js";

function routes (fastify, options) {
  fastify.get('/account/:accountId', async (request, reply) => {
    try {
      return await getAccount(fastify.dbClient, request.params.accountId);
    } catch (error) {
      reply.status(404).send({ error: 'Account not found' });
    }
  })
}

export default routes;