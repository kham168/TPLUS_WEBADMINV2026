<template>
  <div class="modal-card">
    <v-form ref="form">
      <v-row>
        <label>Select Permission</label>
        <v-col class="pa-0" cols="12" md="12" sm="12">
          <v-select
              outlined
              dense
              multiple
              :items="listPermission"
              item-text="name"
              item-value="id"
              v-model="permission_id"
          >
          </v-select>
        </v-col>
        <v-col class="pa-0" cols="12" md="12" sm="12" @click="addPermission">
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
  name: "addPermissionInRole",
  data() {
    return {
      listPermission: [],
      role_id: this.$route.params.role_id,
      permission_id: ""
    }
  },
  methods: {
    fetchPermission() {
      this.$axios.get(`permissions`).then((res) => {
        if (res.status === 200) {
          this.listPermission = res.data.data;
        }
      })
    },
    reset() {
      this.$refs.form.reset();
    },
    addPermission() {
      const permission = [];
      this.permission_id.map((item) => {
        const permId = {
          permId: item
        }
        permission.push(permId)
      })
      this.$axios.post(`roles/${this.role_id}/permissions`, permission).then((res) => {
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
    this.fetchPermission();
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
