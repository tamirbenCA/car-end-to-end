import EventBusService, { SHOW_MSG } from '../services/EventBusService.js'
import CarService from '../services/CarService.js'
import StorageService from '../services/StorageService.js'


export default {
    template: `
    <section>
    <h1>Cars R Us</h1>

        <table>
            <tr>
                <th v-if="isAdmin">Select</th>
                <th>Car Model</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
            <tr v-for="car in cars">
                <td v-if="isAdmin"><input type="checkbox" :value="car.id" name="multiDelete"/></td>
                <td>{{car.name}}</td>
                <td>{{car.price}}</td>
                <td><router-link :to="'/car/' + car.id">Details</router-link> </td>
            
                <td v-if="isAdmin"> <button @click="deleteCar(car.id)">x</button>
                    <router-link :to="'/car/' + car.id + '/edit'">Edit</router-link>
                </td>
            </tr>
<<<<<<< HEAD
=======
            <div v-if="user" > 
                <button @click="toggleLikes(user)"> Show my likes </button>
            </div>
            <show-likes :likes=likes></show-likes>
>>>>>>> c49bf3233aeaa7688c47841b39c4db6c2d4df6a3
        </table>
        <div>
            <router-link to="/car/create" v-if="isAdmin" tag="button">Add</router-link>
            <button v-if="isAdmin" @click="deleteSelcted">Delete Selected</button>
        </div>
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
        },
        deleteSelcted() {
            var multiSelected = this.getCheckboxesValues();
            // console.log('multi:', multiSelected)
            CarService.deleteSelected(multiSelected)
                .then(_ => {
                    var userMsg = {txt: `${multiSelected.length} cars were succesfuly deleted`, type: 'success' }
                    EventBusService.$emit(SHOW_MSG, userMsg)
                })
        },
        getCheckboxesValues(){
            return [].slice.apply(document.querySelectorAll("input[type=checkbox]"))
                   .filter(function(c){ return c.checked; })
                   .map(function(c){ return c.value; });
        }
        
    },
    computed: {
        isAdmin() {
            return StorageService.loadFromStorage('admin')
        }
    },

    

}