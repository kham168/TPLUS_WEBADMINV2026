<template>
  <div id="Create">
    <section class="cate_data_package-create">
      <div class="cate_data_package-form">
        <div class="form-title">
          <h1>{{ $t("CateDataPackage.Create.header") }}</h1>
        </div>
        <div class="lang-select-input">

          <div class="tab-content">


                <div class="card-form">
                  <div class="form-content">
                    <v-form  v-model="valid" ref="form" lazy-validation>

                      <v-text-field

                          v-model="cateName"
                          :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                          :label="$t('CateDataPackage.Create.form.cate_data_package_name')"
                          outlined
                          required
                      ></v-text-field>

                      <v-textarea
                          :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                          v-model="description"
                          outlined
                          :label="$t('CateDataPackage.Create.form.description')"

                      ></v-textarea>





                    </v-form>
                    <div class="form-actions">
                      <v-btn plain @click="reset" class="mx-5">{{
                          $t("CateDataPackage.Create.form.button.cancel")
                        }}</v-btn>
                      <v-btn :disabled="!valid" @click="submitForm" class="btn btn-create">
                        {{ $t("CateDataPackage.Create.form.button.save") }}</v-btn
                      >
                    </div>
                  </div>
                </div>

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
      cateName:'',
      description:'',
      isLaoTab:false,
      isEngTab:false,
      tab: null,
      valid:true,
    };
  },

  mounted() {

  },

  methods: {
    submitForm () {
    this.$refs.form.validate();
   if(this.$refs.form.validate()){
 
      this.createSimTypePackage({'mainProduct':this.cateName,'description':this.description});
    
      console.log('create successful')
    }else{
      console.log('can not create')
    }
  },
   reset(){
    this.$router.back();
    this.$refs.form.reset();
  },

  ...mapActions({
    createSimTypePackage:'SimTypePackage/createSimTypePackage',

  })
  },
};
</script>

<style lang="scss" scoped>


  .cate_data_package-form {
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

