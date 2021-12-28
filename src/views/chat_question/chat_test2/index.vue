<template>
  <div class="chat-test">
    <v-row>

      <v-col cols-6>
        <h1>Admin</h1>
        <v-card

            class="overflow-y-auto"
            max-height="400"
        >
          <ul>
            <li  v-for="data in adminMessageBox">

              <p class="chat-left pl-5 pr-5 pt-0" v-if="data.send_by===3">
                {{data.message}}
              </p>

              <p class="chat-right pl-5 pr-5 pt-0" v-else>
                {{data.message}}
              </p>

            </li>
          </ul>
        </v-card>

        <v-text-field v-model="textAdmin"></v-text-field>
        <v-btn @click="sendMessage({'message':textAdmin,'chat_room_id':2})">Send</v-btn>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';

import {io} from 'socket.io-client';
import Vue from "vue";
const eventBus = new Vue();
export default {
  name: "index",

  data(){
    return{

      textAdmin:'',
      socket:null,
      adminMessageBox:[],


    }
  },

  created() {

    this.socket = io("http://25.10.235.85:7000");

    this.$nextTick(() => eventBus.$emit("someEvent", true))
  },

  mounted() {


    this.socket.emit("connection");
    console.log(this.socket);

    this.socket.on("receive_message",(message)=>{
    console.log(message)

        //check bot chat
        if(message.bot){
          console.log("bot chat")
        }else{
          this.adminMessageBox.push(message)

        }

    });


    this.getChatRoomOne({'chat_room_id':2}).then(res=>{
      this.socket.emit("join_channel",res.channel)
      for(let i=0;i<res['messages'].length;i++){
          try{
            this.adminMessageBox.push(res['messages'][i])
          }catch (e){
            console.log(e)
          }
      }

    });

    this.getChatQuestion();

  },
  methods:{
    met(){
      console.log("bbb");
    },
    ...mapActions({
      getChatQuestion:'ChatQuestion/getChatQuestion',
      getChatRoomOne:'Chat/getChatRoomOne',
      getChatRoomClient1:'Chat/getChatRoomClient1',
      sendMessage:'Chat/sendMessage',
      sendMessageClient1:'Chat/sendMessageClient1'
    })
  },

  computed:{
    ...mapGetters({
      chat_question:'ChatQuestion/chat_question',
      chat_room_one:'Chat/chat_room_one',
      chat_room_client1:'Chat/chat_room_client1'
    })
  },

  beforeDestroy() {
    console.log("beforeDestroy")
    eventBus.$off("someEvent", this.met);
  },

  destroyed() {
    console.log('destroyed')
  },




}
</script>

<style scoped lang="scss">

.chat-test{
  .show-message-client{
    width: 100%;
    max-height: 300px;
    background-color: coral;
  }

  .show-message-admin{
    width: 100%;
    max-height: 300px;
    background-color: aquamarine;
  }

  .chat-left{
    float: left;
    word-wrap: break-word;
    white-space: pre-line;
    max-width: 300px;
    border-radius: 20px;
    background-color: #1a1a1a;
    color: #f0f2f5;

  }
  .chat-right{
    word-wrap: break-word;
    white-space: pre-line;
    max-width: 300px;
    border-radius: 20px;
    background-color: #1a1a1a;
    color: #f0f2f5;
    float: right;
  }
}
</style>