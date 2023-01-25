const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
const PORT = 3333;

const customers = [];

// Middleware
function verifyIfExistsAccountCPF(req, res, next) {
  const { cpf } = req.headers;

  const customer = customers.find(c => c.cpf === cpf)

  if(!customer)
    res.status(404).json({ error: 'Customer not found' });

  req.customer = customer;

  return next();
}
// app.use(verifyIfExistsAccountCPF);

app.post('/account', (req, res) => {
  const { cpf, name } = req.body;

  const customerAlreadyExists = customers.some(c => c.cpf === cpf);

  if(customerAlreadyExists)
    res.status(400).json({ error: 'Customer already exists' });

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: [],
  });

  res.status(201).json({});
});

app.put('/account', verifyIfExistsAccountCPF, (req, res) => {
  const { name } = req.body;
  const { customer } = req;
  
  customer.name = name;

  res.status(201).json({});
});

app.get('/account', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  res.status(200).json({ customer });
});

app.delete('/account', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  customers.splice(customer, 1);

  return res.status(200).json(customer);
});

app.get('/balance', verifyIfExistsAccountCPF, (req, res) => {
  const { customer } = req;

  const balance = getBalance(customer.statement)
  
  res.status(200).json({ balance });
});

app.get('/statement', verifyIfExistsAccountCPF, (req, res) => {

  const { customer } = req;
  
  res.status(200).json({ customer });
});

app.get('/statement/date', verifyIfExistsAccountCPF, (req, res) => {

  const { customer } = req;
  const { date } = req.query;

  const dateFormat = new Date(date + " 00:00");

  const statements = customer.statement.filter(st => st.createdAt.toDateString() === new Date(dateFormat).toDateString())
  
  res.status(200).json({ statements });
});

function getBalance(statement) {
  return statement.reduce((acm, current) => {
    if(current.type === 'credit')
      return acm + current.amount;

    return acm - current.amount;
  }, 0);
}

app.post('/deposit', verifyIfExistsAccountCPF, (req, res) => {

  const { description, amount } = req.body;
  const { customer } = req;
  const statmentOperation = {
    description,
    amount,
    createdAt: new Date(),
    type: 'credit'
  }

  customer.statement.push(statmentOperation);

  res.status(201).json();

});

app.post('/withdraw', verifyIfExistsAccountCPF, (req, res) => {
  const { amount, description } = req.body;

  const { customer } = req;

  const balance = getBalance(customer.statement);

  if(balance < amount)
    return res.status(400).json('Insufficient funds');

  const statmentOperation = {
    description,
    amount,
    createdAt: new Date(),
    type: 'debit',
  }

  customer.statement.push(statmentOperation);

  return res.status(201).send();
});

app.listen(PORT, () => {
  console.log(`listening port ${PORT}`);
});
