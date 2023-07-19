import fastify from 'fastify'
import { env } from './env'
import { transactionsRoutes } from './routes/transaction'

const app = fastify()

app.register(transactionsRoutes)

app.listen(env.PORT).then(() => console.log('HTTP server running'))
