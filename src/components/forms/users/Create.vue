<template>
  <div id="Create">
    <section class="user-create">
      <div class="header user-header">
        <h1>{{$t('Users.Create.header')}}</h1>
      </div>
      <div class="user-content">
        <div class="user-form">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :label="$t('Users.Create.form.username')"
                  required
                  outlined
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                ></v-text-field>
              </v-col>
               <v-col cols="12">
                <v-text-field
                  :label="$t('Users.Create.form.email')"
                  required
                  outlined
                  type="email"
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')), 
                    $myValidator.EmailValidate($t('Validate.email'))
                  ]"
                ></v-text-field>
              </v-col>
               <v-col cols="6">
                <v-text-field
                  :label="$t('Users.Create.form.phone')"
                  required
                  type="number"
                  counter="8"
                  outlined
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                    $myValidator.MaxlengthValidate($t('Validate.maxmessage'),9),
                  ]"
                ></v-text-field>
              </v-col>
               <v-col cols="6">
                <v-text-field
                  :label="$t('Users.Create.form.pass')"
                  required
                  outlined
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                    $myValidator.PassValidate($t('Validate.password'))
                  ]"
                  :append-icon="showpass ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  :type="showpass ? 'password' : 'text'"
                  @click:append="showpass = !showpass"
                ></v-text-field>
              </v-col>
               <v-col cols="6">
                <v-text-field
                  :label="$t('Users.Create.form.confirm pass')"
                  required
                  outlined
                   :append-icon="showconpass ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  :type="showconpass ? 'password' : 'text'"
                  @click:append="showconpass = !showconpass"
                  :rules="[
                    $myValidator.SimpleValidate($t('Validate.required')),
                  ]"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                  <v-select
                      :items="items"
                      v-model="value"
                      :label="$t('Users.Create.form.status')"
                      required
                      outlined
                      :rules="[$myValidator.SimpleValidate($t('Validate.required'))]"
                  ></v-select>
              </v-col>
            </v-row>
          </v-form>
          <div class="form-actions">
              <v-btn plain @click="reset" class="mx-5">{{
                        $t("Users.Create.form.button.cancel")
                      }}</v-btn>
                      <v-btn :disabled="!valid" @click="submitForm" class="btn btn-create">
                        {{ $t("Users.Create.form.button.save") }}</v-btn
                      >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Create",

  data() {
    return {
        showpass:true,
        showconpass:true,
        valid:true,
    };
  },

  mounted() {},

  methods: {
      submitForm(){
          this.$refs.form.validate();
      },
      reset(){
        this.$refs.form.reset();
        this.$router.back();
      }
  },
};
</script>

<style lang="scss" scoped>
.user-content {
  width: 100%;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .user-form {
    width: 70%;


    .form-actions{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
  }
}
</style>