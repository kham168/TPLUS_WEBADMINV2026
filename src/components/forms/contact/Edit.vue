<template>
  <div id="Edit">
    <section class="contact-edit">
      <div class="contact-form">
        <div class="form-title">
          <h1>{{ $t("Contact.Edit.header") }}</h1>
        </div>
        <div class="lang-select-input">
      
          <div class="tab-content">
            
                <div class="card-form">
                  <div class="form-content">
                    <v-form v-model="valid" ref="form" lazy-validation>
                     
                      <v-text-field
                      v-model= 'name'
                        :rules="[
                          $myValidator.SimpleValidate($t('Validate.required')),
                        ]"
                        :label="$t('Contact.Create.form.contact_name')"
                        outlined
                        required
                      ></v-text-field>
                      <v-text-field
                      v-model='email'
                        :rules="[
                          $myValidator.SimpleValidate($t('Validate.required')),
                        ]"
                        :label="$t('Contact.Create.form.email')"
                        outlined
                        required
                      ></v-text-field>
                      <v-text-field
                      v-model = 'title'
                        :rules="[
                          $myValidator.SimpleValidate($t('Validate.required')),
                        ]"
                        :label="$t('Contact.Create.form.tile')"
                        outlined
                        required
                      ></v-text-field>
                      <v-textarea
                      v-model='description'
                        outlined
                        :label="$t('Contact.Create.form.description')"
                      ></v-textarea>
                     
                    </v-form>
                    <div class="form-actions">
                      <v-btn plain @click="reset" class="mx-5">{{
                        $t("Contact.Create.form.button.cancel")
                      }}</v-btn>
                      <v-btn
                        :disabled="!valid"
                        @click="submitForm"
                        class="btn btn-create"
                      >
                        {{ $t("Contact.Create.form.button.save") }}</v-btn
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

import {mapActions, mapGetters} from 'vuex'
export default {
  name: "Edit",

  data() {
    return {
      contactId:0,
      name:'',
      email:'',
      title:'',
      description:'',
      tab: null,
      previewImage: null,
      valid: true,
    };
  },

created(){
  this.getContactOne({'contact_id':this.$route.params.contact_id}).then(res=>{
    if(res.success){
      this.loadDataToComponent()
    }
    })

  
  
},

  mounted() {
  
  
      
  },

  methods: {
   fetchContactOne() {
      this.$axios.get(`position`).then((res) => {
        if (res.status === 200) {
          this.position = res.data.data;
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    loadDataToComponent(){

     
      let data = this.contact_one['data'];
      console.log("data:"+data);
      
     this.contactId = data.id;
     this.name = data.name;
     this.email = data.email;
     this.title = data.title;
     this.description = data.description;
    },

    submitForm () {
  
    if(this.$refs.form.validate()){
      this.updateContact({'contact_id':this.contactId,'name':this.name,'email':this.email,'title':this.title,'description':this.description})
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
    updateContact:'Contact/updateContact',
        getContactOne:'Contact/getContactOne',
  })
  },

  computed:{
    ...mapGetters({
    contact_one:'Contact/contact_one',
 
    })
  }
};
</script>

<style lang="scss" scoped>
  .contact-form {
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