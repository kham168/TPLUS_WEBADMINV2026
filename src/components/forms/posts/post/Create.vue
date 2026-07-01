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
              :href="lang.key"
              v-for="lang in $t('Post.Create.lang')"
              :key="lang.key"
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
                    <v-form  v-model="valid" ref="form" lazy-validation>
                     
                      <v-text-field
                      v-show="isLaoTab"
                        :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                        :label="$t('Post.Create.form.post_name')"
                        outlined
                        required
                        v-model="postName"
                      
                      ></v-text-field>
                        <v-text-field
                        v-show="isEngTab"
                        :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                        :label="$t('Post.Create.form.post_name')"
                        outlined
                        required
                        v-model="postNameEng"
                      
                      ></v-text-field>

                      <v-select
                        v-show="tab == 0"
                       :items="cate_post['data']"
                       item-text="name"
                      item-value="id"
                         :rules="[$myValidator.SelectValidate($t('Validate.required'))]"
                        v-model="catePostValue"
                        :label="$t('Post.Create.form.category')"
                        multiple
                        outlined
                        required
                      
                      ></v-select>

  
                        <v-select
                          v-show="tab == 0"
                      item-text="text"
                      item-value="value"
                        :items="$t('Post.status.item')"
                      
                        :label="$t('Post.Create.form.status')"
                        :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                        outlined
                        required
                        v-model="statusValue"
                        
                      ></v-select>



                      <vue-editor  v-if="isLaoTab" v-model="descriptionText" id="editor1" :editor-toolbar="customToolbar"  class="mb-10" ref="editor1" />

                      <vue-editor v-if="isEngTab" v-model="descriptionTextEng" id="editor2" :editor-toolbar="customToolbar" class="mb-10" ref="editor2" />


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
                      <v-btn plain @click="reset" class="mx-5">{{
                        $t("Post.Create.form.button.cancel")
                      }}</v-btn>
                      <v-btn :disabled="!valid" @click="submitForm" class="btn btn-create">
                        {{ $t("Post.Create.form.button.save") }}</v-btn
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
import { VueEditor } from "vue2-editor";
export default {
  name: "Create",

  components: { VueEditor },

  data() {
    return {
      descriptionText:this.$i18n.t('Post.Create.form.description'),
      descriptionTextEng:this.$i18n.t('Post.Create.form.description'),
      isLaoTab:false,
      isEngTab:false,
      postName:'',
      postNameEng:'',
      statusValue:'',
      catePostValue:[],
      uploadImage: [],
      uploadImageEng: [],
      previewImage: [],
      previewImageEng: [],
      tab: null,

      valid:true,

  dateStart: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateEnd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
  
 
      modalStart: false,
    modalEnd: false,

      customToolbar : [
        [{ 'font': [] }],
        [{ 'header': [false, 1, 2, 3, 4, 5, 6, ] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
        [{ 'header': 1 }, { 'header': 2 }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        // ['link', 'image', 'video', 'formula'],
        [{ 'direction': 'rtl' }],
        ['clean'],
      ]
   
    };
  },

  mounted() {
    this.checkTabLang('ລາວ')
  
    this.getCatePostAll()
  },

  methods: {

    checkTabLang(lang){

      if(lang == 'ລາວ' ||lang== 'Lao'){
        this.isLaoTab = true
        this.isEngTab = false

      }else{
         this.isLaoTab = false
         this.isEngTab = true

      }
    },
  

    onIncreaseImage(){
      
     this.$refs.uploader[0].click()
    },
    onIncreaseImageEng(){
      
     this.$refs.uploaderEng[0].click()
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

    submitForm () {
    this.$refs.form[0].validate();
    if(this.$refs.form[0].validate()){

      this.createPost({
                'newsCategoryId':this.catePostValue,
                'title': this.postName,
                'description':this.descriptionText,
                'status':this.statusValue,
                'other_lang_title':this.postNameEng,
                'other_lang_description':this.descriptionTextEng,
                'avatar':this.uploadImage[0],
                'avatar_EN':this.uploadImageEng[0]
      })
      console.log('create successful')
    }else{
       console.log('can not create')
    }
  },
   reset(){
    this.$router.back();
    this.$refs.form[0].reset();
  },

             ...mapActions({
getCatePostAll:'CatePost/getCatePostAll',
createPost:'Post/createPost'

        })
  },

  computed:{
    ...mapGetters({
        cate_post:'CatePost/cate_post',
    
        })
  }
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

