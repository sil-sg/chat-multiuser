<template>
    <div class="w-screen min-h-screen h-auto m-0 p-0 flex flex-col bg-[#121212]">
        
        <header class="flex justify-between px-[2%] sm:px-[8%] py-3 items-center">
            <svg @click="$router.push('/home')" class="w-10 h-10 cursor-pointer transition-all active:brightness-75 hover:brightness-75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </header>
        
        <main class="p-2 flex flex-col gap-3 flex-1 w-full items-center">
            <section class="fadeInUp max-w-md flex px-4 flex-col rounded-xl flex transition-all active:brightness-75 hover:brightness-75 p-4 px-1 w-full bg-[#242424]">
                <button @click="" class="text-start text-slate-100 text-2xl">Perfil</button>
                
                <div class="text-[#d8d8d8f1] mt-4 flex flex-col gap-1 w-full pl-2">
                    <p>Nome: {{ $store.state.data.name }}</p>
                    <p>Email: {{ $store.state.data.email }}</p>
                    <p class="mt-0.5">Conta criada em: {{ $store.state.data.createAt }}</p>
                </div>
            </section>
            
            <section class="fadeInUp max-w-md flex px-4 flex-col rounded-xl flex transition-all active:brightness-75 hover:brightness-75 p-4 px-1 w-full bg-violet-800">
                <button @click="" class="text-start text-slate-100 text-2xl">Aparência</button>
                
                <div class="text-[#d8d8d8f1] mt-4 flex flex-col gap-1 w-full pl-2">
                    <div class="flex flex-col gap-1 my-2">
                        <p>Tema</p>
                        <div class="flex items-center justify-around gap-1">
                            <label @click="themeDark = true" class="flex gap-1 items-center" >
                                <input :checked="themeDark" type="checkbox">
                                Escuro
                            </label>
                            <label @click="themeDark = false" class="flex gap-1 items-center" >
                                <input :checked="!themeDark" type="checkbox">
                                Claro
                            </label>
                        </div>
                    </div>
                    <p>Email: {{ $store.state.data.email }}</p>
                    <p class="mt-0.5">Conta criada em: {{ $store.state.data.createAt }}</p>
                </div>
            </section>
            
            <section class="fadeInUp flex flex-col gap-1 max-w-md rounded-xl flex transition-all active:brightness-75 hover:brightness-75 p-4 px-1 w-full bg-[#d11313b1]">
                <button class="text-start pl-4 text-slate-100 text-2xl">Açcões</button>
                
                <div class="text-[#d8d8d8f1] mt-4 flex flex-col gap-4 w-full px-2">
                    <button @click="logout" class="transition-all hover:text-[#d11313b1] hover:bg-[#f1f1f1] py-1 text-[#f1f1f1] rounded-md border cursor-pointer border-[#f1f1f1]">Sair</button>
                    <button @click="logout" class="transition-all hover:text-[#d11313b1] hover:bg-[#f1f1f1] py-1 text-[#f1f1f1] rounded-md border cursor-pointer border-[#f1f1f1]">Desativar conta</button>
                    <button @click="logout" class="transition-all hover:text-[#d11313b1] hover:bg-[#f1f1f1] py-1 text-[#f1f1f1] rounded-md border cursor-pointer border-[#f1f1f1]">Apagar conta</button>
                </div>
            </section>
            
            <br><br><br>
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
    data() {
        return {
            themeDark: true,
        }
    }
}
</script>

<!-- 1172d5aa -->