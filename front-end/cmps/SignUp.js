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
            AuthService.signUp(this.user)
                .then(res => {
                   EventBusService.$emit('userLoggedIn', res)
                   this.$router.push('/')
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}