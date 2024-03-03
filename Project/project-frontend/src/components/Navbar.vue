<script setup>
import makeBrandsService from '../services/brands.service';
import { useQuery } from '@tanstack/vue-query';

const { isLoading, isError, data, error, refetch } = useQuery(['brands'], () => makeBrandsService.getBrands());

</script>

<template>
    <header class="bg-gradient-to-b from-violet-400 to-blue-500 p-3 shadow-slate-700 caret-transparent">
        <nav class="text-white text-xl">
            <div class="flex items-center justify-between gap-7">

                <div>
                    <img src="/images/logo.png" class="w-10 h-10 rounded-2xl flex items-center" alt="">
                </div>
                <ul class="flex gap-7">
                    <li>
                        <router-link class="hover:text-gray-300" :to="{ name: 'home' }">Home</router-link>
                    </li>
                    <li>
                        <router-link class="hover:text-gray-300" :to="{ name: 'product' }">Product</router-link>
                    </li>

                    <span v-if="isLoading">Loading...</span>
                    <span v-if="isError">An error has occurred: {{ error.message }}</span>
                    <li v-else class="container">
                        Catogories
                        <ul class="dropdown bg-blue-500">
                            <li v-for="(brand, index) in data" :key="index">
                                <router-link class="hover:text-gray-300"
                                    :to="{ name: 'brand', params: { bid: brand.bid, bname: brand.bname } }">
                                    {{ brand.bname }}
                                </router-link>
                            </li>
                        </ul>
                    </li>

                </ul>

                <div class="">
                    <router-link class="hover:text-gray-300" :to="{ name: 'login' }">Login</router-link>
                </div>


            </div>
        </nav>
    </header>
</template>

<style scoped>
.container:hover {
    display: block;
}

ul.dropdown li {
    display: block;
    padding-bottom: 10px;
}

.dropdown {
    position: absolute;
    z-index: 999;
    display: none;
    width: fit-content;
    padding: 13px 13px 0px 13px;
    text-align: center;
}

ul li:hover ul.dropdown {
    display: block;
}
</style>