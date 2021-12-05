<template>
  <div class="modal-show">
    <div class="delete-title">
      <span><i class="fas fa-exclamation-circle"></i> {{$t('Modal.confirmDelete')}}</span>
    </div>

    <h1>GG</h1>

  
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
    contact_id: {}
  },
  methods: {
      ...mapActions({
          getContactOne:'Contact/getContactOne'
      })
   
  }
}
</script>

<style scoped lang="scss">
.modal-show{
   max-width: 100%;
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
}
</style>
