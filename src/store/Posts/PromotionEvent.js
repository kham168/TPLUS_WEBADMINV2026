import PromotionEventProvider from '@/resources/promotion_event_provider'

const promotionEventService = new PromotionEventProvider()

const state={
    promotion_event:{},
  
}

const getters={
    promotion_event:state=>state.promotion_event,
    
}

const mutations={
  SET_PROMOTION_EVNT(state,data){
      state.promotion_event = data;
    },
  
}

const actions={
 
  async getPromotionEventOne ({commit},{promotion_event_id}) {
      console.log(promotion_event_id)
    const data = await promotionEventService.getPromotionEventOne({'promotion_event_id':promotion_event_id})

    return data
  },
    async getPromotionEvent ({commit}) {
        const data = await promotionEventService.getPromotionEvent()
  
        commit('SET_PROMOTION_EVNT', data)
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
         await promotionEventService.createPromotionEvent(arg)
        dispatch('getPromotionEvent',{ root: true });
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
        dispatch('getPromotionEvent',{ root: true });
        
 
      },

      async deletePromotionEvent ({dispatch},{post_id}) {
        await promotionEventService.deletePromotionEvent({'post_id':post_id})
        dispatch('getPromotionEvent',{ root: true });
  
      },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}