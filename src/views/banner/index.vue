<template>
   <div id="Banner">
    <section class="banner-section">
      <div class="header banner-header">
        <h1>{{ $t("Banner.title") }}</h1>
        <v-btn @click="CreateBanner" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("Banner.button") }}</v-btn
        >
      </div>
      <div class="banner-content">
        <v-data-table
          :headers="$t('Banner.table.headers')"
          :items="banner['data']"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('Banner.loadingtext')"
          v-if="banner['data'] != ''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('Banner.txtsearch')"
                filled
                rounded
                dense
                append-icon="fas fa-search"
                single-line
                hide-details
                v-model="searchItem"
              ></v-text-field>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <!-- table content -->
          <template v-slot:item="{ item, index }">
            <tr class="table-content" v-if="isLaoLanguage">
              <td>{{ index + 1 }}</td>
              <td><v-img :src="item.BanImages[0].image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.banName }}</td>
              <td>{{ item.link }}</td>
              <td>{{ item.description }}</td>
  
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'banner.edit',params:{
                      'banId':item.id,
        'bannerName':item.banName,
      'bannerNameEng':item.BannerTrans[0].banName,
      'link':item.link,
      'linkEng':item.BannerTrans[0].link ,
      'description':item.description,
      'descriptionEng':item.BannerTrans[0].description,
      'argImage':item.BanImages,
      'argImageEng':item.BanImageTrans
                   }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Banner.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Banner.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Banner.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Banner.table.options.delete')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                 </v-list>
               </v-menu>
              </td>
            </tr>
            <tr class="table-content" v-else>
              <td>{{ index + 1 }}</td>
              <td><v-img :src="item.BanImageTrans[0].image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.BannerTrans[0].banName }}</td>
              <td>{{ item.BannerTrans[0].link }}</td>
              <td>{{ item.BannerTrans[0].description }}</td>
  
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'banner.edit',params:{
                      'banId':item.id,
        'bannerName':item.banName,
      'bannerNameEng':item.BannerTrans[0].banName,
      'link':item.link,
      'linkEng':item.BannerTrans[0].link ,
      'description':item.description,
      'descriptionEng':item.BannerTrans[0].description,
      'argImage':item.BanImages,
      'argImageEng':item.BanImageTrans
                   }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Banner.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Banner.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Banner.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Banner.table.options.delete')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                 </v-list>
               </v-menu>
              </td>
            </tr>
          </template>
        </v-data-table>
        <div class="Table-empty" v-else>
          <div class="image">
            <v-img src="@/assets/Images/NoData.png"></v-img>
          </div>
          <h3>{{ $t("Banner.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'Banner',

    data() {
        return {
          isLaoLanguage:localStorage.getItem('lang') === 'la',
             loading: false,
      
      searchItem: "",
        };
    },

    mounted() {
        this.getBanner()
    },

    methods: {
        CreateBanner() {
      this.$router
        .push({
          name: "banner.create",
        })
        .catch(() => {});
    },

    ...mapActions({
getBanner:'Banner/getBanner',


        } )
    },
    computed:{
      ...mapGetters({
        banner:'Banner/banner',
    

        })
    }
};
</script>

<style lang="scss" scoped>
.banner-section {
  width: 100%;
  background-color: $white-color;

  .banner-content {
    width: 100%;
    padding: 1rem;

  }
}
</style>