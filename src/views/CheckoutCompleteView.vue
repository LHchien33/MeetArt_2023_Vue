<template>
  <h1 class="fs-4 fs-xxl-3 mb-3 mb-md-5">
    <span class="material-symbols-outlined align-bottom me-1">credit_score</span>付款完成
  </h1>
  
</template>

<script>
import { RouterLink } from 'vue-router';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  emits: ['updateStep'],
  components: {
    RouterLink
  },
  mounted(){
    this.$emit('updateStep', 4)
  }
}
</script>

<style scoped>

</style>