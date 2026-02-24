<template>
    <div class="message left-[50%] translate-x-[-50%] justify-self-center fixed items-center top-14 w-10/11 max-w-sm flex bg-slate-100 p-3 justify-between gap-2 z-50">
        <p class="flex-1 text-xl max-w-full text-slate-900">{{ message }}</p>
        <p @click="$emit('close')" class="text-3xl text-slate-900">×</p>
    </div>
</template>

<script>
    export default {
        props: {
            message: { default: '' }
        }
    }
</script>