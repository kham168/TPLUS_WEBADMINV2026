import DataPackageProvider from '@/resources/data_package_provider.js'

const dataPackageService = new DataPackageProvider()

const state={
    data_package:{},
  
}

const getters={
    data_package:state=>state.data_package,
    
}

const mutations={
  SET_DATA_PACKAGE(state,data){
      state.data_package = data;
    },
  
}

const actions={
  async getDataPackageOne ({commit},{package_id}) {
    const data = await dataPackageService.getDataPackageOne({'package_id':package_id})
  
   
    return data
  },

    async getDataPackage ({commit}) {
        const data = await dataPackageService.getDataPackage()
      
        commit('SET_DATA_PACKAGE', data)
      },

      async createDataPackage({dispatch},{
        cate_package_id,
    name,
    description,
    other_lang_name,
    other_lang_description,
    avatar,
    avatar_EN}){

            let arg={
                'cate_package_id':cate_package_id,
                'name': name,
                'description':description,
                'other_lang_name':other_lang_name,
                'other_lang_description':other_lang_description,
                'avatar':avatar,
                'avatar_EN':avatar_EN
            }
         await dataPackageService.createDataPackage(arg)
        dispatch('getDataPackage',{ root: true });
      },

      async updateDataPackage({dispatch },{
          package_id,
          cate_package_id,
          name,
          description,
          other_lang_name,
          other_lang_description,
          avatar,
          avatar_EN}){
            
            let arg={
                'package_id':package_id,
                'cate_package_id':cate_package_id,
                'name': name,
                'description':description,
                'other_lang_name':other_lang_name,
                'other_lang_description':other_lang_description,
                'avatar':avatar,
                'avatar_EN':avatar_EN
            }
         await dataPackageService.updateDataPackage(arg)
        dispatch('getDataPackage',{ root: true });
        
        //commit('SET_POST',data)
      },

      async deleteDataPackage ({dispatch},{package_id}) {
        await dataPackageService.deleteDataPackage({'package_id':package_id})
        dispatch('getDataPackage',{ root: true });
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