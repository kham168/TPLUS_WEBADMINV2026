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

              <h2> {{ $t('Post.Create.form.post_name') }}</h2>
              <p v-if="tab===0"> {{ postName }}</p>
              <p v-else> {{ postNameEng }}</p>
            </v-col>

          </v-row>

          <v-row class="body-2" v-if="tab===0">
            <v-col align="left" cols="12">

              <h2> {{ $t('Post.Create.form.category') }}</h2>
              <p v-for="data in catePostValue"> {{ data.name }}</p>

            </v-col>
          </v-row>

          <v-row class="body-2" v-else>
            <v-col align="left" cols="12">

              <h2> {{ $t('Post.Create.form.category') }}</h2>
              <p v-for="data in catePostValue"> {{ data.NewsCategoryTrans[0].name }}</p>

            </v-col>
          </v-row>

          <v-row class="body-3">
            <v-col align="left" cols="12" >

              <h2>{{ $t('Post.Create.form.description') }}</h2>

               <p v-if="tab==0" v-html="descriptionText"></p>
               <p v-else v-html="descriptionTextEng"></p>



            </v-col>

          </v-row>

          <v-row class="body-4">
            <v-col align="left" cols="12">

              <h2> {{ $t("Post.Create.form.picture") }}</h2>

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


export default {
  data() {
    return {
      btnLoading: false,
      postId: 0,

      tab: null,
    }
  },
  created() {

  },
  props: {
    post_id: {},

    descriptionText: '',
    descriptionTextEng: '',
    postName: '',
    postNameEng: '',
    statusValue: '',
    catePostValue:[],

    previewImage: [],
    previewImageEng: [],
  },
  methods: {


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
