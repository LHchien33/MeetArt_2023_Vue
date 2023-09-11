<template>
  <!-- title -->
  <h1 class="fs-4 fs-xxl-3 mb-3 mb-md-5">
    <span class="material-symbols-outlined align-bottom me-1">shopping_cart</span>購物車
  </h1>
  <div class="row">
    <!-- 左欄 -->
    <div class="col-lg-9 mb-8">
      <div v-if="carts.length === 0" ref="loadingContainer" class="vl-parent px-4 py-8 bg-white bg-opacity-75">
        <span class="material-symbols-outlined fs-d4 d-block text-center mb-3">production_quantity_limits</span>
        <p class="text-center">- 購物車是空的 -</p>
        <RouterLink to="/products" class="btn btn-primary py-2 w-75 w-sm-50 w-lg-25 d-block mx-auto">回去探索課程</RouterLink>
      </div>
      <!-- cart list -->
      <div v-else>
        <!-- cart list header -->
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
        <!-- cart list body -->
        <ul ref="loadingContainer" class="list-unstyled vl-parent">
          <li v-for="cart in carts" :key="cart.id">
            <div class="row gy-3">
              <div class="col-sm-8 col-md-6 flex-grow-1">
                <RouterLink :to="`/product/${cart.product_id}`" class="d-flex align-items-start text-decoration-none text-dark-1">
                  <div class="me-2 overflow-hidden flex-shrink-0" style="max-width: 100px; aspect-ratio: 16 / 10;">
                    <img :src="cart.product.imageUrl" :alt="cart.product.title" class="w-100 h-100 object-fit-cover">
                  </div>
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
                <button type="button" @click="deleteCartItem(cart.id)" :disabled="loadingStatus.phase === 'pending'"
                        class="border-0 bg-transparent d-flex align-items-center ms-auto text-dark-3 pe-0 pe-md-revert">
                  <span :class="{'d-none': deleteTarget === cart.id }" class="fs-5 material-symbols-outlined">delete</span>
                  <span :class="{'spinner-border': deleteTarget === cart.id }" class="spinner-border-sm me-1"></span>
                  刪除
                </button>
              </div>
            </div>
            <hr>
          </li>
        </ul>
        <!-- cart list footer -->
        <div class="d-flex justify-content-between">
          <RouterLink to="/products" class="btn btn-sm btn-outline-secondary">
            <span class="material-symbols-outlined align-bottom fs-6">chevron_left</span>
            繼續選購</RouterLink>
          <small class="text-end d-block text-dark-3">共計 {{ carts.length }} 項</small>
        </div>
      </div>
    </div>
    <!-- 右欄 -->
    <div class="col-lg-3">
      <div class="row flex-lg-column-reverse gx-3">
        <!-- 折扣代碼欄 -->
        <div class="col col-lg-12">
          <div class="p-4 bg-white bg-opacity-75 mb-3">
            <label for="coupon" class="w-100 border-0 bg-transparent text-start px-0 pb-3 text-dark-3">使用折扣代碼</label>
            <input v-if="!couponInfo.code" v-model="couponInput" type="text" id="coupon" class="form-control mb-2" placeholder="請輸入折扣代碼">
            <div v-if="couponInfo.code" class="badge text-secondary border border-secondary">
              <span>{{ couponInfo.title }}</span>：{{ couponInfo.code }}</div>
            <div v-if="!couponInfo.code" class="d-flex justify-content-end text-nowrap">
              <button type="button" @click="couponInput = ''" :class="{ 'disabled': loadingStatus.disabled }"
                      class="btn btn-sm btn-outline-light-2 me-2">取消</button>
              <button type="button" @click="useCouponByBtn(couponInput, true)" :class="{ 'disabled': loadingStatus.disabled }"
                      class="btn btn-sm btn-primary">使用</button>
            </div>
          </div>
        </div>
        <!-- 訂單明細欄 -->
        <div class="col col-lg-12">
          <div class="p-4 bg-white bg-opacity-75 mb-3 text-nowrap">
            <h2 class="fs-6 mb-0">訂單明細</h2>
            <div class="gradient-line gradient-line-2 py-4"></div>
            <div class="d-flex justify-content-between">
              <p class="mb-0 me-2">小計</p>
              <p class="mb-0">NT$ {{ total }}</p>
            </div>
            <div v-if="couponInfo.code" class="d-flex justify-content-between text-secondary mt-4">
              <p class="mb-0 me-2">{{ couponInfo.title }}</p>
              <p class="mb-0">- NT$ {{ total - Math.round(final_total) }}</p>
            </div>
            <div class="gradient-line gradient-line-2 py-4"></div>
            <div class="d-flex justify-content-between align-items-end">
              <p class="mb-0 me-2">總計</p>
              <p class="mb-0 fs-4 text-accent">NT$ {{ Math.round(final_total) }}</p>
            </div>
          </div>
          <!-- 前往結帳（lg 以下） -->
          <RouterLink to="/checkout/order" :class="{ 'disabled': loadingStatus.disabled }"
                      class="btn btn-primary w-100 py-2 mb-9 d-lg-none">前往結帳</RouterLink>
        </div>
      </div>
      <!-- 前往結帳（lg 以上） -->
      <RouterLink to="/checkout/order" :class="{ 'disabled': loadingStatus.disabled }"
                  class="btn btn-primary w-100 py-2 mb-9 d-none d-lg-block">前往結帳</RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useCartsStore } from '@/stores/carts';
import { useProdStore } from '@/stores/product';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  emits: ['updateStep'],
  components: {
    RouterLink,
  },
  data(){
    return {
      customLoader: {
        isFullPage: false,
        width: 32,
        height: 32
      },
      loadingStatus: {
        phase: '',
        disabled: ''
      },
      deleteTarget: '',
    }
  },
  computed: {
    ...mapState(useCartsStore, ['carts', 'total', 'final_total', 'couponInfo']),
    ...mapState(useProdStore, ['tutorPdId', 'tutorOriginPricedId', 'tutorDiscountedId']),
    ...mapWritableState(useCartsStore, ['couponInput']),
  },
  watch: {
    async "loadingStatus.phase"(phase){      
      if(this.carts.length === 1 && this.carts[0].product_id === this.tutorDiscountedId && phase === 'resolve'){
        this.loadingStatus = { phase: 'pending', disabled: true };
        let loader = this.$loading.show({
          ...this.customLoader,
          container: this.$refs.loadingContainer
        });
        try {
          await this.replaceTutorPd();
          if(this.couponInfo.code){
            await this.useCoupon(this.couponInfo.code);
          }
          await this.getCarts();
          this.loadingStatus = { phase: 'resolve', disabled: false };
        } catch (err) {
          const { message, status } = err;
          this.$toast({toastType: 'failed'}).fire({title: `${message}，錯誤代碼：${status}`});
          this.loadingStatus = { phase: 'reject', disabled: true };
        } finally {
          loader.hide();
        }
      }
    },
  },
  methods: {
    ...mapActions(useCartsStore, ['getCarts', 'useCoupon']),
    async deleteCartItem(id){
      this.loadingStatus = { phase: 'pending', disabled: true };
      this.deleteTarget = id;
      const url = `${VITE_BASE}/v2/api/${VITE_API}/cart/${id}`;
      try {
        await this.$http.delete(url);        
        await this.getCarts();
        this.$toast({toastType: 'success'}).fire({title: '已刪除購物車項目'});
        this.loadingStatus.phase = 'resolve';
      } catch (err) {
        const { errName, message:msg, status } = err;
        let toastTxt = errName === 'getCarts' ? `${msg}，錯誤代碼：${status}` : `刪除失敗，錯誤代碼：${err.response?.status}`;
        this.$toast({toastType: 'failed'}).fire({title: toastTxt});
        this.loadingStatus.phase = 'reject';
      } finally {
        this.deleteTarget = '';
        this.loadingStatus.disabled = false;
      }
    },
    async useCouponByBtn(couponCode){
      this.loadingStatus = { phase: 'pending', disabled: true };
      let loader = this.$loading.show({
        ...this.customLoader,
        container: this.$refs.loadingContainer
      });
      try {
        const { message:msg, toastType } = await this.useCoupon(couponCode);
        await this.getCarts();
        this.$toast({toastType}).fire({title: msg});
        this.loadingStatus = { phase: 'resolve', disabled: false };
      } catch (err) {
        const { message:msg, status } = err;
        this.$toast({toastType: 'failed'}).fire({title: `${msg}，錯誤代碼：${status}`});
        this.loadingStatus = { phase: 'reject', disabled: true };
      } finally {
        loader.hide();
      }
    },
    async replaceTutorPd(){
      let delId = '';   // cart item id
      let postId = '';  // product id
      const { length:cartLength } = this.carts
      // 替換成原價的
      if(cartLength === 1 && this.carts[0].product_id === this.tutorDiscountedId){
        delId = this.carts[0].id;
        postId = this.tutorOriginPricedId;
        // 替換成加購的
      } else if (cartLength > 1){
        const idx = this.carts.findIndex(item => item.product_id === this.tutorOriginPricedId);
        if(idx > -1){
          delId = this.carts[idx].id;
          postId = this.tutorDiscountedId;
        }
      }
      if(!delId || !postId){
        return false
      }
      
      const delApi = `${VITE_BASE}/v2/api/${VITE_API}/cart/${delId}`;
      const postApi = `${VITE_BASE}/v2/api/${VITE_API}/cart`;
      try {
        await Promise.all([
          this.$http.delete(delApi),
          this.$http.post(postApi, { data: { "product_id": postId, "qty": 1 } })
        ])
        return true
      } catch (err) {
        throw {
          message: '發生錯誤(課外輔導)',
          status: err.response?.status
        }
      }
    }
  },
  async mounted(){
    this.$emit('updateStep', 1);
    let loader = this.$loading.show();
    this.loadingStatus = { phase: 'pending', disabled: true };
    try {
      await this.getCarts();
      const replaceRes = await this.replaceTutorPd();
      let couponRes = null;
      if(this.couponInfo.code){
        couponRes = await this.useCoupon(this.couponInfo.code);
      }
      if(replaceRes || couponRes?.toastType === 'success'){
        await this.getCarts();
      }
      this.loadingStatus = { phase: 'resolve', disabled: false };
    } catch (err) {
      const { message:msg, status } = err;
      this.$toast({toastType: 'failed'}).fire({title: `${msg}，錯誤代碼：${status}`});
      this.loadingStatus = { phase: 'reject', disabled: true };
    } finally {
      loader.hide();
    }
  },
  beforeRouteLeave(to, from){
    const hasCheckout = to.fullPath.split('/').includes('checkout');
    if(hasCheckout){
      if(this.carts.length === 0){
        this.$toast({toastType: 'failed'}).fire({title: '請先在購物車加入商品！'})
        return false;
      }
      if(this.loadingStatus.disabled){
        return false
      }
    }

    const urlId = to.params.urlPdId;
    if(urlId === this.tutorOriginPricedId || urlId === this.tutorDiscountedId){
      return `/product/${this.tutorPdId}`;
    }
  },
}
</script>

<style scoped>
@media (min-width: 768px) {
  .pe-md-revert {
    padding-right: revert !important;
  }
}
</style>