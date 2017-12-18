// import colors from 'colors';
import CarService from './services/CarService'

import express from 'express'
import bodyParser from 'body-parser'

import cors from 'express-cors'

const app = express()
app.use(cors({
    allowedOrigins: [
        'localhost:8080', '127.0.0.1:8080'
    ]
}))
app.use(bodyParser());

const CAR_URL = '/data/car';

app.get(CAR_URL, (req, res) => {
    CarService.getCars()
        .then(cars => {
            res.json(cars)
        })
        .catch(err => res.status(500).send(err.message))
})
app.get(`${CAR_URL}/:carId`, (req, res) => {
    const carId = req.params.carId;
    CarService.getById(carId)
        .then(car => {
            res.json(car)
        })
        .catch(err => res.status(500).send(err.message))
})

app.delete(`${CAR_URL}/:carId`, (req, res) => {
    const carId = req.params.carId;
    if (!carId) {
        res.status(500).send('Missing CarID to delete')
    }
    CarService
        .deleteCar(carId)
        .then(_ => res.end())
        .catch(err => res.status(500).send('Could not delete car'))
})
app.post(CAR_URL, (req, res) => {
    const car = req.body;
    CarService
        .addCar(car)
        .then(car => res.json(car))
        .catch(err => res.status(500).send('Could not add car'))
})

app.put(`${CAR_URL}/:carId`, (req, res) => {
    const carId = req.params.carId;
    const car = req.body;
    CarService
        .updateCar(car)
        .then(car => res.json(car))
        .catch(err => res.status(500).send('Could not add car'))
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))


















// CarService
//     // .addCar('Subaru')
//     // .then(_ => {
//         CarService.getCars()
//         .then(cars => {
//             console.log('index cars:', cars);
//         })
//         .catch(err => {
//             console.error(err.message.red);
//         })

//     // })



