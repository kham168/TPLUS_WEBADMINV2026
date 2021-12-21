<template>
  <div class="chat-test">
    <v-row>

      <v-col cols-6>
        <h1>Client</h1>
        <div>
          <v-card

              class="overflow-y-auto"
              max-height="400"
          >
            <div class="show-message-client" >
              <ul class="question"  >

                <li v-for="(data,index) in clientMessageBox" >
                  <v-list-item-title>
                    {{data.message}}
                    <p
                        class="chat-left pl-5 pr-5 pt-0"
                        v-if="data.send_by!==3 && data.send_by!==undefined&&data.message.answer===undefined&&data.image_option===false"
                    >
                      {{data.message }}
                    </p>

                    <p
                        class="chat-right pl-5 pr-5 pt-0"
                        v-else-if="data.send_by===3 && data.send_by!==undefined&&data.message.answer===undefined&&data.image_option===false"
                    >
                      {{data.message }}
                    </p>


                   <div v-else-if="data.image_option===true">
                     <v-img :src="`${imageUrl}${data.message}`" max-width="100" max-height="100" ></v-img>
                   </div>

                    <v-card
                        max-width="300"
                        color="#385F73"
                        dark
                        v-else
                        class="chat-left-card">
                      <v-btn class="ma-2 "  v-for="element in data.message.answer" @click="sendMessageClient1({'message':'','question_id':element.chatQuestionId})" v-if="element.multiOption===undefined">{{element.question}}</v-btn>


                    </v-card>


                  </v-list-item-title>
                </li>
              </ul>
            </div>

          </v-card>


          <div v-for="data in chat_base_question['baseQuestionData']  ">


            <v-btn class="mb-5" @click="sendMessageClient1({'message':'','question_id':data.chatQuestionId})">{{data.question}}</v-btn>

          </div>

        </div>

        <v-text-field v-model="textClient" v-if="previewImage[0] == null"></v-text-field>
        <v-row v-else no-gutters justify="start">

            <div style="background-color: red" v-for="(items,index) in previewImage">
              <v-img :src=items max-height="50" max-width="50"></v-img>
            </div>


        </v-row>

        <v-btn @click="sendMessageClient1({'message':textClient,'question_id':0})">Send</v-btn>

        <input
            v-if="previewImage[0] == null"

            multiple

            type="file"
            class="choose-file"
            name="upload-image"
            accept="image/*"
            @change="UploadImage"
        />

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
      textClient:'',
      socket:null,
      clientMessageBox:[],
      isMulti:false,
      subQuestion:[],
      previewImage: [],
      uploadImage:[],

      imageUrl:'http://25.10.235.85:7000/images/chat-questions/',

    }
  },

  created() {

    this.socket = io("http://25.10.235.85:7000");


  },

  mounted() {


    this.socket.emit("connection");
    console.log(this.socket);

    this.socket.on("receive_message",(message)=>{
      console.log(message)



      this.receiveMessage(message);


    });

    this.getChatRoomClient1().then(res=>{

      this.loadMessage(res);

    });

    this.getChatBaseQuestion();

  },
  methods:{

    UploadImage(e) {

      const img = e.target.files;

      for(let i = 0;i<img.length;i++){
        this.uploadImage.push(img[i])
        const reader = new FileReader();
        reader.readAsDataURL(img[i]);
        reader.onload = (e) => {

          this.previewImage.push(e.target.result);
          console.log(this.previewImage[i]);
        }

      };
    },

    receiveMessage(message){
      try {

        if(message.question != undefined && message.message == undefined){
          //choose question
          //add your question select chat when asking
          console.log("show1")
          this.clientMessageBox.push({'message':message.question,'bot':message.bot,'send_by':message.send_by,'image_option':false});
        }else if(message.message != undefined){
          //client chat by self
          //sent to admin  console.log(message)
          console.log("show2")
         this.clientMessageBox.push(message);
        }else{
          //when { message.answer } is json data join in this

          //parse string to json
          let answer = eval(message.answer);

          //check multiOption or not
          if(answer[answer.length-1].multiOption){
            // if is has multiOption join in this
            console.log("show3")
            //add question
            this.clientMessageBox.push({'message': {'answer':answer}});
          }else{
            //if data not multiOption join in this
              console.log("nothing")

          }
        }




      } catch (e) {
        //reason 1: catch when if data not json
        //reason 2: When admin chat back will join in this

       if(message.answer != undefined){
         //join in this when get answer for asking question
         console.log("show4")
         this.clientMessageBox.push({'message':message.answer,'bot':message.bot,'send_by':message.send_by,'image_option':message.image_option});
       }else{
         console.log("show4")
         //join in this when admin chat back
         this.clientMessageBox.push({'message':message});
       }

        console.log(e)
      }
    },

     loadMessage(res){

      let data = res['allMessage']


      for(let i=0;i<data.length;i++){

        try {

          this.clientMessageBox.push(data[i])

        } catch (e) {

        }

      }
    },
    ...mapActions({
      getChatBaseQuestion:'ChatQuestion/getChatBaseQuestion',

      getChatRoomClient1:'Chat/getChatRoomClient1',

      sendMessageClient1:'Chat/sendMessageClient1'
    })
  },

  computed:{
    ...mapGetters({
      chat_question:'ChatQuestion/chat_question',
      chat_base_question:'ChatQuestion/chat_base_question',
      chat_room_client1:'Chat/chat_room_client1'
    })
  },

  beforeDestroy() {
    console.log("beforeDestroy")

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
    
    .question{
      .chat-left-card{
        float: left;


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
  }

  .show-message-admin{
    width: 100%;
    max-height: 300px;
    background-color: aquamarine;
  }
}
</style>



