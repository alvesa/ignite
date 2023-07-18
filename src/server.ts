import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const transactions = await knex('transactions').select('*')

  return transactions
})

app.get('/insert', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transaction test',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app.listen(env.PORT).then(() => console.log('HTTP server running'))
