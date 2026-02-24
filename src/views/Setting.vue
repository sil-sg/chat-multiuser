<template>
    <div class="w-screen h-screen m-0 p-0 flex flex-col bg-[#121212]">
        
        <header class="flex justify-between px-[2%] sm:px-[8%] py-3 items-center">
            <svg @click="$router.push('/home')" class="w-10 h-10 cursor-pointer transition-all active:brightness-75 hover:brightness-75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </header>
        
        <main class="p-2 flex flex-col gap-1 flex-1 w-full max-w-md">
            <section class="fadeInUp rounded-xl flex cursor-pointer transition-all active:brightness-75 hover:brightness-75 p-4 px-1 w-full bg-[#242424]">
                <button @click="" class="text-start pl-4 text-slate-100 text-2xl">Perfil</button>
                
                <div>
                    
                </div>
            </section>
            <section @click="logout" class="fadeInUp rounded-xl flex cursor-pointer transition-all active:brightness-75 hover:brightness-75 p-4 px-1 w-full bg-[#d11313b1]">
                <button class="text-start pl-4 text-slate-100 text-2xl">Sair</button>
                
                <div>
                    
                </div>
            </section>
        </main>
        
    </div>
</template>

<script>
export default {
    methods: {
        logout() {
            if (
                window.confirm('Vc deseja sair?')
            ) {
                localStorage.removeItem('@MyDataForLoginAndSaveStatus')
                this.$store.dispatch('setData', {})
                this.$store.dispatch('setLogin', false)
                this.$router.push('/')
            }
        },
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
    },
    created() {
        this.init()
    },
}
</script>

<!-- 1172d5aa -->