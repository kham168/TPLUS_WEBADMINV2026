import ChatQuestionProvider from '@/resources/chat_question_provider'

const chatQuestionProvider = new ChatQuestionProvider()


const state={
    chat_question:{},
    chat_question_one:{},
    chat_sub_question:{},
    chat_base_question:{},
}

const getters={
    chat_question:state=>state.chat_question,
    chat_question_one:state=>state.chat_question_one,
    chat_sub_question:state=>state.chat_sub_question,
    chat_base_question:state=>state.chat_base_question,
}

const mutations={
    SET_CHAT_QUESTION(state,data){
        state.chat_question = data;
    },
    SET_CHAT_QUESTION_ONE(state,data){
        state.chat_question_one = data;
      },
    SET_CHAT_SUB_QUESTION(state,data){
        state.chat_sub_question = data;
    },

    SET_CHAT_BASE_QUESTION(state,data){
        state.chat_base_question = data;
    },

}

const actions={

    async getChatQuestionOne ({commit},{chat_question_id}) {
        const data = await chatQuestionProvider.getChatQuestionOne({'chat_question_id':chat_question_id})

        commit('SET_CHAT_QUESTION_ONE', data)
        return data
      },

    async getChatQuestion ({commit}) {
        const data = await chatQuestionProvider.getChatQuestion()

        commit('SET_CHAT_QUESTION', data)
    },

    async getChatBaseQuestion({commit}){
      const data = await chatQuestionProvider.getChatBaseQuestion()

      commit('SET_CHAT_BASE_QUESTION',data)
    },

    async getChatSubQuestion({commit},{chat_question_id}) {

        const data = await chatQuestionProvider.getChatSubQuestion({'chat_question_id':chat_question_id});

        commit('SET_CHAT_SUB_QUESTION', data)

        return data
    },

    async createChatQuestion({dispatch},{
        question, answer, questionEng, answerEng,image,imageEng

    }){

        let arg = {

            'question':question,
            'answer':answer,
            'questionEng':questionEng,
            'answerEng':answerEng,
            'image':image,
            'imageEng':imageEng
        }

        await chatQuestionProvider.createChatQuestion(arg)
        dispatch('getChatQuestion',{ root: true });
    },

    async createChatSubQuestion({dispatch},{
        chat_question_id,question, answer, questionEng, answerEng,image,imageEng

    }){

        let arg = {
            'chat_question_id':chat_question_id,
            'question':question,
            'answer':answer,
            'questionEng':questionEng,
            'answerEng':answerEng,
            'image':image,
            'imageEng':imageEng
        }

        await chatQuestionProvider.createChatSubQuestion(arg)
        dispatch('getChatQuestion',{ root: true });
    },



    async updateChatQuestion({dispatch },{
        chat_question_id,question, answer, questionEng, answerEng,image,imageEng
    }){

        let arg = {
            'chat_question_id':chat_question_id,
            'question':question,
            'answer':answer,
            'questionEng':questionEng,
            'answerEng':answerEng,
            'image':image,
            'imageEng':imageEng
        }

        await chatQuestionProvider.updateChatQuestion(arg)
        dispatch('getChatQuestion',{ root: true });

        //commit('SET_POST',data)
    },

    async deleteChatQuestion ({dispatch},{chat_question_id}) {
        await chatQuestionProvider.deleteChatQuestion({'chat_question_id':chat_question_id})
        dispatch('getChatQuestion',{ root: true });
        // commit('SET_POST', data)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}