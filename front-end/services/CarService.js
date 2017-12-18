var cars = [
    {
        id: 101,
        model: 'Audi',
        price: 763
    },
    {
        id: 98,
        model: 'Subaru',
        price: 323
    }    
]

const CAR_URL = 'http://localhost:3000/data/car';

function emptyCar() {
    return {name: '', price: 0}
}

function _getNextId() {
    var maxId = cars.reduce((acc, car)=>{
        return (car.id > acc)? car.id : acc
    }, 0);
    return maxId + 1;
} 


function getCars() {
    return axios
            .get(CAR_URL)
            .then(res => res.data)
}

function saveCar(car) {
    if (car.id) return axios.put(_getCarUrl(car.id), car)
    else return axios.post(CAR_URL, car);

    // return new Promise((resolve, reject)=>{
    //     if (car.id) {
    //         var carToUpdateIdx = cars.findIndex(currCar => currCar.id === car.id)
    //         cars.splice(carToUpdateIdx, 1, car);
    //     }  else {
    //         car.id = _getNextId();
    //         cars.push(car);
    //     }
       
    //     resolve(car)
    //     // reject()
    // });
}

function deleteCar(carId) {
    return axios.delete(_getCarUrl(carId))
}


function getCarById(carId) {
    return axios
    .get(_getCarUrl(carId))
    .then(res => res.data)
    
    
}

function _getCarUrl(carId) {
    return `${CAR_URL}/${carId}`;
}

export default {
    getCars,
    saveCar,
    deleteCar,
    emptyCar,
    getCarById
}