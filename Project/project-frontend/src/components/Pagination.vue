<script setup>
import { computed } from 'vue';
const props = defineProps({
    totalPages: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        default: 3,
    },
    currentPage: {
        type: Number,
        default: 1
    },
});

const $emit = defineEmits(['update:currentPage']);

const pages = computed(() => {
    const pages = [];

    const half = Math.floor(props.length / 2);
    let start = props.currentPage - half;
    let end = props.currentPage + half;
    if (start <= 0) {
        start = 1;
        end = props.length;
    }

    if (end > props.totalPages) {
        end = props.totalPages;
        start = end - props.length + 1;
        if (start <= 0) start = 1;
    }

    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
});
</script>

<template>
    <nav class="caret-transparent">
        <ul class="flex list-none pl-0 mb-0">
            <li class="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 border-r-0 ml-0"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }">
                <a role="button" @click.prevent="currentPage !== 1 && $emit('update:currentPage', currentPage - 1)">
                    <span>«</span>
                </a>
            </li>
            <li v-for="(page, index) in pages" :key="index"
                class="relative block py-2 px-3 leading-tight border border-gray-300 text-blue-700 border-r-0"
                :class="{ 'bg-blue-500 text-white': currentPage === page }">
                <a role="button" @click.prevent="$emit('update:currentPage', page)">{{ page }}</a>
            </li>
            <li class="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-blue-700 ml-0"
                :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }">
                <a role="button"
                    @click.prevent="currentPage !== totalPages && $emit('update:currentPage', currentPage + 1)">
                    <span>»</span>
                </a>
            </li>
        </ul>
    </nav>
</template>




