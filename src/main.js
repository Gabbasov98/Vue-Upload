import { createApp } from 'vue'
import { createPinia } from "pinia";
import './assets/styles/main.scss'
import App from './App.vue'
import router from './router'
import { supabase } from './supabase'
import { onAuthStateChanged } from 'firebase/auth'

let app
supabase.auth.getSession().then(({ data: { session } }) => {
    if (!app) {
        app = createApp(App)
            .use(createPinia())
            .use(router)
            .mount('#app')
    }
})

