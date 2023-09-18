<template>
  <!-- (行動版) 圖片下方資訊欄 -->
  <div class="p-6 bg-white bg-opacity-75 mb-4 d-lg-none">
    <TutorProductInfo></TutorProductInfo>
  </div>
  <!-- 主要內容 -->
  <div class="p-8 bg-white bg-opacity-75">
    <!-- 區塊 1 簡介 -->
    <section class="mb-9">
      <div class="d-flex mb-3">
        <div class="bg-gradient me-3" style="width: 4px;"></div>
        <h2 class="fw-bold fs-5 mb-1">什麼是「課外輔導」？</h2>
      </div>
      <p>為了協助所有喜愛繪畫的學習者「解決學習卡關的情況，以支持其繼續前進」的額外服務。</p>
    </section>
    <!-- 區塊 2 購買資格 -->
    <section class="mb-9">
      <div class="d-flex mb-3">
        <div class="bg-gradient me-3" style="width: 4px;"></div>
        <h2 class="fw-bold fs-5 mb-1">我可以購買這項服務嗎？</h2>
      </div>
      <p><u>不論有無購買影音課程</u>，只要想在學習的路上尋求專業建議，都可以購買並申請課外輔導。</p>
    </section>
    <!-- 區塊 3 購買建議 -->
    <section class="mb-9">
      <div class="d-flex mb-3">
        <div class="bg-gradient me-3" style="width: 4px;"></div>
        <h2 class="fw-bold fs-5 mb-1">有以下問題時，適合購買課外輔導</h2>
      </div>
      <div v-html="currentPd.intro?.willLearn" class="list-space-sm"></div>
    </section>
    <!-- 區塊 4 服務介紹 -->
    <section class="mb-9">
      <div class="d-flex mb-3">
        <div class="bg-gradient me-3" style="width: 4px;"></div>
        <h2 class="fw-bold fs-5 mb-1">繪課室能提供的協助有：</h2>
      </div>
      <!-- 圓圈圖示 -->
      <div class="row gx-2 gx-md-5 justify-content-center pb-5">
        <div class="col-4 col-md-3">
          <div class="ratio ratio-1x1">
            <div class="gradient-border gradient-border-3 position-absolute rounded-circle d-flex flex-column justify-content-center align-items-center px-3 text-center">
              <h3 class="fs-7 fs-md-5 fw-semibold mb-0">作品檢視</h3>
            </div>
          </div>
        </div>
        <div class="col-4 col-md-3">
          <div class="ratio ratio-1x1">
            <div class="gradient-border gradient-border-3 position-absolute rounded-circle d-flex flex-column justify-content-center align-items-center px-3 text-center">
              <h3 class="fs-7 fs-md-5 fw-semibold mb-0">技法請教</h3>
            </div>
          </div>
        </div>
        <div class="col-4 col-md-3">
          <div class="ratio ratio-1x1">
            <div class="gradient-border gradient-border-3 position-absolute rounded-circle d-flex flex-column justify-content-center align-items-center px-3 text-center">
              <h3 class="fs-7 fs-md-5 fw-semibold mb-0">學習諮詢</h3>
            </div>
          </div>
        </div>
      </div>
      <!-- 文字介紹 -->
      <div v-html="currentPd.intro?.preparation" class="list-space-sm"></div>
    </section>
    <!-- 區塊 5 服務流程圖示 -->
    <section class="mb-9">
      <div class="d-flex mb-3">
        <div class="bg-gradient me-3" style="width: 4px;"></div>
        <h2 class="fw-bold fs-5 mb-1">服務流程</h2>
      </div>
      <div class="w-100 w-md-75 mx-auto">
        <img class="w-100" src="../assets/images/flowChart.png" alt="">
      </div>
    </section>
    <!-- 區塊 6 關於老師 -->
    <section>
      <div class="d-flex mb-3">
        <div class="bg-gradient me-3" style="width: 4px;"></div>
        <h2 class="fw-bold fs-5 mb-1">關於老師：</h2>
      </div>
      <div class="d-flex">
        <img class="rounded-circle me-3 align-self-start" src="../assets/images/teacher_avatar.jpg" alt="" style="max-width: 60px;">
        <div>
          <p class="mb-1 fw-semibold">{{ currentPd.teacher?.name }}</p>
          <p class="mb-2 fs-7">{{ currentPd.teacher?.brief }}</p>
          <a class="d-inline-block me-2">
            <img src="../assets/images/facebook.svg" alt="facebook連結" style="width: 20px;">
          </a>
          <a class="d-inline-block">
            <img src="../assets/images/instagram.svg" alt="instagram連結" style="width: 20px;">
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useProdStore } from '@/stores/product';
import TutorProductInfo from '@/components/TutorProductInfo.vue';

export default {
  components: {
    TutorProductInfo
  },
  computed: {
    ...mapState(useProdStore, ['currentPd']),
  }
}
</script>