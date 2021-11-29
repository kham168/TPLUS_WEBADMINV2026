<template>
  <v-dialog
      v-model="modalShowAllPermission"
      width="500"
      persistent
      @close="setModalShowAllPermission(false)"
      transition="scroll-x-transition">
    <v-card class="main-card-delete">
      <v-card-actions class="card-action-delete" style="float: right;">
        <v-btn
            icon
            depressed
            @click="setModalShowAllPermission(false)"
        >
          <v-icon class="icon-style">{{ icon }}</v-icon>
        </v-btn>
      </v-card-actions>
      <div class="main-show">
        <div class="header">

        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  components: {},
  props: {
    visible: {
      default: false,
    },
    icon: {
      default: 'mdi-close',
      type: String
    },
    role_id: {}
  },
  data() {
    return {
      modalShowAllPermission: false,
      listPermission: [],
    }
  },

  methods: {
    setModalShowAllPermission(isVisible) {
      this.modalShowAllPermission = isVisible;
      this.$emit('change', isVisible);
    },

    // fetchPermissionRole() {
    //   this.$axios.get(`roles/${this.role_id}/permissions`).then((res) => {
    //     if (res.status === 200) {
    //       this.listPermission = res.data.data;
    //       console.log(this.listPermission)
    //     }
    //   })
    // }
  },
  watch: {
    visible(val) {
      this.modalShowAllPermission = val;
    },

  },
  created() {
   // this.fetchPermissionRole();
    console.log(this.role_id, 555555)

  }
}
</script>

<style scoped lang="scss">
.main-show {
  min-height: 600px;

  .header {
    width: 100%;
    height: 80px;
    background: red;
  }
}
</style>
