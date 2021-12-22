import ChatProvider from '@/resources/chat_provider'

const chatProvider = new ChatProvider()

const tokenClient = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwicGhvbmUiOiI5OTk5OTk5OSIsImlhdCI6MTYzOTQ1ODk1NywiZXhwIjoxNjM5NDYyNTU3fQ.YoGqGGxt31dxQWsjYwqiFlmCzNBvllRgcpAJX7OLzpcDXkWcCOhSINMC-QMUgNlNsOBigGxpNPdBI0_Ig5n_hK5IkKfBLEYzBPF86Do9c-u2mJXY7EvUX7M_X6NBM3HqjALjYiEYG8w7qvJHI7eyffyPuFZ8tOA_lYIJM7OrNIHJzESyPU-wmPFQef-CarYqtmMeUU9Wh27QMr-5pJGloD88wLzQF6qUwb29fN72no_ilULgCU4DR5V9NebBewucdFHFV14fADVfqKURFZA8tsGbd88DqfdhLoKEyop4Jp2ZNRbCOresomaN7dfYgIjP8IluNHr07gVwW2_JorfrEg";
const tokenClient1 ="Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywicGhvbmUiOiIxMTExMTExMSIsImlhdCI6MTY0MDA5MzE5NSwiZXhwIjoxNjcxNjUwNzk1fQ.wF2woT5aNP7CPgbX6mh1_em05xMcBqjBZ8yBdQ4Bcp21rMEX1itQv9hVqQvnPpozF4SfC0_HesCiPIQtA0ZmIOyuGdEWJO0Gz1GP10UQEH-R0s3-rdL5Fkh2JeihMuftA0oeAEmam4um5jB36y_-XcDOdiqCSrdZFeWhv8U3X-K9thIp_-jyKT50EfmL026ungVHxxHZZU6coJeGZ-jflK9lIHO-ax2mRMFgPgr8ssxDcc1MqkoJND6j9jv_hBYtWQSuKL0Xjf7F-E-YkV7hwrxxdoLd83We_x1FRPBI8d7dWkXtE1HzAMZDFJLwO-FBPbTjK9edpcF8rMtSQPVyDA";
const tokenAdmin = "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiI5OTk5OTk5OSIsImlhdCI6MTY0MDA5MzY3MCwiZXhwIjoxNjcxNjUxMjcwfQ.CR_ExaEiclihEAh3wtG8zdTrIuPQxJnECVBOj9AyKn82eBjtKHqxS3nVdZKDyXSrsDpOVdDe1yVAVaWwvXcgehLSurpNHF92wIkxV_AQhOjb0Umf8ZSBG-JTtIILOlNL8ExLjT4Vl_e91DKxgbZwX4Qa5QG4ViDCK4KcAyzSamnPHXCT6j_RvvN0eNv1TbiZcNkgZhQsdzPGxdoZKj_51LbYgM5JRuYJaTwb75KG4BHoukYq73Ts2c9cEcGHQb855rZJh0wKI0Uw7al81lwOwjTYebIYkcBxjUd032_UJn8_dpwxMXwxrWeYQSDQOORki8GUGc1I_t5TNP4jZVTi2g";

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

    async getChatRoomOne ({commit},{chat_room_id}) {
        const data = await chatProvider.getChatRoomOne({'chat_room_id':chat_room_id

        ,'token':tokenAdmin
        })

        commit('SET_CHAT_ROOM_ONE', data)
        return data
    },
    async getChatRoomUnRead ({commit}) {
        const data = await chatProvider.getChatRoomUnRead({'token':tokenAdmin})

        commit('SET_CHAT_ROOM_UNREAD', data)
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
        dispatch('getChatRoomOne',{ root: true,'chat_room_id':chat_room_id });
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