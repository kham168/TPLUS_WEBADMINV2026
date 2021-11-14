<template>
    <div id="TplusWebAdminTest">
        <h1>Test</h1>
          <button @click="getPost()">get Post from API</button> <br>
           <button @click="createPost(post)">create Post from API</button> <br>
          {{post}}
    {{res}}
    </div>
</template>

<script>

import {mapActions, mapState} from 'vuex'

export default {
    name: 'TplusWebAdminTest',

    data() {
        return {
            
        };
    },

    mounted() {
        
    },

    methods: {
        ...mapActions({
            getPost:'getPost',
            createPost:'createPost'
        })
    },

    computed:{
        ...mapState({
        post:state=>state.post,
        res:state=>state.res

        })
    }
};
</script>

<style lang="scss" scoped>

</style>