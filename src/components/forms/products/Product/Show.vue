<template>
  <div class="modal-show">
    <div align="center" class="show-title">
      <v-tabs v-model="tab" color="primary" slider-color="primary">
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tab
            v-for="lang in $t('Post.Create.lang')"
            :key="lang.key"
            :href="lang.key"

        >
          {{ lang }}
        </v-tab>
      </v-tabs>
      <h1>Preview Information</h1>
    </div>
    <div class="show-body">

      <v-tabs-items v-model="tab">
        <v-tab-item
            v-for="i in $t('Post.Create.lang')"
            :key="i"
            :value="i.key"
        >
          <v-row class="body-1 pt-5">
            <v-col align="left" cols="12">

              <h2> {{ $t('Product.Create.form.productname') }}</h2>
              <p v-if="tab===0"> {{ productName }}</p>
              <p v-else> {{ productNameEng }}</p>
            </v-col>

          </v-row>

          <v-row v-if="tab===0" class="body-2">
            <v-col align="left" cols="12">

              <h2> {{ $t('Product.Create.form.category') }}</h2>
              <p  v-for="element in productTypeValue"> {{ element }}</p>

            </v-col>
          </v-row>

          <v-row v-else class="body-2">
            <v-col align="left" cols="12">

              <h2> {{ $t('Product.Create.form.category') }}</h2>
              <p v-for="element in productTypeValueEng"> {{ element }}</p>

            </v-col>
          </v-row>

          <v-row class="body-3">
            <v-col align="left" cols="12">

              <h2>{{ $t('Product.Create.form.description') }}</h2>
              <p v-if="tab===0"> {{ description }}</p>
              <p v-else> {{ descriptionEng }}</p>
            </v-col>

          </v-row>


          <v-row  class="body-4">
            <v-col align="left" cols="12">

              <h2> {{ $t("Product.Create.form.picture") }}</h2>

              <div v-if="tab===0" class="upload-image">

                <img class="image-files" :src="previewImage[0]" />

              </div>

            </v-col>

          </v-row>


        </v-tab-item>
      </v-tabs-items>


    </div>


  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data() {
    return {
      btnLoading: false,
      productId:0,

      tab: null,
    }
  },
  created() {

  },
  props: {
    productTypeValue:[],
    productTypeValueEng:[],
    productName:'',
    productNameEng:'',
    description:'',
    descriptionEng:'',
    previewImage: [],
    previewImageEng: [],
  },
  methods: {

    ...mapActions({
      getProductOne: 'Product/getProductOne'
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

    h2 {
      padding-bottom: 10px;
      font-weight: bold;
    }

    p {
      font-weight: normal;
      padding-left: 10px;
      font-size: 18px;

    }

    .upload-image {
      width: 100%;
      height: 100%;
      border-radius: 0.3rem;
      position: relative;
      overflow: hidden;
      object-fit: cover;
      transition: all ease 0.5s;
      border: 1px solid $gray-color;

      .image {

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
      .image-files{
        max-height: 100%;
        max-width: 100%;
        height: 100%;
        width: 100%;
        display: block;
        margin-left: auto;
        margin-right: auto;


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


  }
}
</style>
