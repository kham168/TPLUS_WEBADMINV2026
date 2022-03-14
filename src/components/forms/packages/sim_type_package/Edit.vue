<template>
  <div id="Edit">
    <section class="cate_data_package-edit">
      <div class="cate_data_package-form">
        <div class="form-title">
          <h1>{{ $t("CateDataPackage.Edit.header") }}</h1>
        </div>
        <div class="lang-select-input">

          <div class="tab-content">

                <div class="card-form">
                  <div class="form-content">
                    <v-form v-model="valid" ref="form" lazy-validation>
                    
                      <v-text-field

                      v-model="main_product"

                        :label="$t('CateDataPackage.Create.form.cate_data_package_name')"
                        outlined
                        required
                      ></v-text-field>




                      <v-textarea

                      v-model="description"
                        outlined
                        :label="$t('CateDataPackage.Create.form.description')"
                      ></v-textarea>


                    
                    </v-form>
                    <div class="form-actions">
                      <v-btn plain @click="reset" class="mx-5">{{
                        $t("CateDataPackage.Create.form.button.cancel")
                      }}</v-btn>
                      <v-btn
                        :disabled="!valid"
                        @click="submitForm"
                        class="btn btn-create"
                      >
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
  name: "Edit",

  data() {
    return {
      sim_type_package_id:0,
      main_product:'',
      description:'',

      tab: null,
       isLaoTab:true,
      isEngTab:false,
      valid: true,
    };
  },

  created(){

        this.loadDataToComponent(this.$route);

  },
  mounted() {

  },

  methods: {

    loadDataToComponent(res){
      let data = res.params
 this.sim_type_package_id = data.cate_data_package_id;
   this.main_product= data.name;
   this.description = data.description;
    },


    submitForm () {
    this.$refs.form.validate();
    if(this.$refs.form.validate()){
    this.updateSimTypePackage({'sim_type_package_id':this.sim_type_package_id,'mainProduct':this.main_product,'description':this.description})
    console.log('update successful')
    }else{
     console.log('can not update')
    }
  },
   reset(){
    this.$router.back();
    this.$refs.form.reset();
  },

  ...mapActions({
    updateSimTypePackage:'SimTypePackage/updateSimTypePackage',

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