<template>
  <div class="bg-beige">
    <main class="page-padding-top min-vh-100">
      <div class="container py-8">
        <!-- breadcrumb -->
        <ol class="breadcrumb mb-3">
          <li class="breadcrumb-item">
            <RouterLink to="/">首頁</RouterLink>
          </li>
          <li class="breadcrumb-item">
            <RouterLink :to="{path:'/products', query: {index: breadcrumb.index}}">繪畫{{ catagories[breadcrumb.index]?.name }}</RouterLink>
          </li>
          <li v-if="breadcrumb.filter" class="breadcrumb-item">
            <RouterLink :to="{path:'/products', query: {...breadcrumb}}">{{ breadcrumb.filter }}</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ product.title }}</li>
        </ol>
        <!-- 主要內容 -->
        <div class="row">
          <!-- 左欄 -->
          <div class="col-12 col-lg-8">
            <div class="image-container mb-4 bg-light-2">
              <img v-if="product.imageUrl" :src="product.imageUrl" class="object-fit-cover w-100 h-100" alt="">
            </div>
            <!-- 992px 以下版面 start -->
            <div class="p-6 bg-white bg-opacity-75 mb-4 d-lg-none">
              <h1 class="fs-4 fw-bold mb-0">{{ product.title }}</h1>
              <div class="gradient-line gradient-line-2 py-4"></div>
              <div class="row gy-3 text-nowrap">
                <div class="col">
                  <p class="fs-7 mb-1 text-muted">課程時長</p>
                  <p class="mb-0">{{ convertToHour(product.outlines_total?.minutes) }}</p>
                </div>
                <div class="col">
                  <p class="fs-7 mb-1 text-muted">單元數</p>
                  <p class="mb-0">{{ product.outlines_total?.outlines }} 章節 {{ product.outlines_total?.lectures }} 單元</p>
                </div>
                <div class="col">
                  <p class="fs-7 mb-1 text-muted">觀看限制</p>
                  <p class="mb-0">時間、次數不限</p>
                </div>
                <div class="col">
                  <p class="fs-7 mb-1 text-muted">作業回覆</p>
                  <p class="mb-0">已包含</p>
                </div>
              </div>
              <div class="gradient-line gradient-line-2 py-4"></div>
              <div>
                <p class="mb-2">課程關鍵字：</p>
                <div class="fs-7">
                  <template v-for="word in keywords" :key="word">
                    <RouterLink :to="`/products?index=${word.index}&filter=${word.filter}`"
                          class="btn btn-sm btn-outline-primary rounded-pill me-2 mb-2">{{ word.filter }}</RouterLink>
                  </template>
                </div>
              </div>
            </div>
            <!-- 992px 版面 end -->
            <!-- 簡介、大綱、常見問題頁籤 -->
            <div class="bg-white bg-opacity-75">
              <ul class="py-3 px-8 nav">
                <li class="nav-item">
                  <button type="button" class="btn btn-link text-decoration-none tab-color" :class="{'text-dark-1': currentTab === 'brief'}" @click="currentTab = 'brief'">課程簡介
                    <span :class="{' gradient-line-8': currentTab === 'brief'}" class="gradient-line d-block mt-n2"></span>
                  </button>
                </li>
                <li class="nav-item">
                  <button type="button" class="btn btn-link text-decoration-none tab-color" :class="{'text-dark-1': currentTab === 'outlines'}" @click="currentTab = 'outlines'">課程章節
                    <span :class="{' gradient-line-8': currentTab === 'outlines'}" class="gradient-line d-block mt-n2"></span>
                  </button>
                </li>
                <li class="nav-item">
                  <button type="button" class="btn btn-link text-decoration-none tab-color" :class="{'text-dark-1': currentTab === 'QA'}" @click="currentTab = 'QA'">常見問題
                    <span :class="{' gradient-line-8': currentTab === 'QA'}" class="gradient-line d-block mt-n2"></span>
                  </button>
                </li>
              </ul>
              <hr class="m-0">
            </div>
            <!-- 內容 -->
            <div class="p-8 bg-white bg-opacity-75">
              <template v-if="currentTab === 'brief'">
                <div class="mb-9">
                  <div class="d-flex mb-3">
                    <div class="bg-gradient me-3" style="width: 4px;"></div>
                    <h2 class="fw-bold fs-5 mb-1">這門課你將會學到：
                    </h2>
                  </div>
                  <p v-html="product.intro?.willLearn"></p>
                </div>
                <div class="mb-9">
                  <div class="d-flex mb-3">
                    <div class="bg-gradient me-3" style="width: 4px;"></div>
                    <h2 class="fw-bold fs-5 mb-1">課前準備：
                    </h2>
                  </div>
                  <p v-html="product.intro?.preparation"></p>
                </div>
                <div>
                  <div class="d-flex mb-3">
                    <div class="bg-gradient me-3" style="width: 4px;"></div>
                    <h2 class="fw-bold fs-5 mb-1">關於老師：
                    </h2>
                  </div>
                  <div class="d-flex">
                    <img class="rounded-circle me-3 align-self-start" src="../assets/images/teacher_avatar.jpg" alt="" style="max-width: 60px;">
                    <div>
                      <p class="mb-1 fw-semibold">{{ product.teacher?.name }}</p>
                      <p class="mb-2 fs-7">{{ product.teacher?.brief }}</p>
                      <a class="d-inline-block me-2">
                        <img src="../assets/images/facebook.svg" alt="" style="width: 20px;">
                      </a>
                      <a class="d-inline-block">
                        <img src="../assets/images/instagram.svg" alt="" style="width: 20px;">
                      </a>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else-if="currentTab === 'outlines'">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">章節名稱</th>
                      <th scope="col" class="w-50">概述</th>
                      <th scope="col" class="text-nowrap text-center">分鐘</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in product.outlines" :key="item.title">
                      <th scope="row">{{ item.title }}</th>
                      <td>{{ item.brief }}</td>
                      <td class="text-center">{{ item.minutes }}</td>
                    </tr>
                  </tbody>
                </table>
              </template>
              <template v-else-if="currentTab === 'QA'">
                <ol class="questions-list">
                  <li v-for="q in commonQuestions" :key="q.question">
                    <h4 class="fs-6 fw-bold" v-html="q.question"></h4>
                    <div v-html="q.answer"></div>
                  </li>
                </ol>
              </template>
            </div>
            <!-- 992px 以下版面 start -->
            <div class="bg-white p-3 sticky-bottom d-lg-none border-top mb-8">
              <div class="row g-2 align-items-center">
                <div class="col flex-grow-0">
                  <p class="text-accent fw-semibold text-nowrap mb-0">NT$ {{ numToPriceString(product.price) }}</p>
                </div>
                <div class="col">
                  <button type="button" class="btn p-0 w-100 bg-gradient border-0 me-2 text-nowrap"
                          :class="{ 'disabled': itemRepeated }" @click="addProduct(prodId)">
                    <div :class="{ 'hover-bg-transparent': !itemRepeated }" class="btn py-2 w-100 bg-white bg-clip-padding-box border border-3 border-transparent">{{ itemRepeated ? '已加入購物車' : '加入購物車' }}
                      <span class="material-symbols-outlined fs-5 align-bottom">shopping_cart</span>
                    </div>
                  </button>
                </div>
                <div class="col">
                  <button @click="buyNow(product.id)" type="button" class="btn py-2 btn-primary w-100 text-nowrap" style="--bs-btn-border-width: 3px;"
                          :class="{ 'd-none': itemRepeated }">立即購買</button>
                </div>
              </div>
            </div>
            <div class="d-lg-none">
              <h3 class="fs-6 mb-2">有其他圖想請老師指教？</h3>
              <div class="p-6 bg-white bg-opacity-75">
                <h2 class="fs-5 fw-bold mb-3">課外輔導</h2>
                <div class="d-flex mb-4">
                  <div class="bg-gradient me-3" style="width: 4px;"></div>
                  <p class="mb-1">額外的作品檢視服務，由老師協助檢視 <u>課程作業以外</u> 的作品</p>
                </div>
                <div class="text-end mb-2">
                  <s>NT$ 350</s>
                  <p class="mb-0">加購價：<span class="fs-4 text-accent fw-semibold">NT$ 280</span></p>
                </div>
                <button type="button" class="btn p-0 w-100 bg-gradient border-0">
                  <div class="btn py-2 w-100 bg-white bg-clip-padding-box border border-3 border-transparent hover-bg-transparent">前往了解更多</div>
                </button>
              </div>
            </div>
            <!-- 992px 版面 end -->
          </div>
          <!-- 右欄 -->
          <div class="d-none d-lg-block col-lg-4">
            <div class="p-6 bg-white bg-opacity-75 mb-8">
              <h1 class="fs-4 fw-bold mb-0">{{ product.title }}</h1>
              <div class="gradient-line gradient-line-2 py-4"></div>
              <div class="row row-cols-2 gy-3">
                <div class="col">
                  <p class="fs-7 mb-1 text-muted">課程時長</p>
                  <p class="mb-0">{{ convertToHour(product.outlines_total?.minutes) }}</p>
                </div>
                <div class="col">
                  <p class="fs-7 mb-1 text-muted">單元數</p>
                  <p class="mb-0">{{ product.outlines_total?.outlines }} 章節 {{ product.outlines_total?.lectures }} 單元</p>
                </div>
                <div class="col">
                  <p class="fs-7 mb-1 text-muted">觀看限制</p>
                  <p class="mb-0">時間、次數不限</p>
                </div>
                <div class="col">
                  <p class="fs-7 mb-1 text-muted">作業回覆</p>
                  <p class="mb-0">已包含</p>
                </div>
              </div>
              <div class="gradient-line gradient-line-2 py-4"></div>
              <div class="mb-8">
                <p class="mb-2">課程關鍵字：</p>
                <div class="fs-7">
                  <template v-for="word in keywords" :key="word">
                    <RouterLink :to="`/products?index=${word.index}&filter=${word.filter}`"
                          class="btn btn-sm btn-outline-primary rounded-pill me-2 mb-2">{{ word.filter }}</RouterLink>
                  </template>
                </div>
              </div>
              <div class="text-end">
                <s>NT$ {{ numToPriceString(product.origin_price) }}</s>
                <p>售價：<span class="fs-4 text-accent fw-semibold">NT$ {{ numToPriceString(product.price) }}</span></p>
              </div>
              <button type="button" class="btn p-0 w-100 bg-gradient border-0 me-2 mb-2"
                      :class="{ 'disabled': itemRepeated }" @click="addProduct(prodId)">
                <div :class="{ 'hover-bg-transparent': !itemRepeated }" class="btn py-2 w-100 bg-white bg-clip-padding-box border border-3 border-transparent">{{ itemRepeated ? '已加入購物車' : '加入購物車' }}
                  <span class="material-symbols-outlined fs-5 align-bottom">shopping_cart</span>
                </div>
              </button>
              <button @click="buyNow(product.id)" type="button" class="btn py-2 btn-primary w-100" style="--bs-btn-border-width: 3px;"
                      :class="{ 'd-none': itemRepeated }">立即購買</button>
            </div>
            <div>
              <h3 class="fs-6 mb-2">有其他圖想請老師指教？</h3>
              <div class="p-6 bg-white bg-opacity-75">
                <h2 class="fs-5 fw-bold mb-3">課外輔導</h2>
                <div class="d-flex mb-6">
                  <div class="bg-gradient me-3" style="width: 4px;"></div>
                  <p class="mb-1">額外的作品檢視服務，由老師協助檢視 <u>課程作業以外</u> 的作品</p>
                </div>
                <div class="text-end">
                  <s>NT$ 350</s>
                  <p>加購價：<span class="fs-4 text-accent fw-semibold">NT$ 280</span></p>
                </div>
                <button type="button" class="btn p-0 w-100 bg-gradient border-0">
                  <div class="btn py-2 w-100 bg-white bg-clip-padding-box border border-3 border-transparent hover-bg-transparent">前往了解更多</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <!-- 課程推薦 -->
    <section class="py-10">
      <h4 class="text-center mb-6 fw-semibold">其他人也看了這些課程</h4>
      <div v-if="errorMessage !== ''" class="container">
        <p class="mb-0 text-muted">{{ errorMessage }}</p>
      </div>
      <div v-else class="swiper-theme-set">
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
            <swiper-slide class="h-auto" v-for="prod in filteredProducts" :key="prod.id">
              <RouterLink :to="`/product/${prod.id}`" class="d-flex flex-column h-100 rounded-3 overflow-hidden gradient-border gradient-border-1 before-z-index-2 hover-animation text-decoration-none">
                <div class="overflow-hidden" style="height: 185px;">
                  <img :src="prod.imageUrl" :alt="prod.title" class="object-fit-cover object-position-top w-100 h-100 scale-11 transition-all-3">
                </div>
                <div class="flex-grow-1 p-4 d-flex flex-column bg-white bg-opacity-75 ">
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
                    <p class="mb-0 text-dark-3"><s>NT$ {{ numToPriceString(prod.origin_price) }}</s></p>
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

import { RouterLink } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import { useCommonStore } from '@/stores/common';
import { useCartsStore } from '@/stores/carts';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  props:['prodId'],
  components: {
    RouterLink,
    Swiper,
    SwiperSlide,
  },
  data(){
    return {
      product: {
        outlines: []
      },
      currentTab: 'brief',
      modules: [ Navigation, FreeMode ],
      allProducts: [],
      commonQuestions: [
        {
          question: '如何觀看已購買的影音課程？',
          answer: '<p>MeetArt 提供專屬的課程平台，可以由購買後的課程開通 email 前往。</p>'
        },
        {
          question: '影音課程是否有時效性呢？',
          answer: '<p>無時效性，同學擁有永久觀看的權利，敬請放心。</p>'
        },
        {
          question: '購買的課程包含哪些服務呢？',
          answer: '<p>包含「永久觀看」、「課程問題發問」及「作業批改」等三項。</p>'
        },
        {
          question: '課程中有包含「課外輔導」嗎？',
          answer: '<p>課外輔導為額外的作品輔導，當同學有課程作業以外的作品想要尋求老師的建議與批註，可依據需求購買，詳細內容請至 <a href="#">課外輔導頁面</a> 了解。</p>'
        },
        {
          question: '課程購買後可以退費嗎？如何申請？',
          answer: '<ul class="mb-4"><li>購買 7 日內未觀看任一付費單元，退還 100% 課程費用。</li><li>購買 8 - 14 日內未觀看任一付費單元，退還 30% 課程費用。</li><li>購買第 15 日起，恕不提供退費。</li></ul><p class="mb-2">※ 如欲申請退費請來信 <a href="#">MeetArt 客服信箱</a> 說明原因，信件內容應包含以下：</p><ul><li>使用者帳號</li><li>課程名稱</li><li>退款原因</li></ul>'
        }
      ],
      breadcrumb: {},
      errorMessage: ''
    }
  },
  watch: {
    "product.category"(newVal, oldVal){
      if(!this.breadcrumb.index){
        this.breadcrumb = {
          index: 'category',
          filter: newVal
        };
      }
    },
    prodId(){
      this.getSingleProd();
      this.findRepeatItem(this.prodId);
    },
    carts(){
      this.findRepeatItem(this.prodId);
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['numToPriceString', 'dateConverter']),
    ...mapActions(useCartsStore, ['addToCart', 'findRepeatItem', 'couponInfo']),
    getSingleProd(){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/product/${this.prodId}`;
      this.$http.get(url).then(res => {
        this.product = res.data.product;
      })
      .catch(err => {
        alert(`無法取得產品，錯誤代碼：${err.response.status}`)
      })
    },
    convertToHour(min){
      return `${(min/60).toFixed(0)} 小時 ${min%60} 分鐘`
    },
    getAllProducts(){
      this.errorMessage = '';
      const url = `${VITE_BASE}/v2/api/${VITE_API}/products/all`;
      this.$http.get(url).then(res => {
        this.allProducts = res.data.products;
      })
      .catch(err => {
        this.errorMessage = `無法取得產品，錯誤代碼：${err.response.status}`;
      })
    },
    addProduct(id){
      this.addToCart(id, true).then(res => {
        alert('已加入購物車')
      })
      .catch(err => {
        alert(err)
      })
    },
    buyNow(id) {
      this.addToCart(id, true).then(res => {
        this.$router.push('/checkout/carts');
      })
      .catch(err => {
        alert(err)
      })
    }
  },
  computed: {
    ...mapState(useCommonStore, ['catagories']),
    ...mapState(useCartsStore, ['carts','itemRepeated']),
    filteredProducts(){
      if(this.allProducts.length !== 0 && this.product.id){
        const keys =  Object.keys(this.catagories);
        const total0 = [], total1 = [], total2 = [], total3 = [], total4 = [];

        this.allProducts.forEach(item => {
          let count = 0;
          if(item.id !== this.product.id){
            keys.forEach(key => {
              if(item[key] === this.product[key] && item[key]){
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
            default: if(item.id !== this.product.id){ total0.push(item); };
          }
        })

        total0.sort((a, b) => b.classmates - a.classmates);
        return [...total4, ...total3, ... total2, ...total1, ...total0].slice(0, 10);
      } else {
        return []
      }
    },
    keywords(){
      const temp = [];
      const keys = Object.keys(this.catagories);
      keys.forEach(key => {
        if(this.product[key]){
          temp.push({
            index: key,
            filter: this.product[key]
          })
        }
      })
      return temp
    }
  },
  mounted(){
    this.getSingleProd();
    this.getAllProducts();
    this.findRepeatItem(this.prodId);
  },
  beforeRouteEnter(to, from, next) {
    if(from.name === '前台課程列表'){
      next(vm => vm.breadcrumb = from.query);
    } else {
      next()
    }
  }
}
</script>
<style scoped>
.image-container{
  width: 100%;
  height: 350px;
}

.tab-color{
  --bs-link-color: #666666;
  --bs-link-hover-color: #1a1a1a;
}

.questions-list {
  --bs-link-color: #AA864E;
}
.questions-list li + li {
  margin-top: 1.5rem;
}

.hover-bg-transparent:hover,
.hover-bg-transparent:active {
  --bs-bg-opacity: 0;
}
</style>