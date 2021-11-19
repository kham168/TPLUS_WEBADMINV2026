<template>
  <div id="Topping-page">
    <section class="topping-container">
      <div class="header">
        <h2>{{$t('Topping.title')}}</h2>
      </div>
      <v-row>
        <v-col cols="12" sm="12" md="4" xl="4" lg="4">
          <div class="form">
            <v-form>
              <v-select
                :items="toppings"
                :item-text="'topping'"
                :item-value="'position'"
                v-model="selectItem1"
                label="Section 1"
                outlined
                dense
                @input="CutItem($event)"
              ></v-select>
              <v-select
                :items="toppings"
                :item-text="'topping'"
                :item-value="'position'"
                v-model="selectItem2"
                label="Section 2"
                outlined
                dense
              ></v-select>
              <v-select
                :items="toppings"
                :item-text="'topping'"
                :item-value="'position'"
                v-model="selectItem3"
                label="Section 3"
                outlined
                dense
              ></v-select>
              <v-select
                :items="toppings"
                :item-text="'topping'"
                :item-value="'position'"
                v-model="selectItem4"
                label="Section 4"
                outlined
                dense
              ></v-select>
              <v-select
                :items="toppings"
                :item-text="'topping'"
                :item-value="'position'"
                v-model="selectItem5"
                label="Section 5"
                outlined
                dense
              ></v-select>
              <v-select
                :items="toppings"
                :item-text="'topping'"
                :item-value="'position'"
                v-model="selectItem6"
                label="Section 6"
                outlined
                dense
              ></v-select>
            </v-form>
          </div>
        </v-col>
        <v-col cols="12" sm="12" md="8" xl="8" lg="8">
          <h4>Preview</h4>
          <div class="preview">
            <div class="banner" :style="{ order: selectItem1 }">
              <h3>Banner</h3>
            </div>
            <div class="Main-Menu" :style="{ order: selectItem2 }">
              <h3>Main menu</h3>
            </div>
            <div class="package" :style="{ order: selectItem3 }">
              <h3>Package</h3>
            </div>
            <div class="SIM-Card" :style="{ order: selectItem4 }">
              <h3>SIM Card</h3>
            </div>
            <div class="Activity" :style="{ order: selectItem5 }">
              <h3>Activity</h3>
            </div>
            <div class="Promotion" :style="{ order: selectItem6 }">
              <h3>Promotion</h3>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="action">
        <v-btn @click="ResetForm" text class="btn btn-create"> reset </v-btn>
        <v-btn class="btn btn-create"> save </v-btn>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Topping",

  data() {
    return {
      selectItem1: 1,
      selectItem2: 2,
      selectItem3: 3,
      selectItem4: 4,
      selectItem5: 5,
      selectItem6: 6,
      toppings: [
        { position: 1, topping: "Banner" },
        { position: 2, topping: "Main Menu" },
        { position: 3, topping: "Package" },
        { position: 4, topping: "SIM Card" },
        { position: 5, topping: "Activity" },
        { position: 6, topping: "Promotion" },
      ],
    };
  },

  mounted() {},

  methods: {
    ResetForm() {
      this.selectItem1 = 1;
      this.selectItem2 = 2;
      this.selectItem3 = 3;
      this.selectItem4 = 4;
      this.selectItem5 = 5;
      this.selectItem6 = 6;
    },
  },
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
.action {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>