import ContactProvider from '@/resources/contact_provider'

const contactProvider = new ContactProvider()

const state={
    contact:{},
    contact_one:{},
    CreateModal:false,
    EditModal:false,
    DeleteModal:false,
    dataEdit:{},
    title_id:null,


}

const getters={
    contact:state=>state.contact,
    contact_one:state=>state.contact_one,
    getCreateModal: state => state.CreateModal,
    getEditModal: state => state.EditModal,
    getDeleteModal: state => state.DeleteModal,
    Edits: state => state.dataEdit,
    getTitle_id : state => state.title_id



}

const mutations={
  SET_CONTACT(state,data){
      state.contact = data;
    },

    SET_CONTACT_ONE(state,data){
      state.contact_one = data;

    },

    SET_IS_LOADING(state,data){
      state.isLoading = data;
    },

    isCreateModal(state){
      state.CreateModal = !state.CreateModal
    },
    isEditModal(state,data){
      state.EditModal = !state.EditModal
      state.dataEdit = data
    },
    isDeleteModal(state,id){
      state.DeleteModal = !state.DeleteModal
      state.title_id = id
    }


}

const actions={



  async getContactOne ({commit },{contact_id}) {


   const data = await contactProvider.getContactOne({'contact_id':contact_id})


    commit('SET_CONTACT_ONE', data)


    return data

  },


    async getContact ({commit}) {
        const data = await contactProvider.getContact()


        commit('SET_CONTACT', data)

        return data
      },

      async createContact({dispatch},{
        name,
        email,
        title,
        description,

    }){

        let arg={
            'name':name,
            'email':email,
            'description':description,
            'title':title,


        }

         await contactProvider.createContact(arg)
        dispatch('getContact',{ root: true });
      },

      async updateContact({dispatch },{
        contact_id,
        name,
        email,
        title,
        description,
          }){

            let arg={
              'contact_id':contact_id,
              'name':name,
              'email':email,
              'description':description,
              'title':title,
          }
         await contactProvider.updateContact(arg)
        dispatch('getContact',{ root: true });

        //commit('SET_POST',data)
      },

      async deleteContact ({dispatch},{contact_id}) {
        await contactProvider.deleteContact({'contact_id':contact_id})
        dispatch('getContact',{ root: true });
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
