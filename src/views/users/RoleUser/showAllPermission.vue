<template>
  <div class="main-show">
    <v-row>
      <v-col v-for="(item,idx) in listPermission" :key="idx" cols="4" md="4" lg="4">
        <div class="card-permission" v-if="listPermission.length > 0">
          {{ item.name }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    listPermission: {}
  },
  data() {
    return {}
  },
  watch: {
    listPermission(val) {
      console.log(val)
    }
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.main-show {
  height: auto;
  width: 600px;
  overflow: hidden !important;
  display: flex;
  flex-direction: row;
  padding: 40px;

  .card-permission {
    width: 100%;
    height: 60px;
    background: #4b96da;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 300;
    text-transform: capitalize;
    text-align: center;
    border-radius: 4px;
  }
}
</style>
