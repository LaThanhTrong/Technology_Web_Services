<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'; import ContactForm from '@/components/ContactForm.vue';
import { useQueryClient, useMutation } from '@tanstack/vue-query';
import contactsService from '@/services/contacts.service';

const message = ref('');

const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: contactsService.createContact,
    onSuccess: () => {
        queryClient.invalidateQueries('contacts');
        message.value = 'Liên hệ được thêm thành công.';
    },
    onError: (error) => {
        console.log(error);
    },
});

function onButtonClick(addContact) {
    mutation.mutate({
        name: addContact.name,
        email: addContact.email,
        address: addContact.address,
        phone: addContact.phone,
        favorite: addContact.favorite,
    });
}

</script>

<template>
    <div class="page">
        <h4>Thêm Liên hệ</h4>
        <ContactForm :initial-contact="contact" @submit:contact="onButtonClick" />
        <p>{{ message }}</p>
    </div>
</template>