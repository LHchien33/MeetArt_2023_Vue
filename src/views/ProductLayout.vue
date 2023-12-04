<template>
  <div class="bg-beige flex-grow-1">
    <main class="page-padding-top">
      <div class="container py-8">
        <!-- breadcrumb -->
        <ol class="breadcrumb mb-3">
          <li class="breadcrumb-item">
            <RouterLink to="/">首頁</RouterLink>
          </li>
          <template v-if="!isTutor">
            <li class="breadcrumb-item">
              <RouterLink :to="{path:'/products', query: breadcrumb.index ? {index: breadcrumb.index} : {}}">
                <span v-if="breadcrumb.index">所有繪畫{{ categories[breadcrumb.index]?.name }}</span>
                <span v-else>所有課程</span>
              </RouterLink>
            </li>
            <li v-if="!isTutor && breadcrumb.filter" class="breadcrumb-item">
              <RouterLink :to="{path:'/products', query: {...breadcrumb}}">{{ breadcrumb.filter }}</RouterLink>
            </li>
          </template>
          <li class="breadcrumb-item active" aria-current="page">{{ currentPd.title }}</li>
        </ol>
        <!-- 主要內容 -->
        <div class="row main-content-style-set">
          <!-- 左欄 -->
          <div class="col-12 col-lg-8">
            <!-- 產品圖 -->
            <div class="image-container mb-4 bg-light-2">
              <img v-if="currentPd.imageUrl" :src="currentPd.imageUrl" class="object-fit-cover w-100 h-100" :alt="currentPd.title">
            </div>
            <!-- 主要資訊(含行動版摘要) -->
            <RouterView name="mainContent"></RouterView>
            <!-- (行動版) sticky 價格、購買按鈕 start -->
            <div class="bg-white p-3 sticky-bottom d-lg-none border-top mb-8">
              <div class="row g-2 align-items-center">
                <div class="col-12 col-sm flex-grow-0">
                  <p class="text-accent fw-semibold text-nowrap mb-0">NT$ {{ numToPriceString(currentPd.price) }}</p>
                </div>
                <div class="col">
                  <button :class="{ 'disabled': itemRepeated || disabled }" type="button"
                          class="btn p-0 w-100 bg-gradient border-0 me-2 text-nowrap">
                    <div :class="{ 'hover-bg-transparent': !itemRepeated }"
                          @click="addProduct($event, prodId)" data-btn-value="cart"
                          class="btn py-2 w-100 bg-white bg-clip-padding-box border border-3 border-transparent">
                      <span :class="{'spinner-border': disabled === 'cart'}" class="spinner-border-sm me-1"></span>
                      {{ itemRepeated ? '已加入購物車' : '加入購物車' }}
                      <span class="material-symbols-outlined fs-5 align-bottom">shopping_cart</span>
                    </div>
                  </button>
                </div>
                <div class="col" :class="{ 'd-none': itemRepeated }">
                  <button :class="{ 'disabled': disabled }"
                      @click="addProduct($event, currentPd.id)" data-btn-value="buyNow"
                      type="button" class="btn py-2 btn-primary w-100 text-nowrap" style="--bs-btn-border-width: 3px;">
                    <span :class="{'spinner-border': disabled === 'buyNow'}" class="spinner-border-sm me-1"></span>立即購買
                  </button>
                </div>
              </div>
            </div>
            <!-- (行動版) 課外輔導導購連結 -->
            <TutorPageAd v-if="!isTutor" class="d-lg-none"></TutorPageAd>
          </div>
          <!-- 右欄 -->
          <div class="d-none d-lg-block col-lg-4">
            <div class="p-6 bg-white bg-opacity-75 mb-8">
              <!-- 摘要資訊 -->
              <RouterView name="sideBar"></RouterView>
              <!-- 售價與操作按鈕 -->
              <div class="text-end my-2">
                <span v-if="currentPd.origin_price !== currentPd.price"><s>NT$ {{ numToPriceString(currentPd.origin_price) }}</s></span>
                <p class="mb-0">
                  {{ isTutor? '加購價' : '售價' }}：
                  <span class="fs-4 text-accent fw-semibold">NT$ {{ numToPriceString(currentPd.price) }}</span>
                </p>
              </div>
              <button :class="{ 'disabled': itemRepeated || disabled }"
                      type="button" class="btn p-0 w-100 bg-gradient border-0 me-2 mb-2">
                <div :class="{ 'hover-bg-transparent': !itemRepeated }"
                      @click="addProduct($event, prodId)" data-btn-value="cart"
                      class="btn py-2 w-100 bg-white bg-clip-padding-box border border-3 border-transparent">
                  <span :class="{'spinner-border': disabled === 'cart'}" class="spinner-border-sm me-1"></span>
                  {{ itemRepeated ? '已加入購物車' : '加入購物車' }}
                  <span class="material-symbols-outlined fs-5 align-bottom">shopping_cart</span>
                </div>
              </button>
              <button :class="{ 'd-none': itemRepeated, 'disabled': disabled }" 
                      @click="addProduct($event, currentPd.id)" data-btn-value="buyNow"
                      type="button" class="btn py-2 btn-primary w-100" style="--bs-btn-border-width: 3px;">
                <span :class="{'spinner-border': disabled === 'buyNow'}" class="spinner-border-sm me-1"></span>立即購買
              </button>
            </div>
            <!-- 課外輔導導購連結 -->
            <TutorPageAd v-if="!isTutor"></TutorPageAd>
          </div>
        </div>
      </div>
    </main>
    <!-- 課程推薦 -->
    <section class="py-10">
      <div v-if="errorMessage !== ''" class="container">
        <h4 class="text-center mb-6 fw-semibold">其他人也看了這些課程</h4>
        <div>
          <p class="mb-0 text-muted text-center">{{ errorMessage }}</p>
        </div>
      </div>
      <div v-else class="swiper-theme-set">
        <h4 class="text-center mb-6 fw-semibold">其他人也看了這些課程</h4>
        <div class="d-flex mb-9 justify-content-center align-items-center">
          <swiper class="flex-shrink-1 order-1 px-3 mx-0 container-xl"
                  :breakpoints="{
                    0: { slidesPerView: 1 },
                    576: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2.5, slidesPerGroup: 2 },
                    992: { slidesPerView: 3.5, slidesPerGroup: 3 },
                    1400: { slidesPerView: 4, slidesPerGroup: 4 },
                  }"
                  :spaceBetween="24"
                  :navigation="{
                    prevEl: '.custom-prev-button',
                    nextEl: '.custom-next-button'
                  }"
                  :freeMode="{
                    momentumBounceRatio: 0.5,
                    momentumRatio: 0.5,
                    momentumVelocityRatio: 0.5
                  }"
                  :modules="modules"
                  >
            <swiper-slide class="h-auto" v-for="(prod, idx) in filteredProducts" :key="prod.id + idx">
              <RouterLink :to="`/product/${prod.id}`" class="d-flex flex-column h-100 rounded-3 overflow-hidden gradient-border gradient-border-1 before-z-index-2 hover-animation text-decoration-none">
                <div class="overflow-hidden" style="height: 185px;">
                  <img :src="prod.imageUrl" :alt="prod.title" class="object-fit-cover w-100 h-100 scale-11 transition-all-3">
                </div>
                <div class="flex-grow-1 p-4 d-flex flex-column bg-white bg-opacity-75 border-top">
                  <h3 class="mb-2 fs-4 fw-semibold text-dark-1">{{ prod.title }}</h3>
                  <p class="mb-2 text-secondary fw-semibold d-flex align-items-center">
                    <span class="material-symbols-outlined me-1">auto_fix_high</span>
                    {{ prod.teacher.name }}
                  </p>
                  <div class="text-dark-3 mb-2 flex-grow-1">
                    <p class="mb-1">時長 {{ prod.outlines_total.minutes }} 分鐘</p>
                    <p class="mb-0">{{ prod.classmates }} 位同學</p>
                  </div>
                  <div class="text-end">
                    <p :class="{'invisible': prod.origin_price === prod.price }" class="mb-0 text-dark-3">
                      <s>NT$ {{ numToPriceString(prod.origin_price) }}</s></p>
                    <p class="mb-0 fs-4 fw-semibold text-accent">NT$ {{ numToPriceString(prod.price) }}</p>
                  </div>
                </div>
              </RouterLink>
            </swiper-slide>
          </swiper>
          <!-- navigation -->
          <div class="swiper-button-prev custom-prev-button order-0 d-xl-flex me-n6 me-xxl-5 ms-4"></div>
          <div class="swiper-button-next custom-next-button order-2 d-xl-flex ms-n6 ms-xxl-5 me-4"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, FreeMode } from 'swiper';

import { RouterLink, RouterView } from 'vue-router';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useCommonStore } from '@/stores/common';
import { useCartsStore } from '@/stores/carts';
import { useProdStore } from '@/stores/product';
import TutorPageAd from '@/components/TutorPageAd.vue';

export default {
  props:['prodId'],
  components: {
    RouterLink,
    RouterView,
    Swiper,
    SwiperSlide,
    TutorPageAd
  },
  data(){
    return {
      disabled: '',
      isTutor: null,
      breadcrumb: {},
      errorMessage: '',
      swiperInstance: null,
      modules: [ Navigation, FreeMode ]
    }
  },
  watch: {
    keywords(newVal, oldVal){  // 調整 breadcrumb 用
      const currentIndex = this.breadcrumb.index;
      const oldFilter = oldVal.find(item => item.index === currentIndex)?.filter;
      const newFilter = newVal.find(item => item.index === currentIndex)?.filter;
      if(this.isTutor){
        this.breadcrumb = {};
        return
      }
      if(this.breadcrumb.filter && newFilter !== oldFilter){
        this.breadcrumb.filter = newFilter;
      }
    },
    prodId(newVal){
      try {
        this.isTutor = newVal === this.tutorPdId;
        this.getSingleProd();
        this.findRepeatItem(newVal);
        this.swiperInstance.slideTo(0, 0); // 推薦列回到第一個 item
      } catch (err) {
        this.$toast({toastType: 'failed'}).fire({ title: err.message });
      }
    },
    carts(){
      this.findRepeatItem(this.prodId);
    }
  },
  computed: {
    ...mapState(useCommonStore, ['categories']),
    ...mapState(useCartsStore, ['carts','itemRepeated']),
    ...mapState(useProdStore, ['allProducts', 'tutorPdId', 'keywords']),
    ...mapWritableState(useProdStore, ['currentPd']),
    usualProducts(){
      return this.allProducts.filter(item => item.id !== this.tutorPdId);
    },
    filteredProducts(){ // 相關推薦課程計算
      if(this.usualProducts.length === 0 || !this.currentPd.id){
        return []
      }

      const keys =  Object.keys(this.categories);
      const total0 = [], total1 = [], total2 = [], total3 = [], total4 = [];

      this.usualProducts.forEach((item) => {
        let count = 0;
        if(item.id !== this.currentPd.id){
          // 比對 category、theme、style，有相同且為有效值則計分
          keys.forEach(key => {
            if(item[key] === this.currentPd[key] && item[key]){
              // category 為主，權重高
              key === 'category' ? count += 3 : count += 1;
            }
          })
        }
        switch (count){
          case 1: total1.push(item); break;
          case 2: total2.push(item); break;
          case 3: total3.push(item); break;
          case 4: total4.push(item); break;
          case 5: total4.unshift(item); break;
          default: if(item.id !== this.currentPd.id){ total0.push(item); }
        }
      })

      total0.sort((a, b) => b.classmates - a.classmates); // 得分 0 則以熱門程度排序
      return [...total4, ...total3, ... total2, ...total1, ...total0].slice(0, 10); // 最多取前 10 個
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['numToPriceString']),
    ...mapActions(useCartsStore, ['addToCart', 'findRepeatItem']),
    ...mapActions(useProdStore, ['getAllProds']),
    getSingleProd(){
      const result = this.allProducts.find(item => item.id === this.prodId);
      if(result){
        this.currentPd = result;
      } else {
        this.$router.push('/products');
        throw {
          errName: 'getSingleProd',
          message: '找不到課程，該課程不存在或已下架',
        }
      }
    },
    async addProduct(e, id){
      this.disabled = e.target.dataset.btnValue;
      try {
        await this.addToCart(id);
        if(this.disabled === 'buyNow'){
          this.$router.push('/checkout/carts');
        } else {
          this.$toast({toastType: 'success'}).fire({title: '已加入購物車'});
        }
      } catch (err) {
        this.$toast({toastType: 'failed'}).fire({title: err});
      } finally {
        this.disabled = '';
      }
    },
    handleBeforeUnload(){
      sessionStorage.setItem("from", JSON.stringify(this.breadcrumb));
    }
  },
  async mounted(){
    let loader = this.$loading.show();
    this.isTutor = this.prodId === this.tutorPdId;
    this.findRepeatItem(this.prodId);
    this.breadcrumb = JSON.parse(sessionStorage.getItem("from"));
    window.addEventListener('beforeunload', this.handleBeforeUnload);
    this.swiperInstance = document.querySelector('.swiper').swiper;

    try {
      await this.getAllProds();
      this.getSingleProd();
    } catch (err) {
      const { message:msg, status, errName } = err;
      this.errorMessage = `${msg}，錯誤代碼：${status}`;
      const toastTxt = errName === 'getSingleProd' ? msg : `${msg}，錯誤代碼：${status}`;
      this.$toast({toastType: 'failed'}).fire({ title: toastTxt });
      this.disabled = status; // 使按鈕禁用
    } finally {
      loader.hide();
    }
  },
  beforeRouteEnter(to, from, next) {
    if(from.matched.length !== 0){  // 重新整理以外的狀況，紀錄來源為 breadcrumb 所用
      const { index, filter } = from.query;
      if(filter || index){
        sessionStorage.setItem("from", JSON.stringify({index, filter}));
      } else {
        sessionStorage.setItem("from", JSON.stringify({}));
      }
    }
    next();
  },
  beforeRouteLeave(){
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  }
}
</script>

<style>
.image-container{
  width: 100%;
  aspect-ratio: 16 / 9;
}

.main-content-style-set .list-space-lg li + li {
  margin-top: 1.5rem;
}

.main-content-style-set .list-space-sm li + li {
  margin-top: .5rem;
}

.main-content-style-set strong {
  font-weight: 700;
}

.hover-bg-transparent:hover,
.hover-bg-transparent:active {
  --bs-bg-opacity: 0;
}

.tab-color {
  --bs-link-color: var(--bs-dark-3);
  --bs-link-hover-color: var(--bs-dark-1);
}
</style>