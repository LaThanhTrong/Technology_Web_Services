<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ContactForm from '@/components/ContactForm.vue';
import contactsService from '@/services/contacts.service';
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query';

const props = defineProps({
    contactId: { type: String, required: true },
});


const $router = useRouter();
const $route = useRoute();

const contact = ref(null);
const message = ref('');

const { isLoading, isError, data, error } = useQuery({
    queryKey: ['contact'],
    queryFn: async () => {
        try {
            contact.value = await contactsService.getContact(props.contactId);
            return contact.value;
        } catch (error) {
            console.log(error);
            // Redirect to NotFound page and keep URL intact
            $router.push({
                name: 'notfound',
                params: { pathMatch: $route.path.split('/').slice(1) }, query: $route.query,
                hash: $route.hash,
            });
        }
    }
})

const queryClient = useQueryClient();

const updateMutation = useMutation({
    mutationFn: contactsService.updateContact,
    onSuccess: () => {
        queryClient.invalidateQueries('contact');
        message.value = 'Liên hệ được cập nhật thành công.';
    },
    onError: (error) => {
        console.log(error);
    },
})

const deleteMutation = useMutation({
    mutationFn: contactsService.deleteContact,
    onSuccess: () => {
        queryClient.invalidateQueries('contact');
        $router.push({ name: 'contactbook' });
    },
    onError: (error) => {
        console.log(error);
    },
})

function onButtonUpdate(editedContact) {
    updateMutation.mutate(editedContact);
}

function onButtonDelete(id){
    if (confirm('Bạn muốn xóa Liên hệ này?')) deleteMutation.mutate(id);
}

</script>

<template>
    <div v-if="contact" class="page">
        <h4>Hiệu chỉnh Liên hệ</h4>
        <ContactForm :initial-contact="contact" @submit:contact="onButtonUpdate" @delete:contact="onButtonDelete" />
        <p>{{ message }}</p>
    </div>
</template>


