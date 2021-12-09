<template>
  <div id="Create">
    <section class="post-create">
      <div class="post-form">
        <div class="form-title">
          <h1>{{ $t("Post.Create.header") }}</h1>
        </div>
        <div class="lang-select-input">
          <v-tabs v-model="tab" color="primary" slider-color="primary">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
                v-for="lang in $t('Post.Create.lang')"
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
                  v-for="i in $t('Post.Create.lang')"
                  :key="i"
                  :value="i.key"

              >
                <div class="card-form">
                  <div class="form-content">
                    <v-form ref="form" v-model="valid" lazy-validation>

                      <v-text-field
                          v-show="isLaoTab"
                          v-model="postName"
                          :label="$t('Post.Create.form.post_name')"
                          :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                          outlined
                          required

                      ></v-text-field>
                      <v-text-field
                          v-show="isEngTab"
                          v-model="postNameEng"
                          :label="$t('Post.Create.form.post_name')"
                          :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                          outlined
                          required

                      ></v-text-field>

                      <v-select
                          v-show="tab == 0"
                          v-model="catePostValue"
                          :items="cate_post_item"
                          :label="$t('Post.Create.form.category')"
                          :rules="[$myValidator.SelectValidate($t('Validate.required'))]"
                          item-text="name"
                          item-value="id"

                          outlined
                          required

                      ></v-select>


                      <v-dialog

                          ref="dialogStart"
                          v-model="modalStart"
                          :return-value.sync="dateStart"
                          persistent
                          width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-show="tab == 0"
                              v-model="dateStart"
                              :label="$t('Post.Create.form.start_date')"
                              :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"

                              outlined
                              prepend-inner-icon="mdi-calendar"
                              readonly

                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="dateStart"
                            locale="lo-LA"
                            scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                              color="primary"
                              text
                              @click="modalStart = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                              color="primary"
                              text
                              @click="$refs.dialogStart[0].save(dateStart)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>


                      <v-dialog
                          ref="dialogEnd"
                          v-model="modalEnd"
                          :return-value.sync="dateEnd"
                          persistent
                          width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-show="tab == 0"
                              v-model="dateEnd"
                              :label="$t('Post.Create.form.end_date')"
                              :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"

                              outlined
                              prepend-inner-icon="mdi-calendar"
                              readonly

                              v-bind="attrs"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="dateEnd"
                            locale="lo-LA"
                            scrollable
                        >
                          <v-spacer></v-spacer>
                          <v-btn
                              color="primary"
                              text
                              @click="modalEnd = false"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                              color="primary"
                              text
                              @click="$refs.dialogEnd[0].save(dateEnd)"
                          >
                            OK
                          </v-btn>
                        </v-date-picker>
                      </v-dialog>

                      <v-select
                          v-show="tab == 0"
                          v-model="statusValue"
                          :items="$t('Post.status.item')"
                          :label="$t('Post.Create.form.status')"

                          :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                          item-text="text"
                          item-value="value"
                          outlined
                          required

                      ></v-select>

                      <v-textarea
                          v-show="isLaoTab"
                          v-model="descriptionText"
                          :label="$t('Post.Create.form.description')"
                          outlined
                      ></v-textarea>

                      <v-textarea
                          v-show="isEngTab"
                          v-model="descriptionTextEng"

                          :label="$t('Post.Create.form.description')"
                          outlined
                      ></v-textarea>

                      <div v-show="isLaoTab">

                        <div v-if="previewImage[0] == null" class="upload-image">

                          <div class="content">
                            <i class="fas fa-plus-circle"></i>
                            <h3>{{ $t("Post.Create.form.picture") }}</h3>
                          </div>
                          <input
                              accept="image/*"

                              class="choose-file"
                              multiple
                              name="upload-image"
                              type="file"
                              @change="UploadImage"
                          />
                        </div>


                        <div v-else class="image">
                          <v-carousel height="100%">
                            <v-carousel-item v-for="(imageFiles,index) in previewImage" :key="index">
                              <div class="increase-decrease-image">
                                <v-btn
                                    class="mx-2"
                                    color="primary"
                                    dark
                                    fab
                                    small
                                    @click="removeImage(index)"
                                >
                                  <v-icon dark>
                                    mdi-minus
                                  </v-icon>
                                </v-btn>


                                <v-btn
                                    class="mx-2"
                                    color="success"
                                    dark
                                    fab
                                    small
                                    @click="onIncreaseImage"
                                >
                                  <v-icon dark>
                                    mdi-plus
                                  </v-icon>
                                </v-btn>
                                <input
                                    ref="uploader"

                                    accept="image/*"
                                    class="d-none"
                                    multiple
                                    type="file"
                                    @change="UploadImage"
                                />
                              </div>
                              <v-layout row>
                                <v-flex v-for="j in 1" :key="j" align-self-center>

                                  <img :src="imageFiles" class="image-files">

                                </v-flex>

                              </v-layout>
                            </v-carousel-item>
                          </v-carousel>

                        </div>
                      </div>

                      <div v-show="isEngTab">

                        <div v-if="previewImageEng[0] == null" class="upload-image">

                          <div class="content">
                            <i class="fas fa-plus-circle"></i>
                            <h3>{{ $t("Post.Create.form.picture") }}</h3>
                          </div>
                          <input
                              accept="image/*"

                              class="choose-file"
                              multiple
                              name="upload-image"
                              type="file"
                              @change="UploadImageEng"
                          />
                        </div>


                        <div v-else class="image">
                          <v-carousel height="100%">
                            <v-carousel-item v-for="(imageFilesEng,index) in previewImageEng" :key="index">
                              <div class="increase-decrease-image">
                                <v-btn
                                    class="mx-2"
                                    color="primary"
                                    dark
                                    fab
                                    small
                                    @click="removeImageEng(index)"
                                >
                                  <v-icon dark>
                                    mdi-minus
                                  </v-icon>
                                </v-btn>


                                <v-btn
                                    class="mx-2"
                                    color="success"
                                    dark
                                    fab
                                    small
                                    @click="onIncreaseImageEng"
                                >
                                  <v-icon dark>
                                    mdi-plus
                                  </v-icon>
                                </v-btn>
                                <input
                                    ref="uploaderEng"

                                    accept="image/*"
                                    class="d-none"
                                    multiple
                                    type="file"
                                    @change="UploadImageEng"
                                />
                              </div>
                              <v-layout row>
                                <v-flex v-for="j in 1" :key="j" align-self-center>

                                  <img :src="imageFilesEng" class="image-files">

                                </v-flex>

                              </v-layout>
                            </v-carousel-item>
                          </v-carousel>

                        </div>
                      </div>
                    </v-form>
                    <div class="form-actions">
                      <v-btn class="mx-5" plain @click="reset">{{
                          $t("Post.Create.form.button.cancel")
                        }}
                      </v-btn>
                      <v-btn :disabled="!valid" class="btn btn-create" @click="submitForm">
                        {{ $t("Post.Create.form.button.save") }}
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
      cate_post_item: [
        {"id": 1, "name": "ໂປຣໂມຊັນ",},
        {"id": 3, "name": "ກິດຈະກຳ"},
      ],
      descriptionText: '',
      descriptionTextEng: '',
      isLaoTab: false,
      isEngTab: false,
      postName: '',
      postNameEng: '',
      statusValue: '',
      catePostValue: '',
      uploadImage: [],
      uploadImageEng: [],
      tab: null,
      previewImage: [],
      previewImageEng: [],
      valid: true,

      dateStart: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateEnd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),


      modalStart: false,
      modalEnd: false,

    };
  },

  mounted() {
    this.checkTabLang('ລາວ')

    this.getCatePostAll()
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


    onIncreaseImage() {

      this.$refs.uploader[0].click()
    },
    onIncreaseImageEng() {

      this.$refs.uploaderEng[0].click()
    },


    UploadImage(e) {
      console.log('e')
      console.log(e)
      console.log('e.target.files')
      console.log(e.target.files)
      const img = e.target.files;

      for (let i = 0; i < img.length; i++) {

        this.uploadImage.push(img[i])
        const reader = new FileReader();
        reader.readAsDataURL(img[i]);
        reader.onload = (e) => {
          console.log(e);
          this.previewImage.push(e.target.result);
          console.log(this.previewImage[i]);
        }

      }
      ;
    },

    UploadImageEng(e) {

      const img = e.target.files;

      for (let i = 0; i < img.length; i++) {
        this.uploadImageEng.push(img[i])
        const reader = new FileReader();
        reader.readAsDataURL(img[i]);
        reader.onload = (e) => {

          this.previewImageEng.push(e.target.result);
          console.log(this.previewImageEng[i]);
        }

      }
      ;
    },

    removeImage(index) {
      this.uploadImage.splice(index, 1);
      this.previewImage.splice(index, 1);
    },
    removeImageEng(index) {
      this.uploadImageEng.splice(index, 1);
      this.previewImageEng.splice(index, 1);
    },

    submitForm() {
      this.$refs.form[0].validate();
      if (this.$refs.form[0].validate()) {

        this.createPromotionEvent({


          'title': this.postName,
          'description': this.descriptionText,
          'status': this.statusValue,
          'start_date': this.dateStart,
          'end_date': this.dateEnd,
          'other_lang_title': this.postNameEng,
          'other_lang_description': this.descriptionTextEng,

          'avatar': this.uploadImage,
          'avatar_EN': this.uploadImageEng
        })
        console.log('create successful')
      } else {
        console.log('can not create')
      }
    },
    reset() {
      this.$router.back();
      this.$refs.form[0].reset();
    },

    ...mapActions({

      createPromotionEvent: 'PromotionEvent/createPromotionEvent'

    })
  },

  computed: {}
};
</script>

<style lang="scss" scoped>


.post-form {
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

