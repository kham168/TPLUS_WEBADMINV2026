<template>
  <div id="Topping-page">
    <section class="topping-container">
      <div class="header">
        <h2>{{$t('Topping.title')}}</h2>
      </div>

      <v-row>

        <v-col cols="12" sm="12" md="12" xl="12" lg="12">

          <v-checkbox
              v-model="checkbox1"
              :label="$t('Topping.manage')"
          ></v-checkbox>
          <div class="preview">
            <draggable v-model="list" :disabled="!checkbox1">
              <transition-group>
                <div v-for="element in list" :key="element.type">
                  <div class="Promotion mb-3" v-if="!checkbox1">
                    <h3>{{ element.type }}</h3>
                  </div>
                  <div class="ActiveBox mb-3" v-else>

                    <v-row  no-gutters>
                      <v-col cols="1">       <v-icon
                          small
                          class="grab-icon"
                          color="#ffffff"
                      >
                        mdi-arrow-all
                      </v-icon></v-col>
                      <v-col cols="10">

                        <h3>{{ element.type }}</h3>
                      </v-col>


                    </v-row>
                  </div>
                </div>
              </transition-group>
            </draggable>
<!--            <div class="Promotion" :style="{ order: selectItem1 }">-->
<!--              <h3>Promotion</h3>-->
<!--            </div>-->
<!--            <div class="package" :style="{ order: selectItem2 }">-->
<!--              <h3>Package</h3>-->
<!--            </div>-->
<!--            <div class="Activity" :style="{ order: selectItem3 }">-->
<!--              <h3>Activity</h3>-->
<!--            </div>-->
<!--            <div class="SIM-Card" :style="{ order: selectItem4 }">-->
<!--              <h3>SIM Card</h3>-->
<!--            </div>-->
<!--            <div class="Activity" :style="{ order: selectItem5 }">-->
<!--              <h3>Activity</h3>-->
<!--            </div>-->
<!--            <div class="Promotion" :style="{ order: selectItem6 }">-->
<!--              <h3>Promotion</h3>-->
<!--            </div>-->
          </div>
        </v-col>
      </v-row>


      <div class="action">
        <v-btn @click="ResetForm" text class="btn btn-create"> reset </v-btn>
        <v-btn class="btn btn-create" @click="onSubmit"> save </v-btn>
      </div>
    </section>
  </div>
</template>

<script>
import {mapActions,mapGetters} from "vuex";
import draggable from 'vuedraggable'
export default {
  name: "Topping",
  components: {
    draggable,
  },
  data() {
    return {
      checkbox1: false,
      selectItem1: 1,
      selectItem2: 2,
      selectItem3: 3,
      list:[],
    };
  },

  mounted() {
    this.getTopping().then(res=>{
      if(res.success){
        for(let i=0;i<res['data'].length;i++){
          this.list.push({"type":res['data'][i].type});
        }
      }
    });
  },

  methods: {

    onSubmit(){
      this.updateTopping({topping:this.list})
    },

    ResetForm() {

      this.getTopping().then(res=>{
        this.list = []
        if(res.success){
          for(let i=0;i<res['data'].length;i++){
            this.list.push({"type":res['data'][i].type});
          }
        }
      });
      // this.selectItem4 = 4;
      // this.selectItem5 = 5;
      // this.selectItem6 = 6;
    },

    ...mapActions({
      getTopping:"Topping/getTopping",
      updateTopping:'Topping/updateTopping'
    })
  },

  computed:{
    ...mapGetters({
      topping:"Topping/topping"
    })
  }
};
</script>

<style lang="scss" scoped>
.form {
  width: 100%;
  padding: 1rem;
}
.preview {
  width: 100%;
  padding: 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  border: 1px solid $gray-color;
  border-radius: 0.2rem;
  gap: 0.5rem;
}
.banner,
.Main-Menu,
.package,
.SIM-Card,
.Activity,
.Promotion {
  width: 100%;
  height: 50px;
  background-color: rgb(218, 215, 215);
  border-radius: 0.3rem;
  text-align: center;
  padding: 10px;
  color: $gray-color;
}
.ActiveBox {
  width: 100%;
  height: 50px;
  background-color: #343131;
  border-radius: 0.3rem;
  text-align: center;
  padding: 10px;
  color: #FFFFFF;
}

.action {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>