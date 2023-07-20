<template>
  <!-- 基本資訊 -->
  <div class="bg-beige p-5">
    <div class="row gy-5">
      <!-- 訂單資訊 -->
      <div class="col-md-6">
        <h2 class="fs-5 me-1 mb-3 pb-2 border-bottom">訂單資訊</h2>
        <ul class="list-unstyled mb-0">
          <li class="mb-2 row gx-1">
            <div class="col-auto">
              <p class="mb-0">訂單編號：</p>
            </div>
            <div class="col">
              <span class="me-1" style="word-break: break-all;">{{ tempData.id }}</span>
              <button type="button" @click="$emit('copyOrderId', tempData.id)"
                      class="btn btn-sm btn-outline-secondary fs-8">複製</button>
            </div>
          </li>
          <li class="mb-3">訂單日期： {{ dateConverter(tempData.create_at * 1000, 'whole') }}</li>
          <li class="mb-3">付款方式： {{ user.payMethod }}</li>
          <li class="mb-3">付款狀態： 
            <span :class="{ 'text-accent': !tempData.is_paid }">{{ tempData.is_paid ? '已付款' : '未付款' }}</span>
            <span v-if="tempData.is_paid">（{{ dateConverter(tempData?.paid_date * 1000, 'whole') }}）</span>
          </li>
          <li class="mb-3">申請輔導： {{ user.applyType ? '是' : '否' }}</li>
          <li v-if="user.applyType">輔導狀態：
            <span :class="{ 'text-accent': !user.order_completed }">{{ user.order_completed ? '已完成' : '未完成' }}</span>
          </li>
        </ul>
      </div>
      <!-- 個人資訊 -->
      <div class="col-md-6">
        <h2 class="fs-5 pb-2 border-bottom mb-3">個人資訊</h2>
        <ul class="list-unstyled mb-0">
          <li class="mb-3">姓名：{{ user.name }}</li>
          <li class="mb-3">電子信箱：{{ user.email }}</li>
          <li>聯絡電話：{{ user.tel }}</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="accordion accordion-flush">
    <!-- 購買清單 -->
    <div class="accordion-item mt-4 border-bottom-0">
      <h2 class="accordion-header" id="adminBuyListAccordionHeader">
        <button class="accordion-button collapsed fs-5 text-dark-1" type="button" data-bs-toggle="collapse" data-bs-target="#adminBuyListAccordionBody" aria-expanded="false" aria-controls="adminBuyListAccordionBody">
          購買清單
        </button>
      </h2>
      <div class="accordion-collapse collapse" id="adminBuyListAccordionBody" aria-labelledby="adminBuyListAccordionHeader">
        <div class="px-5 py-4">
          <div class="row gx-2 text-dark-3 d-none d-lg-flex">
            <div class="col-4 col-lg-6">
              <p class="mb-0">課程名稱 / ID</p>
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
            <li v-for="(item, key) in tempData.products" :key="key">
              <div class="row gy-3 gx-2">
                <div class="col-8 col-lg-6 flex-grow-1" style="word-break: break-all;">
                  <p class="mb-2 fw-semibold">{{ item.product?.title }}</p>
                  <small class="text-muted">{{ item.product?.id }}</small>
                </div>
                <div class="col-auto col-lg-2 flex-grow-1 align-self-end align-self-lg-auto">
                  <p class="mb-0 text-end text-lg-center text-muted">NT$ {{ item.product?.price }}</p>
                </div>
                <div class="col-12 col-lg-2 text-end text-lg-center text-muted"
                    :class="item.final_total === item.total ? ['d-none', 'd-lg-block'] : ''">
                  <p v-if="item.final_total === item.total" class="mb-0">-</p>
                  <p v-else class="mb-0">
                    <span  class="d-lg-none">- </span>NT$ {{ item.product?.price - Math.round(item.final_total) }}
                  </p>
                </div>
                <div class="col-12 col-lg-2">
                  <p class="mb-0 text-end text-accent">NT$ {{ Math.round(item.final_total) }}</p>
                </div>
              </div>
              <hr class="my-2">
            </li>
          </ul>
          <p class="text-end mb-0">
            <span class="me-2">總計：</span>
            <span class="text-accent">NT$ {{ Math.round(tempData.total) }}</span>
          </p>
          <!-- 折扣資訊 -->
          <div v-if="couponInfo.title" class="pt-6 pb-2">
            <h3 class="fs-6 border-bottom pb-2">優惠詳情：</h3>
            <ul class="list-unstyled mb-0">
              <li class="mb-2">折扣名稱：{{ couponInfo.title }}</li>
              <li class="mb-2">折扣代碼：{{ couponInfo.code }}</li>
              <li class="mb-2">優惠期限：{{ dateConverter(couponInfo.due_date * 1000, 'whole') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 課外輔導需求 -->
    <div v-if="user.applyType" class="accordion-item mt-4">
      <h2 class="accordion-header" id="adminTutorAccordionHeader">
        <button class="accordion-button collapsed fs-5 text-dark-1" type="button" data-bs-toggle="collapse" data-bs-target="#adminTutorAccordionBody" aria-expanded="false" aria-controls="adminTutorAccordionBody">
          課外輔導需求
        </button>
      </h2>
      <div class="accordion-collapse collapse" id="adminTutorAccordionBody" aria-labelledby="adminTutorAccordionHeader">
        <div class="px-5 py-4">
          <ul class="list-unstyled mb-0">
            <li class="mb-3">
              <p>學習背景：曾透過
                <u v-if="user.background?.method">{{ user.background?.method }}</u>
                <span v-else class="text-light-2">未填</span> 學習
                <u v-if="user.background?.category">{{ user.background?.category }}</u>
                <span v-else class="text-light-2">未填</span> ，大約
                <u v-if="user.background?.time">{{ user.background?.time }}</u>
                <span v-else class="text-light-2">未填</span> 的時間。
              </p>
            </li>
            <li class="mb-3">
              <p>欲申請的輔導類型：{{ user.applyType }}</p>
            </li>
            <li class="mb-3">
              <p>作品連結：<a :href="user.link" target="_blank" rel="noreferrer noopener" class="text-secondary">前往連結</a></p>
            </li>
            <li>
              <p class="mb-1">目前遇到的問題：</p>
              <p class="border border-light-2 px-3 py-2 rounded-3">{{ user.problem }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';

export default {
  props: ['tempData'],
  emits: ['copyOrderId'],
  data(){
    return {
      user: {},
      couponInfo: {}
    }
  },
  watch: {
    tempData(newVal, oldVal){
      this.setValues(newVal);
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['dateConverter']),
    setValues(data){
      if(Object.keys(data).length === 0)
      return 
      
      this.user = data.user;
      this.couponInfo = Object.values(data.products)[0].coupon || {} ;
    }
  },
  mounted(){
    this.setValues(this.tempData);
  }
}
</script>