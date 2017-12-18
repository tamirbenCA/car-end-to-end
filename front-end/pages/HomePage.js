import EventBusService, { SHOW_MSG } from '../services/EventBusService.js'
import CarService from '../services/CarService.js'
import StorageService from '../services/StorageService.js'

export default {
    template: `
    <section>
    <h1>Cars R Us</h1>
        <table>
            <tr>
                <th>Car Model</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
            <tr v-for="car in cars">
                <td>{{car.name}}</td>
                <td>{{car.price}}</td>
                <td><router-link :to="'/car/' + car.id">Details</router-link> </td>
            
                <td v-if="isAdmin"> <button @click="deleteCar(car.id)">x</button>
                    <router-link :to="'/car/' + car.id + '/edit'">Edit</router-link>
                </td>
            </tr>
            <div v-if="user" > 
                <button @click="toggleLikes(user)"> Show my likes </button> 
            </div>
            <show-likes :likes=likes></show-likes>
        </table>
        <router-link to="/car/create" v-if="isAdmin">Add</router-link>
    </section>    `,
    data() {
        return {
            cars: [],
            newCar: CarService.emptyCar(),
            user: false,
            likes:[],
        }
    },
    created() {
        EventBusService.$on('userLoggedIn', res => {
            this.user = res;
            
        })
        CarService.getCars()
            .then(cars => {
                var userMsg = { txt: 'Cars Loaded', type: 'success' }
                EventBusService.$emit(SHOW_MSG, userMsg)
                this.cars = cars
            })
            .catch(err => {
                var userMsg = { txt: 'Cars Loaded Failed!', type: 'danger' }
                EventBusService.$emit(SHOW_MSG, userMsg)
                this.cars = []
            })
    },
    methods: {
        toggleLikes(user){
            CarService.getLikedCars(user.id)
            .then((res)=>{
                this.likes = res;
            })
        },
        deleteCar(carId) {
            CarService.deleteCar(carId)
             .then(_ => {
                var userMsg = {txt: `Car ${carId} was succesfuly deleted`, type: 'success' }
                EventBusService.$emit(SHOW_MSG, userMsg)
                // TODO - show the updated list
             })
             .catch(err => {
                var userMsg = {txt: 'Car Delete Failed!', type: 'danger' }
                EventBusService.$emit(SHOW_MSG, userMsg)
                
            })
        }     
    },
    computed: {
        isAdmin() {
            console.log(StorageService.loadFromStorage('admin'))
            return StorageService.loadFromStorage('admin')
        }
    }

}