<template>
  <div class="modal-card">
    <v-form ref="form">
      <v-row>
        <label>Select Role</label>
        <v-col class="pa-0" cols="12" md="12" sm="12">
          <v-select
              outlined
              dense
              multiple
              :items="listRole"
              item-text="name"
              item-value="id"
              v-model="role_id"
          >
          </v-select>
        </v-col>
        <v-col class="pa-0" cols="12" md="12" sm="12" @click="addRoleUser">
          <v-btn>
            Create
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listRole: [],
      role_id: "",
      user_id: this.$route.params.user_id,
    }
  },
  methods: {
    fetchRole() {
      this.$axios.get(`roles`).then((res) => {
        if (res.status === 200) {
          this.listRole = res.data.data;
        }
      })
    },
    reset() {
      this.$refs.form.reset();
    },
    addRoleUser() {
      const roles = [];
      this.role_id.map((item) => {
        const roleId = {
          roleId: item
        }
        roles.push(roleId)
      })
      this.$axios.post(`users/${this.user_id}/roles`, roles).then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Success",
              message: this.$t('Notification.saveDataSuccess')
            })
          }, 300);
          this.$emit('close');
          this.$emit('success')
          this.reset();
        }
      })
    }
  },
  created() {
    this.fetchRole();
  }
}
</script>

<style scoped lang="scss">
.modal-card {
  width: 600px;
  min-height: 200px;
  padding: 30px 50px;
}
</style>
