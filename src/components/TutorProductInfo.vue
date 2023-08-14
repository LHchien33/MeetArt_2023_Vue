<template>
  <h1 class="fs-4 fw-bold mb-0">{{ currentPd.title }}</h1>
  <div class="gradient-line gradient-line-2 py-4"></div>
  <ul class="mb-0 list-space-sm">
    <li>作品檢視、技法請教、學習方向諮詢</li>
    <li>不限是否購買課程，皆可申請</li>
    <li>一對一輔導</li>
  </ul>
  <div class="gradient-line gradient-line-2 py-4"></div>
  <div class="text-muted">
    <h3 class="fs-7">注意事項：</h3>
    <ul class="fs-7 mb-0 mb-lg-6 list-space-sm">
      <li>課外輔導旨在提供課程外的協助，若原有影音課程已包含作品檢核，建議優先詢問該課程授課老師。</li>
      <li>限同筆訂單包含影音課程時享有<u>加購價優惠</u>，於購物車自動折扣。</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useProdStore } from '@/stores/product';

export default {
  computed: {
    ...mapState(useProdStore, ['currentPd']),
  }
}
</script>