import AuthService from '../services/AuthService.js'
import EventBusService from '../services/EventBusService.js'

export default {
    template: `
        <section>
            <input type="text" v-model="user.name" placeholder="Full Name">
            <input type="text" v-model="user.email" placeholder="Valid e-mail">
            <input type="text" v-model="user.password" placeholder="Choose Password">
            <button @click="submit">Submit</button>
        </section>
    
    `,
    data() {
        return {
            user: {name: '' , email: '' , password: ''}
        }
    },
    created() {

            },
    methods: {
        submit() {
            AuthService.logIn(this.user)
                .then(res => {
                   console.log('log in res:', res)
                   EventBusService.$emit('userLoggedIn', res)
                   this.$router.push('/')
                })
        }
    }
}