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

          <v-row class="body-2">
            <v-col align="left" cols="12">

              <h2> {{ $t('Product.Create.form.category') }}</h2>
              <p> {{ productTypeValue }}</p>

            </v-col>
          </v-row>

          <v-row class="body-3">
            <v-col align="left" cols="12">

              <h2>{{ $t('Product.Create.form.description') }}</h2>
              <p v-if="tab===0"> {{ description }}</p>
              <p v-else> {{ descriptionEng }}</p>
            </v-col>

          </v-row>


          <v-row class="body-4">
            <v-col align="left" cols="12">

              <h2> {{ $t("Product.Create.form.picture") }}</h2>

              <div v-if="tab===0" class="image">
                <v-carousel height="100%">
                  <v-carousel-item v-for="(imageFiles,index) in previewImage" :key="index">

                    <v-layout row>
                      <v-flex v-for="j in 1" :key="j" align-self-center>

                        <img :src="imageFiles" class="image-files">

                      </v-flex>

                    </v-layout>
                  </v-carousel-item>
                </v-carousel>
              </div>

              <div v-else class="image">
                <v-carousel height="100%">
                  <v-carousel-item v-for="(imageFiles,index) in previewImageEng" :key="index">

                    <v-layout row>
                      <v-flex v-for="j in 1" :key="j" align-self-center>

                        <img :src="imageFiles" class="image-files">

                      </v-flex>

                    </v-layout>
                  </v-carousel-item>
                </v-carousel>
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
      productTypeValue:[],
      productName:'',
      productNameEng:'',
      description:'',
      descriptionEng:'',
      previewImage: [],
      previewImageEng: [],
      tab: null,
    }
  },
  created() {
    this.getProductOne({'product_id': this.product_id}).then(res => {
      if (res.success) {
        this.loadDataToComponent(res)

      }
    });
  },
  props: {
    product_id: {}
  },
  methods: {
    loadDataToComponent(res){
      let data = res.data;
      this.productId=data.id

      this.productName=data.productName
      this.productNameEng=data.ProductTrans[0].productName
      this.description=data.description
      this.descriptionEng=data.ProductTrans[0].description

      for(let i=0;i<data.ProductCategories.length;i++){

        this.productTypeValue.push(data.ProductCategories[i].cateProductId)

      }

      for(let i=0;i<data.ProductImages.length;i++){

        this.previewImage.push(data.ProductImages[i].image)


      }

      for(let i=0;i<data.ProductImages.length;i++){


        this.previewImageEng.push(data.ProductImages[i].image)


      }


    },
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

    .image {

      max-width: 100%;
      overflow: hidden;
      object-fit: cover;


      .image-files {
        max-width: 100%;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }


    }


  }
}
</style>
