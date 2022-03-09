<template>
  <div class="dashboard-right">
    <div class="dashboard-right-header">
      <h3>Client Message <span><i class="far fa-comment-alt-lines"></i></span></h3>
    </div>


    <div class="message-content">
      <v-row justify="center">
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
              <h4>{{ data.User.phone }}</h4>
              <p>{{ data.lasted_message }}</p>
              <div class="message-icon" @click="toChatroom({'chat_room_id':data.id,'user_id':data.created_by,'index':index})">
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
        <infinite-loading @infinite="infiniteHandler">
          <div slot="no-more"></div>
          <div slot="no-results"></div>
        </infinite-loading>
      </v-row>
    </div>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
import {io} from "socket.io-client";
import InfiniteLoading from 'vue-infinite-loading';
export default {
  name: "CardChat",

  components: {
    InfiniteLoading,
  },
  data(){
    return{
      firstLoad:true,
      socket:null,
      list_chat_room:[],
      page:1,
    }
  },
  created() {
    this.socket = io(process.env.VUE_APP_BASE_SOCKET_TEST);
  },
  mounted() {
    this.socket.emit("connection");

    console.log(this.socket);
    this.getChatRoomUnRead({'page':this.page}).then((res)=>{
      if(res.success){
        this.page+=1
        this.socket.emit("join_channel","new_message_room_by_snipermonkey_2077")

        for(let i=0;i<res.allChatRoom.data.length;i++){
          this.list_chat_room.push(res.allChatRoom.data[i])
        }
        this.firstLoad=false

      }
    });



    this.socket.on("new_message_by_snipermonkey_2077",(message)=>{
      console.log(message)
      console.log(message.id)
      for(let i=0;i<this.list_chat_room.length;i++){
        console.log(this.list_chat_room[i].id)
        if(message.id == this.list_chat_room[i].id){
          console.log("if")
          this.list_chat_room.splice(0,1)
          this.list_chat_room.unshift(message);
          break;
        }else if(message.id != this.list_chat_room[i].id && i == this.list_chat_room.length-1){
          this.list_chat_room.unshift(message);
          console.log("else if")
        }
      }

    });

  },
  methods: {

    infiniteHandler($state) {

      this.getChatRoomUnRead({'page':this.page}).then(res=>{
        console.log(res)
        if (res.success) {

          if(res.allChatRoom.data.length == res.allChatRoom.limit){

            this.page += 1;

            for(let i=0;i<res.allChatRoom.data.length;i++){
              this.list_chat_room.push(res.allChatRoom.data[i])
            }
            this.firstLoad=false;
            $state.loaded();
          }
          else {
            $state.complete();

          }

          // if(res.allChatRoom.data.length == res.allChatRoom.limit){
          //   this.page += 1;
          //
          //   for(let i=0;i<res.allChatRoom.data.length;i++){
          //     this.list_chat_room.push(res.allChatRoom[i])
          //   }
          //   this.firstLoad=false;
          //   $state.loaded();
          // }
          // else {
          //   $state.complete();
          // }
        }


      });

    },
    toChatroom({chat_room_id,user_id,index}) {
      this.$router.push({
        name: "chatroom",
        params:{'chat_room_id':chat_room_id,'user_id':user_id}
      });
      console.log(index)
      this.list_chat_room.splice(0,1)
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
