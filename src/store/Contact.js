import ContactProvider from '@/resources/contact_provider'

const contactProvider = new ContactProvider()

const state={
    contact:{},
   
  
}

const getters={
    contact:state=>state.contact,
 
}

const mutations={
  SET_CONTACT(state,data){
      state.contact = data;
    },

  
}

const actions={
 
  

    async getContact ({commit}) {
        const data = await contactProvider.getContact()
     
        commit('SET_CONTACT', data)
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