<template>
  <div class="modal-show">
    <div align="center" class="show-title">
      <h1>Preview Information</h1>
    </div>
    <div class="show-body">
      <v-row class="body-1">
        <v-col align="right" cols="6">

          <h3> Title:</h3>

        </v-col>
        <v-col cols="6">

          <p> {{ title }}</p>


        </v-col>
      </v-row>

      <v-row class="body-2">
        <v-col align="right" cols="6">

          <h3> Name:</h3>

        </v-col>
        <v-col cols="6">

          <p>{{ name }}</p>

        </v-col>
      </v-row>
      <v-row class="body-3">
        <v-col align="right" cols="6">

          <h3> Email:</h3>

        </v-col>
        <v-col cols="6">

          <p> {{ email }}</p>


        </v-col>
      </v-row>

      <v-row class="body-4">
        <v-col align="right" cols="6">

          <h3> Description:</h3>

        </v-col>
        <v-col cols="6">

          <p>{{ description }}</p>

        </v-col>
      </v-row>
    </div>


  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      btnLoading: false,
      contactId: '',
      name: '',
      email: '',
      title: '',
      description: ''
    }
  },
  created() {
    this.getContactOne({'contact_id': this.contact_id}).then(res => {
      if (res.success) {
        this.loadDataToComponent(res)

      }
    });
  },
  props: {
    contact_id: {}
  },
  methods: {
    loadDataToComponent(res) {


      let data = res.data;


      this.contactId = data.id;
      this.name = data.name;
      this.email = data.email;
      this.title = data.title;
      this.description = data.description;
    },
    ...mapActions({
      getContactOne: 'Contact/getContactOne'
    })

  }
}
</script>

<style lang="scss" scoped>
.modal-show {
  max-width: 100%;
  display: block;
  margin-left: auto;
  margin-right: auto;

  .show-title {
    margin-bottom: 20px;

  }

  .show-body {
    padding: 50px;
  }
}
</style>
