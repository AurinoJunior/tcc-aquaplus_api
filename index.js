const express = require('express')
const app = express()
const cors = require('cors')
require('events').EventEmitter.defaultMaxListeners = 15;


const { Board, Thermometer, Sensor, Relay } = require("johnny-five");
const board = new Board()

board.on("ready", () => {

  /* Sensores */
  const thermometer = new Thermometer({
    controller: "DS18B20",
    pin: 12
  });

  // const nivelAgua = new Sensor({
  //   pin: 8,
  //   type: "digital",
  //   freq: 250,
  //   threshold: 5
  // })


  /* ROTAS */
  app.use(cors())
  app.use(express.json())

  app.get('/', (req, res) => {
    res.send({ message: 'Tudo ok' })
  })


  app.post('/relay', (req, res) => {
    const { toggle, tipoComponente } = req.body
    console.log(req.body)
    let relay;
    switch (tipoComponente) {
      case 'Filtro':
        relay = new Relay(10)
        ativaRele(relay, toggle)
        break;

      case 'Termostato':
        relay = new Relay(10)
        ativaRele(relay, toggle)
        break;

      case 'Cooler':
        relay = new Relay(2)
        ativaRele(relay, toggle)
        break;

      case 'Repositor':
        relay = new Relay(10)
        ativaRele(relay, toggle)
        break;

      case 'Alimentador':
        relay = new Relay(4)
        ativaRele(relay, toggle)
        break;

      case 'Iluminacao':
        console.log("To aqui")
        relay = new Relay(3)
        ativaRele(relay, toggle)
        break;

      default:
        break;
    }



    return res.send({ toggle })
  })

  app.get('/temperatura', (req, res) => {
    try {
      const { celsius } = thermometer
      const graus = celsius.toPrecision(2)
      console.log(graus)
      return res.set('Content-Type', 'application/json').send({ temperatura: graus })
    } catch (e) {
      console.error('Deu ruim com a temperatura')
    }
  })

  // nivelAgua.on("change", () => {
  //   app.get('/nivelagua', (req, res) => {
  //     try {
  //       console.log("Agua", nivelAgua.value)
  //       return res.set('Content-Type', 'application/json')
  //         .send({ nivel: nivelAgua.value })
  //     } catch (e) {
  //       console.error('Deu ruim com o nivel de agua')
  //     }
  //   })
  // })

  /* Server rodando */
  app.listen(3333, () => {
    console.log('Rodando na porta 3333')
  })
})

/*Func Utils*/

function ativaRele(relay, toggle) {
  if (toggle) {
    relay.on()
    console.log('Relay open')
  } else {
    console.log('Relay close')
    relay.off()
  }
}