<template>
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
            <div class="col-8 col-md-6">
              <RouterLink :to="`/product/${cart.product_id}`" class="d-flex align-items-start text-decoration-none text-dark-1">
                <img :src="cart.product.imageUrl" :alt="cart.product.title" style="width: 30%; max-width: 100px;" class="me-2">
                <p class="mb-0 fw-semibold">{{ cart.product.title }}</p>
              </RouterLink>
            </div>
            <div class="col col-md-2">
              <div class="h-100 d-flex flex-column justify-content-end d-md-block">
                <p class="mb-2 text-end text-md-center text-muted">NT$ {{ cart.product.price }}</p>
                <div v-if="cart.coupon" class="badge d-block w-fit-content ms-auto mx-lg-auto text-secondary border border-secondary">
                  折扣 - NT$ {{ cart.product.price - Math.round(cart.final_total) }}</div>
              </div>
            </div>
            <div class="col-12 col-md-2">
              <p class="mb-0 text-end text-md-center text-accent">NT$ {{ Math.round(cart.final_total) }}</p>
            </div>
            <div class="col-12 col-md-2">
              <button type="button" class="border-0 bg-transparent d-flex align-items-center ms-auto text-dark-3 pe-0 pe-md-revert"
                  @click="deleteCartItem(cart.id)">
                <span class="fs-5 material-symbols-outlined">delete</span>
                刪除
              </button>
            </div>
          </li>
        </ul>
        <hr class="mt-0">
        <div class="d-flex justify-content-between">
          <RouterLink to="/products" class="btn btn-sm btn-outline-secondary">
            <span class="material-symbols-outlined align-bottom fs-6">chevron_left</span>
            繼續選購</RouterLink>
          <small class="text-end d-block text-dark-3">共計 {{ carts.length }} 堂影音課程</small>
        </div>
      </div>
    </div>
    <!-- 右欄 -->
    <div class="col-lg-3">
      <div class="row gx-3">
        <div class="col col-lg-12">
          <!-- 訂單明細欄 -->
          <div class="p-4 bg-white bg-opacity-75 mb-3 text-nowrap">
            <h2 class="fs-6 mb-0">訂單明細</h2>
            <div class="gradient-line gradient-line-2 py-4"></div>
            <div class="d-flex justify-content-between">
              <p class="mb-0 me-2">小計</p>
              <p class="mb-0">NT$ {{ total }}</p>
            </div>
            <div v-if="couponInfo.code" class="d-flex justify-content-between text-secondary mt-4">
              <p class="mb-0 me-2">折扣碼</p>
              <p class="mb-0">- NT$ {{ total - Math.round(final_total) }}</p>
            </div>
            <div class="gradient-line gradient-line-2 py-4"></div>
            <div class="d-flex justify-content-between align-items-end">
              <p class="mb-0 me-2">總計</p>
              <p class="mb-0 fs-4 text-accent">NT$ {{ Math.round(final_total) }}</p>
            </div>
          </div>
        </div>
        <div class="col col-lg-12">
          <!-- 折扣代碼欄 -->
          <div class="p-4 bg-white bg-opacity-75 mb-3">
            <label for="coupon" class="w-100 border-0 bg-transparent text-start px-0 pb-3 text-dark-3">使用折扣代碼</label>
            <input v-if="!couponInfo.code" v-model="couponInput" type="text" id="coupon" class="form-control mb-2" placeholder="請輸入折扣代碼">
            <div v-if="couponInfo.code" class="badge text-secondary border border-secondary">折扣碼：{{ couponInfo.code }}</div>
            <div v-if="!couponInfo.code" class="d-flex justify-content-end">
              <button type="button" @click="couponInput = ''" class="btn btn-sm btn-outline-light-2 me-2">取消</button>
              <button type="button" @click="useCoupon(couponInput)" class="btn btn-sm btn-primary">使用</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 前往結帳 -->
      <RouterLink to="/checkout/order" class="btn btn-primary w-100 py-2 mb-9">前往結帳</RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useCartsStore } from '@/stores/carts'
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  emits: ['updateStep'],
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(useCartsStore, ['carts', 'total', 'final_total', 'couponInfo']),
    ...mapWritableState(useCartsStore, ['couponInput'])
  },
  methods: {
    ...mapActions(useCartsStore, ['getCarts', 'useCoupon']),
    deleteCartItem(id){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/cart/${id}`;
      this.$http.delete(url).then(res => {
        alert('刪除成功')
        this.getCarts();
      })
      .catch(err => {
        alert(`無法刪除購物車品項，錯誤代碼：${err.response.status}`)
      })
    },
  },
  mounted(){
    this.$emit('updateStep', 1)
    if(this.couponInfo.code){ this.useCoupon(this.couponInfo.code) }
  }
}
</script>

<style scoped>
.interval-line li + li {
  border-top: 1px solid var(--bs-border-color);
  margin-top: .75rem;
}

@media (min-width: 768px) {
  .pe-md-revert {
    padding-right: revert !important;
  }
}

</style>