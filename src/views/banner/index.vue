<template>
   <div id="Banner">

    <section class="banner-section">
      <v-skeleton-loader
          class="mx-auto"

          type="table"
          :loading="loading"
          v-if="firstLoad"
      ></v-skeleton-loader>
      <div class="header banner-header"  v-show="!firstLoad">

        <v-row>
          <h1>{{ $t("Banner.title") }}</h1>
          <v-btn @click="saveChangeOrderBanner" class="btn btn-create ml-5" v-show="checkbox">
            <v-icon>mdi-checkbox-marked-circle</v-icon>{{ $t("Banner.Create.form.button.save") }}</v-btn>


        </v-row>



          <v-btn @click="CreateBanner" class="btn btn-create">
            <v-icon>fal fa-plus-circle</v-icon>{{ $t("Banner.button") }}</v-btn>



      </div>
      <div class="banner-content" v-show="!firstLoad">

        <v-data-table

          :headers="$t('Banner.table.headers')"
          :items="banner['data']"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('Banner.loadingtext')"

          v-if="banner['data'] != ''"


        >
          <template v-slot:header.No="props">


                <v-checkbox
                    class="checkbox"
                    v-model="checkbox">

            <template v-slot:label>
              <span id="checkboxLabel" style=" font-size: 12px;font-weight: bold">{{props.header.text}}</span>
            </template>

                </v-checkbox>




          </template>

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
          <template v-slot:body="props">
            <draggable
                :disabled="!checkbox"
                :list="banner['data']"
                tag="tbody"
                :move="checkMove"

                v-if="isLaoLanguage"
            >
            <tr class="table-content"  v-for="(item, index) in props.items"
                :key="index">

              <td> <v-icon
                  small
                  class="grab-icon"
              >
                mdi-arrow-all
              </v-icon> <span>&nbsp</span> {{ index + 1 }}</td>
              <td><v-img :src="item.image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.banName }}</td>
              <td>{{ item.link }}</td>
              <td class="text-limit">{{ item.description }}</td>

              <td><v-btn icon @click="onShow(item.id)"> <v-icon large>
                mdi-eye
              </v-icon></v-btn></td>
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
            </draggable>

            <draggable
                v-model="props.items"
                :disabled="!checkbox"
                :list="banner['data']"
                tag="tbody"
                :move="checkMove"
                v-else
            >
              <tr class="table-content"  v-for="(item, index) in props.items"
                  :key="index">
              <td> <v-icon
                  small
                  class="grab-icon"
              >
                mdi-arrow-all
              </v-icon> <span>&nbsp</span> {{ index + 1 }}</td>
              <td><v-img :src="item.BannerTrans[0].image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.BannerTrans[0].banName }}</td>
              <td>{{ item.BannerTrans[0].link }}</td>
              <td class="text-limit">{{ item.BannerTrans[0].description }}</td>

                <td><v-btn icon @click="onShow(item.id)"> <v-icon large>
                  mdi-eye
                </v-icon></v-btn></td>
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
            </draggable>
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

      <ModalShow>
        <template v-slot="{close}">
          <Show
              :bannerName="bannerName"
              :bannerNameEng="bannerNameEng"
              :link="link"
              :linkEng="linkEng"
              :description="description"
              :descriptionEng="descriptionEng"
              :previewImage="previewImage"
              :previewImageEng="previewImageEng" @close="close" />
        </template>
      </ModalShow>
    </section>

  </div>
</template>

<script>
import draggable from 'vuedraggable';
import {mapActions, mapGetters} from 'vuex';
import Delete from "../../components/forms/banner/Delete";
import Show from "../../components/forms/banner/Show";
import ModalShow from "../../components/Modals/modalShow";
export default {
    name: 'Banner',
  components: {
    Delete,
    Show,
    ModalShow,
    draggable,
  },
    data() {
        return {
          checkbox: false,
          banner_id:'',
          isLaoLanguage:localStorage.getItem('lang') === 'la',
             loading: false,
      
      searchItem: "",
          list:[],

          bannerName:'',
          bannerNameEng:'',
          link:'',
          linkEng:'',
          description:'',
          descriptionEng:'',
          previewImage: null,
          previewImageEng: null,

          firstLoad:true
        };
    },

    mounted() {
      this.getBanner().then(res=>{
        if(res.success){
          for(let i=0;i<res['data'].length;i++){
            this.list.push({"id":res['data'][i].id});
          }
          this.firstLoad=false;
        }

      });
    },

    methods: {

      loadDataToComponent(res){
        let data = res.data


            this.bannerName=data.banName,
            this.bannerNameEng=data.BannerTrans[0].banName,
            this.link=data.link,
            this.linkEng=data.BannerTrans[0].link,
            this.description=data.description,
            this.descriptionEng=data.BannerTrans[0].description
        this.previewImage=data.image
        this.previewImageEng=data.BannerTrans[0].image

      },

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
      onShow(banner_id){
        this.getBannerOne({'banner_id':banner_id}).then(res=>{
          if(res.success){
            this.loadDataToComponent(res);
            this.$store.commit("modalShow_State", true);
          }
        })
      },
      checkMove: function(e) {
        window.console.log("Future index: " + e.draggedContext.futureIndex);

      },

      saveChangeOrderBanner(){
        this.orderBanner({'res':this.banner['data']})
      },

    ...mapActions({
getBanner:'Banner/getBanner',
      orderBanner:'Banner/orderBanner',
      getBannerOne:'Banner/getBannerOne'


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

    grab-icon {
      cursor: move;
    }
  }
}


</style>