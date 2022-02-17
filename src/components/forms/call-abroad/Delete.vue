<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h6 grey lighten-2">
          <h4>{{ $t("Call-Abroad.Delete.title") }}</h4>
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
          <v-btn text @click="$store.commit('isDeleteCallAbroadModal','')">
            {{ $t("Call-Abroad.options.cancel") }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn @click.prevent="onDeleteDataCall" :loading="isLoading" color="yellow" >
            {{ $t("Call-Abroad.options.delete") }}
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
      isLoading:false,
    };
  },
  computed: {
     dialog(){
         return this.$store.state.DeleteCallAbroadModal
     }
  
  },
  methods: {
   async onDeleteDataCall(){
     this.isLoading = true;
     await this.$axios.delete(`internationCalls/${this.$store.getters.getCallAbroadId}`).then((res)=>{
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
       this.$store.commit('isDeleteCallAbroadModal','')
     }).catch((error)=>{
       this.isLoading = false;
        setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Error",
              message: `${error.response.data.error.message}`
            })
          }, 300);
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
