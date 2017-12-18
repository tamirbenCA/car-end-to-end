    import EventBusService from '../services/EventBusService.js'
    import StorageService from '../services/StorageService.js'

export default {
    template: `
        <section>
            <div>
                <router-link to="/" exact tag="button">Home</router-link>
                <router-link to="/user/login" v-if="!user" tag="button">Log In</router-link>
                <router-link to="/user/signup" v-if="!user" tag="button">Sign Up</router-link>
                <button v-if="user" @click="logOut">Log Out</button>
            </div>
            <span v-if="user">Hello {{user.name}}</span>
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