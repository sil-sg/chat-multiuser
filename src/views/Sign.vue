<template>
    <div class="w-screen min-h-screen h-auto m-0 p-0 flex justify-center items-center bg-[#121212]">
        <Message @close="showMessage = false" v-if="showMessage === true" :message="message" />
        
        <form 
        @submit.stop.prevent="next"
        class="fadeInUp bg-[#242424] rounded-2xl w-10/11 sm:my-16 max-w-xs p-6 text-md flex flex-col gap-6">
            <h2 class="text-3xl text-slate-100 mb-3.5">{{ textMain }}</h2>
            
            <label for="email" class="text-sm text-slate-100">
                <span class="pl-3">Email</span>
                <input v-model="email" type="text" required="" placeholder="Seu email" class="w-full outline-none block rounded-xl p-3 px-2 text-md bg-[#323232]" id="email">
            </label>
            
            <template v-if="step === 2 || step === 3">
                <label for="name" class="transition-all text-sm text-slate-100">
                    <span class="pl-3">Nome completo</span>
                    <input minlength="3" v-model="name" type="text" required placeholder="Seu nome" class="w-full outline-none block rounded-xl p-3 px-2 text-md bg-[#323232]" id="name">
                </label>
                <label for="password" class="transition-all text-sm text-slate-100">
                    <span class="pl-3">Palavra-passe</span>
                    <input minlength="6" v-model="password" type="password" required placeholder="Sua palavra-passe" class="w-full outline-none block rounded-xl p-3 px-2 text-md bg-[#323232]" id="password">
                </label>
            </template>
            
            <div class="flex justify-end items-center text-xs text-[#1ac3f3]">
                <p @click="toggleSign">{{ textP }}</p>
            </div>
            
            <button type="submit" :disabled="isLoading === true" class="disabled:brightness-50 w-full outline-none block rounded-xl p-3 px-2 text-2md bg-[#1ac3f3] text-white uppercase transition-all hover:brightness-90 flex justify-center items-center"> 
                <Loading v-if="isLoading === true" />
                <span v-else>{{ textBtn }}</span>
            </button>
        </form>
    </div>
</template>

<script>
import Loading from '../components/icons/Loading.vue'
import Message from '../components/Message.vue'
import axios from 'axios'

export default {
    components: { Loading, Message },
    data() {
        return {
            textP: 'Já tenho uma conta',
            textMain: 'Criar conta',
            textBtn: 'Continuar',
            isLoading: false,
            showMessage: false,
            message: '',
            email: '',
            name: '',
            password: '',
            step: 1,
            
        }
    },
    created() {
        this.verifyDataLogin()
    },
    methods: {
        async verifyEmail() {
            this.isLoading = true
            try {
                const { data } = await axios.get(`${this.$store.state.url}/users/${this.email}`)
                
                if (data.message === 'sucess') {
                    this.step = 2
                    this.textBtn = 'Criar'
                } else this.sendMessage("Email em uso!")
                
            } catch (e) { console.error(e) } finally { this.isLoading = false }
        },
        async createAccount() {
            this.isLoading = true
            try {
                const { data } = await axios.post(`${this.$store.state.url}/users`, {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                
                if (data.message === 'sucess') {
                    this.step = 3
                    this.textMain = 'Entrar na conta'
                    this.textBtn = 'Entrar'
                    this.sendMessage("Conta criada!")
                } else this.sendMessage("Algo deu errado")
                
            } catch (e) { console.error(e) } finally { this.isLoading = false }
        },
        async loginAccount() {
            this.isLoading = true
            try {
                const { data } = await axios.post(`${this.$store.state.url}/login`, { name: this.name, email: this.email, password: this.password })
                
                if (data.message === 'sucess') {
                    this.$store.dispatch('setData', data.content)
                    this.$store.dispatch('setLogin', true)
                    this.saveAndExpand(data.content)
                    this.sendMessage("Bem vindo")
                    this.$router.push('/home')
                } else if (data.message === 'failed') {
                    this.sendMessage("Algo deu errado ou conta não existe!")
                }
                
            } catch (e) { console.error(e) } finally { this.isLoading = false }
        },
        next() {
            if (this.step === 1) this.verifyEmail()
            else if (this.step === 2) this.createAccount()
            else if (this.step === 3) this.loginAccount()
        },
        toggleSign() {
            if (this.step == 1) {
                this.step = 3
                this.textMain = 'Entrar na conta'
                this.textBtn = 'Entrar'
                this.textP = 'Não tenho uma conta'
            } else {
                this.step = 1
                this.textMain = 'Criar conta'
                this.textBtn = 'Criar'
                this.textP = 'Já tenho uma conta'
            }
        },
        sendMessage(text) {
            this.message = text
            this.showMessage = true
            setTimeout(() => this.showMessage = false, 2750)
        },
        saveAndExpand(data) {
            localStorage.setItem('@MyDataForLoginAndSaveStatus', JSON.stringify(data, null, 2))
        },
        verifyDataLogin() {
            if (localStorage.getItem('@MyDataForLoginAndSaveStatus')) {
                this.$store.dispatch('setData', JSON.parse(localStorage.getItem('@MyDataForLoginAndSaveStatus')))
                this.$store.dispatch('setLogin', true)
                this.sendMessage("Bem vindo")
                this.$router.push({name: 'home'})
            }
        },
    },
    
}
</script>