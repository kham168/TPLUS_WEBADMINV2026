<template>
  <v-app>
    <v-main>
       <Notification/>
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
import Notification from "./components/Notification/notification.vue"

export default {
  name: 'App',
  components:{
  Adminlayout,
  DefaultLayout,
  Notification,
  },
  data: () => ({
    //
  }),

};
</script>
