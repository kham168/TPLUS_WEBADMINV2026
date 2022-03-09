import PackageTypeProvider from '@/resources/package_type_provider.js'

const packageTypeProvider = new PackageTypeProvider();

const state={
    package_type:{},
    package_type_one:{},
    package_type_priority:{},

}

const getters={
    package_type:state=>state.package_type,
    package_type_one:state=>state.package_type_one,
    package_type_priority:state=>state.package_type_priority
}

const mutations={
    SET_PACKAGE_TYPE(state, data){
        state.package_type = data;
    },
    SET_PACKAGE_TYPE_ONE(state, data){
        state.package_type_one = data;
    },
    SET_PACKAGE_TYPE_PRIORITY(state, data){
        state.package_type_priority = data;
    },

}

const actions={

    async updatePackageTypePriority ({dispatch},{package_type_id,package_id}) {
        const data = await packageTypeProvider.updatePackageTypePriority({'package_type_id':package_type_id,'package_id':package_id})
        dispatch('getPackageTypePriority',{ root: true,packageTypeId:package_type_id });
        return data
    },


    async getPackageTypePriority ({commit},{packageTypeId}) {
        const data = await packageTypeProvider.getPackageTypePriority({'packageTypeId':packageTypeId})
        commit('SET_PACKAGE_TYPE_PRIORITY', data)
        return data
    },

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
        package_type_id,
        avatar,
        avatar_EN,

    }){

        let arg={
            'package_type_id':package_type_id,
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