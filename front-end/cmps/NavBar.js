    import EventBusService from '../services/EventBusService.js'
    import StorageService from '../services/StorageService.js'

export default {
    template: `
        <section>
            <router-link to="/" exact tag="button">Home</router-link>
            <router-link to="/user/login" v-if="!user" tag="button">Log In</router-link>
            <router-link to="/user/signup" v-if="!user" tag="button">Sign Up</router-link>
            <span v-if="user">Hello {{user.name}}</span>
            <button v-if="user" @click="logOut">Log Out</button>
        </section>
    
    `,
    data() {
        return {
            user: null
        }
    },
    created() {
        EventBusService.$on('userLoggedIn', res => {
            this.user = res
        })
        var loggedInUser = StorageService.loadFromStorage('user');
        if (loggedInUser)       this.user = loggedInUser;
    },
    methods: {
        logOut() {
            EventBusService.$emit('userLoggedIn', false);
            StorageService.clearStorage('user')
            StorageService.clearStorage('admin')
        },
    }
}