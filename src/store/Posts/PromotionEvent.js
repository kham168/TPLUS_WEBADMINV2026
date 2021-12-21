import PromotionEventProvider from '@/resources/promotion_event_provider'

const promotionEventService = new PromotionEventProvider()

const state={
    promotion_event:{},
    event:{},
  
}

const getters={
    promotion_event:state=>state.promotion_event,
    event:state=>state.event
}

const mutations={
  SET_PROMOTION_EVENT(state, data){
      state.promotion_event = data;
    },

    SET_EVENT(state,data){
        state.event = data;
    },
  
}

const actions={
 
  async getPromotionEventOne ({commit},{promotion_event_id}) {
      console.log(promotion_event_id)
    const data = await promotionEventService.getPromotionEventOne({'promotion_event_id':promotion_event_id})

    return data
  },

    async getEvent ({commit}) {
        const data = await promotionEventService.getEvent()

        commit('SET_EVENT', data)

        return data
    },

    async getPromotion ({commit}) {
        const data = await promotionEventService.getPromotion()
  
        commit('SET_PROMOTION_EVENT', data)

        return data
      },

      async createPromotionEvent({dispatch},{
        post_type_id,
        title,
        description,
        status,
        start_date,
        end_date,
        other_lang_title,
        other_lang_description,
    
        avatar,
        avatar_EN}){

            let arg={
                'post_type_id':1,
                'title': title,
                'description':description,
                'status':status,
                'start_date':start_date,
                'end_date':end_date,
                'other_lang_title':other_lang_title,
                'other_lang_description':other_lang_description,
                'other_lang_id':2,
                'avatar':avatar,
                'avatar_EN':avatar_EN
            }
         await promotionEventService.createPromotionEvent(arg)


              dispatch('getPromotion',{ root: true });



      },

    async createEvent({dispatch},{
        post_type_id,
        title,
        description,
        status,
        start_date,
        end_date,
        other_lang_title,
        other_lang_description,

        avatar,
        avatar_EN}){

        let arg={
            'post_type_id':3,
            'title': title,
            'description':description,
            'status':status,
            'start_date':start_date,
            'end_date':end_date,
            'other_lang_title':other_lang_title,
            'other_lang_description':other_lang_description,
            'other_lang_id':2,
            'avatar':avatar,
            'avatar_EN':avatar_EN
        }
        await promotionEventService.createPromotionEvent(arg)


            dispatch('getEvent',{ root: true });

    },

      async updatePromotionEvent({dispatch },{
          post_id,
        post_type_id,
        title,
        description,
        status,
        start_date,
        end_date,
        other_lang_title,
        other_lang_description,
  
        avatar,
        avatar_EN}){
            
            let arg={
                'post_id':post_id,
                'post_type_id':post_type_id,
                'title': title,
                'description':description,
                'status':status,
                'start_date':start_date,
                'end_date':end_date,
                'other_lang_title':other_lang_title,
                'other_lang_description':other_lang_description,
                'other_lang_id':2,
                'avatar':avatar,
                'avatar_EN':avatar_EN
            }
         await promotionEventService.updatePromotionEvent(arg)


              dispatch('getPromotion',{ root: true });

              dispatch('getEvent',{ root: true });

 
      },

      async deletePromotionEvent ({dispatch},{promotion_event_id}) {
        await promotionEventService.deletePromotionEvent({'promotion_event_id':promotion_event_id})


              dispatch('getPromotion',{ root: true });

              dispatch('getEvent',{ root: true });

      },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}