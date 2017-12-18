

export default {
    template: `
        <section>
            <ul>
                <li v-for="like in likes">
                    {{like}}
                </li>
            </ul>
            <button @click="goBack">Go back</button>
        </section>
    
    `,
    data() {
        return {
           
        }
    },
    props:['likes'],
    created() {
        console.log('im herererererere 22222')
            },
    methods: {
        goBack(){
            this.$router.push('/')            
        }
    }
}