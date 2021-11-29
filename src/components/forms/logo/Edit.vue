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
            <v-tabs-items v-model="tab" v-if="!tab">
              <v-tab-item
                  v-for="i in $t('Logo.Create.lang')"
                  :key="i"
                  :value="i.key"
              >
                <div class="card-form">
                  <div class="form-content">

                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                          :rules="[
                          $myValidator.SimpleValidate($t('Validate.required')),
                        ]"
                          :label="$t('Logo.Create.form.website_name')"
                          outlined
                          required
                          v-model="logoItem.siteName"
                      ></v-text-field>
                      <v-text-field
                          :rules="[
                          $myValidator.SimpleValidate($t('Validate.required')),
                        ]"
                          :label="$t('Logo.Create.form.email')"
                          outlined
                          required
                          v-model="logoItem.email"
                      ></v-text-field>
                      <v-textarea
                          outlined
                          :label="$t('Logo.Create.form.address')"
                          v-model="logoItem.address"
                      ></v-textarea>
                      <v-textarea
                          outlined
                          :label="$t('Logo.Create.form.description')"
                          v-model="logoItem.description"
                      ></v-textarea>
                      <div class="upload-image">
                        <div class="image">
                          <v-img :src="showImage || logoItem.websiteLogo" alt="cover"></v-img>
                        </div>
                        <div class="content" v-show="showImage == null">
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
                        }}
                      </v-btn>
                      <!--                      <v-btn-->
                      <!--                          :disabled="!valid"-->
                      <!--                          @click="submitForm"-->
                      <!--                          class="btn btn-create"-->
                      <!--                      >-->
                      <!--                        {{ $t("Logo.Create.form.button.save") }}-->
                      <!--                      </v-btn-->
                      <!--                      >-->
                    </div>
                  </div>
                </div>
              </v-tab-item>
            </v-tabs-items>
            <v-tabs-items v-model="tab" v-if="tab">
              <v-tab-item
                  v-for="i in $t('Logo.Create.lang')"
                  :key="i"
                  :value="i.key"
              >
                <div class="card-form">
                  <div class="form-content">

                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                          :rules="[
                          $myValidator.SimpleValidate($t('Validate.required')),
                        ]"
                          :label="$t('Logo.Create.form.website_name')"
                          outlined
                          required
                          v-model="logoItem.SiteInfoTrans[0].siteName"

                      ></v-text-field>
                      <v-textarea
                          outlined
                          :label="$t('Logo.Create.form.address')"
                          v-model="logoItem.SiteInfoTrans[0].address"
                      ></v-textarea>
                      <v-textarea
                          outlined
                          :label="$t('Logo.Create.form.description')"
                          v-model="logoItem.SiteInfoTrans[0].description"
                      ></v-textarea>
                      <div class="upload-image">
                        <div class="image">
                          <v-img :src="showImageEn || logoItem.SiteInfoTrans[0].websiteLogo" alt="cover"></v-img>
                        </div>
                        <div class="content" v-show="showImageEn == null">
                          <i class="fas fa-plus-circle"></i>
                          <h3>{{ $t("Logo.Create.form.website_logo") }}</h3>
                        </div>
                        <input
                            type="file"
                            class="choose-file"
                            name="upload-image"
                            accept="image/*"
                            @change="UploadImageEn"
                        />
                      </div>
                    </v-form>
                    <div class="form-actions">
                      <v-btn plain @click="reset" class="mx-5">{{
                          $t("Logo.Create.form.button.cancel")
                        }}
                      </v-btn>
                      <v-btn
                          :disabled="!valid"
                          @click="submitForm"
                          class="btn btn-create"
                      >
                        {{ $t("Logo.Create.form.button.save") }}
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
  name: "Edit",

  data() {
    return {
      tab: null,
      imageFile: null,
      showImage: null,
      imageFileEn: null,
      showImageEn: null,
      valid: true,
      logoItem: [],
      logoId: this.$route.query.logo_id,
    };
  },

  methods: {
    UploadImage(e) {
      const input = e.target;
      if (input.files && input.files[0]) {
        this.imageFile = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.showImage = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },

    UploadImageEn(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        this.imageFileEn = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.showImageEn = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    submitForm() {
      if (this.$refs.form[0].validate()) {
        this.saveItems();
      }
    },
    reset() {
      this.$router.back();
      this.$refs.form.reset();
    },

    saveItems() {
      const formData = new FormData();
      formData.append('siteName', this.logoItem.siteName);
      formData.append("address", this.logoItem.address)
      formData.append("email", this.logoItem.email);
      formData.append("facebook", this.logoItem.facebook);
      formData.append("description", this.logoItem.description);
      if (this.imageFile) {
        formData.append("avatar", this.imageFile);
      }
      if (this.imageFileEn) {
        formData.append("avatar_EN", this.imageFileEn);
      }
      this.logoItem.SiteInfoTrans.map((item) => {
        const logoItemEn = {
          siteName: item.siteName,
          description: item.description,
          address: item.address,
          language_id: item.languageId,
        }
        formData.append("other_lang[0][siteName]", logoItemEn.siteName);
        formData.append("other_lang[0][description]", logoItemEn.description)
        formData.append("other_lang[0][address]", logoItemEn.address)
        formData.append("other_lang[0][language_id]", logoItemEn.language_id)
      });

      this.$axios.put(`siteInfo/${this.logoItem.id}`, formData).then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            this.$store.dispatch({
              type: "action_Notifi_Success",
              message: this.$t('Notification.saveDataSuccess')
            })
          }, 300);
          this.reset();
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },

  created() {
    this.$store.dispatch("logo/fetchLogoItem", this.logoId).then((res) => {
      if (res.status === 200) {
        this.logoItem = res.data.data;

      }
    });

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
