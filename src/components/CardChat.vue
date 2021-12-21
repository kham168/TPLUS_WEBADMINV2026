<template>
  <div class="dashboard-right">
    <div class="dashboard-right-header">
      <h3>Client Message <span><i class="far fa-comment-alt-lines"></i></span></h3>
    </div>
    <div class="message-content">
      <v-row>
        <v-col cols="12" md="12" lg="12" v-for="(data,index) in chat_room['allChatRoom']">
          <div class="card-message">
            <div class="message-image">
              <div class="images">
                <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                    alt="">
              </div>
            </div>
            <div class="message-detail">
              <h4>02098898854</h4>
              <p>Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
                Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. </p>
              <div class="message-icon" @click="toChatroom">
                <i class="fas fa-paper-plane"></i>
              </div>
            </div>
          </div>
        </v-col>

      </v-row>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  name: "CardChat",

  created() {
    this.getChatRoom();
  },
  methods: {
    toChatroom() {
      this.$router.push({
        name: "chatroom"
      })
    },

    ...mapActions({
      getChatRoom:'Chat/getChatRoom'
    }),


  },

  computed:{

  }
}
</script>

<style scoped>

</style>
