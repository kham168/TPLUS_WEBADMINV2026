import CateDataPackageProvider from '@/resources/cate_data_package_provider.js'

const cateDataPackageProvider = new CateDataPackageProvider()

const state={

    cate_data_package:{},
    cate_data_package_one:{}

}

const getters={
  cate_data_package:state=>state.cate_data_package,
    cate_data_package_one:state=>state.cate_data_package_one,
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
        return data
      },


}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}