import CateDataPackageProvider from '@/resources/cate_data_package_provider.js'

const cateDataPackageProvider = new CateDataPackageProvider()

const state={
    cate_data_package:{},

  
}

const getters={
  cate_data_package:state=>state.cate_data_package,

}

const mutations={
  SET_CATE_DATA_PACKAGE(state,data){
      state.cate_data_package = data;
    },

  
}

const actions={
 


    async getCateDataPackage ({commit}) {
        const data = await cateDataPackageProvider.getCateDataPackageAll()
     
        commit('SET_CATE_DATA_PACKAGE', data)
        return data
      },

      async createCateDataPackage({dispatch},{
          mainProduct,
    description,

        
    }){

        let arg={
            'mainProduct':mainProduct,
            'description':description,

           
        }

         await cateDataPackageProvider.createCateDataPackage(arg)
        dispatch('getCateDataPackage',{ root: true });
      },

      async updateCateDataPackage({dispatch },{
          cate_package_id,
          mainProduct,
    description,
  
          }){
            
            let arg={
                'cate_package_id':cate_package_id,
                'mainProduct':mainProduct,
                'description':description,

              
            }
         await cateDataPackageProvider.updateCateDataPackage(arg)
        dispatch('getCateDataPackage',{ root: true });
        
        //commit('SET_POST',data)
      },

      async deleteCateDataPackage ({dispatch},{cate_package_id}) {
        await cateDataPackageProvider.deleteCateDataPackage({'cate_package_id':cate_package_id})
        dispatch('getCateDataPackage',{ root: true });
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