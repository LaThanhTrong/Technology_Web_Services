<script setup>
import { ref, computed, onMounted, watch, watchEffect, defineComponent } from 'vue';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import ContactCard from '@/components/ContactCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import ContactList from '@/components/ContactList.vue';
import Pagination from '@/components/Pagination.vue';
import contactsService from '@/services/contacts.service';

const $router = useRouter();
const totalPages = ref(1);
const currentPage = ref(1);

const contacts = ref([]);
const selectedIndex = ref(-1);
const searchText = ref('');

const searchableContacts = computed(() =>
    contacts.value.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join('');
    })
);

const filteredContacts = computed(() => {
    if (!searchText.value) return contacts.value;
    return contacts.value.filter((contact, index) =>
        searchableContacts.value[index].includes(searchText.value)
    );
});

const selectedContact = computed(() => {
    if (selectedIndex.value < 0) return null;
    return filteredContacts.value[selectedIndex.value];
});

const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['contacts', currentPage],
    queryFn: async () => {
        try {
            const res = await contactsService.getContacts(currentPage.value)
            totalPages.value = res.metadata.lastPage ?? 1;
            contacts.value = res.contacts.sort((current, next) =>
                current.name.localeCompare(next.name)
            );
            selectedIndex.value = -1;
            return res
        } catch (error) {
            console.log(error);
        }
    },
});

const handleClick = () => {
    refetch();
}

const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: () => contactsService.deleteAllContacts(),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['contacts'] });
    },
});

function onButtonDelete(){
    if (confirm('Bạn muốn xóa tất cả Liên hệ?')) mutation.mutate();
}

function goToAddContact() {
    $router.push({ name: 'contact.add' });
}

watch(searchText, () => (selectedIndex.value = -1));
</script>

<template>
    <div class="page row mb-5">
        <div class="mt-3 col-md-6">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
            </h4>
            <div class="my-3">
                <InputSearch v-model="searchText" />
            </div>
            <span v-if="isLoading">Loading...</span>
            <span v-else-if="isError">{{ error.message }}</span>
            <ContactList v-else-if="filteredContacts.length > 0" :contacts="filteredContacts"
                v-model:selectedIndex="selectedIndex" />
            <p v-else>
                Không có liên hệ nào.
            </p>
            <div class="mt-3 d-flex justify-content-center align-items-center">
                <Pagination :totalPages="totalPages" v-model:currentPage="currentPage" />
            </div>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="handleClick">
                    <i class="fas fa-redo"></i> Làm mới
                </button>

                <router-link :to="{
                    name: 'contact.add',
                }">
                    <button class="btn btn-sm btn-success" @click="goToAddContact">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>
                </router-link>

                <button class="btn btn-sm btn-danger" @click="onButtonDelete">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6">
            <div v-if="selectedContact">
                <h4>
                    Chi tiết Liên hệ
                    <i class="fas fa-address-card"></i>
                </h4>
                <ContactCard :contact="selectedContact" />
                <router-link :to="{
                    name: 'contact.edit',
                    params: { id: selectedContact.id },
                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit"></i> Hiệu chỉnh</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    text-align: left;
    max-width: 750px;
}
</style>
