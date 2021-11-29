import CatePostProvider from '@/resources/cate_post_provider'

const catPostProvider = new CatePostProvider()

const state={
    cate_post:{},
    cate_post_one:{},
  
}

const getters={
    cate_post:state=>state.cate_post,
    cate_post_one:state=>state.cate_post_one,
}

const mutations={
  SET_CATE_POST(state,data){
      state.cate_post = data;
    },
    SET_CATE_POST_ONE(state,data){
        state.cate_post_one = data;
      },
  
}

const actions={
 
    async getCatePostOne ({commit},{cate_post_id}) {
        const data = await catPostProvider.getCatePostOne({'cate_post_id':cate_post_id})
      
        commit('SET_CATE_POST_ONE', data)
      },

    async getCatePostAll ({commit}) {
        const data = await catPostProvider.getCatePostAll()
     
        commit('SET_CATE_POST', data)
      },

      async createCatePost({dispatch},{
        cate_post_name,
  
        other_lang_cate_post_name,
        
    }){

        let arg={
            'cate_post_name':cate_post_name,
         
            'other_lang_cate_post_name':other_lang_cate_post_name,
        
           
        }

         await catPostProvider.createCatePost(arg)
        dispatch('getCatePostAll',{ root: true });
      },

      async updateCatePost({dispatch },{
          cate_post_id,
          cate_post_name,
          is_active,
          other_lang_cate_post_name,
          }){
            
            let arg={
                'cate_post_id':cate_post_id,
                'cate_post_name':cate_post_name,
                'is_active':is_active,
                'other_lang_cate_post_name':other_lang_cate_post_name,
              
               
            }
         await catPostProvider.updateCatePost(arg)
        dispatch('getCatePostAll',{ root: true });
        
        //commit('SET_POST',data)
      },

      async deleteCatePost ({dispatch},{cate_post_id}) {
        await catPostProvider.deleteCatePost({'cate_post_id':cate_post_id})
        dispatch('getCatePostAll',{ root: true });
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