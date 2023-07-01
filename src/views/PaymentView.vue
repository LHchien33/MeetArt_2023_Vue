<template>
  <h1 class="fs-4 fs-xxl-3 mb-3 mb-md-5">
    <span class="material-symbols-outlined align-bottom me-1">assignment_turned_in</span>我的訂單
  </h1>
  <!-- 訂單基本資訊 -->
  <div class="px-5 py-4 bg-white bg-opacity-75 mb-4">
    <div class="row gy-5">
      <div class="col-md-6">
        <h2 class="fs-5 pb-2 border-bottom mb-3">訂單資訊</h2>
        <ul class="list-unstyled mb-0">
          <li class="mb-3">
            <span class="me-2" style="word-break: break-all;">訂單編號： -L9u11NAE0m0SpSBUDIq</span>
            <button type="button" class="btn btn-sm btn-outline-secondary fs-8" id="orderIdCopyBtn">複製</button>
          </li>
          <li class="mb-3">訂單日期：{{  }}</li>
          <li class="mb-3">付款方式：{{  }}</li>
          <li>申請輔導：{{  }}</li>
        </ul>
      </div>
      <div class="col-md-6">
        <h2 class="fs-5 pb-2 border-bottom mb-3">個人資訊</h2>
        <ul class="list-unstyled mb-0">
          <li class="mb-3">姓名：{{ }}</li>
          <li class="mb-3">電子信箱：{{ }}</li>
          <li>聯絡電話：{{ }}</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- 購買清單 -->
  <div class="accordion white-accordion mb-3" id="order-list-accordion">
    <h2 class="mb-0">
      <button class="accordion-button collapsed fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#order-list-accordion-body" aria-expanded="false" aria-controls="order-list-accordion-body">
        購買清單
      </button>
    </h2>
    <div class="bg-white bg-opacity-75 collapse" id="order-list-accordion-body"  data-bs-parent="#order-list-accordion">
      <div class="px-5 py-4">
        <div class="row gx-2 text-dark-3 d-none d-sm-flex">
          <div class="col-4 col-lg-6">
            <p class="mb-0">課程名稱</p>
          </div>
          <div class="col-3 col-lg-2">
            <p class="mb-0 text-center">售價</p>
          </div>
          <div class="col-3 col-lg-2">
            <p class="mb-0 text-center">折扣</p>
          </div>
          <div class="col-2">
            <p class="mb-0 text-end">應付金額</p>
          </div>
          <hr class="my-2">
        </div>
        <ul class="list-unstyled mb-0">
          <li v-for="(cart, idx) in carts" :key="cart.id">
            <div class="row gy-3 gx-2">
              <div class="col-8 col-sm-4 col-lg-6">
                <p class="mb-0 fw-semibold">{{ cart.product.title }}</p>
              </div>
              <div class="col col-sm-3 col-lg-2">
                <p class="mb-0 text-end text-sm-center text-muted">NT$ {{ cart.product.price }}</p>
              </div>
              <div class="offset-8 offset-sm-0 col col-sm-3 col-lg-2 text-end text-sm-center text-muted"
                  :class="cart.final_total === cart.total ? ['d-none', 'd-sm-block'] : ''">
                <p v-if="cart.final_total === cart.total" class="mb-0">-</p>
                <p v-else class="mb-0">
                  <span  class="d-sm-none">- </span>NT$ {{ cart.product.price - Math.round(cart.final_total) }}
                </p>
              </div>
              <div class="offset-8 offset-sm-0 col col-sm-2">
                <p class="mb-0 text-end text-accent">NT$ {{ Math.round(cart.final_total) }}</p>
              </div>
            </div>
            <hr class="my-2">
          </li>
        </ul>
        <p class="text-end mb-0">
          <span class="me-2">總計：</span>
          <span class="text-accent">NT$ {{ Math.round(final_total) }}</span>
        </p>
      </div>
    </div>
  </div>
  <!-- 課外輔導需求 -->
  <div class="accordion white-accordion mb-3" id="tutor-accordion">
    <h2 class="mb-0">
      <button class="accordion-button collapsed fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#tutor-accordion-body" aria-expanded="false" aria-controls="tutor-accordion-body">
        課外輔導需求
      </button>
    </h2>
    <div class="bg-white bg-opacity-75 collapse" id="tutor-accordion-body"  data-bs-parent="#tutor-accordion">
      <div class="px-5 py-4">
        <ul class="list-unstyled mb-0">
          <li class="mb-3">
            <p>學習背景：透過 <u>{{ }}</u> 學習 <u>{{ }}</u>，學了 <u>{{ }}</u>。</p>
          </li>
          <li class="mb-3">
            <p>欲申請的輔導類型：{{ }}</p>
          </li>
          <li class="mb-3">
            <p>作品連結：<a href="#" class="text-secondary">前往連結</a></p>
          </li>
          <li>
            <p class="mb-1">目前遇到的問題：</p>
            <p>{{}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <RouterLink to="/checkout/complete" class="btn btn-primary py-2 d-block w-100 w-md-25 ms-auto">前往付款</RouterLink>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapState } from 'pinia';
import { useCartsStore } from '@/stores/carts'
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  emits: ['updateStep'],
  components: {
    RouterLink
  },
  computed: {
  ...mapState(useCartsStore, ['carts', 'total', 'final_total', 'couponInfo']),
  },
  mounted(){
    this.$emit('updateStep', 3)
  }
}
</script>

<style scoped>

</style>