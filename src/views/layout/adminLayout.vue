<template>
    <div id="App-Layout">
       <div class="Navbar">
          <Navbar/>
           <div class="container-content">
               <router-view></router-view>
           </div>
       </div>
       
    </div>
</template>

<script>
import Navbar from "../../components/Navbar.vue"
export default {
    name: 'Adminlayout',
  components:{
  Navbar,
 },
    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.container-content{
    width: 100%;
    background-color: #f0f2f5;
    padding: 1rem;
}
</style>