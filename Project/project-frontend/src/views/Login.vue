<script setup>
import { ref } from 'vue'
import makeUsersService from '@/services/users.service'
import { useQuery } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue'

let notFound = ref(false)
let $router = useRouter()

const { isLoading, isError, data, error, refetch } = useQuery({
    queryKey: ['session'],
    queryFn: makeUsersService.getSession,
});

async function login(props) {
    notFound.value = false
    try {
        const res = await makeUsersService.getUser({ username: props.username.value, password: props.password.value })
        if (res != null) {
            $router.push({ name: 'product' })
        }
        else {
            notFound.value = true
        }
    } catch (error) {
        console.log(error)
    }
}

async function logout() {
    try {
        await makeUsersService.logout()
        $router.go({ name: 'login' })
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div v-if="notFound">
        <h2 class="text-center mt-8 bg-lime-500 p-3 text-white text-xl">Username or password is incorrect</h2>
    </div>
    <span v-if="isLoading">Loading...</span>
    <span v-else-if="isError">Error: {{ error.message }}</span>

    <div v-else-if="data.user">
        <div class="pt-5 text-center">
            <p class="text-2xl">Welcome, {{ data.user.username }}</p>
            <button @click="logout"
                class="bg-rose-500 px-4 py-2 mt-3 rounded-lg hover:bg-rose-400 text-white">Logout</button>
        </div>
    </div>

    <div v-else class="ml-[35%] mr-[35%] mt-10">
        <LoginForm @login="login"></LoginForm>
    </div>
</template>