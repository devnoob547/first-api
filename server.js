const express = require('express')
const app = express()

const data = require('./data.json')

const port = 3000

app.use(express.json())

app.get('/clients', (req, res) => {
  return res.json(data)
})

app.get('/clients/:id', (req, res) => {
  const { id } = req.params
  const client = data.find(cli => cli.id == id)

  if(!client) return res.status(204).json()

  return res.json(client)
})

app.post('/clients', (req, res) => {
  const { name, email } = req.body

  res.json({ name, email })
})

app.put('/clients/:id', (req, res) => {
  const { id } = req.params
  const client = data.find(cli => cli.id == id)

  if(!client) return res.status(204).json()

  const { name } = req.body

  client.name = name

  return res.json(client)
})

app.delete('/clients/:id', (req, res) => {
  const { id } = req.params
  const clientFiltered = data.filter(client => client.id != id)

  return res.json(clientFiltered)
})

app.listen(port, () => {
  console.log(`server is running in http://localhost:${port}`)
})