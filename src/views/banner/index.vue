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
              <td class="text-limit">{{ item.description }}</td>
  
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'banner.edit',params:{
                      'banner_id':item.id,
       
                   }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Banner.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Banner.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link  @click="onDelete(item.id)">
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
              <td class="text-limit">{{ item.BannerTrans[0].description }}</td>
  
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'banner.edit',params:{
                      'banner_id':item.id,
                   }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Banner.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Banner.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
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
        <ModalDelete>
        <template v-slot="{close}">
          <Delete :banner_id="banner_id" @close="close" />
        </template>
      </ModalDelete>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Delete from "../../components/forms/banner/Delete";
export default {
    name: 'Banner',
  components: {
    Delete
  },
    data() {
        return {
          banner_id:'',
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
      onDelete(banner_id) {
        this.banner_id = banner_id
     
      this.$store.commit("modalDelete_State", true);
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
    .text-limit{
 max-width: 200px;
 overflow: hidden;
 text-overflow: ellipsis;
 white-space: nowrap;
    }

  }
}


</style>