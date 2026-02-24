<template>
    <div class="px-3 w-screen h-screen m-0 p-0 flex flex-col bg-[#121212]">
        
        <header class="flex justify-between px-[2%] sm:px-[8%] py-3 items-center">
            <svg @click="$router.push('/setting')" class="w-10 h-10 cursor-pointer transition-all active:brightness-75 hover:brightness-75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M14.1395 12.0002C14.1395 13.1048 13.2664 14.0002 12.1895 14.0002C11.1125 14.0002 10.2395 13.1048 10.2395 12.0002C10.2395 10.8957 11.1125 10.0002 12.1895 10.0002C13.2664 10.0002 14.1395 10.8957 14.1395 12.0002Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M7.57381 18.1003L5.12169 12.8133C4.79277 12.2907 4.79277 11.6189 5.12169 11.0963L7.55821 5.89229C7.93118 5.32445 8.55898 4.98876 9.22644 5.00029H12.1895H15.1525C15.8199 4.98876 16.4477 5.32445 16.8207 5.89229L19.2524 11.0923C19.5813 11.6149 19.5813 12.2867 19.2524 12.8093L16.8051 18.1003C16.4324 18.674 15.8002 19.0133 15.1281 19.0003H9.24984C8.5781 19.013 7.94636 18.6737 7.57381 18.1003Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </header>
        
        <main class="w-full fadeInUp flex flex-1 items-center justify-center w-full justify-self-center sm:px-[18%] md:px-[32%]">
            <div class="cursor-pointer transition-all active:brightness-75 hover:brightness-75 p-4 px-1 w-full bg-[#1172d5aa] rounded-xl">
                <button @click="$router.push('/multi')" class="w-full h-full text-slate-100 text-2xl font-semibold">Entrar no Chat Multi-User</button>
            </div>
        </main>
        
        <svg class="fixed right-3 bottom-3 rounded-full aspect-[1/1] p-4 bg-[#1172d5aa] w-14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    </div>
</template>

<script>
export default {
    created() {
        this.init()
    },
    methods: {
        init() {
            const data = JSON.parse(localStorage.getItem('@MyDataForLoginAndSaveStatus'))
            
            if (data) {
                this.id = data._id
                this.name = data.name
                this.$store.dispatch('setData', data)
            } else {
                this.$router.push('/')
            }
        }
    }
}
</script>