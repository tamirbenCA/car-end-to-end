import HomePage from './pages/HomePage.js'
import CarDetailsPage from './pages/CarDetailsPage.js'
import CarEditPage from './pages/CarEditPage.js'
import LogIn from './cmps/LogIn.js'
import SignUp from './cmps/SignUp.js'

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/car/create',
        component: CarEditPage
    },    
    {
        path: '/car/:carId',
        component: CarDetailsPage
    },
    
    {
        path: '/car/:carId/edit',
        component: CarEditPage
    },
    {
        path: '/user/login',
        component: LogIn
    },
    {
        path: '/user/signup',
        component: SignUp
    }
];

export default routes;