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
    async getPostOne ({commit},{post_id}) {

        const data = await postService.getPostOne({'post_id':post_id})
        return data
      },

    async getPost ({commit}) {
        const data = await postService.getPost()

        commit('SET_POST', data)
      },

      async createPost({dispatch},{

        title,
        description,
        status,
        other_lang_title,
        other_lang_description,
        avatar,
        avatar_EN,
          newsCategoryId}

      ){

            let arg={
                'post_type_id':post_type_id,
                'title': title,
                'description':description,
                'status':status,
                'other_lang_title':other_lang_title,
                'other_lang_description':other_lang_description,
                'other_lang_id':2,
                'avatar':avatar,
                'avatar_EN':avatar_EN,
                'newsCategoryId':newsCategoryId,
            }
         await postService.createPost(arg)
        dispatch('getPost',{ root: true });
      },

      async updatePost({dispatch },{
          post_id,
        title,
        description,
        status,
        other_lang_title,
        other_lang_description,
  
        avatar,
        avatar_EN,
          newsCategoryId}){
            
            let arg={
                'post_id':post_id,
                'title': title,
                'description':description,
                'status':status,
                'other_lang_title':other_lang_title,
                'other_lang_description':other_lang_description,
                'other_lang_id':2,
                'avatar':avatar,
                'avatar_EN':avatar_EN,
                'newsCategoryId':newsCategoryId,
            }
         await postService.updatePost(arg)
        dispatch('getPost',{ root: true });
        

      },

      async deletePost ({dispatch},{post_id}) {
        await postService.deletePost({'post_id':post_id})
        dispatch('getPost',{ root: true });

      },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}