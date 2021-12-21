<template>
  <div id="Create">
    <section class="banner-create">
      <div class="banner-form">
        <div class="form-title">
          <h1>{{ $t("Banner.Create.header") }}</h1>
        </div>
        <div class="lang-select-input">
          <v-tabs v-model="tab" color="primary" slider-color="primary">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
              :href="lang.key"
              v-for="lang in $t('Banner.Create.lang')"
              :key="lang.key"
               @click="checkTabLang(lang)"
            >
              {{ lang }}
            </v-tab>
          </v-tabs>
          <div class="tab-content">
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="i in $t('Banner.Create.lang')"
                :key="i"
                :value="i.key"
              >
                <div class="card-form" >
                  <div class="form-content">
                    <v-form  v-model="valid" ref="form" lazy-validation>
                  
                      <v-text-field
                       v-show="isLaoTab"
                         v-model="bannerName"
                        :rules="[
                        $myValidator.SimpleValidate($t('Validate.required')),
                        $myValidator.MinlengthValidate($t('Validate.minmessage'),2)
                        ]"
                        :label="$t('Banner.Create.form.banner_name')"
                        outlined
                        required
                      ></v-text-field>

                       <v-text-field
                      v-show="isEngTab"
                      v-model="bannerNameEng"
                        :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                        :label="$t('Banner.Create.form.banner_name')"
                        outlined
                        required
                      ></v-text-field>

                      <v-text-field
                      v-show="isLaoTab"
                         v-model="link"
                        :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                        :label="$t('Banner.Create.form.link')"
                        outlined
                        required
                      ></v-text-field>

                      <v-text-field
                      v-show="isEngTab"
                         v-model="linkEng"
                        :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                        :label="$t('Banner.Create.form.link')"
                        outlined
                        required
                      ></v-text-field>

                      <v-textarea
                      v-show="isLaoTab"
                         v-model="description"
                        outlined
                        :label="$t('Banner.Create.form.description')"
                      ></v-textarea>

                       <v-textarea
                      v-show="isEngTab"
                         v-model="descriptionEng"
                        outlined
                        :label="$t('Banner.Create.form.description')"
                      ></v-textarea>



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

                      <div v-show="isEngTab" >

                        <v-row justify="end" v-show="previewImageEng !== null">
                          <v-btn
                              class="mx-2"
                              fab
                              dark
                              small
                              color="error"
                              @click="removeImageEng"
                          >
                            <v-icon dark>
                              mdi-close
                            </v-icon>
                          </v-btn>
                        </v-row>
                        <div class="upload-image mt-3">

                          <div class="content" v-show="previewImageEng === null">
                            <i class="fas fa-plus-circle"></i>
                            <h3>{{ $t("Post.Create.form.picture") }}</h3>

                          </div>
                          <img class="image-files" :src="previewImageEng" v-show="previewImageEng !== null"/>
                          <input

                              type="file"
                              class="choose-file"
                              name="upload-image"
                              accept="image/*"
                              @change="UploadImageEng"
                          />
                        </div>



                      </div>

                    </v-form>
                    <div class="form-actions">
                      <v-btn plain @click="reset" class="mx-5">{{
                        $t("Banner.Create.form.button.cancel")
                      }}</v-btn>
                      <v-btn :disabled="!valid" @click="submitForm" class="btn btn-create">
                        {{ $t("Banner.Create.form.button.save") }}</v-btn
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
import {mapActions,mapGetters} from 'vuex'
export default {
  name: "Create",

  data() {
    return {
      bannerName:'',
      bannerNameEng:'',
      link:'',
      linkEng:'',
      description:'',
      descriptionEng:'',
      uploadImage:[],
      uploadImageEng:[],
       isLaoTab:false,
      isEngTab:false,
      tab: null,
      previewImage: null,
       previewImageEng: null,
      valid:true,
    };
  },

  mounted() {
     this.checkTabLang('ລາວ')
  },

  methods: {

    removeImage()
    {
      this.uploadImage = null;
      this.previewImage=null;
    },

    removeImageEng()
    {
      this.uploadImageEng = null;
      this.previewImageEng=null;
    },

    checkTabLang(lang){
      console.log(lang)
      if(lang == 'ລາວ' ||lang== 'Lao'){
        this.isLaoTab = true
        this.isEngTab = false
        console.log("lao"+this.isLaoTab)
         console.log(this.isEngTab)
      }else{
         this.isLaoTab = false
         this.isEngTab = true
            console.log("lao"+this.isLaoTab)
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

    UploadImageEng(e) {

      const img = e.target.files[0];
      this.uploadImageEng=img
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (e) => {

        this.previewImageEng=e.target.result;

      }
    },

    submitForm () {
    console.log(this.$refs.form[0].validate())
    if(this.$refs.form[0].validate()){
      this.createBanner({
    
        'ban_name':this.bannerName,
        'link':this.link,
        'description':this.description,
        'other_lang_ban_name':this.bannerNameEng,
        'other_lang_link':this.linkEng,
        'other_lang_description':this.descriptionEng,
        'avatar':this.uploadImage,
        'avatar_EN':this.uploadImageEng
      })

      
       console.log("create successful")
    }else{
      console.log("can not create")
    }

  },
   reset(){
    this.$router.back();
    this.$refs.form[0].reset();
  },

    ...mapActions({
      createBanner:'Banner/createBanner'
    })

  },
};
</script>

<style lang="scss" scoped>


  .banner-form {
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
                width: 720px;
                height: 300px;
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
              .image-files{
                max-height: 100%;
                max-width: 100%;
                display: block;
                margin-left: auto;
                margin-right: auto;


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

               

                    .image-files{
                    max-width: 100%;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                  }

                
                  
              }

               .image {
              
                max-width: 100%;
                overflow: hidden;
                object-fit: cover;

               

                    .image-files{
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

