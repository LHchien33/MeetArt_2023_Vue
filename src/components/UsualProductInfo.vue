<template>
  <h1 class="fs-4 fw-bold mb-0">{{ currentPd.title }}</h1>
  <div class="gradient-line gradient-line-2 py-4"></div>
  <div class="row row-cols-xl-2 gy-3 text-nowrap">
    <div class="col">
      <p class="fs-7 mb-1 text-muted">課程時長</p>
      <p class="mb-0">{{ minToHour(currentPd.outlines_total.minutes) }}</p>
    </div>
    <div class="col">
      <p class="fs-7 mb-1 text-muted">單元數</p>
      <p class="mb-0">{{ currentPd.outlines_total.outlines }} 章節 {{ currentPd.outlines_total.lectures }} 單元</p>
    </div>
    <div class="col">
      <p class="fs-7 mb-1 text-muted">觀看限制</p>
      <p class="mb-0">時間、次數不限</p>
    </div>
    <div class="col">
      <p class="fs-7 mb-1 text-muted">作業回覆</p>
      <p class="mb-0">已包含</p>
    </div>
  </div>
  <div class="gradient-line gradient-line-2 py-4"></div>
  <div>
    <p class="mb-2">課程關鍵字：</p>
    <div class="fs-7">
      <template v-for="word in keywords" :key="word">
        <RouterLink :to="`/products?index=${word.index}&filter=${word.filter}`"
              class="btn btn-sm btn-outline-primary rounded-pill me-2 mb-2">{{ word.filter }}</RouterLink>
      </template>
    </div>
  </div>
  
</template>

<script>
import { mapState } from 'pinia';
import { useProdStore } from '@/stores/product';

export default {
  computed: {
    ...mapState(useProdStore, ['currentPd', 'keywords']),
  },
  methods: {
    minToHour(min){
      return `${Math.floor(min/60)} 小時 ${min%60} 分鐘`;
    }
  }
}
</script>