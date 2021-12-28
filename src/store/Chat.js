import ChatProvider from '@/resources/chat_provider'

const chatProvider = new ChatProvider()

const state={
    chat_room:{},
    chat_room_unread:{},
    chat_room_one:{},
    chat_room_client:{},
    chat_room_client1:{},
}

const getters={
    chat_room_unread:state=>state.chat_room_unread,
    chat_room:state=>state.chat_room,
    chat_room_one:state=>state.chat_room_one,
    chat_room_client:state=> state.chat_room_client,
    chat_room_client1:state=> state.chat_room_client1

}

const mutations={
    SET_CHAT_ROOM_UNREAD(state,data){
        state.chat_room_unread = data;
    },
    SET_CHAT_ROOM(state,data){
        state.chat_room = data;
    },
    SET_CHAT_ROOM_ONE(state,data){
        state.chat_room_one = data;
    },

    SET_CHAT_ROOM_CLIENT(state,data){
        state.chat_room_client = data;
    },

    SET_CHAT_ROOM_CLIENT1(state,data){
        state.chat_room_client1 = data;
    },

}

const actions={

    async getChatRoomOne ({commit},{chat_room_id,page}) {
        const data = await chatProvider.getChatRoomOne({'chat_room_id':chat_room_id,'page':page})

        commit('SET_CHAT_ROOM_ONE', data)
        return data
    },
    async getChatRoomUnRead ({commit},{page}) {
        const data = await chatProvider.getChatRoomUnRead({'page':page})

        commit('SET_CHAT_ROOM_UNREAD', data)
        return data
    },

    async getChatRoom ({commit},{page}) {
        const data = await chatProvider.getChatRoom({'page':page})

        commit('SET_CHAT_ROOM', data)

        return data
    },



    async sendMessage({commit,dispatch},{chat_room_id,message}) {

        const data = await chatProvider.sendMessage({'chat_room_id':chat_room_id,'message':message

        });
        dispatch('getChatRoomOne',{ root: true,'chat_room_id':chat_room_id });
        return data
    },


    async leaveChatRoom({commit},{chat_room_id,roomChannel}) {

        const data = await chatProvider.leaveChatRoom({'chat_room_id':chat_room_id,'roomChannel':roomChannel});

        return data
    }



}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}