<template>
  <h1 class="fs-4 fs-xxl-3 mb-3 mb-md-5">
    <span class="material-symbols-outlined align-bottom me-1">assignment_turned_in</span>我的訂單
  </h1>
  <!-- 基本資訊 -->
  <div class="px-5 py-4 bg-white bg-opacity-75 mb-4">
    <div class="row gy-5">
      <!-- 訂單資訊 -->
      <div class="col-md-6">
        <div class="d-flex align-items-end flex-wrap border-bottom mb-3 pb-2">
          <h2 class="fs-5 mb-0 me-1">訂單資訊</h2>
          <small class="fs-7 text-secondary">※請勿任意提供訂單編號予他人</small>
        </div>
        <ul class="list-unstyled mb-0">
          <li class="mb-2 row gx-1">
            <div class="col-auto">
              <p class="mb-0">訂單編號：</p>
            </div>
            <div class="col">
              <span class="me-1" style="word-break: break-all;">{{ orderId }}</span>
              <button type="button" @click="copyText(orderId)" class="btn btn-sm btn-outline-secondary fs-8" id="orderIdCopyBtn">複製</button>
            </div>
          </li>
          <li class="mb-3">訂單日期： {{ dateConverter(orderData.create_at * 1000, 'whole') }}</li>
          <li class="mb-3">付款方式： {{ user.payMethod }}</li>
          <li class="mb-3">付款狀態： 
            <span class="text-secondary">{{ orderData.is_paid ? '已付款' : '尚未付款' }}</span>
            <span v-if="orderData.is_paid">（{{ dateConverter(orderData.paid_date * 1000, 'whole') }}）</span>
          </li>
          <li>申請輔導：
            <span :class="{ 'text-secondary': user.applyType }">{{ user.applyType ? '是' : '否' }}</span>
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
  <div class="accordion white-accordion">
    <!-- 購買清單 -->
    <div class="mb-4">
      <h2 class="mb-0">
        <button class="accordion-button collapsed fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#order-list-accordion-body" aria-expanded="false" aria-controls="order-list-accordion-body">
          購買清單
        </button>
      </h2>
      <div class="bg-white bg-opacity-75 collapse" id="order-list-accordion-body">
        <div class="px-5 py-4">
          <!-- 清單 -->
          <div>
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
              <li v-for="(item, key) in buyList" :key="key">
                <div class="row gy-3 gx-2">
                  <div class="col-8 col-sm-4 col-lg-6 flex-grow-1">
                    <p class="mb-0 fw-semibold">{{ item.product?.title }}</p>
                  </div>
                  <div class="col-auto col-sm-3 col-lg-2 flex-grow-1 align-self-end align-self-sm-auto">
                    <p class="mb-0 text-end text-sm-center text-muted">NT$ {{ item.product?.price }}</p>
                  </div>
                  <div class="col-12 col-sm-3 col-lg-2 text-end text-sm-center text-muted"
                      :class="item.final_total === item.total ? ['d-none', 'd-sm-block'] : ''">
                    <p v-if="item.final_total === item.total" class="mb-0">-</p>
                    <p v-else class="mb-0">
                      <span  class="d-sm-none">- </span>NT$ {{ item.product?.price - Math.round(item.final_total) }}
                    </p>
                  </div>
                  <div class="col-12 col-sm-2">
                    <p class="mb-0 text-end text-accent">NT$ {{ Math.round(item.final_total) }}</p>
                  </div>
                </div>
                <hr class="my-2">
              </li>
            </ul>
            <p class="text-end mb-0">
              <span class="me-2">總計：</span>
              <span class="text-accent">NT$ {{ Math.round(orderData?.total) }}</span>
            </p>
          </div>
          <!-- 折扣資訊 -->
          <div v-if="couponInfo !== undefined" class="pt-6 pb-2">
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
    <div v-if="user.applyType" class="mb-4">
      <h2 class="mb-0">
        <button class="accordion-button collapsed fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#tutor-accordion-body" aria-expanded="false" aria-controls="tutor-accordion-body">
          課外輔導需求
        </button>
      </h2>
      <div class="bg-white bg-opacity-75 collapse" id="tutor-accordion-body">
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
  <!-- 操作按鈕 -->
  <div v-if="orderData.is_paid" class="row justify-content-end gx-2">
    <div class="col col-md-4 col-lg-3">
      <RouterLink to="/products" class="btn btn-outline-secondary py-2 w-100">回探索課程</RouterLink>
    </div>
    <div class="col col-md-4 col-lg-3">
      <button type="button" class="btn btn-primary py-2 w-100" disabled style="--bs-btn-disabled-color: #fff;">已完成付款</button>
    </div>
  </div>
  <button id="payBtn" type="button" v-else @click="checkout(orderId)" class="btn btn-primary py-2 d-block w-100 w-sm-50 w-lg-25 ms-auto">前往付款</button>
  <!-- 未付款提醒 -->
  <ConfirmModal ref="ConfirmModal" v-bind="modalContent">
    <template #modal-content>
      <p class="mb-0">訂單尚未付款，<span class="text-danger">離開此頁面</span>嗎？</p>
    </template>
  </ConfirmModal>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
import ConfirmModal from '@/components/ConfirmModal.vue';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  emits: ['updateStep'],
  data(){
    return {
      orderId: '',
      orderData: {},
      buyList: {},
      user: {},
      modalContent: {
        cancelBtnText: '否，停留此頁面',
        confirmBtnText: '是，離開此頁面'
      },
      couponInfo: {}
    }
  },
  components: {
    RouterLink,
    ConfirmModal
  },
  methods: {
    ...mapActions(useCommonStore, ['dateConverter', 'copyText']),
    getOrder(id){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/order/${id}`;
      this.$http.get(url).then(res => {
        this.orderData = res.data.order;
        const { products, user } = res.data.order;
        this.buyList = products;
        this.user = user;
        this.couponInfo = Object.values(this.buyList)[0].coupon;
      })
      .catch(err => {
        alert(`無法取得訂單資料，錯誤代碼：${err.response.status}`)
      })
    },
    checkout(id){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/pay/${id}`;
      this.$http.post(url).then(res => {
        this.$router.push('/checkout/complete')
      })
      .catch(err => {
        alert(`付款失敗，錯誤代碼：${err.response.status}`)
      })
    }
  },
  async beforeRouteLeave(to, from){
    if(!this.orderData.is_paid && to.fullPath !== '/checkout/complete'){
      try {
        await this.$refs.ConfirmModal.openModal();
        return true
      } catch (error) {
        return false
      }
    }
  },
  mounted(){
    this.$emit('updateStep', 3);

    this.orderId = sessionStorage.getItem('orderId');
    this.orderId ? this.getOrder(this.orderId) : this.$router.push('/products');
  }
}
</script>