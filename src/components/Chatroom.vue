<template>
  <v-container>

    <div class="chat-room">
      <div class="chat-room-header">
        <h1><span @click="onBack" style="margin-right: 10px;color: #4b96da;cursor: pointer">
          <i class="fas fa-arrow-circle-left"></i></span></h1>
        <div class="chat-room-profile">
          <img
              :src="require('@/assets/Images/logo.png')"
              alt="">
        </div>
        <div class="chat-room-name">
          <h3>{{ phone }}</h3>
        </div>
      </div>
      <div class="chat-room-content" ref="scrollPosition">
        <v-row justify="center">
          <infinite-loading direction="top" @infinite="infiniteHandler">
            <div slot="no-more"></div>
            <div slot="no-results"></div>
          </infinite-loading>
          <v-col cols="12" class="pa-2" v-for="(element,index) in adminMessageBox" :key="index">
            <div class="chat-room-left" v-if="element.send_by == user_id">
              <div class="show-text-message">
                {{ element.message }}
              </div>
            </div>
            <div class="chat-room-right" v-else>
              <div class="show-text-message">
                {{ element.message }}
              </div>
            </div>
          </v-col>
        </v-row>

      </div>
      <div class="chat-room-footer">
        <!--        <div class="input-chat" ref="resetTextInput" contenteditable="true" @input="messageInput($event)"-->
        <!--             @keyup.enter="functionSendMessage">-->
        <!--        </div>-->
        <v-textarea outlined v-model="textMessage" @keyup.enter.prevent="functionSendMessage">

        </v-textarea>
        <div class="btn-send-message" @click="functionSendMessage">
          <i class="fal fa-paper-plane"></i>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {io} from "socket.io-client";
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: "Chatroom",
  components: {
    InfiniteLoading,
  },
  data() {
    return {
      textMessage: "",
      textAdmin: '',
      socket: null,
      adminMessageBox: [],
      user_id: 0,
      chat_room_id: 0,

      phone: '',
      channel: '',
      page: 1,

    }
  },
  created() {

    this.socket = io(process.env.VUE_APP_BASE_SOCKET);

    this.user_id = this.$route.params.user_id;
    console.log(this.user_id, 55555555555)
    this.chat_room_id = this.$route.params.chat_room_id;

    window.addEventListener('beforeunload', (e) => {
      this.socket.on('leave_channel', this.channel);
    })
  },
  mounted() {
    this.socket.emit("connection");
    console.log(this.socket);
    this.socket.on("receive_message", (message) => {
      console.log(message)

      //check bot chat
      if (message.bot) {
        console.log("bot chat")
      } else {
        this.adminMessageBox.push(message)
      }
    });

    this.getChatRoomOne({'chat_room_id': this.$route.params.chat_room_id}).then(res => {
      console.log(res)
      this.page += 1;
      this.channel = res.channel;
      this.phone = res.chat_room_data.User.phone;
      this.socket.emit("join_channel", res.channel)
      for (let i = 0; i < res['messages'].data.length; i++) {
        try {
          this.adminMessageBox.unshift(res['messages'].data[i])

        } catch (e) {
          console.log(e)
        }
      }
      this.scrollToBottom()
    });
  },
  methods: {
    onBack() {
      this.$router.push({
        name: "chat_list.index"
      })

    },
    functionSendMessage() {
      if (this.textMessage !== "") {
        this.sendMessage({'message': this.textMessage, 'chat_room_id': this.chat_room_id}).then((res) => {
          console.log(res)
          this.resetTextMessage()
          this.scrollToBottom()
        });
      }

    },

    resetTextMessage() {
      // this.$refs.resetTextInput.innerHTML = "";
      this.textMessage = "";
    },
    // messageInput(e) {
    //   this.textMessage = e.target.innerHTML;
    //   this.textMessage = e.target.innerHTML.replace("<div><br></div>", '');
    // },
    scrollToBottom() {
      const el = this.$refs.scrollPosition;
      if (el) {
        this.$nextTick(() => {
          el.scrollTo(0, el.scrollHeight + 400);
        })

      }
    },
    // sendMessage() {
    //   this.message.push({
    //     text: this.textMessage
    //   });
    //   this.resetTextMessage();
    //   this.scrollToBottom();
    // },

    infiniteHandler($state) {
      this.getChatRoomOne({'chat_room_id': this.$route.params.chat_room_id, 'page': this.page}).then(res => {
        console.log(res)
        if (res.success) {

          if (res.messages.data.length == res.messages.limit) {

            this.page += 1;


            for (let i = 0; i < res['messages'].data.length; i++) {
              try {
                this.adminMessageBox.unshift(res['messages'].data[i])

              } catch (e) {
                console.log(e)
              }
            }
            this.firstLoad = false;
            $state.loaded();
          } else {
            $state.complete();

          }

        }


      });

    },
    ...mapActions({
      getChatRoomOne: 'Chat/getChatRoomOne',
      sendMessage: 'Chat/sendMessage',

    })
  },
  computed: {
    ...mapGetters({
      chat_room_one: 'Chat/chat_room_one',

    })
  },


  beforeRouteLeave(to, from, next) {
    console.log(this.channel);
    this.socket.on('leave_channel', this.channel);
    next()

  }


}
</script>

<style scoped lang="scss">
.chat-room {
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #e2e3e3;


  .chat-room-header {
    width: 100%;
    background: #FFFFFF;
    height: 80px;
    display: flex;
    align-items: center;
    padding-left: 20px;

    .chat-room-profile {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #EEEEEE;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .chat-room-name {
      padding-left: 10px;
      padding-top: 14px;

      .chat-room-status {
        color: rgba(76, 209, 55, 1.0);
      }
    }
  }

  .chat-room-content {
    width: 100%;
    height: 360px;
    // display: flex;
    display: block;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 60px;

    .chat-room-left {
      flex: 1;
      height: auto;
      display: flex;
      flex-direction: column;

      .show-text-message {
        display: flex;
        width: min-content;
        min-height: 40px;
        background: #FFFFFF;
        margin: 10px 20px;
        padding: 8px 30px;
        border-radius: 0 20px 20px 20px;
        min-width: 400px;
        word-break: break-word;
      }
    }

    .chat-room-right {
      flex: 1;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-end;

      .show-text-message {
        display: flex;
        width: min-content;
        flex-direction: column;
        min-height: 40px;
        background: #FFFFFF;
        margin: 10px 20px 0px 0px;
        padding: 8px 30px;
        border-radius: 20px 0 20px 20px;
        min-width: 400px;
        word-break: break-word;
      }
    }

  }

  .chat-room-content::-webkit-scrollbar {
    width: 10px;
  }

  .chat-room-content::-webkit-scrollbar-track {
    background-color: #e3e3e3;
    padding: 4px;
  }

  .chat-room-content::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
    border-radius: 30px;
    padding: 2px;
    background: #e2e3e3;
  }


  .chat-room-footer {
    width: 100%;
    min-height: 100px;
    padding: 8px;
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;

    .input-chat {
      width: 95%;
      min-height: 40px;
      background: #EEEEEE;
      border-radius: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 20px;

    }

    [contenteditable] {
      outline: 0 solid transparent;
      display: block;

    }

    .btn-send-message {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background: rgba(0, 168, 255, 1.0);
      margin-left: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      cursor: pointer;

    }
  }
}

</style>
