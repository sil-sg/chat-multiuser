<template>
    <div class="bg-[#121212] overflow-hidden w-screen min-h-screen h-auto m-0 p-0 flex flex-col justify-between">
        
        <Message @close="showMessage = false" :message="notification" v-if="showMessage === true" />
        
        <header v-if="false" class="bg-[#121212] flex justify-between px-[2%] sm:px-[8%] py-3 items-center">
        </header>
        <svg @click="$router.push('/home')" class="fixed left-5 top-5 sm:left-10 lg:left-36 lg:w-32 w-10 h-10 cursor-pointer transition-all active:brightness-75 hover:brightness-75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15 7L10 12L15 17" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        
        <div class="justify-self-center p-4 sm:px-[8%] w-full flex flex-col items-center space-y-8 overflow-y-scroll flex-1">
            <div class="w-full sm:w-8/10 lg:w-6/10 flex flex-col items-baseline space-y-8 overflow-y-scroll flex-1">
                
                <template v-if="messages === null">
                    <div class="fadeInUp-05x skeleton-loading overflow-hidden relative min-h-30 min-w-50 self-end block space-y-2 p-4 bg-[#73737313] rounded-2xl max-w-8/10"></div>
                    <div class="fadeInUp-05x skeleton-loading overflow-hidden relative min-h-38 min-w-50 self-start block space-y-2 p-4 bg-[#73737313] rounded-2xl max-w-8/10"></div>
                    <div class="fadeInUp-05x skeleton-loading overflow-hidden relative min-h-56 min-w-40 self-end block space-y-2 p-4 bg-[#73737313] rounded-2xl max-w-8/10"></div>
                    <div class="fadeInUp-05x skeleton-loading overflow-hidden relative min-h-30 min-w-50 self-start block space-y-2 p-4 bg-[#73737313] rounded-2xl max-w-8/10"></div>
                    <div class="fadeInUp-05x skeleton-loading overflow-hidden relative min-h-38 min-w-50 self-start block space-y-2 p-4 bg-[#73737313] rounded-2xl max-w-8/10"></div>
                </template>
                
                <div 
                v-for="i in messages"
                :key="i._id"
                :class="[i.senderId === id ? 'fadeInRight rounded-tr-none self-end block space-y-2 p-4 bg-blue-400 rounded-2xl border-l-3 border-l-blue-400 text-gray-200 max-w-8/10' : 'fadeInLeft justify-self-end block space-y-2 p-4 bg-gray-700 rounded-tl-none rounded-2xl border-l-3 border-l-blue-400 text-gray-200 max-w-8/10']"
                >
                    <h3 class="text-pink-600 text-md">~ {{i.senderName}}</h3>
                    <p class="text-white break-words text-xl">{{i.content}}</p>
                    <div class="flex justify-between items-center space-x-1">
                        <p class='text-xs'>{{i.createAt}}</p>
                        <img class="w-4 aspect-square" src="../assets/icons/ic_done_white.png" alt="">
                        <img v-if="false" class="w-4 aspect-square" src="../assets/icons/anythink_interstitial_loading_default.png" alt="">
                    </div>
                </div>
                
                <br><br><br><br><br><br>
            </div>
        </div>
        
        <div class="fixed bottom-3.5 left-0 right-0 flex justify-center items-center mx-1 w-full">
            <form @submit.stop.prevent="verify" class="w-full mx-auto flex relative bg-transparent max-w-md">
                <textarea v-model="value" class="outline-none flex-1 bg-slate-50 rounded-xl p-3 resize-none h-auto max-h-80 overflow-hidden" placeholder="Digite sua mensagem..."></textarea>
                
                <button :disabled="isLoading === true" type="submit" class="disabled:brightness-75 flex justify-center items-center z-10 absolute right-3 top-[50%] translate-y-[-50%] rounded-full aspect-[1/1] p-1.5 bg-[#1172d5aa] w-10">
                    <Loading v-if="isLoading === true" />
                    <svg v-else class="w-full aspect-[1/1]" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.33045 8.38999C0.250452 11.82 9.42048 14.9 9.42048 14.9C9.42048 14.9 12.5005 24.07 15.9305 21.99C19.5705 19.77 23.9305 6.13 21.0505 3.27C18.1705 0.409998 4.55045 4.74999 2.33045 8.38999Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M15.1999 9.12L9.41992 14.9" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
            </form>
        </div>
        
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
            messages: null,
            id: null,
            name: null,
            value: '',
            isLoading: false,
            notification: '',
            showMessage: false,
            interval: null,
            
            intervalVLongPress: null,
            countVLongPress: 0,
            timerVLongPress: 50,
            touchVLongPress: false,
            textForCopy: '',
            
            dash: `@pointerdown="() => {
                    textForCopy = i.content
                    touchVLongPress = true
                }"
                @pointerup="() => {
                    textForCopy = ''
                    touchVLongPress = false
                    countVLongPress = 0
                }"
            `
        }
    },
    methods: {
        verify() {
            if (this.value != '') {
                this.sendMessage()
            }
        },
        sendNotification(text) {
            this.notification = text
            this.showMessage = true
            setTimeout(() => this.showMessage = false, 2750)
        },
        async sendMessage() {
            this.isLoading = true
            try {
                const { data } = await axios.post(`${this.$store.state.url}/messages`, {
                    content: this.value.trim(),
                    senderId: this.id,
                    senderName: this.name,
                    visualized: true,
                })
                
                if (data.message === 'sucess') {
                    this.value = ''
                } else {
                    this.sendNotification('Algo deu errado, verifique a sua internet')
                }
                
            } catch (e) {
                this.sendNotification('Algo deu errado!')
            } finally { this.isLoading = false }
        },
        async getMessages() {
            //this.isLoading = true
            try {
                const { data } = await axios.get(`${this.$store.state.url}/messages`)
                
                if (data.message === 'sucess') {
                    if (this.messages !== data.content) this.messages = data.content
                } else {
                    this.sendNotification('Algo deu errado, verifique a sua internet')
                }
                
            } catch (e) {
                this.sendNotification('Algo deu errado!')
            } finally { /*this.isLoading = false*/ }
        },
        init() {
            const data = JSON.parse(localStorage.getItem('@MyDataForLoginAndSaveStatus'))
            
            if (data) {
                this.interval = setInterval(() => this.getMessages(), 1000)
                this.id = data._id
                this.name = data.name
                this.$store.dispatch('setData', data)
            } else {
                this.$router.push('/')
            }
        },
        async copy(text) {
            try {
                await navigator.clipboard.writeText(text)
                return true
            } catch (e) {return false}
        },
        initMoniroringLongPress() {
            this.intervalVLongPress = setInterval(() => {
                if (this.countVLongPress >= this.timerVLongPress) {
                    this.copy(this.textForCopy)
                    this.countVLongPress = 0
                }
                if (this.touchVLongPress === true) {
                    this.countVLongPress += 5
                }
            }, 100)
        },
    },
    created() {
        this.initMoniroringLongPress()
        this.init()
    },
    beforeUnmount() {
        clearInterval(this.interval)
    }
}
</script>

