<template>
  <div>
    <section>
      <v-col cols="12" md="4" lg="4" v-if="chat_room['allChatRoom'] != ''">
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
                    <h4>020{{ data.User.phone }}</h4>
                    <p>{{ data.lasted_message }}</p>
                    <div class="message-icon" @click="toChatroom({'chat_room_id':data.id,'user_id':data.User.id})">
                      <i class="fas fa-paper-plane"></i>
                    </div>
                  </div>
                </div>
              </v-col>

            </v-row>
          </div>
        </div>
      </v-col >
      <div class="Table-empty" v-else>
        <div class="image">
          <v-img src="@/assets/Images/NoData.png"></v-img>
        </div>
        <h3>No Data</h3>
      </div>

    </section>
  </div>

</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  name: "CardChat",

  created() {

  },
  mounted() {
    this.getChatRoom().then(res=>console.log(res));
  },
  methods: {

    toChatroom({chat_room_id,user_id}) {
      this.$router.push({
        name: "chatroom",
        params:{'chat_room_id':chat_room_id,'user_id':user_id}
      })
    },

    ...mapActions({
      getChatRoom:'Chat/getChatRoom'
    }),


  },

  computed:{
    ...mapGetters({
      chat_room:'Chat/chat_room'
    })
  }
}
</script>

<style scoped>

</style>
