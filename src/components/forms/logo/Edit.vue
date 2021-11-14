<template>
  <div id="Edit">
    <section class="logo-edit">
      <div class="logo-form">
        <div class="form-title">
          <h1>{{ $t("Logo.Edit.header") }}</h1>
        </div>
        <div class="lang-select-input">
          <v-tabs v-model="tab" color="primary" slider-color="primary">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
              :href="lang.key"
              v-for="lang in $t('Logo.Create.lang')"
              :key="lang.key"
            >
              {{ lang }}
            </v-tab>
          </v-tabs>
          <div class="tab-content">
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="i in $t('Logo.Create.lang')"
                :key="i"
                :value="i.key"
              >
                <div class="card-form">
                  <div class="form-content">
                    <v-form v-model="valid" ref="form" lazy-validation>
                      
                      <v-text-field
                        :rules="[
                          $myValidator.SimpleValidate($t('Validate.required')),
                        ]"
                        :label="$t('Logo.Create.form.website_name')"
                        outlined
                        required
                      ></v-text-field>
                       <v-text-field
                        :rules="[
                          $myValidator.SimpleValidate($t('Validate.required')),
                        ]"
                        :label="$t('Logo.Create.form.email')"
                        outlined
                        required
                      ></v-text-field>
                       <v-textarea
                        outlined
                        :label="$t('Logo.Create.form.address')"
                      ></v-textarea>
                      <v-textarea
                        outlined
                        :label="$t('Logo.Create.form.description')"
                      ></v-textarea>
                      <div class="upload-image">
                        <div class="image">
                          <v-img :src="previewImage" alt="cover"></v-img>
                        </div>
                        <div class="content" v-show="previewImage == null">
                          <i class="fas fa-plus-circle"></i>
                          <h3>{{ $t("Logo.Create.form.website_logo") }}</h3>
                        </div>
                        <input
                          type="file"
                          class="choose-file"
                          name="upload-image"
                          accept="image/*"
                          @change="UploadImage"
                        />
                      </div>
                    </v-form>
                    <div class="form-actions">
                      <v-btn plain @click="reset" class="mx-5">{{
                        $t("Logo.Create.form.button.cancel")
                      }}</v-btn>
                      <v-btn
                        :disabled="!valid"
                        @click="submitForm"
                        class="btn btn-create"
                      >
                        {{ $t("Logo.Create.form.button.save") }}</v-btn
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
  name: "Edit",

  data() {
    return {
      tab: null,
      previewImage: null,
      valid: true,
    };
  },

  mounted() {},

  methods: {
       UploadImage(e) {
      const img = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },

    submitForm () {
    this.$refs.form.validate();
  },
   reset(){
    this.$router.back();
    this.$refs.form.reset();
  }
  },
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