import ToppingProvider from '@/resources/topping_provider'

const toppingProvider = new ToppingProvider()


const state={
    topping:{},

}

const getters={
    topping:state=>state.topping,

}

const mutations={
    SET_TOPPING(state,data){
        state.topping = data;
    },


}

const actions={

    async getTopping ({commit}) {
        const data = await toppingProvider.getTopping()

        commit('SET_TOPPING', data)
        return data
    },





    async updateTopping({commit,dispatch},{topping}) {


        await toppingProvider.updateTopping({'topping':topping});

        dispatch('getTopping',{ root: true });


    },


}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}