import AuthService from '../services/AuthService.js'
import EventBusService from '../services/EventBusService.js'
import StorageService from '../services/StorageService.js'

export default {
    template: `
        <form onsubmit.prevent>
            <input type="text" v-model="user.email" placeholder="email">
            <input type="text" v-model="user.password" placeholder="password">
            <button @click="submit">Submit</button>
        </form>
    
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
                    if (res) {
                        console.log(res)
                        EventBusService.$emit('userLoggedIn', res)
                        this.$router.push('/')
                        // StorageService.saveToStorage('user', res.name)
                        if (res.isAdmin === "true")   StorageService.saveToStorage('admin', "true")
                    }
                }).catch(err => {
                    console.log(err)
                });
        }
    }
}