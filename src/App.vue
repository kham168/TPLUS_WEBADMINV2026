<template>
  <v-app>
    
    <v-main>
      <div v-if="$route.meta.layout=='admin'">
        <Adminlayout v-if="!$route.meta.hiddens"/>
      </div>
      <div v-if="$route.meta.layout=='default'">
        <DefaultLayout/>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Adminlayout from "./views/layout/adminLayout.vue"
import DefaultLayout from "./views/layout/defaultLayout.vue"
export default {
  name: 'App',
  components:{
  Adminlayout,
  DefaultLayout
  },
  data: () => ({
    //
  }),
};
</script>
