import fastify from 'fastify'
import { knex } from './database'
import crypto from 'node:crypto'

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

app.listen(3333).then(() => console.log('HTTP server running'))
