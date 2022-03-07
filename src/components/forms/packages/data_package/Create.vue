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

                      <v-select
                          v-show="isLaoTab"
                          :items="package_type['data']"
                          item-text="type_name"
                          item-value="id"
                          :rules="[$myValidator.SelectValidate($t('Validate.required'))]"
                          v-model="PackageTypeValue"
                          :label="$t('DataPackage.Create.form.type')"
                          outlined
                          required

                      ></v-select>

                      <v-select
                          v-show="isEngTab"
                          :items="package_type['data']"
                          item-text="TypePackagTrans[0].type_name"
                          item-value="id"
                          :rules="[$myValidator.SelectValidate($t('Validate.required'))]"
                          v-model="PackageTypeValue"
                          :label="$t('DataPackage.Create.form.type')"
                          outlined
                          required

                      ></v-select>

                      <v-select
                          v-show="isLaoTab"
                          :items="cate_data_package['data']"
                          item-text="cateName"
                          item-value="id"
                          :rules="[$myValidator.SelectValidate($t('Validate.required'))]"
                          v-model="CateDataPackageValue"
                          :label="$t('DataPackage.Create.form.category')"
                          outlined
                          required

                      ></v-select>

                      <v-select
                          v-show="isEngTab"
                          :items="cate_data_package['data']"
                          item-text="CatePackageTrans[0].cateName"
                          item-value="id"
                          :rules="[$myValidator.SelectValidate($t('Validate.required'))]"
                          v-model="CateDataPackageValue"
                          :label="$t('DataPackage.Create.form.category')"
                          outlined
                          required

                      ></v-select>

                      <v-textarea
                          v-show="tab===0"
                          v-model="description"
                          outlined
                          :label="$t('DataPackage.Create.form.description')"
                      ></v-textarea>

                      <v-textarea
                          v-show="tab===1"
                          v-model="descriptionEng"
                          outlined
                          :label="$t('DataPackage.Create.form.description')"
                      ></v-textarea>

                      <div v-show="isLaoTab">

                        <div class="upload-image" v-if="previewImage[0] == null">

                          <div class="content" >
                            <i class="fas fa-plus-circle"></i>
                            <h3>{{ $t("Post.Create.form.picture") }}</h3>
                          </div>
                          <input


                              type="file"
                              class="choose-file"
                              name="upload-image"
                              accept="image/*"
                              @change="UploadImage"
                          />
                        </div>


                        <div class="image" v-else>


                              <div class="increase-decrease-image">
                                <v-btn
                                    class="mx-2"
                                    color="error"
                                    dark
                                    fab
                                    small
                                    @click="removeImage(0)"
                                >
                                  <v-icon dark>
                                    mdi-close
                                  </v-icon>
                                </v-btn>



                                <input
                                    ref="uploader"

                                    accept="image/*"
                                    class="d-none"

                                    type="file"
                                    @change="UploadImage"
                                />
                              </div>
                              <v-layout row >
                                <v-flex  :key="j" v-for="j in 1" align-self-center >

                                  <img class="image-files" :src="previewImage"  >

                                </v-flex>

                              </v-layout>


                        </div>
                      </div>

                      <div v-show="isEngTab">

                        <div class="upload-image" v-if="previewImageEng[0] == null">

                          <div class="content" >
                            <i class="fas fa-plus-circle"></i>
                            <h3>{{ $t("Post.Create.form.picture") }}</h3>
                          </div>

                          <input


                              type="file"
                              class="choose-file"
                              name="upload-image"
                              accept="image/*"
                              @change="UploadImageEng"
                          />
                        </div>


                        <div class="image" v-else>


                              <div class="increase-decrease-image">
                                <v-btn
                                    class="mx-2"
                                    color="error"
                                    dark
                                    fab
                                    small
                                    @click="removeImageEng(0)"
                                >
                                  <v-icon dark>
                                    mdi-close
                                  </v-icon>
                                </v-btn>



                                <input
                                    ref="uploaderEng"

                                    accept="image/*"
                                    class="d-none"

                                    type="file"
                                    @change="UploadImageEng"
                                />
                              </div>
                              <v-layout row >
                                <v-flex  :key="j" v-for="j in 1" align-self-center >

                                  <img class="image-files" :src="previewImageEng"  >

                                </v-flex>

                              </v-layout>



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
      PackageTypeValue: '',
      name: '',
      nameEng: '',
      description: '',
      descriptionEng: '',
      tab: null,
      isLaoTab: false,
      isEngTab: false,
      uploadImage: [],
      uploadImageEng: [],
      previewImage: [],
      previewImageEng: [],
      valid: true,
      CateDataPackageValue:'',
    };
  },

  mounted() {

    this.checkTabLang('ລາວ');
    this.getPackageType();
    this.getCateDataPackage();
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

      const img = e.target.files;

      for(let i = 0;i<img.length;i++){
        this.uploadImage.push(img[i])
        console.log(this.uploadImage)
        const reader = new FileReader();
        reader.readAsDataURL(img[i]);
        reader.onload = (e) => {

          this.previewImage.push(e.target.result);
          console.log(this.previewImage[i]);
        }

      };
    },

    UploadImageEng(e) {

      const img = e.target.files;

      for(let i = 0;i<img.length;i++){
        this.uploadImageEng.push(img[i])
        const reader = new FileReader();
        reader.readAsDataURL(img[i]);
        reader.onload = (e) => {

          this.previewImageEng.push(e.target.result);
          console.log(this.previewImageEng[i]);
        }

      };
    },

    removeImage(index){
      this.uploadImage.splice(index,1);
      this.previewImage.splice(index, 1);
    },
    removeImageEng(index){
      this.uploadImageEng.splice(index,1);
      this.previewImageEng.splice(index, 1);
    },


    submitForm() {
      if (this.$refs.form[0].validate()) {
        this.createDataPackage({
          'code': this.code,
          'la_name': this.name,
          'en_name': this.nameEng,
          'avatar': this.uploadImage,
          'avatarEN':this.uploadImageEng,
          'typePackage_Id':this.PackageTypeValue,
          'catePackage_Id':this.CateDataPackageValue,
          'detail':this.description,
          'detailEN':this.descriptionEng
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
      getPackageType:'PackageType/getPackageType',
      getCateDataPackage:'CateDataPackage/getCateDataPackage'
    })
  },

  computed: {
    ...mapGetters({
      package_type:'PackageType/package_type',
      cate_data_package:'CateDataPackage/cate_data_package'
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


            overflow: hidden;
            object-fit: cover;



            .image-files{
              max-width: 100%;
              max-height: 100%;
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

