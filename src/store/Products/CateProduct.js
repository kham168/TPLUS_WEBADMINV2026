import CateProductProvider from '@/resources/cate_product_provider'

const catProductProvider = new CateProductProvider()

const state={
    cate_product:{},
    cate_product_one:{}
   
  
}

const getters={
    cate_product:state=>state.cate_product,
    cate_product_one:state=>state.cate_product_one
    
}

const mutations={
  SET_CATE_PRODUCT(state,data){
      state.cate_product = data;
    },
    SET_CATE_PRODUCT_ONE(state,data){
      state.cate_product_one = data;
    },
  
}

const actions={

  async getCateProductOne ({commit},{cate_product_id}) {
    const data = await catProductProvider.getCateProductOne({'cate_product_id':cate_product_id})

    commit('SET_CATE_PRODUCT_ONE', data)
    return data
  },

    async getCateProduct ({commit}) {
        const data = await catProductProvider.getCateProduct()
     
        commit('SET_CATE_PRODUCT', data)
        return data
      },

      async createCateProduct({dispatch},{
        cate_product_name,
    description,
    other_lang_cate_product_name,
    other_lang_description,
 
        
    }){

        let arg={
            'cate_product_name':cate_product_name,
            'description':description,
            'other_lang_cate_product_name':other_lang_cate_product_name,
            'other_lang_description':other_lang_description,
           
        }

         await catProductProvider.createCateProduct(arg)
        dispatch('getCateProduct',{ root: true });
      },

      async updateCateProduct({dispatch },{
        cate_product_id,
        cate_product_name,
        description,
        other_lang_cate_product_name,
        other_lang_description,
          }){
            
            let arg={
                'cate_product_id':cate_product_id,
                'cate_product_name':cate_product_name,
                'description':description,
                'other_lang_cate_product_name':other_lang_cate_product_name,
                'other_lang_description':other_lang_description,
               
            }
         await catProductProvider.updateCateProduct(arg)
        dispatch('getCateProduct',{ root: true });
        
        //commit('SET_POST',data)
      },

      async deleteCateProduct ({dispatch},{cate_product_id}) {
        await catProductProvider.deleteCateProduct({'cate_product_id':cate_product_id})
        dispatch('getCateProduct',{ root: true });
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