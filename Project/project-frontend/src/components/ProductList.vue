<script setup>
import makeUsersService from '@/services/users.service';
import { useQuery } from '@tanstack/vue-query';
const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['session'],
    queryFn: makeUsersService.getSession
})

defineProps({
    products: { type: Array, default: () => [] },
})

const $emit = defineEmits(['delete'])

function deleteProduct(id) {
    $emit('delete', id)
}

const server = import.meta.env.VITE_SERVER

</script>

<template>
    <section class="">
        <div class="grid grid-cols-3 gap-10">
            <div v-for="(product, index) in products" :key="index"
                class="flex flex-col space-y-4 transition duration-500 ease-in-out transform hover:scale-105 hover:border-2 hover:border-gray-200 rounded-lg hover:drop-shadow-sm">
                <div class="caret-transparent flex justify-center items-center">
                    <img :src="server + product.pimage" class="w-[280px] h-[280px] m-auto">
                </div>
                <div class="p-5 pb-0 flex-grow">
                    <p class="text-xl font-bold pt-2">{{ product.pname }}</p>
                    <p class="text-sm text-gray-700 pt-2">{{ product.description }}</p>
                </div>
                <div class="p-5 pt-0">
                    <h3><span class="font-semibold">Brand:</span> {{ product.bname }}</h3>
                    <h3><span class="font-semibold">Price:</span> {{ product.price.toLocaleString() }} đ</h3>
                </div>
                <span v-if="isLoading">Loading...</span>
                <span v-else-if="isError">Error: {{ error.message }}</span>
                <div v-else-if="data.user" class="mt-5 px-5 pb-5">
                    <router-link :to="{
                        name: 'edit',
                        params: { id: product.id },
                    }">
                        <span
                            class="mt-4 badge badge-warning bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-md ">
                            <i class="fas fa-edit"></i>Update product
                        </span>
                    </router-link>

                    <button class="bg-blue-500 hover:bg-blue-300 text-white px-4 py-2 rounded-md ml-5"
                        @click="() => deleteProduct(product.id)">Delete
                        product</button>
                </div>
                <div v-else></div>
            </div>
        </div>
    </section>
</template>
