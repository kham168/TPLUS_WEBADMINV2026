import ProductProvider from '@/resources/product_provider'

const productProvider = new ProductProvider()

const state={
    product:{},
   
  
}

const getters={
    product:state=>state.product,
 
}

const mutations={
  SET_PRODUCT(state,data){
      state.product = data;
    },

  
}

const actions={
 
  

    async getProduct ({commit}) {
        const data = await productProvider.getProduct()
     
        commit('SET_PRODUCT', data)
      },

      async createProduct({dispatch},{
        cate_product_id,
        product_name,
        description,
        other_lang_product_name,
        other_lang_description,
        avatar,
        avatar_EN
        
    }){

        let arg={
            'cate_product_id':cate_product_id,
            'product_name':product_name,
            'description':description,
            'other_lang_product_name':other_lang_product_name,
            'other_lang_description':other_lang_description,
            'avatar':avatar,
            'avatar_EN':avatar_EN,
           
        }

         await productProvider.createProduct(arg)
        dispatch('getProduct',{ root: true });
      },

      async updateProduct({dispatch },{
        product_id,
        cate_product_id,
        product_name,
        description,
        other_lang_product_name,
        other_lang_description,
        avatar,
        avatar_EN
          }){
            
            let arg={
                'product_id':product_id,
                'cate_product_id':cate_product_id,
                'product_name':product_name,
                'description':description,
                'other_lang_product_name':other_lang_product_name,
                'other_lang_description':other_lang_description,
                'avatar':avatar,
                'avatar_EN':avatar_EN,
               
            }
         await productProvider.updateProduct(arg)
        dispatch('getProduct',{ root: true });
        
        //commit('SET_POST',data)
      },

      async deleteProduct ({dispatch},{product_id}) {
        await productProvider.deleteProduct({'product_id':product_id})
        dispatch('getProduct',{ root: true });
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