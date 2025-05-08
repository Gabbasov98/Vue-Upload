import { createApp } from 'vue'
import { createPinia } from "pinia";
import './assets/styles/main.scss'
import App from './App.vue'
import router from './router'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

let app
onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App)
            .use(router)
            .use(createPinia())
            .mount('#app')
    }
})
