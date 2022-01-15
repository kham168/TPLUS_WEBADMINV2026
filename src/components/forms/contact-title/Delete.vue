<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h6 grey lighten-2">
          <h4>{{ $t("Contact.Add-title-contact.form.deleteTitle") }}</h4>
        </v-card-title>

        <v-card-text>
            <div class="delete-title">
              <span
                ><i class="fas fa-exclamation-circle"></i>
                {{ $t("Modal.confirmDelete") }}</span
              >
            </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn text @click="$store.commit('Contact/isDeleteModal','')">
            {{ $t("Contact.Create.form.button.cancel") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="DeleteData" color="yellow" :loading="isLoading">
            {{ $t("Contact.table.options.delete") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
     title_id : null,
     isLoading:false,

    };
  },
  watch: {
    titleID(){
      this.title_id = this.titleID
    }
  },
  computed: {
     dialog(){
         return this.$store.getters['Contact/getDeleteModal']
     },
     titleID(){
       return this.$store.getters['Contact/getTitle_id']
     }
  
  },

  methods: {
  async DeleteData(){
    this.isLoading = true;
      await this.$axios.delete(`titleContacts/${this.title_id}`).then((res)=>{
        if(res.status == 200){
           this.$store.dispatch({
              type: "action_Notifi_Success",
              message: this.$t("Notification.delDataSuccess"),
            });
            setTimeout(() => {
              window.location.reload();
            }, 300);
        }
        this.isLoading = false;
      }).catch((error)=>{
        this.isLoading = false;
        console.log(error);
        if (error.response.data.error) {
          setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Error",
              message: `${error.response.data.error.message}`
            })
          }, 300);
        }
      })
   }
  },
};
</script>

<style lang="scss" scoped>
.delete-title{
  width: 100%;
  text-align: center;
  padding-top: 20px;

  span{
     font-size: 24px;
     font-weight: 800; 
     color: $black-color;
  }
}
</style>
