<template>
  <div class="modal-delete">
    <div class="delete-title">
      <span><i class="fas fa-exclamation-circle"></i> Are you sure?</span>
    </div>
    <div class="delete-btn">
      <v-btn outlined class="btn-cancel" @click="$emit('close')">
        Cancel
      </v-btn>
      <v-btn class="btn-delete" @click="deleteItem()" :loading="btnLoading">
        Delete
      </v-btn>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnLoading: false,
    }
  },
  props: {
    role_id: {},
    permissionRole_id: {},
  },
  methods: {
    deleteItem() {
      this.btnLoading = true
      this.$axios.delete(`roles/${this.role_id}/permissions/${this.permissionRole_id}`).then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            this.$emit('close');
            this.$emit('success');
            this.$store.dispatch({
              type: "action_Notifi_Success",
              message: this.$t('Notification.delDataSuccess')
            })
          }, 300);

        }
        this.btnLoading = false;
      }).catch((error) => {
        this.btnLoading = false;
        if (error.response.status === 400) {
          setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Error",
              message: this.$t('Notification.permissionError')
            })
          }, 300);
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
