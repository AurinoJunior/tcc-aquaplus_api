const express = require('express')
const app = express()
const cors = require('cors')

const { Board, Thermometer } = require("johnny-five");
const board = new Board()

board.on("ready", () => {

  const thermometer = new Thermometer({
    controller: "DS18B20",
    pin: 2
  });

  app.use(cors())
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send({ message: 'Tudo ok' })
  })

  app.get('/temperatura', (req, res) => {
    const { celsius } = thermometer;
    const graus = celsius.toPrecision(2)
    console.log(graus)
    res.set('Content-Type', 'application/json').send({ temperatura: graus })
  })

  app.get('/cooler', (req, res) => {
    res.send({ message: 'cooler ligado' })
  })

  app.listen(3333, () => {
    console.log('Rodando na porta 3333')
  })
})
