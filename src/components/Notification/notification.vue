<template>
  <div class="notification">
    <v-snackbar
      v-model="$store.state.modalNotificationSuccess.snackbar"
      :timeout="timeout"
      top
      right
      elevation="5"
      class="Modal"
      transition="slide-x-transition"
      color="success"
    >
     {{$store.state.modalNotificationSuccess.message}}

    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Notification",
  data() {
    return {
      timeout:6000
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.notification {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  position: absolute;
  padding: 1rem 0;
}
</style>