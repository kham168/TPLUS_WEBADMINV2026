import CateDataPackageProvider from '@/resources/cate_data_package_provider.js'

const cateDataPackageProvider = new CateDataPackageProvider()

const state={
    cate_data_package:{},
    cate_data_package_one:{},
  
}

const getters={
  cate_data_package:state=>state.cate_data_package,
  cate_data_package_one:state=>state.cate_data_package_one
}

const mutations={
  SET_CATE_DATA_PACKAGE(state,data){
      state.cate_data_package = data;
    },
    SET_CATE_DATA_PACKAGE_ONE(state,data){
      state.cate_data_package_one = data;
    },
  
}

const actions={
 
  async getCateDataPackageOne ({commit},{cate_package_id}) {
    const data = await cateDataPackageProvider.getCateDataPackageOne({'cate_package_id':cate_package_id})
 
    commit('SET_CATE_DATA_PACKAGE_ONE', data)

    return data
  },

    async getCateDataPackage ({commit}) {
        const data = await cateDataPackageProvider.getCateDataPackageAll()
     
        commit('SET_CATE_DATA_PACKAGE', data)
      },

      async createCateDataPackage({dispatch},{
    cate_package_name,
    description,
    other_lang_cate_package_name,
    other_lang_description,
        
    }){

        let arg={
            'cate_package_name':cate_package_name,
            'description':description,
            'other_lang_cate_package_name':other_lang_cate_package_name,
            'other_lang_description':other_lang_description,
           
        }

         await cateDataPackageProvider.createCateDataPackage(arg)
        dispatch('getCateDataPackage',{ root: true });
      },

      async updateCateDataPackage({dispatch },{
          cate_package_id,
          cate_package_name,
    description,
    other_lang_cate_package_name,
    other_lang_description,
          }){
            
            let arg={
                'cate_package_id':cate_package_id,
                'cate_package_name':cate_package_name,
                'description':description,
                'other_lang_cate_package_name':other_lang_cate_package_name,
                'other_lang_description':other_lang_description,
              
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