<template>
  <div id="Topping-page">
    <section class="topping-container">
      <div class="header">
        <h2>{{$t('PackageType.priority.title')}}</h2>
      </div>

      <div class="lang-select-input" v-if="$t('PackageType.priority.lang') === 'la'">
        <v-tabs v-model="tab" color="primary" slider-color="primary">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab
              :href="type.key"
              v-for="type in package_type['data']"
              :key="type.key"
              @click="onTab(type.id)"
          >
            {{ type.type_name }}
          </v-tab>
        </v-tabs>
        <div class="tab-content">
          <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="(item,i) in package_type['data']"
                :key="'B'+i"
                :value="i"
            >
              <div class="card-form">
                <div class="form-content">
                  <v-row>

                    <v-col cols="12" sm="12" md="12" xl="12" lg="12">

                      <v-checkbox
                          v-model="checkbox1"
                          :label="$t('Topping.manage')"
                      ></v-checkbox>
                      <div class="preview">
                        <draggable v-model="list" :disabled="!checkbox1">
                          <transition-group>
                            <div v-for="(element,i) in list" :key="'C'+i">
                              <div class="Promotion mb-3" v-if="!checkbox1">
                                <v-row no-gutters>
                                  <v-col cols="2"
                                         >
                                    <h3>{{`${element.package.priority}`}}</h3>
                                  </v-col>
                                  <v-col cols="8"
                                         >
                                    <h3>{{`${element.package.name} `}}</h3>
                                  </v-col>
                                </v-row>

                              </div>
                              <div class="ActiveBox mb-3" v-else>

                                <v-row  no-gutters>
                                  <v-col cols="1">       <v-icon
                                      small
                                      class="grab-icon"
                                      color="#ffffff"
                                  >
                                    mdi-arrow-all

                                  </v-icon>

                                  </v-col>
                                  <v-col cols="1"
                                         >
                                    <h3>{{`${element.package.priority}`}}</h3>
                                  </v-col>
                                  <v-col cols="8">

                                    <h3>{{`${element.package.name} `}}</h3>
                                  </v-col>


                                </v-row>
                              </div>
                            </div>
                          </transition-group>
                        </draggable>

                      </div>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>

      <div class="lang-select-input" v-else>
        <v-tabs v-model="tab" color="primary" slider-color="primary">
          <v-tabs-slider color="primary"></v-tabs-slider>
          <v-tab
              :href="type.key"
              v-for="type in package_type['data']"
              :key="type.key"
              @click="onTab(type.id)"
          >
            {{ type.TypePackagTrans[0].type_name }}
          </v-tab>
        </v-tabs>
        <div class="tab-content">
          <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="(item,i) in package_type['data']"
                :key="'B'+i"
                :value="i"
            >
              <div class="card-form">
                <div class="form-content">
                  <v-row>

                    <v-col cols="12" sm="12" md="12" xl="12" lg="12">

                      <v-checkbox
                          v-model="checkbox1"
                          :label="$t('Topping.manage')"
                      ></v-checkbox>
                      <div class="preview">
                        <draggable v-model="list" :disabled="!checkbox1">
                          <transition-group>
                            <div v-for="(element,i) in list" :key="'C'+i">
                              <div class="Promotion mb-3" v-if="!checkbox1">
                                <v-row no-gutters>
                                  <v-col cols="2"
                                  >
                                    <h3>{{`${element.package.priority}`}}</h3>
                                  </v-col>
                                  <v-col cols="8"
                                  >
                                    <h3>{{`${element.package.NewPackageTrans[0].name} `}}</h3>
                                  </v-col>
                                </v-row>

                              </div>
                              <div class="ActiveBox mb-3" v-else>

                                <v-row  no-gutters>
                                  <v-col cols="1">       <v-icon
                                      small
                                      class="grab-icon"
                                      color="#ffffff"
                                  >
                                    mdi-arrow-all

                                  </v-icon>

                                  </v-col>
                                  <v-col cols="1"
                                  >
                                    <h3>{{`${element.package.priority}`}}</h3>
                                  </v-col>
                                  <v-col cols="8">

                                    <h3>{{`${element.package.NewPackageTrans[0].name} `}}</h3>
                                  </v-col>


                                </v-row>
                              </div>
                            </div>
                          </transition-group>
                        </draggable>

                      </div>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </v-tab-item>
          </v-tabs-items>
        </div>
      </div>

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
  name: "Priority",
  components: {
    draggable,
  },
  data() {
    return {
      package_type_id:0,
      checkbox1: false,
      selectItem1: 1,
      selectItem2: 2,
      selectItem3: 3,
      list:[],
      tab:null,
    };
  },

  mounted() {
    this.getPackageType().then((res)=>{
      if(res.success){
        this.onTab(res['data'][0].id)
      }
    });



  },

  methods: {

    onTab(packageTypeId){
      this.package_type_id = packageTypeId
      this.list=[]
      this.getPackageTypePriority({'packageTypeId':packageTypeId}).then(res=>{
        if(res.success){
          for(let i=0;i<res['data'].NewPackages.length;i++){
            this.list.push({"package":res['data'].NewPackages[i]});
          }
        }
      });
    },

    onSubmit(){
      this.updatePackageTypePriority({package_type_id:this.package_type_id,package_id:this.list}).then(res=>{
        this.list=[]
        this.getPackageTypePriority({'packageTypeId':this.package_type_id}).then(res=>{
          if(res.success){
            for(let i=0;i<res['data'].NewPackages.length;i++){
              this.list.push({"package":res['data'].NewPackages[i]});
            }
          }
        });
      })
    },

    ResetForm() {
      this.list=[]
      this.getPackageTypePriority({'packageTypeId':this.package_type_id}).then(res=>{
        if(res.success){
          for(let i=0;i<res['data'].NewPackages.length;i++){
            this.list.push({"package":res['data'].NewPackages[i]});
          }
        }
      });

    },

    ...mapActions({
      getPackageType:"PackageType/getPackageType",
      getPackageTypePriority:"PackageType/getPackageTypePriority",
      updatePackageTypePriority:'PackageType/updatePackageTypePriority'
    })
  },

  computed:{
    ...mapGetters({
      package_type_priority:"PackageType/package_type_priority",
      package_type:"PackageType/package_type"
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