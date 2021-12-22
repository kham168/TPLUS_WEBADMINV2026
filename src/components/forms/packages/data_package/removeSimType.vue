<template>
  <div class="modal-card">
    <v-form ref="form">
      <v-row>
        <label>Select Sim Type To Remove</label>
        <v-col class="pa-0" cols="12" md="12" sm="12">

          <v-select
              outlined
              dense

              :items="package_simtype_one[0]['simTypes']"
              item-text="detail"
              item-value="id"
              v-model="simTypeId"
          >
          </v-select>
        </v-col>
        <v-col class="pa-0" cols="12" md="12" sm="12" @click="removeSimTypeOne({'package_id':$route.params.data_package_id,'simTypeId':simTypeId})">
          <v-btn>
            Remove
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex";

export default {
  data() {
    return {

      package_id:"",
      simTypeId:""

    }
  },
  methods: {

    reset() {
      this.$refs.form.reset();
    },


    ...mapActions({
      removeSimTypeOne:'DataPackage/removeSimTypeOne',
      fillSimType:'DataPackage/fillSimType',
      packageSimTypeOne:'DataPackage/packageSimTypeOne'
    })
  },
  computed:{
    ...mapGetters({

      package_simtype_one:'DataPackage/package_simtype_one',

    })
  },
  created() {


  },

  mounted() {
    this.packageSimTypeOne({'package_id':this.$route.params.data_package_id}).then(res=>{
      console.log(res)
    });
  }
}
</script>

<style scoped lang="scss">
.modal-card {
  width: 600px;
  min-height: 200px;
  padding: 30px 50px;
}
</style>
