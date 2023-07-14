<template>
  <main class="bg-beige page-padding-top flex-grow-1">
    <div class="container py-8">
      <!-- 進度條 -->
      <StepProgressBar :activeStep="progressStep" :progressBarWidth="progressBarWidth" class="mb-3"></StepProgressBar>
      <div class="row mx-auto mb-8" :class="progressBarWidth">
        <div class="col text-center fs-7">購物清單</div>
        <div class="col text-center fs-7">填寫訂單</div>
        <div class="col text-center fs-7">確認付款</div>
        <div class="col text-center fs-7">付款完成</div>
      </div>
      <RouterView @updateStep="updateStep"></RouterView>
    </div>
  </main>
</template>

<script>
import { RouterView } from 'vue-router';
import StepProgressBar from '@/components/StepProgressBar.vue';

export default {
  data(){
    return {
      progressStep: 1,
      progressBarWidth: ['w-100', 'w-md-75']
    }
  },
  components: {
    RouterView,
    StepProgressBar
  },
  methods: {
    updateStep(step){
      this.progressStep = step
    }
  }
}
</script>

<style>
.white-accordion {
  --bs-accordion-btn-bg: rgba(var(--bs-white-rgb), .75);
  --bs-accordion-active-bg: rgba(var(--bs-white-rgb), .75);
  --bs-accordion-active-color: var(--bs-dark-1);
}
</style>