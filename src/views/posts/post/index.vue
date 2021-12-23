<template>
  <div id="Post">
    <section class="post-section">
      <v-skeleton-loader
          class="mx-auto"

          type="table"

          v-if="firstLoad"
      ></v-skeleton-loader>
      <div class="header post-header" v-show="!firstLoad">
        <h1>{{ $t("Post.title") }}</h1>
        <v-btn @click="CreatePost" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("Post.button") }}</v-btn
        >
      </div>

      <div class="post-content" v-show="!firstLoad">
        <v-data-table
          :headers="$t('Post.table.headers')"
          :items="post.data[0].Posts"
          :search="searchItem"

          :loading-text="$t('Post.loadingtext')"
          v-if="post.data[0].Posts != ''"
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

          <template v-slot:item="{item , index}">
            <tr class="table-content" v-if="isLaoLanguage">
              <td>{{ index + 1 }}</td>
              <td><v-img :src="item.PostImages[0].image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.title }}</td>
              <td ><p v-for="data in item.newsCategories">{{ data.name}}</p></td>
              <td style="   max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;" v-html="item.description"></td>
              <td>{{ item.status }}</td>
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
                   <v-list-item link @click="$router.push({name:'post.edit',params:{
                     'post_id':item.id,
     }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Post.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Post.title')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
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
            <tr class="table-content" v-else>
              <td>{{ index + 1 }}</td>
              <td><v-img :src="item.PostImageTrans[0].image" alt="preview" max-height="50" max-width="50"></v-img></td>
              <td>{{ item.PostTrans[0].title }}</td>
              <td><p v-for="element in item.newsCategories">{{element.NewsCategoryTrans[0].name}}</p></td>
              <td style="   max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;" v-html="item.PostTrans[0].description"></td>
              <td>{{ item.status }}</td>
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
                   <v-list-item link @click="$router.push({name:'post.edit',params:{
                     'post_id':item.id,
      }}).catch(()=>{})">
                     <v-list-item-icon>
                       <v-icon class="mr-3" small>{{$t('Post.table.options.iconEdit')}}</v-icon>
                       <v-list-item-title>
                         {{$t('Post.table.options.edit')}}
                       </v-list-item-title>
                     </v-list-item-icon>
                   </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
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
                   <ModalDelete>
        <template v-slot="{close}">
          <Delete :post_id="post_id" @close="close" />
        </template>
      </ModalDelete>

      <ModalShow>
        <template v-slot="{close}">
          <Show
          :descriptionText="descriptionText"
          :descriptionTextEng="descriptionTextEng"
          :postName="postName"
          :postNameEng="postNameEng"
          :statusValue="statusValue"
          :catePostValue="catePostValue"

          :previewImage="previewImage"
          :previewImageEng="previewImageEng"
              @close="close" />
        </template>
      </ModalShow>
    </section>
  </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Delete from "@/components/forms/posts/post/Delete";
import Show from "@/components/forms/posts/post/Show";
import ModalShow from "@/components/Modals/modalShow";
export default {

  name: "Post",

components: {
    Delete,
    Show,
    ModalShow
  },
  data() {
    return {
      post_id:'',
      isLaoLanguage:localStorage.getItem('lang') === 'la',
      image:'@/src/assets/logo.png',
      loading: true,

      searchItem: "",

      descriptionText: '',
      descriptionTextEng: '',
      postName: '',
      postNameEng: '',
      statusValue: '',
      catePostValue:[],

      previewImage: [],
      previewImageEng: [],
      firstLoad:true,
    };
  },

  mounted() {

    this.getPost().then((res)=>{
      if(res.success){
        this.firstLoad=false;
      }
    })

  },

  methods: {

    loadDataToComponent(res) {

      let data = res.data;
      this.previewImage=[];
      this.previewImageEng=[];

          this.descriptionText = data.description,
          this.descriptionTextEng = data.PostTrans[0].description,
          this.postName = data.title,
          this.postNameEng = data.PostTrans[0].title,

          this.catePostValue = data.newsCategories,

          this.dateStart = new Date(data.startDate).toISOString().substr(0, 10),
          this.dateEnd = new Date(data.endDate).toISOString().substr(0, 10)

      console.log(data)

      for (let i = 0; i < data.PostImages.length; i++) {

        let url = data.PostImages[i].image;
        this.previewImage.push(url);


      }

      for (let i = 0; i < data.PostImageTrans.length; i++) {

        let url = data.PostImageTrans[i].image;
        this.previewImageEng.push(url);

      }


    },

    CreatePost() {
      this.$router
        .push({
          name: "post.create",
        })
        .catch(() => {});
    },
     onDelete(post_id) {
        this.post_id = post_id

      this.$store.commit("modalDelete_State", true);
    },
    onShow(post_id) {

  this.getPostOne({'post_id':post_id}).then(res=>{
    if(res.success){
      this.loadDataToComponent(res);
    }
  }),
      this.$store.commit("modalShow_State", true);
    },

           ...mapActions({
getPost:'Post/getPost',
getCatePostOne:'CatePost/getCatePostOne',
                 getPostOne: 'Post/getPostOne'

        }
        )
  },

  computed:{
    ...mapGetters({
        post:'Post/post',
        cate_post_one:'CatePost/cate_post_one'


        })
  }
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
