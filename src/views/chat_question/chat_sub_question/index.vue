<template>
  <div id="ChatQuestion">
    <section class="chat_question-section">
      <div class="header chat_question-header">
        {{"sub"}}
        <h1>{{ $t("ChatQuestion.title") }}</h1>
        <v-btn @click="CreateChatQuestion" class="btn btn-create">
          <v-icon>fal fa-plus-circle</v-icon>{{ $t("ChatQuestion.button") }}</v-btn
        >
      </div>
      <div class="cate_post-content">
        <v-data-table
            :headers="$t('ChatQuestion.table.headers')"
            :items="chat_sub_question['subQuestionData']"
            :search="searchItem"
            :loading="loading"
            :loading-text="$t('ChatQuestion.loadingtext')"
            v-if="chat_sub_question['subQuestionData'] != []"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-text-field
                  :label="$t('ChatQuestion.txtsearch')"
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
            <tr class="table-content" v-if="isLaoLanguage" @click="onClickRow(item.id)">
              <td>{{ index + 1 }}</td>
              <td>{{ item.ChatQuestionTrans[0].question }}</td>
              <td v-if="item.ChatQuestionTrans[0].answer != ''">{{ item.ChatQuestionTrans[0].answer }}</td>
              <td v-else> <v-chip

                  dark
              >
                ບໍ່ມີຄຳຕອບ
              </v-chip></td>

              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{on,attrs}">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link @click="$router.push({name:'chat_question.edit',params:{
                         'chat_question_id':item.id,
     }}).catch(()=>{})">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{$t('ChatQuestion.table.options.iconEdit')}}</v-icon>
                        <v-list-item-title>
                          {{$t('ChatQuestion.table.options.edit')}}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{$t('ChatQuestion.table.options.delicon')}}</v-icon>
                        <v-list-item-title>
                          {{$t('ChatQuestion.table.options.delete')}}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>

            <tr class="table-content" v-else @click="onClickRow(item.id)">
              <td>{{ index + 1 }}</td>
              <td>{{ item.ChatQuestionTrans[1].question }}</td>
              <td v-if="item.ChatQuestionTrans[1].answer != ''">{{ item.ChatQuestionTrans[1].answer }}</td>
              <td v-else> <v-chip

                  dark
              >
                No answer
              </v-chip></td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{on,attrs}">
                    <v-btn icon v-on="on" v-bind="attrs">
                      <v-icon small>fas fa-ellipsis-v</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item link @click="$router.push({name:'chat_question.edit',params:{
                         'chat_question_id':item.id
     }}).catch(()=>{})">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{$t('ChatQuestion.table.options.iconEdit')}}</v-icon>
                        <v-list-item-title>
                          {{$t('ChatQuestion.table.options.edit')}}
                        </v-list-item-title>
                      </v-list-item-icon>
                    </v-list-item>
                    <v-list-item link @click="onDelete(item.id)">
                      <v-list-item-icon>
                        <v-icon class="mr-3" small>{{$t('ChatQuestion.table.options.delicon')}}</v-icon>
                        <v-list-item-title>
                          {{$t('ChatQuestion.table.options.delete')}}
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
          <h3>{{ $t("ChatQuestion.table.dontdata") }}</h3>
        </div>
      </div>
      <ModalDelete>
        <template v-slot="{close}">
          <Delete :chat_question_id="chat_question_id" @close="close"/>
        </template>
      </ModalDelete>
    </section>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import Delete from "@/components/forms/chat_question/Delete";
export default {
  name: "CatePost",

  components: {
    Delete
  },
  data() {
    return {
      chat_question_id:'',
      isLaoLanguage:localStorage.getItem('lang')==='la',
      loading: false,

      searchItem: "",
    };
  },

  mounted() {
    this.getChatSubQuestion({'chat_question_id':this.$route.params.chat_question_id}).then(
        res=>{
          if(res.success){
            console.log("success")
          }
        }
    );

  },

  methods: {
    onClickRow(chat_question_id){
      console.log("click");
      this.$router
          .push({
            name: "chat_sub_question.index",
            params:{'chat_question_id':chat_question_id}
          })
          .catch(() => {});

      this.getChatSubQuestion({'chat_question_id':chat_question_id}).then(
          res=>{
            if(res.success){
              console.log("success")
            }
          }
      );
    },

    CreateChatQuestion() {
      this.$router
          .push({
            name: "chat_sub_question.create",
            params:{'chat_question_id':this.$route.params.chat_question_id}
          })
          .catch(() => {});
    },
    onDelete(chat_question_id) {
      this.chat_question_id = chat_question_id

      this.$store.commit("modalDelete_State", true);
    },

    ...mapActions({
      getChatSubQuestion:'ChatQuestion/getChatSubQuestion'
    })
  },
  computed:{
    ...mapGetters({
      chat_sub_question:'ChatQuestion/chat_sub_question'
    })
  }
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