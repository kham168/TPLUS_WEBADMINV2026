<template>
  <div>
    <section>
      <v-card v-for="i in 4" :key="i" v-if="firstLoad">
        <v-skeleton-loader
            class="mb-5"
            type="list-item-avatar, list-item-two-line,actions"
        ></v-skeleton-loader>
      </v-card>





      <v-col cols="12" md="12" lg="12" v-if="list_chat_room != ''" v-show="!firstLoad">
        <div class="dashboard-right">
          <div class="dashboard-right-header">
            <h3>Client Message <span><i class="far fa-comment-alt-lines"></i></span></h3>
          </div>

          <div class="message-content">
            <v-row>
              <v-col cols="12" md="12" lg="12" v-for="(data,index) in list_chat_room">
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
                    <div class="message-icon" @click="toChatroom({'chat_room_id':data.id,'user_id':data.created_by})">
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
          this.list_chat_room.splice(i,1);
          this.list_chat_room.unshift(message);
          break;
        }else if(message.id != this.list_chat_room[i].id && i == this.list_chat_room.length-1){
          this.list_chat_room.unshift(message);
        }
      }

    });

    this.getChatRoom().then(res=>{
      console.log(res)
      if(res.success){
        this.socket.emit("join_channel","new_message_room_by_snipermonkey_2077")

        for(let i=0;i<res.allChatRoom.length;i++){
          this.list_chat_room.push(res.allChatRoom[i])
        }

        this.firstLoad=false;

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

<style scoped lang="scss">
.dashboard-right {
  width: 100%;
  min-height: 100vh;
  overflow-y: auto;
  background: #ffffff;
  border-radius: 15px;
  display: flex;
  flex-direction: column;

  .dashboard-right-header {
    width: 100%;
    height: 60px;
    display: flex;
    border-bottom: 2px solid #EEEEEE;
    justify-content: flex-start;
    align-items: center;
    padding-left: 20px;
  }

  .message-content {
    width: 100%;
    height: 90vh;
    padding: 20px;

    .card-message {
      width: 100%;
      height: 130px;
      background: rgba(149, 175, 192, 0.2);
      border: 2px solid #EEEEEE;
      border-radius: 4px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;


      .message-image {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .images {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: #ffffff;
          overflow: hidden;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }

      .message-detail {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-top: 2px;

        h4 {
          font-size: 24px;
        }

        p {
          width: 220px;
          font-size: 14px;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          margin: 0;
          padding: 0;

        }

        .message-icon {
          width: 36px;
          height: 36px;
          padding: 5px;
          border-radius: 18px;
          background: #3F3D56;
          position: absolute;
          right: 10px;
          bottom: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          i {
            font-size: 14px;
            color: #ffffff;
          }
        }
      }
    }

  }
}
</style>
