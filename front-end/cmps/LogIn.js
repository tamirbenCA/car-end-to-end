import AuthService from '../services/AuthService.js'
import EventBusService from '../services/EventBusService.js'

export default {
    template: `
        <section>
            <input type="text" v-model="user.email" placeholder="email">
            <input type="text" v-model="user.password" placeholder="password">
            <button @click="submit">Submit</button>
        </section>
    
    `,
    data() {
        return {
            user: {email: '' , password: ''}
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