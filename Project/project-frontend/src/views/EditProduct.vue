<script setup>
import makeProductsService from '@/services/products.service';
import makeUploadService from '@/services/upload.service';
import ProductForm from '@/components/ProductForm.vue';
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const router = useRouter();

const product = defineProps({
    id: {
        type: String,
        required: true
    }
})

const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['product', product.id],
    queryFn: () => makeProductsService.getProductById(product.id)
});

function cancel() {
    router.push({ name: 'product' });
}

const queryClient = useQueryClient();
const updateMutation = useMutation({
    mutationFn: makeProductsService.updateProduct,
    onSuccess: () => {
        queryClient.invalidateQueries('product');
        Swal.fire({
            title: 'Cập nhật thành công',
            icon: 'success',
        })
        refetch();
    },
    onError: (error) => {
        console.log(error);
        Swal.fire({
            title: 'Cập nhật thất bại',
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

function update(props) {
    Swal.fire({
        title: 'Bạn có chắc chắn muốn cập nhật?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Có',
        cancelButtonText: 'Không'
    }).then((result) => {
        if (result.isConfirmed) {
            try {
                if (props.file.name) {
                    props.pimage = '/images/' + props.file.name;
                    uploadMutation.mutate(props.file);
                }
                updateMutation.mutate(props);
            } catch (error) {
                console.log(error);
            }
        }
    })
}

</script>

<template>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>
    <div v-else class="px-20 py-10 mx-[25%]">
        <ProductForm :product="data" @cancel="cancel" @update="update"></ProductForm>
    </div>
</template>