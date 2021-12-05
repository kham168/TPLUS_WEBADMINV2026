<template>
  <div id="Edit">
    <section class="data_package-edit">
      <div class="data_package-form">
        <div class="form-title">
          <h1>{{ $t("DataPackage.Edit.header") }}</h1>
        </div>
        <div class="lang-select-input">
          <v-tabs v-model="tab" color="primary" slider-color="primary">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
              :href="lang.key"
              v-for="lang in $t('DataPackage.Create.lang')"
              :key="lang.key"
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
                    <v-form v-model="valid" ref="form" lazy-validation>
                     
                      <v-text-field
                      v-model="name"
                        v-show="isLaoTab"
                        :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                        :label="$t('DataPackage.Create.form.data_package_name')"
                        outlined
                        required
                      ></v-text-field>
                      <v-text-field
                      v-model="nameEng"
                        v-show="isEngTab"
                        :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                        :label="$t('DataPackage.Create.form.data_package_name')"
                        outlined
                        required
                      ></v-text-field>

                       <v-select
                        v-show="tab == 0"
                        :items="cate_data_package['data']"
                        item-text="name"
                        item-value="id"
                        v-model="catePackageValue"
                        :label="$t('DataPackage.Create.form.category')"
                        :rules="[$myValidator.SelectValidate($t('Validate.required'))]"
                        outlined
                        required
                      ></v-select>

                      
                      <v-textarea
                      v-model="description"
                        v-show="isLaoTab"
                        outlined
                        :label="$t('DataPackage.Create.form.description')"
                        
                      ></v-textarea>
                        <v-textarea
                             v-model="descriptionEng"
                        v-show="isEngTab"
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
                        $t("DataPackage.Create.form.button.cancel")
                      }}</v-btn>
                      <v-btn
                        :disabled="!valid"
                        @click="submitForm"
                        class="btn btn-create"
                      >
                        {{ $t("DataPackage.Create.form.button.save") }}</v-btn
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
      dataPackageId:0,
      catePackageValue:'',
      name:'',
      nameEng:'',
      description:'',
      descriptionEng:'',
      tab: null,
      isLaoTab:false,
      isEngTab:false,
      uploadImage:[],
      uploadImageEng:[],
      previewImage: [],
       previewImageEng: [],
      valid:true,
    };
  },

  created(){
    this.getDataPackageOne({'package_id':this.$route.params.data_package_id}).then(res=>{
      if(res.success){
            this.loadDataToComponent(res);
      }
    })
  },
  mounted() {

    this.getCateDataPackage();
    this.checkTabLang('ລາວ');
  },

  methods: {

    loadDataToComponent(res){

      let data = res.data
       this.dataPackageId=data.id,
      this.catePackageValue=data.catePackageId,
      this.name=data.name,
      this.nameEng=data.PackagesTrans[0].name,
      this.description=data.description,
      this.descriptionEng=data.PackagesTrans[0].description
      
      // for(let i=0;i<data.argImage.length;i++){
      //   this.uploadImage.push(data.argImage[i].image)
      // }

      // for(let i=0;i<data.argImageEng.length;i++){
      //    this.uploadImageEng.push(data.argImageEng[i].image)
      // }
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
    if(this.$refs.form[0].validate()){
      this.updateDataPackage({
        'package_id':this.dataPackageId,
        'cate_package_id':this.catePackageValue,
    'name':this.name,
    'description':this.description,
    'other_lang_name':this.nameEng,
    'other_lang_description':this.descriptionEng,
    'avatar':this.uploadImage,
    'avatar_EN':this.uploadImageEng
      })
    }else{
      console.log('can not create')
    }


  },
   reset(){
    this.$router.back();
    this.$refs.form[0].reset();
  },

  ...mapActions({
          getDataPackageOne:'DataPackage/getDataPackageOne',
    updateDataPackage:'DataPackage/updateDataPackage',
    getCateDataPackage:'CateDataPackage/getCateDataPackage'

  })
  },

   computed:{
    ...mapGetters({
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