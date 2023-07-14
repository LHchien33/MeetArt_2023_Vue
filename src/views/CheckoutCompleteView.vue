<template>
  <div class="row">
    <div class="col-10 col-sm-8 col-md-7 col-lg-5 mx-auto bg-white bg-opacity-75 py-8 px-5">
      <h1 class="fs-4 fs-xxl-3 text-center mb-5">
        <span class="material-symbols-outlined align-bottom me-1">credit_score</span>付款完成
      </h1>
      <p class="w-75 mx-auto mb-5">
        已完成訂單！若有加購課外輔導，近日請留意信箱訊息，我們將於三日內聯繫您。
      </p>
      <RouterLink to="/products" class="btn btn-primary d-block w-fit-content mx-auto">
        看看其他課程
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  emits: ['updateStep'],
  components: {
    RouterLink
  },
  mounted(){
    this.$emit('updateStep', 4);
  },
  beforeRouteEnter(to, from){
    if(from.fullPath !== "/checkout/payment"){
      return from.fullPath
    }
  }
}
</script>
