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
                      <v-select
                        v-show="tab == 0"
                       :items="cate_post['data']"
                       item-text="name"
                      item-value="id"
                        
                        v-model="catePostValue"
                        :label="$t('Post.Create.form.category')"
                        
                        outlined
                        required
                      
                      ></v-select>
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
            :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
             :label="$t('Post.Create.form.start_date')"
              outlined

            v-model="dateStart"
           prepend-inner-icon="mdi-calendar"
            readonly
           
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateStart"
          scrollable
           locale="lo-LA"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modalStart = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
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
            :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
            :label="$t('Post.Create.form.end_date')"
            outlined

            v-model="dateEnd"
            prepend-inner-icon="mdi-calendar"
            readonly
            
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateEnd"
          scrollable
         locale="lo-LA"
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modalEnd = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialogEnd[0].save(dateEnd)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
  
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

                      <v-textarea
                      v-show="isLaoTab"
                        outlined
                        :label="$t('Post.Create.form.description')"
                        v-model="descriptionText"
                      ></v-textarea>

                      <v-textarea
                      v-show="isEngTab"
                        outlined
                      
                        :label="$t('Post.Create.form.description')"
                        v-model="descriptionTextEng"
                      ></v-textarea>
                    
                    <div v-show="isLaoTab">
                      
                        <div class="upload-image" v-if="previewImage[0] == null">
                       
                        <div class="content" >
                          <i class="fas fa-plus-circle"></i>
                          <h3>{{ $t("Post.Create.form.picture") }}</h3>
                        </div>
                        <input
                         multiple
                        
                          type="file"
                          class="choose-file"
                          name="upload-image"
                          accept="image/*"
                          @change="UploadImage"
                        />
                      </div>


                      <div class="image" v-else>
                          <v-carousel height="100%">
                            <v-carousel-item :key="index" v-for="(imageFiles,index) in previewImage">
                              <div class="increase-decrease-image">
                                 <v-btn
                                  class="mx-2"
                                  fab
                                  dark
                                  small
                                  color="primary"
                                  @click="removeImage(index)"
                                >
                                  <v-icon dark>
                                    mdi-minus
                                  </v-icon>
                                </v-btn>


                                 <v-btn
                                  class="mx-2"
                                  fab
                                  dark
                                  small
                                  color="success"
                                  @click="onIncreaseImage"
                                >
                                  <v-icon dark>
                                    mdi-plus
                                  </v-icon>
                                </v-btn>
                                 <input
                         multiple
                         
                          type="file"
                           class="d-none"
                           ref="uploader"
                          accept="image/*"
                          @change="UploadImage"
                        />
                        </div>
                              <v-layout row >
                                <v-flex  :key="j" v-for="j in 1" align-self-center >

                                     <img class="image-files" :src="imageFiles"  >

                                </v-flex>
                               
                              </v-layout>
                            </v-carousel-item>
                          </v-carousel>
                          
                        </div>
                      </div>    
                  
                   <div v-show="isEngTab">
                      
                        <div class="upload-image" v-if="previewImageEng[0] == null">
                       
                        <div class="content" >
                          <i class="fas fa-plus-circle"></i>
                          <h3>{{ $t("Post.Create.form.picture") }}</h3>
                        </div>
                        <input
                         multiple
                        
                          type="file"
                          class="choose-file"
                          name="upload-image"
                          accept="image/*"
                          @change="UploadImageEng"
                        />
                      </div>


                      <div class="image" v-else>
                          <v-carousel height="100%">
                            <v-carousel-item :key="index" v-for="(imageFilesEng,index) in previewImageEng">
                              <div class="increase-decrease-image">
                                 <v-btn
                                  class="mx-2"
                                  fab
                                  dark
                                  small
                                  color="primary"
                                  @click="removeImageEng(index)"
                                >
                                  <v-icon dark>
                                    mdi-minus
                                  </v-icon>
                                </v-btn>


                                 <v-btn
                                  class="mx-2"
                                  fab
                                  dark
                                  small
                                  color="success"
                                  @click="onIncreaseImageEng"
                                >
                                  <v-icon dark>
                                    mdi-plus
                                  </v-icon>
                                </v-btn>
                                 <input
                         multiple
                         
                          type="file"
                           class="d-none"
                           ref="uploaderEng"
                          accept="image/*"
                          @change="UploadImageEng"
                        />
                        </div>
                              <v-layout row >
                                <v-flex  :key="j" v-for="j in 1" align-self-center >

                                     <img class="image-files" :src="imageFilesEng"  >

                                </v-flex>
                               
                              </v-layout>
                            </v-carousel-item>
                          </v-carousel>
                          
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

export default {
  name: "Create",

  data() {
    return {
      descriptionText:'',
      descriptionTextEng:'',
      isLaoTab:false,
      isEngTab:false,
      postName:'',
      postNameEng:'',
      statusValue:'',
      catePostValue:'',
      uploadImage:[],
      uploadImageEng:[],
      tab: null,
      previewImage: [],
       previewImageEng: [],
      valid:true,

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
  

    onIncreaseImage(){
      
     this.$refs.uploader[0].click()
    },
    onIncreaseImageEng(){
      
     this.$refs.uploaderEng[0].click()
    },
   

    UploadImage(e) {
      console.log('e')
       console.log(e)
         console.log('e.target.files')
       console.log(e.target.files)
      const img = e.target.files;

      for(let i = 0;i<img.length;i++){

        this.uploadImage.push(img[i])
        const reader = new FileReader();
        reader.readAsDataURL(img[i]);
        reader.onload = (e) => {
         console.log(e);
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
      this.previewImage.splice(index, 1);
    },
    removeImageEng(index){
      this.previewImageEng.splice(index, 1);
    },

    submitForm () {
    this.$refs.form[0].validate();
    if(this.$refs.form[0].validate()){

      this.createPost({
      
         'post_type_id':this.catePostValue,
                'title': this.postName,
                'description':this.descriptionText,
                'status':this.statusValue,
                'start_date':this.dateStart,
                'end_date':this.dateEnd,
                'other_lang_title':this.postNameEng,
                'other_lang_description':this.descriptionTextEng,
               
                'avatar':this.uploadImage,
                'avatar_EN':this.uploadImageEng
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

