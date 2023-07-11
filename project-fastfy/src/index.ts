import fastify from 'fastify';

const app = fastify()

app.get('/hello', () => {
  return 'Hello Worlds!'
})

app.listen(3333).then(() => console.log('HTTP server running'));