import fs from 'fs';
import shortid from 'shortid';

const FILE_NAME = 'cars.json';

function getCars() {
    return new Promise((resolve, reject) => {
        fs.readFile(FILE_NAME, 'utf8', (err, strCars) => {
            if (err) {
                reject(err);
            } else {
                var cars = JSON.parse(strCars)
                resolve(cars)

            }
        })
    });
}

function getById(carId) {
    return getCars().then(cars => {
        const car = cars.find(car => car.id === carId);
        if (car) return car;
        else throw new Error('Car not Found');
    })
}
function deleteCar(carId) {
    return getCars().then(cars => {
        cars = cars.filter(car => car.id !== carId);
        return _saveCars(cars)
    })
}
function addCar(car) {
    return getCars().then(cars => {
        car.id = shortid.generate();
        cars.push(car)
        return _saveCars(cars).then(_ => car)
    })
}
function updateCar(car) {
    return getCars().then(cars => {
        cars.splice(_getCarIdx(cars, car.id), 1, car)
        return _saveCars(cars).then(_ => car)
    })
}


function _saveCars(cars) {
    return new Promise((resolve, reject) => {
        var strCars = JSON.stringify(cars)
        fs.writeFile(FILE_NAME, strCars, 'utf8', (err, data) => {
            if (err) reject(err)
            else resolve()
        })
    });
}

function _getCarIdx(cars, carId) {
    return cars.findIndex(car => car.id === carId)
}


export default {
    getCars,
    getById,
    deleteCar,
    updateCar,
    addCar
}

// var c = generateCars()
// saveCars(c);

function generateCars() {
    const cars = []
    for (let i = 1; i <= 10; i++) {
        cars.push({
            id: shortid.generate(),
            name: `Car ${i}`,
            price: 100 * i
        })

    }
    return cars;
}