<template>
  <div id="PackageType">
    <section class="package_type-section">
      <v-skeleton-loader
          class="mx-auto"
          type="table"
          v-if="firstLoad"
      ></v-skeleton-loader>
      <div class="header package_type-header" v-show="!firstLoad">
        <h1>{{ $t("PackageType.title") }}</h1>


      </div>

      <div class="package_type-content" v-show="!firstLoad">
        <v-data-table
            :headers="$t('PackageType.table.headers')"
            :items="package_type['data']"
            :search="searchItem"
            :loading="loading"
            :loading-text="$t('PackageType.loadingtext')"
            v-if="package_type['data'] != ''"
            :footer-props="{
            'items-per-page-text': $t('row_per_page'),
          }"
          :no-data-text="$t('no_data')"
        >
          <template v-slot:[`footer.page-text`]="items">
            {{ items.pageStart }} - {{ items.pageStop }} {{ $t("of") }}
            {{ items.itemsLength }}
          </template>
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                  :label="$t('PackageType.txtsearch')"
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
              <td><v-img :src="item.image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.type_name }}</td>


              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{on,attrs}">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>

                    <v-list-item link @click="$router.push({name:'package_type.edit',params:{
                      'package_type_id':item.id,

                   }}).catch(()=>{})">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{$t('PackageType.table.options.iconEdit')}}</v-icon>
                        <v-list-item-title>
                          {{$t('PackageType.table.options.edit')}}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>

                  </v-list>
                </v-menu>
              </td>
            </tr>

            <tr class="table-content" v-else>
              <td>{{ index + 1 }}</td>
              <td><v-img :src="item.image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.TypePackagTrans[0].type_name }}</td>

              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{on,attrs}">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>

                    <v-list-item link @click="$router.push({name:'package_type.edit',params:{
                      'package_type_id':item.id,

                   }}).catch(()=>{})">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{$t('PackageType.table.options.iconEdit')}}</v-icon>
                        <v-list-item-title>
                          {{$t('PackageType.table.options.edit')}}
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
          <h3>{{ $t("PackageType.table.dontdata") }}</h3>
        </div>
      </div>

    </section>

  </div>
</template>

<script>

import {mapActions,mapGetters} from 'vuex'

export default {
  name: 'PackageType',

  data() {
    return {
      package_type_id:'',
      isLaoLanguage:localStorage.getItem('lang') === 'la',
      loading: false,
      searchItem: "",
      firstLoad:true,

    };
  },

  mounted() {
    this.getPackageType().then((res)=>{
      console.log(res)
      this.firstLoad = false;
    });
  },

  methods: {


    ...mapActions({
      getPackageType:'PackageType/getPackageType',

    })
  },

  computed:{
    ...mapGetters({
      package_type:'PackageType/package_type',

    })
  }
};
</script>

<style lang="scss" scoped>
.package_type-section {
  width: 100%;
  background-color: $white-color;

  .package_type-content {
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