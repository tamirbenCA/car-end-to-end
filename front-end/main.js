'use strict'

import myRoutes from './routes.js'
Vue.use(VueRouter);
const myRouter = new VueRouter({routes : myRoutes})

import UserMsg from './cmps/UserMsg.js'
import NavBar from './cmps/NavBar.js'


new Vue({
    template: `
        <section>
                <h1>My App</h1> 
                <user-msg></user-msg>
                <nav>
                    <nav-bar></nav-bar>
                </nav>
                <router-view></router-view>
                <footer>cofferights 2018</footer>            
        </section>
    `,
    created() {
        console.log('Vue App was created!!!');
    },
    components: {
        UserMsg,
        NavBar
    },
    router: myRouter,
}).$mount('#app')