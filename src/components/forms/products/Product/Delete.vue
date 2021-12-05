<template>
  <div class="modal-delete">
    <div class="delete-title">
      <span><i class="fas fa-exclamation-circle"></i> {{$t('Modal.confirmDelete')}}</span>
    </div>
    <div class="delete-btn">
      <v-btn outlined class="btn-cancel" @click="$emit('close')">
        {{$t('Modal.btnCancel')}}
      </v-btn>

 <v-btn class="btn-delete" @click="deleteProduct({'product_id':product_id})" >
          {{$t('Modal.btnConfirm')}}
      </v-btn>

    
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      btnLoading: false,
    }
  },
  props: {
    product_id: {}
  },
  methods: {
    
      ...mapActions({
          deleteProduct:'Product/deleteProduct'
      })
   
  }
}
</script>

<style scoped lang="scss">
.modal-delete{
   max-width: 100%;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
}
</style>
