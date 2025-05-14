import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '#/supabase'
import { useUserStore } from '#/stores/useUserStore'

import Home from '#/components/pages/Home.vue'
import Files from '#/components/pages/Files.vue'
import Login from '#/components/pages/Login.vue'
import Registration from '#/components/pages/Registration.vue'

const routes = [
    { path: '/login', name: 'Login', component: Login },
    { path: '/registration', name: 'Registration', component: Registration },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/files',
        name: 'Files',
        component: Files,
        meta: { requiresAuth: true }
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (!requiresAuth) return next()

    const userStore = useUserStore();
    const user = await userStore.fetchUser()

    if (!user) {
        next('/login')
    } else {
        next()
    }
})

export default router
