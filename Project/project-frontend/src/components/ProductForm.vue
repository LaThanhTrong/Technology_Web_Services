<script setup>
import makeBrandsService from '@/services/brands.service';
import { useQuery } from '@tanstack/vue-query';
import * as yup from 'yup'
import { ref } from 'vue';
import { Form, Field, ErrorMessage } from 'vee-validate';

const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['brands'],
    queryFn: () => makeBrandsService.getBrands()
});

const p = defineProps({
    product: {
        type: Object,
        required: true
    }
})

let selected = ref(p.product.bid || 1);
let file = ref('');
let fileError = ref('');
const $emit = defineEmits(['cancel', 'update']);

const editedProduct = ref({ ...p.product })

const productFormSchema = yup.object().shape({
    pname: yup.string().required('Vui lòng nhập tên'),
    description: yup.string().required('Vui lòng nhập mô tả'),
    price: yup.number().transform((value, originalValue) => {
        return typeof originalValue === 'string' && originalValue.trim() === "" ? undefined : value;
    }).required('Vui lòng nhập giá').positive('Giá không dưới đ0').integer('Giá không hợp lệ').min(200, 'Giá ít nhất đ200'),
})

function cancel() {
    $emit('cancel');
}

function update() {
    if (!editedProduct.value.pimage) fileError.value = 'Vui lòng chọn ảnh';
    editedProduct.value.bid = selected.value;
    if (!fileError.value) {

        $emit('update', { ...editedProduct.value, file: file });
    }
}


function uploadFile(e) {
    fileError.value = '';
    const date = Date.now();
    const originalFile = e.target.files[0];
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(originalFile.type)) {
        fileError.value = 'File không hợp lệ';
    }
    else {
        url = import.meta.env.VITE_CLIENT + '/';
        const fileName = `${date}-${originalFile.name}`;
        file = new File([originalFile], fileName, { type: originalFile.type });
        editedProduct.value.pimage = 'images/' + originalFile.name;
    }
}

let url = import.meta.env.VITE_SERVER;

</script>

<template>
    <Form class="space-y-4" @submit="update" :validation-schema="productFormSchema">
        <div>
            <label for="pname" class="block text-base font-medium text-gray-700">Product name:</label>
            <Field type="text" id="pname" name="pname" v-model="editedProduct.pname"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <ErrorMessage name="pname" class="text-red-500" />
        </div>
        <label for="bname" class="block text-base font-medium text-gray-700">Brand name:</label>
        <span v-if="isLoading">Loading...</span>
        <span v-else-if="isError">Error: {{ error.message }}</span>
        <div v-else>
            <select id="bname" name="bname" v-model="selected"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option v-for="(brand, index) in data" :key="index" :value="brand.bid">{{ brand.bname }}
                </option>
            </select>
        </div>
        <div>
            <label for="description" class="block text-base font-medium text-gray-700">Description:</label>
            <Field as="textarea" id="description" v-model="editedProduct.description" rows="3" name="description"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            </Field>
            <ErrorMessage name="description" class="text-red-500" />
        </div>
        <div>
            <label for="price" class="block text-base font-medium text-gray-700">Price:</label>
            <Field type="number" id="price" name="price" v-model="editedProduct.price"
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <ErrorMessage name="price" class="text-red-500" />
        </div>
        <div>
            <label class="block text-base font-medium text-gray-700">Product image:</label><br>
            <img v-if="editedProduct.pimage" id="pimage" :src="url + editedProduct.pimage"
                class="w-[280px] h-[280px] object-cover rounded-lg caret-transparent"><br>
            <input type="file" class="mt-2 mb-2" name="file" @change="uploadFile" /><br>
            <span class="text-red-500" :class="{ 'block': fileError, 'hidden': !fileError }">{{ fileError }}</span>
        </div>
        <div>
            <button type="button" class="bg-gray-300 hover:bg-gray-200 px-4 py-2 rounded-md" @click="cancel">Cancel</button>
            <button type="submit" class="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md ml-3">Save</button>
        </div>
    </Form>
</template>
