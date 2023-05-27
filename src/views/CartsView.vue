<template>
  <main class="bg-beige page-padding-top min-vh-100">
    <div class="container py-8">
      <!-- 進度條 -->
      <StepProgressBar :activeStep="1" class="mb-3"></StepProgressBar>
      <div class="row w-75 mx-auto mb-8">
        <div class="col text-center fs-7">購買清單</div>
        <div class="col text-center fs-7">填寫資訊</div>
        <div class="col text-center fs-7">確認付款</div>
        <div class="col text-center fs-7">付款完成</div>
      </div>
      <!-- title -->
      <h1 class="fs-4 fs-xxl-3 mb-0 mb-md-5">
        <span class="material-symbols-outlined align-bottom">shopping_cart</span>購物車
      </h1>
      <div class="row">
        <!-- 左欄 -->
        <div class="col-lg-9 mb-8">
          <div v-if="carts.length === 0" class="px-4 py-8 bg-white bg-opacity-75">
            <span class="material-symbols-outlined fs-d4 d-block text-center mb-3">production_quantity_limits</span>
            <p class="text-center">- 購物車是空的 -</p>
            <RouterLink to="/products" class="btn btn-primary py-2 w-25 d-block mx-auto">回去探索課程</RouterLink>
          </div>
          <div v-else>
            <div class="row text-dark-3 d-none d-md-flex">
              <div class="col-6">
                <p class="mb-0">課程名稱</p>
              </div>
              <div class="col">
                <p class="mb-0 text-center">售價</p>
              </div>
              <div class="col">
                <p class="mb-0 text-center">應付金額</p>
              </div>
              <div class="col">
                <p class="mb-0 text-end">選項</p>
              </div>
            </div>
            <hr class="my-3">
            <ul class="list-unstyled interval-line">
              <li v-for="cart in carts" :key="cart.id" class="row mb-3 gy-3">
                <div class="col-12 col-md-6">
                  <div class="d-flex">
                    <img :src="cart.product.imageUrl" :alt="cart.product.title" style="width: 30%; max-width: 100px;" class="me-2">
                    <p class="mb-0 fw-semibold">{{ cart.product.title }}</p>
                  </div>
                </div>
                <div class="col-6 col-md-2">
                  <p class="mb-0 text-start text-md-center text-muted">NT$ {{ cart.product.price }}</p>
                </div>
                <div class="col-6 col-md-2">
                  <p class="mb-0 text-end text-md-center text-accent">NT$ {{ cart.final_total }}</p>
                </div>
                <div class="col-12 col-md-2">
                  <button type="button" class="border-0 bg-transparent d-flex align-items-center ms-auto text-dark-3"
                      @click="deleteCartItem(cart.id)">刪除
                    <span class="fs-5 material-symbols-outlined">delete</span>
                  </button>
                </div>
              </li>
            </ul>
            <hr class="mt-0">
            <div class="d-flex justify-content-between">
              <button type="button" class="btn btn-sm btn-outline-secondary">
                <span class="material-symbols-outlined align-bottom fs-6">chevron_left</span>
                繼續選購</button>
              <small class="text-end d-block text-dark-3">共計 {{ carts.length }} 堂影音課程</small>
            </div>
          </div>
        </div>
        <!-- 右欄 -->
        <div class="col-lg-3">
          <div class="row">
            <div class="col-6 col-lg-12">
              <!-- 訂單明細欄 -->
              <div class="p-4 bg-white bg-opacity-75 mb-3">
                <h2 class="fs-6">訂單明細</h2>
                <div class="gradient-line gradient-line-2 py-4"></div>
                <div class="d-flex justify-content-between mb-4">
                  <p class="mb-0">小計</p>
                  <p class="mb-0">NT$ {{ total }}</p>
                </div>
                <div class="gradient-line gradient-line-2 py-4"></div>
                <div class="d-flex justify-content-between align-items-end">
                  <p class="mb-0">總計</p>
                  <p class="mb-0 fs-4 text-accent">NT$ {{ final_total }}</p>
                </div>
              </div>
            </div>
            <div class="col-6 col-lg-12">
              <!-- 折扣代碼欄 -->
              <div class="p-4 bg-white bg-opacity-75 mb-3">
                <label for="coupon" class="w-100 border-0 bg-transparent text-start px-0 pb-3 text-dark-3">使用折扣代碼</label>
                <input type="text" id="coupon" class="form-control mb-2" placeholder="請輸入折扣代碼">
                <div class="d-flex justify-content-end">
                  <button type="button" class="btn btn-sm btn-outline-light-2 me-2">取消</button>
                  <button type="button" class="btn btn-sm btn-primary">使用</button>
                </div>
              </div>
            </div>
          </div>
          <!-- 前往結帳 -->
          <a href="#" class="btn btn-primary w-100 py-2 mb-9">前往結帳</a>
        </div>
      </div>
      
    </div>
  </main>
  
</template>

<script>
import { RouterLink } from 'vue-router';
import StepProgressBar from '@/components/StepProgressBar.vue';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  data(){
    return {
      carts: [],
      total: 0,
      final_total: 0,
    }
  },
  components: {
    StepProgressBar
  },
  methods: {
    getCarts(){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/cart`;
      this.$http.get(url).then(res => {
        this.carts = res.data.data.carts;
        this.total = res.data.data.total;
        this.final_total = res.data.data.final_total;
        console.log(res.data);
        
      })
      .catch(err => {
        alert(`無法取得購物車資料，錯誤代碼：${err.response.status}`)
      })
    },
    deleteCartItem(id){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/cart/${id}`;
      this.$http.delete(url).then(res => {
        alert('刪除成功')
        this.getCarts();
      })
      .catch(err => {
        alert(`無法刪除購物車品項，錯誤代碼：${err.response.status}`)
      })
    }
  },
  mounted(){
    this.getCarts();
  }
}
</script>

<style scoped>
.interval-line li + li {
  border-top: 1px solid var(--bs-border-color);
  margin-top: .75rem;
}
</style>