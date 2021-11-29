import PostProvider from '@/resources/post_provider'

const postService = new PostProvider()

const state={
    post:{},
  
}

const getters={
    post:state=>state.post,
    
}

const mutations={
  SET_POST(state,data){
      state.post = data;
    },
  
}

const actions={
 

    async getPost ({commit}) {
        const data = await postService.getPost()
      
        commit('SET_POST', data)
      },

      async createPost({dispatch},{
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
         await postService.createPost(arg)
        dispatch('getPost',{ root: true });
      },

      async updatePost({dispatch },{
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
         await postService.updatePost(arg)
        dispatch('getPost',{ root: true });
        
        //commit('SET_POST',data)
      },

      async deletePost ({dispatch},{post_id}) {
        await postService.deletePost({'post_id':post_id})
        dispatch('getPost',{ root: true });
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