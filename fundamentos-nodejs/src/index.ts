import express from 'express'

const app = express();

app.get('/courses', (req, res) => {
  res.json(['Cruso 1','Cruso 2','Cruso 3'])
});

app.listen(3333, () => {
  console.log('listening on port 3000')
});