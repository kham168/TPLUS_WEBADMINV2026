<template>
  <div class="modal-delete">
    <div class="delete-title">
      <span><i class="fas fa-exclamation-circle"></i> Are you sure?</span>
    </div>
    <div class="delete-btn">
      <v-btn outlined class="btn-cancel" @click="$emit('close')">
        Cancel
      </v-btn>
      <v-btn class="btn-delete" @click="deleteItem(job_id)" :loading="btnLoading">
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
    job_id: {}
  },
  methods: {
    deleteItem(job_id) {
      this.btnLoading = true
      this.$axios.delete(`jobRecuit/${job_id}`).then((res) => {
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
        console.log(error);
        this.btnLoading = false;
        if (error.response.data.error.status === 400) {
          this.$store.dispatch({
            type: "action_Notifi_Error",
            message: `${error.response.data.error.message}`
          })
        }

      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
