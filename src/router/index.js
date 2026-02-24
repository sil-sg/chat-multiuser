import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'sign',
        component: () => import('../views/Sign.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/Setting.vue')
    },
    {
        path: '/multi',
        name: 'multi',
        component: () => import('../views/Multi.vue')
    },
]

const router = createRouter( {
    history: createWebHistory(),
    routes
})

export default router