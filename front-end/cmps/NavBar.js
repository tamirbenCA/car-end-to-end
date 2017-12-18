import EventBusService from '../services/EventBusService.js'

export default {
    template: `
        <section>
            <router-link to="/" exact>Home</router-link>
            <router-link to="/" v-if="!user" @click="signUp">Sign Up</router-link>
            <router-link to="/user/login" v-if="!user">Log In</router-link>
            <a href v-if="user" @click="logOut">Log Out</a>
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
        signIn() {
           console.log('sign in') 
        },
        signOut() {
            console.log('sign out') 
            
        },
        SignUp() {
            console.log('sign up') 

        }
    }
}