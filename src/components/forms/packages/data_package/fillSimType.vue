<template>
  <div class="modal-card">
    <v-form ref="form">
      <v-row>
        <label>Select Sim Type</label>
        <v-col class="pa-0" cols="12" md="12" sm="12">
          <v-select
              outlined
              dense
              multiple
              :items="cate_data_package['data']"
              item-text="detail"
              item-value="id"
              v-model="simTypeId"
          >
          </v-select>
        </v-col>
        <v-col class="pa-0" cols="12" md="12" sm="12" @click="fillSimType({'package_id':$route.params.data_package_id,'simTypeId':simTypeId})">
          <v-btn>
            Save
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
      simTypeId:[]

    }
  },
  methods: {

    reset() {
      this.$refs.form.reset();
    },


    ...mapActions({
      getCateDataPackage:'CateDataPackage/getCateDataPackage',
      fillSimType:'DataPackage/fillSimType'
    })
  },
  computed:{
    ...mapGetters({
      cate_data_package:'CateDataPackage/cate_data_package'
    })
  },
  created() {
    this.getCateDataPackage();

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
