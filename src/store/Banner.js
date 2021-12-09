import BannerProvider from '@/resources/banner_provider'

const bannerProvider = new BannerProvider()

const state={
    banner:{},
   
  
}

const getters={
    banner:state=>state.banner,
 
}

const mutations={
  SET_BANNER(state,data){
      state.banner = data;
    },

  
}

const actions={

    async orderBanner ({dispatch},{res}) {
        await bannerProvider.orderBanner({'res':res})
        dispatch('getBanner',{ root: true });

    },
 
  async getBannerOne ({commit},{banner_id}) {
    const data = await bannerProvider.getBannerOne({'banner_id':banner_id})
 
    return data
  },

    async getBanner ({commit}) {
        const data = await bannerProvider.getBanner()
     
        commit('SET_BANNER', data)

        return data
      },

      async createBanner({dispatch},{
        ban_name,
        link,
        description,
        other_lang_ban_name,
        other_lang_link,
        other_lang_description,
        avatar,
        avatar_EN
        
    }){

        let arg={
            'ban_name':ban_name,
            'link':link,
            'description':description,
            'other_lang_ban_name':other_lang_ban_name,
            'other_lang_link':other_lang_link,
            'other_lang_description':other_lang_description,
            'avatar':avatar,
            'avatar_EN':avatar_EN,
           
        }

         await bannerProvider.createBanner(arg)
        dispatch('getBanner',{ root: true });
      },

      async updateBanner({dispatch },{
        ban_id,
          ban_name,
          link,
          description,
          other_lang_ban_name,
          other_lang_link,
          other_lang_description,
          avatar,
          avatar_EN
          }){
            
            let arg={
                'ban_id':ban_id,
                'ban_name':ban_name,
                'link':link,
                'description':description,
                'other_lang_ban_name':other_lang_ban_name,
                'other_lang_link':other_lang_link,
                'other_lang_description':other_lang_description,
                'avatar':avatar,
                'avatar_EN':avatar_EN,
               
            }
         await bannerProvider.updateBanner(arg)
        dispatch('getBanner',{ root: true });
        
        //commit('SET_POST',data)
      },

      async deleteBanner ({dispatch},{ban_id}) {
        await bannerProvider.deleteBanner({'ban_id':ban_id})
        dispatch('getBanner',{ root: true });
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