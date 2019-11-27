const express = require('express')
const app = express()
const cors = require('cors')

// const five = require('johnny-five')
// const Board = new five.Board()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send({ message: 'Tudo ok' })
})

app.get('/temperatura', (req, res) => {
  const temp = '60'
  res.send({ temperatura: temp })
})

app.listen(3333, () => {
  console.log('Rodando na porta 3333')
})