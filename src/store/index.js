import {
    createStore
} from 'vuex'

const store = createStore( {
    state: {
        url: "http://localhost:9000",
        loginState: false,
        data: null
    },
    mutations: {
        setData(state, newData) {
            state.data = newData
        },
        setLogin(state, newState) {
            state.loginState = newState
        }
    },
    actions: {
        setData({ commit }, newData) {
            commit('setData', newData)
        },
        setLogin({ commit }, newState) {
            commit('setLogin', newState)
        }
    }
})

export default store