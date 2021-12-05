<template>
  <div id="Edit">
    <section class="cate_product-edit">
      <div class="cate_product-form">
        <div class="form-title">
          <h1>{{ $t("CateProduct.Edit.header") }}</h1>
        </div>
        <div class="lang-select-input">
          <v-tabs v-model="tab" color="primary" slider-color="primary">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
              :href="lang.key"
              v-for="lang in $t('CateProduct.Create.lang')"
              :key="lang.key"
              @click="checkTabLang(lang)"
            >
              {{ lang }}
            </v-tab>
          </v-tabs>
          <div class="tab-content">
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="i in $t('CateProduct.Create.lang')"
                :key="i"
                :value="i.key"
              >
                <div class="card-form">
                  <div class="form-content">
                    <v-form v-model="valid" ref="form" lazy-validation>
                    
                      <v-text-field
                      v-model="cateName"
                          v-show="isLaoTab"
                        :rules="[
                          $myValidator.SimpleValidate($t('Validate.required')),
                        ]"
                        :label="$t('CateProduct.Create.form.cate_product_name')"
                        outlined
                        required
                      ></v-text-field>

                      <v-text-field
                        v-model="cateNameEng"
                          v-show="isEngTab"
                        :rules="[
                          $myValidator.SimpleValidate($t('Validate.required')),
                        ]"
                        :label="$t('CateProduct.Create.form.cate_product_name')"
                        outlined
                        required
                      ></v-text-field>


                      <v-textarea
                        v-model="description"
                          v-show="isLaoTab"
                        outlined

                        :label="$t('CateProduct.Create.form.description')"
                      ></v-textarea>

                       <v-textarea
                            v-model="descriptionEng"
                       v-show="isEngTab"
                        outlined
                        :label="$t('CateProduct.Create.form.description')"
                      ></v-textarea>
                    
                    </v-form>
                    <div class="form-actions">
                      <v-btn plain @click="reset" class="mx-5">{{
                        $t("CateProduct.Create.form.button.cancel")
                      }}</v-btn>
                      <v-btn
                        :disabled="!valid"
                        @click="submitForm"
                        class="btn btn-create"
                      >
                        {{ $t("CateProduct.Create.form.button.save") }}</v-btn
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
import {mapActions} from 'vuex'

export default {
  name: "Edit",

  data() {
    return {
      cateId:0,
        cateName:'',
      description:'',
      cateNameEng:'',
      descriptionEng:'',
      isLaoTab:true,
      isEngTab:false,
      tab: null,
  
      valid: true,
    };
  },
  created(){
    this.getCateProductOne({'cate_product_id':this.$route.params.cate_product_id}).then(res=>{
      if(res.success){
          this.loadDataToComponent(res);
      }
    })
  },
  mounted() {
  
    this.checkTabLang('ລາວ');
  },

  methods: {

    loadDataToComponent(res){
      let data = res.data;

       this.cateId=data.id,
        this.cateName=data.cateName,
     this.description=data.description,
      this.cateNameEng=data.CateProductTrans[0].cateName,
      this.descriptionEng=data.CateProductTrans[0].description
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

    submitForm () {
    this.$refs.form[0].validate();
       if( this.$refs.form[0].validate()){

      this.updateCateProduct({
        'cate_product_id':this.cateId,
         'cate_product_name':this.cateName,
    'description':this.description,
    'other_lang_cate_product_name':this.cateNameEng,
    'other_lang_description':this.descriptionEng,
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
    updateCateProduct:'CateProduct/updateCateProduct',
    getCateProductOne:'CateProduct/getCateProductOne'
  })
  },
};
</script>

<style lang="scss" scoped>
  .cate_product-form {
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