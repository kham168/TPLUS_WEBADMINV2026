<template>
  <v-container>
    <div class="chat-room">
      <div class="chat-room-header">
        <div class="chat-room-profile">
          <img src="https://media.istockphoto.com/photos/millennial-male-team-leader-organize-virtual-workshop-with-employees-picture-id1300972574?b=1&k=20&m=1300972574&s=170667a&w=0&h=2nBGC7tr0kWIU8zRQ3dMg-C5JLo9H2sNUuDjQ5mlYfo=" alt="">
        </div>
        <div class="chat-room-name">
          <h3>0209988558</h3>
          <p class="chat-room-status">Active</p>
        </div>
      </div>
      <div class="chat-room-content">

      </div>
      <div class="chat-room-footer">
        <div class="input-chat" contenteditable="true">
        </div>
        <div class="btn-send-message">
          <i class="fal fa-paper-plane"></i>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Chatroom"
}
</script>

<style scoped lang="scss">
.chat-room {
  width: 100%;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 8px;
  overflow: hidden;

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
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .chat-room-name{
      padding-left: 10px;
      padding-top: 14px;
      .chat-room-status{
        color: rgba(76, 209, 55,1.0);
      }
    }
  }

  .chat-room-content {
    width: 100%;
    height: 60vh;
    overflow: auto;
    background: #ededed;
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
