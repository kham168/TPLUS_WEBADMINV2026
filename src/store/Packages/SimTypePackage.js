import SimTypePackageProvider from '@/resources/sim_type_package_provider.js';

const simTypePackageProvider = new SimTypePackageProvider();

const state={

    sim_type_package:{}

}

const getters={
    sim_type_package:state=>state.sim_type_package
}

const mutations={
    SET_SIM_TYPE_PACKAGE(state,data){
        state.sim_type_package = data;
    },


}

const actions={

    async getSimTypePackage ({commit}) {
        const data = await simTypePackageProvider.getSimTypePackage()
        commit('SET_SIM_TYPE_PACKAGE', data)
        return data
    },

    async createSimTypePackage({dispatch},{
        mainProduct,
        description,
    }){

        let arg={
            'mainProduct':mainProduct,
            'description':description,
        }

        await simTypePackageProvider.createSimTypePackage(arg)
        dispatch('getSimTypePackage',{ root: true });
    },

    async updateSimTypePackage({dispatch },{
        sim_type_package_id,
        mainProduct,
        description,
    }){

        let arg={
            'sim_type_package_id':sim_type_package_id,
            'mainProduct':mainProduct,
            'description':description,


        }

        await simTypePackageProvider.updateSimTypePackage(arg)
        dispatch('getSimTypePackage',{ root: true });


    },

    async deleteSimTypePackage ({dispatch},{sim_type_package_id}) {
        await simTypePackageProvider.deleteSimTypePackage({'sim_type_package_id':sim_type_package_id})
        dispatch('getSimTypePackage',{ root: true });

    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}