<template>
  <div>
    <h3 class="fs-6 mb-2">有其他圖想請老師指教？</h3>
    <div class="p-6 bg-white bg-opacity-75">
      <h2 class="fs-5 fw-bold mb-3">課外輔導</h2>
      <div class="d-flex mb-6">
        <div class="bg-gradient me-3" style="width: 4px;"></div>
        <p class="mb-1">額外的作品檢視服務，由老師協助檢視 <u>課程作業以外</u> 的作品</p>
      </div>
      <div class="text-end mb-2">
        <s>NT$ 350</s>
        <p class="mb-0">加購價：<span class="fs-4 text-accent fw-semibold">NT$ 280</span></p>
      </div>
      <RouterLink :to="`/product/${tutorPdId}`" class="btn p-0 w-100 bg-gradient border-0">
        <div class="btn py-2 w-100 bg-white bg-clip-padding-box border border-3 border-transparent hover-bg-transparent">前往了解更多</div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapState } from 'pinia';
import { useProdStore } from '@/stores/product';

export default {
  components: {
    RouterLink
  },
  computed: {
    ...mapState(useProdStore, ['tutorPdId'])
  }
}
</script>