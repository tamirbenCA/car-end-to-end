    import EventBusService from '../services/EventBusService.js'
    import StorageService from '../services/StorageService.js'
    import ShowLikes from '../cmps/ShowLikes.js'
    import CarService from '../services/CarService.js'
    

export default {
    template: `
        <section>
            <router-link to="/" exact tag="button">Home</router-link>
            <router-link to="/user/login" v-if="!user" tag="button">Log In</router-link>
            <router-link to="/user/signup" v-if="!user" tag="button">Sign Up</router-link>
            <span v-if="user">Hello {{user.name}}</span>
            <button v-if="user" @click="logOut">Log Out</button>
            <div v-if="user" > 
            <button @click="toggleLikes(user)"> Show my likes </button> 
            <show-likes :likes="likes"></show-likes>
        </div>
        </section>
    
    `,
    data() {
        return {
            user: null,
            likes:[]
        }
    },
    created() {
        EventBusService.$on('userLoggedIn', res => {
          //gets an object
            this.user = res
        })
        var loggedInUser = StorageService.loadFromStorage('user');
        if (loggedInUser)       this.user = loggedInUser.data;
    },
    methods: {
        logOut() {
            EventBusService.$emit('userLoggedIn', false);
            StorageService.clearStorage('user')
            StorageService.clearStorage('admin')
        },
        toggleLikes(user){
            this.likes = user.favCarIds;
        },
    },
    components: {
        ShowLikes
    }
}