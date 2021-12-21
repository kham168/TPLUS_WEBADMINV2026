<template>
  <div id="Create">
    <section class="data_package-create">
      <div class="data_package-form">
        <div class="form-title">
          <h1>{{ $t("DataPackage.Create.header") }}</h1>
        </div>
        <div class="lang-select-input">
          <v-tabs v-model="tab" color="primary" slider-color="primary">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
                v-for="lang in $t('DataPackage.Create.lang')"
                :key="lang.key"
                :href="lang.key"
                @click="checkTabLang(lang)"
            >
              {{ lang }}
            </v-tab>
          </v-tabs>
          <div class="tab-content">
            <v-tabs-items v-model="tab">
              <v-tab-item
                  v-for="i in $t('DataPackage.Create.lang')"
                  :key="i"
                  :value="i.key"
              >
                <div class="card-form">
                  <div class="form-content">
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                          v-show="isLaoTab"
                          v-model="code"
                          :label="$t('DataPackage.Create.form.code')"
                          :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                          outlined
                          required
                      ></v-text-field>
                      <v-text-field
                          v-show="isLaoTab"
                          v-model="name"
                          :label="$t('DataPackage.Create.form.data_package_name')"
                          :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                          outlined
                          required
                      ></v-text-field>
                      <v-text-field
                          v-show="isEngTab"
                          v-model="nameEng"
                          :label="$t('DataPackage.Create.form.data_package_name')"
                          :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                          outlined
                          required
                      ></v-text-field>




                      <div v-show="isLaoTab" >



                        <v-row justify="end" v-show="previewImage !== null ">
                          <v-btn
                              class="mx-2"
                              fab
                              dark
                              small
                              color="error"
                              @click="removeImage"
                          >
                            <v-icon dark>
                              mdi-close
                            </v-icon>
                          </v-btn>
                        </v-row>
                        <div class="upload-image mt-3">

                          <div class="content" v-show="previewImage === null">
                            <i class="fas fa-plus-circle"></i>
                            <h3>{{ $t("Post.Create.form.picture") }}</h3>

                          </div>
                          <img class="image-files" :src="previewImage" v-show="previewImage !== null"/>

                          <input

                              type="file"
                              class="choose-file"
                              name="upload-image"
                              accept="image/*"
                              @change="UploadImage"
                          />
                        </div>



                      </div>


                    </v-form>
                    <div class="form-actions">
                      <v-btn class="mx-5" plain @click="reset">{{
                          $t("DataPackage.Create.form.button.cancel")
                        }}
                      </v-btn>
                      <v-btn :disabled="!valid" class="btn btn-create" @click="submitForm">
                        {{ $t("DataPackage.Create.form.button.save") }}
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
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Create",

  data() {
    return {
      code:'',
      catePackageValue: '',
      name: '',
      nameEng: '',
      description: '',
      descriptionEng: '',
      tab: null,
      isLaoTab: false,
      isEngTab: false,
      uploadImage: null,

      previewImage: null,

      valid: true,
    };
  },

  mounted() {

    this.checkTabLang('ລາວ');
  },

  methods: {
    checkTabLang(lang) {
      console.log(lang)
      if (lang == 'ລາວ' || lang == 'Lao') {
        this.isLaoTab = true
        this.isEngTab = false
        console.log("lao" + this.isLaoTab)
        console.log(this.isEngTab)
      } else {
        this.isLaoTab = false
        this.isEngTab = true
        console.log("lao" + this.isLaoTab)
        console.log(this.isEngTab)
      }
    },


    UploadImage(e) {

      const img = e.target.files[0];


      this.uploadImage=img
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {

        this.previewImage=e.target.result;

      }


    },

    removeImage()
    {
      this.uploadImage = null;
      this.previewImage=null;
    },


    submitForm() {
      if (this.$refs.form[0].validate()) {
        this.createDataPackage({
          'code': this.code,
          'la_name': this.name,
          'en_name': this.nameEng,
          'avatar': this.uploadImage,
        })
      } else {
        console.log('can not create')
      }


    },
    reset() {
      this.$router.back();
      this.$refs.form[0].reset();
    },

    ...mapActions({
      createDataPackage: 'DataPackage/createDataPackage',

    })
  },

  computed: {
    ...mapGetters({

    })
  }
};
</script>

<style lang="scss" scoped>


.data_package-form {
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

          .image {

            max-width: 100%;
            overflow: hidden;
            object-fit: cover;


            .image-files {
              max-width: 100%;
              display: block;
              margin-left: auto;
              margin-right: auto;
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

