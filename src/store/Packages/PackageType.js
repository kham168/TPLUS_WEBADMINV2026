import PackageTypeProvider from '@/resources/package_type_provider.js'

const packageTypeProvider = new PackageTypeProvider();

const state={
    package_type:{},
    package_type_one:{}

}

const getters={
    package_type:state=>state.package_type,
    package_type_one:state=>state.package_type_one,
}

const mutations={
    SET_PACKAGE_TYPE(state, data){
        state.package_type = data;
    },
    SET_PACKAGE_TYPE_ONE(state, data){
        state.package_type_one = data;
    },

}

const actions={

    async getPackageTypeOne ({commit},{packageTypeId}) {
        const data = await packageTypeProvider.getPackageTypeOne({'packageTypeId':packageTypeId})
        commit('SET_PACKAGE_TYPE_ONE', data)
        return data
    },

    async getPackageType ({commit}) {
        const data = await packageTypeProvider.getPackageType()
        commit('SET_PACKAGE_TYPE', data)
        return data
    },



    async updatePackageType({dispatch },{
        typePackageId,
        avatar,
        avatar_EN,

    }){

        let arg={
            'typePackageId':typePackageId,
            'avatar':avatar,
            'avatar_EN':avatar_EN,


        }

        await packageTypeProvider.updatePackageType(arg)
        dispatch('getPackageType',{ root: true });

    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}