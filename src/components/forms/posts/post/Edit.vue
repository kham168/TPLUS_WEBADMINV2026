<template>
  <div id="Edit">
    <section class="post-edit">
      <div class="post-form">
        <div class="form-title">
          <h1>{{ $t("Post.Edit.header") }}</h1>
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
                    <v-form v-model="valid" ref="form" lazy-validation>
                 
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
                        v-if="false"
                       :items="cate_post['data']"
                       item-text="name"
                      item-value="id"
                        
                        v-model="catePostValue"
                        :label="$t('Post.Create.form.category')"
                        :rules="[$myValidator.SelectValidate($t('Validate.required'))]"
                        outlined
                        required
                      
                      ></v-select>
  
                        <v-select
                          v-show="tab == 0"
                      item-text="text"
                      item-value="value"
                        :items="$t('Post.status.item')"
                      
                        :label="$t('Post.Create.form.status')"
                          multiple
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
                      <v-btn
                        :disabled="!valid"
                        @click="submitForm"
                        class="btn btn-create"
                      >
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
import {mapActions,mapGetters} from 'vuex'
export default {
  name: "Edit",

  data() {
    return {
        isLaoTab:false,
      isEngTab:false,
      postId:0,
       descriptionText:'',
      descriptionTextEng:'',
      postName:'',
      postNameEng:'',
      statusValue:'',
      catePostValue:[],
         uploadImage: [],
       uploadImageEng: [],
      previewImage: [],
       previewImageEng: [],

         dateStart: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateEnd: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    modalStart: false,
    modalEnd: false,

      tab: null,
  
      valid: true,
    };
  },

  created(){
  
    this.getPostOne({'post_id':this.$route.params.post_id}).then(res=>{
      if(res.success){
    this.loadDataToComponent(res);
      }
    });
  },
  mounted() {

    this.getCatePostAll();
    this.checkTabLang('ລາວ');


  },

  methods: {

 async convertUrlToFileImage(image) {
  const response = await fetch(image);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], image.split('/').pop(), {type: blob.type});
 
  this.uploadImage.push(file)
},

 async convertUrlToFileImageEng(image) {
  const response = await fetch(image);
  // here image is url/location of image
  const blob = await response.blob();
  const file = new File([blob], image.split('/').pop(), {type: blob.type});
 
  this.uploadImageEng.push(file)
},

    loadDataToComponent(res){

    let data = res.data;
       

            this.postId=data.id,
      this.descriptionText=data.description,
      this.descriptionTextEng=data.PostTrans[0].description,
      this.postName=data.title,
      this.postNameEng=data.PostTrans[0].title,
      this.statusValue=data.status,
      this.catePostValue=data.postTypeId,
      this.dateStart = new Date(data.startDate).toISOString().substr(0, 10),
      this.dateEnd = new Date(data.endDate).toISOString().substr(0, 10)

      
      for(let i=0;i<data.PostImages.length;i++){
      
         let url = data.PostImages[i].image;
           this.previewImage.push(url);  
      
           this.convertUrlToFileImage(url)

   
      }

       for(let i=0;i<data.PostImageTrans.length;i++){
     
      let url = data.PostImageTrans[i].image;
     this.convertUrlToFileImageEng(url)
      
           this.previewImageEng.push(url);
    
        
      }

      
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

      this.updatePost({
        'newsCategoryId':this.catePostValue,
         'post_id':this.postId,
                'title': this.postName,
                'description':this.descriptionText,
                'status':this.statusValue,
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
    getPostOne:'Post/getPostOne', 
getCatePostAll:'CatePost/getCatePostAll',
updatePost:'Post/updatePost'

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