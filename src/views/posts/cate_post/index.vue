<template>
  <div id="CatePost">
    <section class="cate_post-section">
      <div class="header cate_post-header">
        <h1>{{ $t("Post.title") }}</h1>
        <v-btn @click="CreateCatePost" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("CatePost.button") }}</v-btn
        >
      </div>
      <div class="cate_post-content">
        <v-data-table
          :headers="$t('CatePost.table.headers')"
          :items="myCatePost"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('CatePost.loadingtext')"
          v-if="myCatePost != ''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('CatePost.txtsearch')"
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
            <tr class="table-content">
              <td>{{ index + 1 }}</td>
              <td>{{ item.CatePostName }}</td>
              <td>{{ item.description }}</td>
        
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'cate_post.edit'}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CatePost.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CatePost.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('CatePost.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('CatePost.table.options.delete')}}
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
          <h3>{{ $t("CatePost.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "CatePost",

  data() {
    return {
      loading: false,
      myCatePost: [
        {
          CatePostName: "Phone",
          description: "message something",
         
        },
      ],
      searchItem: "",
    };
  },

  mounted() {},

  methods: {
    CreateCatePost() {
      this.$router
        .push({
          name: "cate_post.create",
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.cate_post-section {
  width: 100%;
  background-color: $white-color;

  .cate_post-content {
    width: 100%;
    padding: 1rem;

  }
}
</style>