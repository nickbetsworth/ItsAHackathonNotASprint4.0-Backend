/**
 * A plugin that provide encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
import { forecastBalance } from "../forecasting/forecastBalance.js";
import { getAccount, getRegularPayments } from "../model/accounts.js";

function routes (fastify, options) {
  fastify.get('/account/:accountId', async (request, reply) => {
    try {
      const account = await getAccount(fastify.dbClient, request.params.accountId);
      const payments = await getRegularPayments(fastify.dbClient, request.params.accountId);

      return {
        account_id: account.account_id,
        balance: account.balance,
        account_name: account.account_name,
        forecast_balance: forecastBalance(account.balance, payments),
        next_incoming_payment: payments.filter(payment => payment.type === 'incoming').at(0),
      }
    } catch (error) {
      reply.status(404).send({ error: 'Account not found' });
    }
  })
}

export default routes;