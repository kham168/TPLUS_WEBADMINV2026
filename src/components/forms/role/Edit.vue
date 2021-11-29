<template>
  <div id="Create">
    <section class="logo-create">
      <div class="logo-form">
        <div class="form-title">
          <h1>{{ $t("Role.Edit.header") }}</h1>
        </div>
        <div class="lang-select-input">
          <v-tabs v-model="tab" color="primary" slider-color="primary">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
                :href="lang.key"
                v-for="lang in $t('Role.Create.lang')"
                :key="lang.key"
            >
              {{ lang }}
            </v-tab>
          </v-tabs>
          <div class="tab-content">
            <v-tabs-items v-model="tab">
              <v-tab-item
                  v-for="i in $t('Role.Create.lang')"
                  :key="i"
                  :value="i.key"
              >
                <div class="card-form">
                  <div class="form-content">
                    <v-form v-model="valid" ref="form" lazy-validation>
                      <v-text-field
                          :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                          :label="$t('Role.Create.form.name')"
                          outlined
                          required
                          v-model="roleItem.name"
                      ></v-text-field>
                      <v-textarea
                          outlined
                          :label="$t('Role.Create.form.description')"
                          v-model="roleItem.description"
                      ></v-textarea>
                    </v-form>
                    <div class="form-actions">
                      <v-btn plain @click="reset" class="mx-5">{{
                          $t("Role.Create.form.button.cancel")
                        }}
                      </v-btn>
                      <v-btn :disabled="!valid" @click="submitForm" class="btn btn-create">
                        {{ $t("Role.Create.form.button.save") }}
                      </v-btn
                      >
                    </div>
                  </div>
                </div>
              </v-tab-item>
            </v-tabs-items>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Create",

  data() {
    return {
      tab: null,
      valid: true,
      role_id: this.$route.query.role_id,
      roleItem: {},
    }
  },


  methods: {
    submitForm() {
      if (this.$refs.form[0].validate()) {
        this.saveChange();
      }
    },
    reset() {
      this.$router.back();
      this.$refs.form[0].reset();
    },
    saveChange() {
      const item = {
        name: this.roleItem.name,
        description: this.roleItem.description
      }
      this.$axios.put(`roles/${this.roleItem.id}`, item).then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Success",
              message: this.$t('Notification.saveDataSuccess')
            })
          }, 300);
          this.reset();
        }
      })
    }
  },
  created() {
    this.$store.dispatch("role/fetchRole", this.role_id).then((res) => {
      if (res.status === 200) {
        this.roleItem = res.data.data;
      }
    })
  }
};
</script>

<style lang="scss" scoped>


.logo-form {
  .form-title {
    width: 100%;
    padding: 0.5rem 0;

    h1 {
      font-size: 1.5rem;
      font-weight: 400;
      text-transform: uppercase;
    }
  }

  .lang-select-input {
    width: 100%;
    padding: 1rem 0;

    .tab-content {
      width: 100%;
      padding: 2rem 0;

      .card-form {
        width: 100%;
        padding: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;

        .form-content {
          width: 70%;

          .upload-image {
            width: 100%;
            height: 300px;
            border-radius: 0.3rem;
            position: relative;
            overflow: hidden;
            object-fit: cover;
            transition: all ease 0.5s;
            border: 1px solid $gray-color;

            .image {
              width: 100%;
              overflow: hidden;
              object-fit: cover;
            }

            .content {
              position: absolute;
              left: 0;
              right: 0;
              top: 45%;
              margin: auto;
              text-align: center;

              i.fa-plus-circle {
                font-size: 2rem;
                color: $black-color;
              }
            }

            .choose-file {
              position: absolute;
              left: 0;
              right: 0;
              top: 0;
              margin: auto;
              text-align: center;
              z-index: 1;
              width: 100%;
              height: 100%;
              cursor: pointer;
              outline: none;
              opacity: 0;
            }
          }

          .form-actions {
            width: 100%;
            padding: 1rem 0;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>

