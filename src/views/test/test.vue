<template>
    <div id="TplusWebAdminTest">
        <h1>Test</h1>
    
          <button @click="getPost()">get Post from API</button> <br>
           <button @click="createPost({'title':'title','body':'body','userId':1})">create Post from API</button> <br>
       


  <v-data-table
    :headers="headers"
    :items="post"
    :items-per-page="5"
    class="elevation-1"

  ></v-data-table>

     
    </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'TplusWebAdminTest',

    data() {
        return {
         
             headers: [
          {
            text: 'id',
            align: 'start',
            sortable: false,
            value: 'id',
          },
          { text: 'title', value: 'title' },
          { text: 'body', value: 'body' },
        
        ],
       
        };
    },

    mounted() {
       this.getPost();
    },

    methods: {

        ...mapActions({
getPost:'getPost',
createPost:'createPost'
        } 
        )
    },

    computed:{

        ...mapGetters({
        post:'post',
        res:'res'

        })
    }
};
</script>

<style lang="scss" scoped>

</style>