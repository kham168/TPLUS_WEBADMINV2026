<template>
  <div id="Post">
    <section class="post-section">
      <div class="header post-header">
        <h1>{{ $t("Post.title") }}</h1>
        <v-btn @click="CreatePost" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("Post.button") }}</v-btn
        >
      </div>
      <div class="post-content">
        <v-data-table
          :headers="$t('Post.table.headers')"
          :items="myPost"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('Post.loadingtext')"
          v-if="myPost != ''"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('Post.txtsearch')"
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
              <td>{{ item.PostName }}</td>
              <td>{{ item.CatePost }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.Picture }}</td>
              <td>
               <v-menu offset-y>
                 <template v-slot:activator="{on,attrs}">
                   <v-btn icon v-on="on" v-bind="attrs">
                  <v-icon small>fas fa-ellipsis-v</v-icon>
                </v-btn>
                 </template>
                 <v-list>
                   <v-list-item link @click="$router.push({name:'post.edit'}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Post.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Post.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link>
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Post.table.options.delicon')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Post.table.options.delete')}}
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
          <h3>{{ $t("Post.table.dontdata") }}</h3>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Post",

  data() {
    return {
      loading: false,
      myPost: [
        {
          PostName: "Phone",
          CatePost: "Hardware",
          description: "message something",
          Picture: "feokfkowofweorwo",
        },
      ],
      searchItem: "",
    };
  },

  mounted() {},

  methods: {
    CreatePost() {
      this.$router
        .push({
          name: "post.create",
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.post-section {
  width: 100%;
  background-color: $white-color;

  .post-content {
    width: 100%;
    padding: 1rem;

  }
}
</style>