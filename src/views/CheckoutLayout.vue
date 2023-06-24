<template>
  <main class="bg-beige page-padding-top min-vh-100">
    <div class="container py-8">
      <!-- 進度條 -->
      <StepProgressBar :activeStep="progressStep" class="mb-3"></StepProgressBar>
      <div class="row w-75 mx-auto mb-8">
        <div class="col text-center fs-7">購物清單</div>
        <div class="col text-center fs-7">填寫資訊</div>
        <div class="col text-center fs-7">確認付款</div>
        <div class="col text-center fs-7">付款完成</div>
      </div>
      <RouterView @updateStep="updateStep"></RouterView>
    </div>
  </main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import StepProgressBar from '@/components/StepProgressBar.vue';

export default {
  data(){
    return {
      progressStep: 1
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