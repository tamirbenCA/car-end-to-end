    import EventBusService from '../services/EventBusService.js'

export default {
    template: `
        <section>
            <router-link to="/" exact tag="button">Home</router-link>
            <router-link to="/user/login" v-if="!user" tag="button">Log In</router-link>
            <router-link to="/user/signup" v-if="!user" tag="button">Sign Up</router-link>
            <button v-if="user" @click="logOut">Log Out</button>
        </section>
    
    `,
    data() {
        return {
            user: false
        }
    },
    created() {
        EventBusService.$on('userLoggedIn', res => {
            this.user = res
        })

            },
    methods: {
        logOut() {
            EventBusService.$emit('userLoggedIn', false); 
            
        },
    }
}