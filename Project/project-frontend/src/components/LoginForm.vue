<script setup>
import { ref } from 'vue'

let username = ref('')
let password = ref('')
let message = ref('')
let showPassword = ref(false)
const passwordFieldType = ref('password')

const $emit = defineEmits(['login']);

function login() {
    message.value = ''
    if (username.value === '' || password.value === '') {
        message.value = 'Please fill all fields'
        return
    }
    $emit('login', { username: username, password: password });
}

function togglePassword() {
    showPassword.value = !showPassword.value
    if (showPassword.value) {
        passwordFieldType.value = 'text'
    } else {
        passwordFieldType.value = 'password'
    }
}

</script>

<template>
    <h1 class="text-center text-3xl font-extrabold text-gray-900">Login to your account</h1>
    <div class="mt-10">
        <form @submit.prevent="login">
            <div class="mb-5">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-600">Username</label>
                <input type="text" v-model="username" id="email"
                    class="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your username">
            </div>
            <div class="mb-5">
                <label for="password" class="block mb-2 text-sm font-medium text-gray-600">Password</label>
                <div class="relative flex items-center">
                    <input :type="passwordFieldType" v-model="password" id="password"
                        class="w-full px-3 py-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-400 relative pr-10"
                        placeholder="Your password">
                    <button type="button" class="absolute right-3" @click="togglePassword">
                        <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor" class="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" class="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <p class="text-red-500 mb-5">{{ message }}</p>
            </div>
            <div class="mb-5">
                <button type="submit" @click="login"
                    class="w-full py-3 text-white bg-blue-500 rounded-lg flex items-center justify-center gap-2 font-bold hover:bg-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                        <path fillRule="evenodd"
                            d="M10 2a.75.75 0 01.75.75v7.5a.75.75 0 01-1.5 0v-7.5A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06 6.5 6.5 0 109.192 0 .75.75 0 111.06-1.06 8 8 0 11-11.313 0 .75.75 0 011.06 0z"
                            clipRule="evenodd" />
                    </svg>
                        Login
                </button>
            </div>
            
        </form>
    </div>
</template>
