<template>
  <div id="Addrole">
    <div class="role-container">
      <v-dialog v-model="$store.state.roleDialog" max-width="600px" persistent dialog-transition>
        <template v-slot:default="">
          <div class="role-dialog">
            <div class="header role-header">
              <h3>{{ $t("Role.Create.header") }}</h3>
              <v-btn @click="$store.commit('IncrementRole')" icon>
                <v-icon>far fa-times-circle</v-icon>
              </v-btn>
            </div>
            <div class="role-content">
              <div class="form">
                <v-form ref="form" lazy-validation v-model="valid">
                  <v-text-field
                    :label="$t('Role.Create.form.userrole')"
                    required
                    :rules="[
                      $myValidator.SimpleValidate($t('Validate.required')),
                    ]"
                    outlined
                  ></v-text-field>
                  <v-text-field
                    :label="$t('Role.Create.form.role')"
                    required
                    :rules="[
                      $myValidator.SimpleValidate($t('Validate.required')),
                    ]"
                    outlined
                  ></v-text-field>
                  <v-select
                    :items="items"
                    v-model="value"
                    :label="$t('Role.Create.form.permission')"
                    required
                    :rules="[
                      $myValidator.SimpleValidate($t('Validate.required')),
                    ]"
                    outlined
                  ></v-select>
                </v-form>
                <div class="role-actions">
                  <v-btn :disabled="!valid" @click="submitForm">
                    {{ $t("Role.Create.form.button.save") }}
                  </v-btn>
                </div>
              </div>
            </div>
          </div>
        </template>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "Addrole",
  data() {
    return {
      valid: true,
    };
  },

  created() {
      console.log(this.mydialog);
  },
  

  mounted() {},

  methods: {
    submitForm() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style lang="scss" scoped>
.role-dialog {
  width: 100%;
  background-color: $gray-color-light;

  .role-header {
    width: 100%;
    background-color: $primary-color;

    .fa-times-circle {
      color: $black-color;
    }
  }
  .role-content {
    width: 100%;
    background-color: $white-color;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;

    .form {
      width: 80%;

      .role-actions {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
}
</style>