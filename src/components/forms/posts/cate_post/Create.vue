<template>
  <div id="Create">
    <section class="cate_post-create">
      <div class="cate_post-form">
        <div class="form-title">
          <h1>{{ $t("CatePost.Create.header") }}</h1>
        </div>
        <div class="lang-select-input">
          <v-tabs v-model="tab" color="primary" slider-color="primary">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab
              :href="lang.key"
              v-for="lang in $t('CatePost.Create.lang')"
              :key="lang.key"
              @click="checkTabLang(lang)"
            >
              {{ lang }}
            </v-tab>
          </v-tabs>
          <div class="tab-content">
            <v-tabs-items v-model="tab">
              <v-tab-item
                v-for="i in $t('CatePost.Create.lang')"
                :key="i"
                :value="i.key"
              >
                <div class="card-form">
                  <div class="form-content">
                    <v-form  v-model="valid" ref="form" lazy-validation>

                      <v-text-field
                      v-show="isLaoTab"
                      v-model="name"
                        :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                        :label="$t('CatePost.Create.form.cate_post_name')"
                        outlined
                        required
                      ></v-text-field>

                      
                      <v-text-field
                      v-show="isEngTab"
                      v-model="nameEng"
                        :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                        :label="$t('CatePost.Create.form.cate_post_name')"
                        outlined
                        required
                      ></v-text-field>
                     
                    </v-form>
                    <div class="form-actions">
                      <v-btn plain @click="reset" class="mx-5">{{
                        $t("CatePost.Create.form.button.cancel")
                      }}</v-btn>
                      <v-btn :disabled="!valid" @click="submitForm" class="btn btn-create">
                        {{ $t("CatePost.Create.form.button.save") }}</v-btn
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
  name: "Create",

  data() {
    return {
      name:'',
      nameEng:'',
      isLaoTab:false,
      isEngTab:false,
      tab: null,
      previewImage: null,
      valid:true,
    };
  },

  mounted() {
    this.checkTabLang('ລາວ')
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

    submitForm () {
    this.$refs.form[0].validate();
    if(this.$refs.form[0].validate()){

      this.createCatePost({
            'cate_post_name':this.name,
        'other_lang_cate_post_name':this.nameEng,
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
    createCatePost:'CatePost/createCatePost'
  })
  },
};
</script>

<style lang="scss" scoped>


  .cate_post-form {
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

