<template>
  <h1 class="fs-4 fs-xxl-3 mb-0 mb-md-5">
    <span class="material-symbols-outlined align-bottom">shopping_cart</span>填寫資訊
  </h1>

</template>

<script>
  export default {
    emits: ['updateStep'],
    mounted(){
      this.$emit('updateStep', 2)
    }
  }
</script>