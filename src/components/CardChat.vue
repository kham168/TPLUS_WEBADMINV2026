<template>
  <div class="dashboard-right">
    <div class="dashboard-right-header">
      <h3>Client Message <span><i class="far fa-comment-alt-lines"></i></span></h3>
    </div>

    <div class="message-content">
      <v-row>
        <v-col cols="12" md="12" lg="12" v-for="i in 4" :key="i" v-if="firstLoad">
          <v-card >
            <v-skeleton-loader
                class="mb-5"
                type="list-item-avatar, list-item-two-line,actions"
            ></v-skeleton-loader>
          </v-card>
        </v-col>
        <v-col cols="12" md="12" lg="12" v-for="(data,index) in list_chat_room" v-if="list_chat_room!=''" v-show="!firstLoad">
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
        <v-col cols="12" md="12" lg="12" v-if="list_chat_room==''">
          <div class="image">
            <v-img src="@/assets/Images/NoData.png"></v-img>
          </div>
          <h3 class="text-center">No Data</h3>
        </v-col>

      </v-row>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import {io} from "socket.io-client";
export default {
  name: "CardChat",

  data(){
    return{
      firstLoad:true,
      socket:null,
      list_chat_room:[],
    }
  },
  created() {
    this.socket = io("http://128.199.104.34:7000");
  },
  mounted() {
    this.socket.emit("connection");
    console.log(this.socket);

    this.socket.on("new_message_by_snipermonkey_2077",(message)=>{
      console.log(message)
      for(let i=0;i<this.list_chat_room.length;i++){
        if(message.id == this.list_chat_room[i].id){
          this.list_chat_room.slice(i,1);
          this.list_chat_room.unshift(message);
          break;
        }else if(message.id != this.list_chat_room[i].id && i == this.list_chat_room.length-1){
          this.list_chat_room.unshift(message);
        }
      }

    });

    this.getChatRoomUnRead().then((res)=>{
      if(res.success){
        this.socket.emit("new_message_room_by_snipermonkey_2077")

        for(let i=0;i<res.allChatRoom.length;i++){
          this.list_chat_room.push(res.allChatRoom[i])
        }
        this.firstLoad=false

      }
    });
  },
  methods: {


    toChatroom({chat_room_id,user_id}) {
      this.$router.push({
        name: "chatroom",
        params:{'chat_room_id':chat_room_id,'user_id':user_id}
      })
    },

    ...mapActions({
      getChatRoomUnRead:'Chat/getChatRoomUnRead'
    }),


  },

  computed:{
  ...mapGetters({
    chat_room_unread:'Chat/chat_room_unread'
  })
  }
}
</script>

<style scoped>

</style>
