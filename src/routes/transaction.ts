import { FastifyInstance } from 'fastify'
import knex from 'knex'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/hello', async () => {
    const transactions = await knex('transactions').select('*')

    return transactions
  })

  app.get('/insert', async () => {
    const transactions = await knex('transactions')
      .insert({
        id: crypto.randomUUID(),
        title: 'Transaction test',
        amount: 1000,
      })
      .returning('*')

    return transactions
  })
}
