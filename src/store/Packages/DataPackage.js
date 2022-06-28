import DataPackageProvider from '@/resources/data_package_provider.js'

const dataPackageService = new DataPackageProvider()

const state={
    data_package:{},
    data_package_one:{},
    package_simtype_one:[],
}

const getters={
    data_package:state=>state.data_package,
    data_package_one:state=>state.data_package_one,
    package_simtype_one:state=>state.package_simtype_one
}

const mutations={
  SET_DATA_PACKAGE(state,data){
      state.data_package = data;
    },
    SET_DATA_PACKAGE_ONE(state,data){
        state.data_package_one = data;
    },
    SET_PACKAGE_SIMTYPE_ONE(state,data){
        state.package_simtype_one = data;
    },
}

const actions={
    async removeSimTypeOne ({commit,dispatch},{package_id,simTypeId}) {
        await dataPackageService.removeSimTypeOne({'package_id':package_id,'simTypeId':simTypeId})
        dispatch('packageSimTypeOne',{ root: true,'package_id':package_id});

    },

    async packageSimTypeOne ({commit},{package_id}) {
        const data = await dataPackageService.packageSimTypeOne({'package_id':package_id})

        const dataArray=[];
        dataArray.push(data.data)
        commit('SET_PACKAGE_SIMTYPE_ONE', dataArray)
        return dataArray
    },

    async fillSimType({dispatch},{package_id,simTypeId}){


        await dataPackageService.fillSimType({'package_id':package_id,'simTypeId':simTypeId})
        dispatch('packageSimTypeOne',{ root: true,'package_id':package_id});
    },

  async getDataPackageOne ({commit},{package_id}) {
    const data = await dataPackageService.getDataPackageOne({'package_id':package_id})
      commit('SET_DATA_PACKAGE_ONE', data)
   
    return data
  },

    async getDataPackage ({commit}) {
        const data = await dataPackageService.getDataPackage()
      
        commit('SET_DATA_PACKAGE', data)
        return data
      },

      async createDataPackage({dispatch},{
          code,
          la_name,
          en_name,
          avatar,
          avatarEN,
          typePackage_Id,
          catePackage_Id,
            detail,
          detailEN
      }){

          let arg={
              'code':code,
              'la_name': la_name,
              'en_name':en_name,
              'avatar':avatar,
              'avatarEN':avatarEN,
              'typePackage_Id':typePackage_Id,
              'catePackage_Id':catePackage_Id,
              'detail':detail,
              'detailEN':detailEN
          }
         await dataPackageService.createDataPackage(arg)
        dispatch('getDataPackage',{ root: true });
      },

      async updateDataPackage({dispatch },{
          package_id,
          code,
          la_name,
          en_name,
          avatar,
          avatarEN,
          typePackage_Id,
          catePackage_Id,
          detail,
          detailEN}){
            
            let arg={
                'package_id':package_id,
                'code':code,
                'la_name': la_name,
                'en_name':en_name,
                'avatar':avatar,
                'avatarEN':avatarEN,
                'typePackage_Id':typePackage_Id,
                'catePackage_Id':catePackage_Id,
                'detail':detail,
                'detailEN':detailEN
            }
            console.log("===========> log update data package"+arg);
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