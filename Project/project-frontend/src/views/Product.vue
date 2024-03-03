<script setup>
import { ref, watch } from 'vue'
import { debounce } from 'lodash'
import makeProductsService from '@/services/products.service'
import makeUsersService from '@/services/users.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import Swal from 'sweetalert2';
import ProductList from '@/components/ProductList.vue'
import Pagination from '@/components/Pagination.vue'

const searchText = ref('');
const updateSearchText = debounce((value) => {
    searchText.value = value;
}, 200);
const totalPages = ref(1);
const currentPage = ref(1);
let limit = ref(3);

const props = defineProps({
    bid: {
        type: String,
        default: ''
    },
    bname: {
        type: String,
        default: 'All'
    }
})

watch(props, () => {
    currentPage.value = 1;
    refetchUser()
    refetch()
})

const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['product', currentPage, limit, searchText, props.bid],
    queryFn: async () => {
        const res = await makeProductsService.getProducts(currentPage.value, limit.value, searchText.value, props.bid)
        totalPages.value = res.metadata.lastPage ?? 1;
        return res
    },
});

const { isLoading: isLoadingUser, isError: isErrorUser, data: dataUser, error: errorUser, refetch: refetchUser } = useQuery({
    queryKey: ['session'],
    queryFn: makeUsersService.getSession
});

const queryClient = useQueryClient();
const deleteMutation = useMutation({
    mutationFn: makeProductsService.deleteProduct,
    onSuccess: () => {
        queryClient.invalidateQueries('product');
        Swal.fire({
            title: 'Xóa thành công',
            icon: 'success',
        })
        currentPage.value = 1;
        refetch();
    },
    onError: (error) => {
        console.log(error);
        Swal.fire({
            title: 'Xóa thất bại',
            message: error.message,
            icon: 'error',
        })
    },
})

const deleteAllMutation = useMutation({
    mutationFn: makeProductsService.deleteAllProducts,
    onSuccess: () => {
        queryClient.invalidateQueries('product');
        Swal.fire({
            title: 'Xóa thành công',
            icon: 'success',
        })
        refetch();
    },
    onError: (error) => {
        console.log(error);
        Swal.fire({
            title: 'Xóa thất bại',
            message: error.message,
            icon: 'error',
        })
    },
})

function deleteProduct(id) {
    Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteMutation.mutate(id);
            refetch()
        }
    })
}

function deleteAll() {
    Swal.fire({
        title: 'Bạn có chắc chắn muốn xóa toàn bộ sản phẩm?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteAllMutation.mutate();
            refetch()
        }
    })
}

</script>

<template>
    <div class="flex items-center justify-between mb-10 ml-[10%] mr-[10%] mt-6">
        <div>
            <h2 class="font-extrabold text-3xl">Product List</h2>
            <h2 class="font-bold mt-3 text-xl">Category: {{ props.bname }}</h2>
        </div>
        <div class="flex gap-4 items-center mt-4">
            <span v-if="isLoadingUser">Loading...</span>
            <span v-else-if="isErrorUser">Error: {{ error.message }}</span>
            <div v-else-if="dataUser.user" class="flex items-center gap-4">
                <button type="button" class="bg-rose-500 hover:bg-rose-400 text-white px-4 py-2 rounded-md"
                    @click="deleteAll">Delete All
                    Product</button>
                <router-link :to="{
                    name: 'add',
                }">
                    <span class="mt-4 bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md">
                        <i class=""></i>Add a product
                    </span>
                </router-link>
            </div>
            <div v-else></div>
            <input @input="updateSearchText($event.target.value)" class="px-4 py-2 rounded-md border-2 border-gray-300"
                type="text" placeholder="Search Product" />
        </div>
    </div>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <div v-else-if="data.shoes.length > 0" class="ml-[10%] mr-[10%] mt-6">
        <ProductList :products="data.shoes" @delete="deleteProduct"></ProductList>
    </div>
    <div v-else class="flex justify-center items-center">
        <img src="/images/notfound.png" />
    </div>
    <div v-if="!searchText" class="mt-10 flex justify-center items-center">
        <Pagination :totalPages="totalPages" v-model:currentPage="currentPage" />
    </div>
</template>