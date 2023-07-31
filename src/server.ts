import { app } from '../src/app'
import { env } from './env'

app
  .listen(env.PORT)
  .then(() => console.log(`HTTP server running on port ${env.PORT}`))
