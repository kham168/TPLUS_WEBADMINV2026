import ChatProvider from '@/resources/chat_provider'

const chatProvider = new ChatProvider()

const tokenClient = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwicGhvbmUiOiI5OTk5OTk5OSIsImlhdCI6MTYzOTQ1ODk1NywiZXhwIjoxNjM5NDYyNTU3fQ.YoGqGGxt31dxQWsjYwqiFlmCzNBvllRgcpAJX7OLzpcDXkWcCOhSINMC-QMUgNlNsOBigGxpNPdBI0_Ig5n_hK5IkKfBLEYzBPF86Do9c-u2mJXY7EvUX7M_X6NBM3HqjALjYiEYG8w7qvJHI7eyffyPuFZ8tOA_lYIJM7OrNIHJzESyPU-wmPFQef-CarYqtmMeUU9Wh27QMr-5pJGloD88wLzQF6qUwb29fN72no_ilULgCU4DR5V9NebBewucdFHFV14fADVfqKURFZA8tsGbd88DqfdhLoKEyop4Jp2ZNRbCOresomaN7dfYgIjP8IluNHr07gVwW2_JorfrEg";
const tokenClient1 = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywicGhvbmUiOiI1NTU1NTU1NSIsImlhdCI6MTYzOTQ2NjM2NywiZXhwIjoxNjcxMDIzOTY3fQ.UYLcWNKbLEOlgxRmpjYDFVtmzgxjcpxhcn7kW9sKUSvkd9EOAU_beM_1g3awY11MDv8TaG9PoeIES0WSf3jVwtpv1nVqdARn8gUL4kM9q4RwkvvGEqg78thlXOuZD7GVb8IEqd_LisQhDqno-_OIj3exQwfC1qhpce0XundlebhT-OdqsvcKXQJEANfCWfA5PIjdigqstdsJbb0EqhVZ-pC82Gh_cxige-PXUAwKDPI42K55gen3bfOOCk2OF4yc5xQmgnwg_PNK27sUnnILWeVH1ix3i5GJRSDs7CuXcJzRuyr7z3FlZe_qpVi6zhFFE8ROkDkRF7Y_s9BvgK6GLg";
const tokenAdmin = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiI1MjQxNjM2MiIsImlhdCI6MTYzOTQ2NjMzNCwiZXhwIjoxNjcxMDIzOTM0fQ.ouo_BqZzaoAMybALhBkD4i4JlkhN7rKXCN0x3xHO05WpaQS3hUaJ1mVTEz_r-on7cbozGWT7fn4B3LJjpmN-ixXDzD6xtyrl0X50-07t2ipGNy1mUXU8Wd-nYxPHo9AEb5pEJWfBjuv3jwnUAwadG90CI3eRzzQwRoCIx9QQSfbJo34NY5DSctPNeFj_dX-bZZRLDRwbfGEAih8yyfzcKRMIDcZVaHo9K-OSkMqOi3M-sELKpeDjgUjZvwSGT-mOcsBPqlquZiCERuTgiLIsb82XaR0RVnPf8dqifjtagG7CdOeorwEqxPaqboHs2QMFGir6kiU9HzyiDvG5CXDiXw";

const state={
    chat_room:{},
    chat_room_one:{},
    chat_room_client:{},
    chat_room_client1:{},
}

const getters={
    chat_room:state=>state.chat_room,
    chat_room_one:state=>state.chat_room_one,
    chat_room_client:state=> state.chat_room_client,
    chat_room_client1:state=> state.chat_room_client1

}

const mutations={
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

    async getChatRoomOne ({commit},{chat_room_id}) {
        const data = await chatProvider.getChatRoomOne({'chat_room_id':chat_room_id

        ,'token':tokenAdmin
        })

        commit('SET_CHAT_ROOM_ONE', data)
        return data
    },

    async getChatRoom ({commit}) {
        const data = await chatProvider.getChatRoom({'token':tokenAdmin})

        commit('SET_CHAT_ROOM', data)
    },

    //delete when test complete
    async getChatRoomClient ({commit}) {
        const data = await chatProvider.getChatRoomClient({'token':tokenClient})

        commit('SET_CHAT_ROOM_CLIENT', data)
        return data
    },

    //delete when test complete
    async getChatRoomClient1 ({commit}) {
        const data = await chatProvider.getChatRoomClient({'token':tokenClient1})

        commit('SET_CHAT_ROOM_CLIENT1', data)
        return data
    },

    async sendMessage({commit,dispatch},{chat_room_id,message}) {

        const data = await chatProvider.sendMessage({'chat_room_id':chat_room_id,'message':message
        ,'token':tokenAdmin
        });
        dispatch('getChatRoomOne',{ root: true,'chat_room_id':1 });
        return data
    },

    //delete when test complete
    async sendMessageClient({commit,dispatch},{message,question_id}) {
        let args={}
        if(message != ""){
            args= {'message':message
                ,'token':tokenClient}
        }else{
            args= {'question_id':question_id
                ,'token':tokenClient}
        }

        const data = await chatProvider.sendMessageClient(args);

        dispatch('getChatRoomClient',{ root: true });
        return data
    },

    //delete when test complete
    async sendMessageClient1({commit,dispatch},{message,question_id}) {

        let args={}
        if(message != ""){
            args= {

                'message':message,
                'question_id':question_id
                ,'token':tokenClient1}
        }else{
            args= {
                'message':message,
                'question_id':question_id
                ,'token':tokenClient1}
        }

        const data = await chatProvider.sendMessageClient(args);

        dispatch('getChatRoomClient1',{ root: true });
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