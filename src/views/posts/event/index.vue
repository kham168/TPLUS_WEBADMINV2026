<template>
  <div id="PromotionEvent">
    <section class="promotionEvent-section">
      <v-skeleton-loader
        class="mx-auto"
        type="table"
        v-if="firstLoad"
      ></v-skeleton-loader>

      <div class="header promotionEvent-header" v-show="!firstLoad">
        <h1>{{ $t("PromotionEvent.title_event") }}</h1>
        <v-btn @click="CreatePost" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon
          >{{ $t("PromotionEvent.button") }}</v-btn
        >
      </div>

      <div class="promotionEvent-content" v-show="!firstLoad">
        <v-data-table
          :headers="$t('PromotionEvent.table.headers')"
          :items="event['Posts']"
          :search="searchItem"
          :loading="loading"
          :loading-text="$t('PromotionEvent.loadingtext')"
          v-if="event['Posts'] !== ''"
          :footer-props="{
            'items-per-page-text': $t('row_per_page'),
          }"
          :no-data-text="$t('no_data')"
        >
          <template v-slot:[`footer.page-text`]="items">
            {{ items.pageStart }} - {{ items.pageStop }} {{ $t("of") }}
            {{ items.itemsLength }}
          </template>
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                :label="$t('PromotionEvent.txtsearch_event')"
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
              <td>
                <v-img
                  v-if="item.PostImages && item.PostImages.length > 0"
                  :src="item.PostImages[0].image"
                  alt="preview"
                  max-height="50"
                  max-width="50"
                ></v-img>
              </td>
              <td>{{ item.title }}</td>

              <td
                style="
                  max-width: 200px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
                v-html="`${item.description || ''}`"
              ></td>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>

              <td>
                <v-chip :color="getColor(item.status)" dark>
                  {{ item.status }}
                </v-chip>
              </td>
              <td>
                <v-btn icon @click="onShow(item.id)">
                  <v-icon large> mdi-eye </v-icon></v-btn
                >
              </td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      link
                      @click="
                        $router
                          .push({
                            name: 'event.edit',
                            params: {
                              promotion_event_id: item.id,
                            },
                          })
                          .catch(() => {})
                      "
                    >
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("PromotionEvent.table.options.iconEdit")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("PromotionEvent.table.options.edit") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("Post.table.options.delicon")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("Post.table.options.delete") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
            <tr class="table-content" v-else>
              <td>{{ index + 1 }}</td>
              <td>
                <v-img v-if="item.PostImageTrans && item.PostImageTrans.length > 0" :src="item.PostImageTrans[0].image" alt="preview" max-height="50" max-width="50"></v-img>
                <v-img v-else-if="item.PostImages && item.PostImages.length > 0" :src="item.PostImages[0].image" alt="preview" max-height="50" max-width="50"></v-img>
              </td>
              <td>{{ item.PostTrans && item.PostTrans.length > 0 ? item.PostTrans[0].title : '' }}</td>

              <td
                style="
                  max-width: 200px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                "
                v-html="`${item.PostTrans && item.PostTrans.length > 0 ? item.PostTrans[0].description : ''}`"
              ></td>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>
              <td>
                <v-chip :color="getColor(item.status)" dark>
                  {{ item.status }}
                </v-chip>
              </td>

              <td>
                <v-btn icon @click="onShow(item.id)">
                  <v-icon large> mdi-eye </v-icon></v-btn
                >
              </td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      link
                      @click="
                        $router
                          .push({
                            name: 'event.edit',
                            params: {
                              promotion_event_id: item.id,
                            },
                          })
                          .catch(() => {})
                      "
                    >
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("PromotionEvent.table.options.iconEdit")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("PromotionEvent.table.options.edit") }}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{
                          $t("PromotionEvent.table.options.delicon")
                        }}</v-icon>
                        <v-list-item-title>
                          {{ $t("PromotionEvent.table.options.delete") }}
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
          <h3>{{ $t("PromotionEvent.table.dontdata") }}</h3>
        </div>
      </div>
      <ModalDelete>
        <template v-slot="{ close }">
          <Delete :promotion_event_id="promotion_event_id" @close="close" />
        </template>
      </ModalDelete>

      <ModalShow>
        <template v-slot="{ close }">
          <Show
            :descriptionText="descriptionText"
            :descriptionTextEng="descriptionTextEng"
            :postName="postName"
            :postNameEng="postNameEng"
            :statusValue="statusValue"
            :catePostValue="catePostValue"
            :dateStart="dateStart"
            :dateEnd="dateEnd"
            :previewImage="previewImage"
            :previewImageEng="previewImageEng"
            @close="close"
          />
        </template>
      </ModalShow>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Delete from "@/components/forms/posts/promotion_event/Delete";
import Show from "@/components/forms/posts/promotion_event/Show";
import ModalShow from "@/components/Modals/modalShow";
export default {
  name: "PromotionEvent",

  components: {
    Delete,
    Show,
    ModalShow,
  },
  data() {
    return {
      promotion_event_id: "",
      isLaoLanguage: localStorage.getItem("lang") === "la",
      image: "@/src/assets/logo.png",
      loading: false,

      searchItem: "",
      isData: false,

      descriptionText: "",
      descriptionTextEng: "",
      postName: "",
      postNameEng: "",
      statusValue: "",
      catePostValue: "",
      dateStart: "",
      dateEnd: "",
      previewImage: [],
      previewImageEng: [],

      firstLoad: true,
    };
  },

  created() {
    this.getEvent().then((res) => {
      if (res.success) {
        this.firstLoad = false;
      }
    });
  },

  methods: {
    getColor(status) {
      if (status == "open") return "green";
      else return "red";
    },

    loadDataToComponent(res) {
      let data = res.data;
      this.previewImage = [];
      this.previewImageEng = [];

      this.descriptionText = data.description;
      this.descriptionTextEng = data.PostTrans && data.PostTrans.length > 0 ? data.PostTrans[0].description : '';
      this.postName = data.title;
      this.postNameEng = data.PostTrans && data.PostTrans.length > 0 ? data.PostTrans[0].title : '';
      this.statusValue = data.status;
      this.catePostValue = data.postTypeId;

      try {
        if (data.startDate) {
          this.dateStart = new Date(data.startDate).toISOString().substr(0, 10);
        }
      } catch (e) { console.error("Error parsing startDate", e); }
      
      try {
        if (data.endDate) {
          this.dateEnd = new Date(data.endDate).toISOString().substr(0, 10);
        }
      } catch (e) { console.error("Error parsing endDate", e); }

      if (data.PostImages) {
        for (let i = 0; i < data.PostImages.length; i++) {
          let url = data.PostImages[i].image;
          this.previewImage.push(url);
        }
      }

      if (data.PostImageTrans && data.PostImageTrans.length > 0) {
        for (let i = 0; i < data.PostImageTrans.length; i++) {
          let url = data.PostImageTrans[i].image;
          this.previewImageEng.push(url);
        }
      } else if (data.PostImages && data.PostImages.length > 0) {
        for (let i = 0; i < data.PostImages.length; i++) {
          let url = data.PostImages[i].image;
          this.previewImageEng.push(url);
        }
      }
    },

    CreatePost() {
      this.$router
        .push({
          name: "event.create",
        })
        .catch(() => {});
    },
    onDelete(promotion_event_id) {
      this.promotion_event_id = promotion_event_id;

      this.$store.commit("modalDelete_State", true);
    },

    onShow(promotion_event_id) {
      this.getPromotionEventOne({
        promotion_event_id: promotion_event_id,
      }).then((res) => {
        if (res.success) {
          this.loadDataToComponent(res);

          this.$store.commit("modalShow_State", true);
        }
      });
    },

    ...mapActions({
      getEvent: "PromotionEvent/getEvent",
      getPromotionEventOne: "PromotionEvent/getPromotionEventOne",
    }),
  },

  computed: {
    ...mapGetters({
      event: "PromotionEvent/event",
    }),
  },
};
</script>

<style lang="scss" scoped>
.promotionEvent-section {
  width: 100%;
  background-color: $white-color;

  .promotionEvent-content {
    width: 100%;
    padding: 1rem;
    .text-limit {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
