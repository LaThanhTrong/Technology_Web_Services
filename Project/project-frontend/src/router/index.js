import { createRouter, createWebHistory } from 'vue-router'
import makeUsersService from '@/services/users.service';
import { useQuery } from '@tanstack/vue-query';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/Home.vue'),
    },

    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue'),
    },

    {
        path: '/product',
        name: 'product',
        component: () => import('@/views/Product.vue'),
    },
    {
        path: '/product/edit/:id',
        name: 'edit',
        component: () => import('@/views/EditProduct.vue'),
        props: (route) => ({ id: route.params.id }),
        meta: { requiresAuth: true },
    },
    {
        path: '/product/add',
        name: 'add',
        component: () => import('@/views/AddProduct.vue'),
        meta: { requiresAuth: true },
    },

    {
        path: '/product/brand/:bid/:bname',
        name: 'brand',
        component: () => import('@/views/Product.vue'),
        props: (route) => ({ bid: route.params.bid, bname: route.params.bname }),
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        const data = await makeUsersService.getSession();
        if (!data.user) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else {
        next()
    }
})


export default router;
