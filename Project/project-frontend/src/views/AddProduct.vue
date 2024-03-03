<script setup>
import makeProductsService from '@/services/products.service';
import ProductForm from '@/components/ProductForm.vue';
import makeUploadService from '@/services/upload.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();

function cancel() {
    router.push({ name: 'product' });
}

const queryClient = useQueryClient();
const createMutation = useMutation({
    mutationFn: makeProductsService.createProduct,
    onSuccess: () => {
        queryClient.invalidateQueries('product');
        Swal.fire({
            title: 'Thêm thành công',
            icon: 'success',
        }).then(() => {
            router.push({ name: 'product' });
        })
    },
    onError: (error) => {
        console.log(error);
        Swal.fire({
            title: 'Thêm thất bại',
            message: error.message,
            icon: 'error',
        })
    },
})

const uploadMutation = useMutation({
    mutationFn: makeUploadService.uploadFile,
    onSuccess: () => {
        queryClient.invalidateQueries('upload');
    },
    onError: (error) => {
        console.log(error);
    },
})

function create(props) {
    try {
        if (props.file.name) {
            props.pimage = '/images/' + props.file.name;
            uploadMutation.mutate(props.file);
        }
        createMutation.mutate(props);
    } catch (error) {
        console.log(error);
    }
}


</script>

<template>
    <div class="px-20 py-10 mx-[25%]">
        <ProductForm :product="[]" @cancel="cancel" @update="create"></ProductForm>
    </div>
</template>
