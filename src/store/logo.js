import LogoProvider from '@/resources/logo_provider'

const logoProvider = new LogoProvider()

const state={


    logo:{},
    logo_one:{}

}

const getters={

    logo:state=>state.logo,
    logo_one:state=>state.logo_one,


}

const mutations={



    SET_LOGO(state,data){
        state.logo = data;

    },

    SET_LOGO_ONE(state,data){
        state.logo_one = data;

    },



}

const actions={



    async getLogoOne ({commit },{logo_id}) {
        const data = await logoProvider.getLogoOne({'logo_id':logo_id})
        commit('SET_LOGO_ONE', data)
        return data

    },


    async getLogo ({commit}) {

        const data = await logoProvider.getLogo()
        commit('SET_LOGO', data)

        return data
    },

    async updateLogo(
        {dispatch },
        {
            logo_id,
            siteName,
            siteNameEn,
            address,
            addressEn,
            phone,
            email,
            facebook,
            description,
            descriptionEn,
            imageFile,
            imageFileEn
        }
    ){

        console.log(email)

        let arg={
            'logo_id':logo_id,
            'siteName':siteName,
            'siteNameEn':siteNameEn,
            'address':address,
            'addressEn':addressEn,
            'phone':phone,
            'email':email,
            'facebook':facebook,
            'description':description,
            'descriptionEn':descriptionEn,
            'imageFile':imageFile,
            'imageFileEn':imageFileEn
        }


        await logoProvider.updateLogo(arg)
        dispatch('getLogo',{ root: true });

    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
