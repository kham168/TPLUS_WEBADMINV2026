<template>
  <div class="modal-card">
    <v-form ref="form">
      <v-row>
        <!--        <label>Select Permission</label>-->
        <v-col class="pa-0" cols="12" md="12" sm="12">
          <v-select
              v-model="selectedAllPermission"
              :items="listPermission"
              item-text="name"
              item-value="id"
              label="Select Permission"
              multiple
              outlined
          >
            <template v-slot:prepend-item>
              <v-list-item
                  ripple
                  @click="toggle"
              >
                <v-list-item-action>
                  <v-icon :color="selectedAllPermission.length > 0 ? 'indigo darken-4' : ''">
                    {{ icon }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Select All
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider>
            </template>
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
      permission_id: "",
      selectedAllPermission: [],
    }
  },
  computed: {
    selectAllPermissions() {
      return this.selectedAllPermission.length === this.listPermission.length
    },
    selectSomePermission() {
      return this.selectedAllPermission.length > 0 && !this.selectAllPermissions
    },
    icon() {
      if (this.selectAllPermissions) return 'mdi-close-box'
      if (this.selectSomePermission) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },

  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.selectAllPermissions) {
          this.selectedAllPermission = []
        } else {
          this.selectedAllPermission = this.listPermission.slice()
        }
      })
    },

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
      this.selectedAllPermission.map((item) => {
        const permId = {
          permId: item.id || item
        }
        permission.push(permId);
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
