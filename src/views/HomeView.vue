<template>
  <main class="bg-beige">
    <!-- banner -->
    <section class="vh-100 banner page-padding-top">
      <div class="container h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-11 col-sm-8 col-md-7 col-lg-10 col-xl-8 mb-10 mb-lg-64">
            <div class="text-center row justify-content-center align-items-center mb-6">
              <h1 class="col-lg-6 text-lg-end fw-bolder fs-2 fs-md-d5 fs-lg-1 fs-xxl-d5 mb-3 mb-lg-0">MeetArt 繪課室</h1>
              <p class="col-lg-6 text-lg-start mb-0 fs-5 fs-md-2 fs-lg-3 fs-xxl-2">在繪畫中遇見更好的自己</p>
            </div>
            <div class="mx-xxl-8">
              <div class="d-flex align-items-center bg-light-1 rounded-pill p-1 ps-5 mb-3 mb-lg-4">
                <picture>
                  <source srcset="../assets/images/ic_search_s.png" media="(max-width: 1399.98px)">
                  <source srcset="../assets/images/ic_search.png" media="(min-width: 1400px)">
                  <img src="../assets/images/ic_search_s.png" alt="搜尋">
                </picture>
                <!-- <span class="material-symbols-outlined">search</span> -->
                <input type="text" class="flex-grow-1 w-100 border-0 fs-lg-5 py-2 py-lg-3 mx-2 mx-lg-4 focus-outline-none" placeholder="找課程">
                <button type="button" class="btn btn-primary rounded-pill py-2 px-3 py-lg-3 px-lg-6 py-xxl-5 px-xxl-8 fs-6 fs-lg-5 fs-xxl-4 text-light-1 text-nowrap">搜尋課程</button>
              </div>
              <div>
                <a href="#" class="fs-6 me-2 px-3 py-1 shadow-none rounded-pill btn btn-outline-primary">素描</a>
                <a href="#" class="fs-6 me-2 px-3 py-1 shadow-none rounded-pill btn btn-outline-primary">水彩</a>
                <a href="#" class="fs-6 me-2 px-3 py-1 shadow-none rounded-pill btn btn-outline-primary">人物插畫</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <!-- 平台特色 -->
      <section class="section-padding px-lg-9">
        <h2 class="fs-2 fs-xxl-1 fw-bold text-center mb-8 mb-xl-9 mb-xxl-10 w-fit-content mx-auto pt-5 pt-lg-0 d-md-none d-lg-block">繪課室提供
          <span class="gradient-line gradient-line-14 d-block mt-n14"></span>
        </h2>
        <div class="row justify-content-center icon-wght-300 pt-0 pt-md-9 pt-lg-0">
          <div class="col-md-6 d-none d-md-flex d-lg-none">
            <h2 class="fs-2 fw-bold text-center w-fit-content m-auto pb-8">繪課室提供
              <span class="gradient-line gradient-line-14 d-block mt-n14"></span>
            </h2>
          </div>
          <div class="col-11 col-sm-9 col-md-6 col-lg-4 mb-8 mb-lg-0">
            <div class="ratio ratio-1x1">
              <div class="gradient-border gradient-border-7 position-absolute rounded-circle d-flex flex-column justify-content-center align-items-center px-8 text-center">
                <span class="material-symbols-outlined text-secondary mb-2 mb-md-4 fs-d0 fs-md-d3 fs-xxl-d1">palette</span>
                <h3 class="fs-4 fs-xxl-2 fw-semibold fw-xl-bold mb-2 mb-md-3 mb-xxl-4">多元課程</h3>
                <p class="mb-0 fs-xxl-5 fw-xl-semibold lh-lg">主題多元、清楚分類<br>找得到心儀課程</p>
              </div>
            </div>
          </div>
          <div class="col-11 col-sm-9 col-md-6 col-lg-4 mb-8 mb-lg-0">
            <div class="ratio ratio-1x1">
              <div class="gradient-border gradient-border-7 position-absolute rounded-circle d-flex flex-column justify-content-center align-items-center px-8 text-center">
                <span class="material-symbols-outlined text-secondary mb-2 mb-md-4 fs-d0 fs-md-d3 fs-xxl-d1">support_agent</span>
                <h3 class="fs-4 fs-xxl-2 fw-semibold fw-xl-bold mb-2 mb-md-3 mb-xxl-4">課外輔導</h3>
                <p class="mb-0 fs-xxl-5 fw-xl-semibold lh-lg">不知道該如何改進嗎<br>讓老師提供建議</p>
              </div>
            </div>
          </div>
          <div class="col-11 col-sm-9 col-md-6 col-lg-4 pb-5 mb-lg-0">
            <div class="ratio ratio-1x1">
              <div class="gradient-border gradient-border-7 position-absolute rounded-circle d-flex flex-column justify-content-center align-items-center px-8 text-center">
                <span class="material-symbols-outlined text-secondary mb-2 mb-md-4 fs-d0 fs-md-d3 fs-xxl-d1">psychology</span>
                <h3 class="fs-4 fs-xxl-2 fw-semibold fw-xl-bold mb-2 mb-md-3 mb-xxl-4">課室專欄</h3>
                <p class="mb-0 fs-xxl-5 fw-xl-semibold lh-lg">補充滿滿知識內容<br>延伸學習不中斷</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 作品分享 -->
      <section class="section-padding">
        <div class="section-achievement-container">
          <div class="row justify-content-center h-100">
            <!-- 左 -->
            <div class="col-md-5 col-lg-6 d-flex flex-column h-100">
              <!-- 上 -->
              <div class="pb-lg-3 mb-8 mb-md-0 d-lg-flex" style="height: 45%;">
                <!-- 標題 -->
                <div class="me-sm-8 mb-6">
                  <h2 class="fs-2 fs-xxl-1 fw-bold text-center w-fit-content text-nowrap">作品分享
                    <span class="gradient-line gradient-line-14 d-block mt-n14"></span>
                  </h2>
                  <a class="fs-4 fs-md-6 fs-xxl-4 fw-semibold link-secondary text-decoration-none d-flex align-items-center" href="#">
                    看更多
                    <span class="material-symbols-outlined">arrow_right</span>
                  </a>
                </div>
                <!-- 圖片 -->
                <div class="flex-grow-1 d-md-none d-lg-block">
                  <div class="h-100 position-relative rounded-3 img-border overflow-hidden hover-animation mx-2 mx-lg-0">
                    <img class="w-100 h-100 object-fit-cover transition-all-3" src="https://images.unsplash.com/photo-1549834185-bd9f078a5dfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600" alt="腐朽">
                    <div class="position-absolute w-100 bg-black bg-opacity-50 d-flex align-items-center px-6 px-md-4 px-xl-6 py-3 py-xl-4 transition-transform-3 translate-y-n100 bottom-fixed-0">
                      <div class="me-3 rounded-circle border border-white border-2 flex-shrink-0 avatar-size">
                        <img class="rounded-circle object-fit-cover w-100 h-100" :src="students[0]?.img" alt="學生">
                      </div>
                      <div>
                        <p class="text-white mb-2 fs-5 fs-md-6 fs-xl-5 fw-semibold">{{ students[0]?.name }}</p>
                        <p class="text-white mb-0 line-clamp-2 fs-md-8 fs-xl-6">我對於繪畫一竅不通，但老師的講解非常詳細，讓我對於線條和形狀的理解更加深入，感謝老師用心教學，讓我能夠在短短的時間內進步如此迅速。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 下 -->
              <div class="pt-lg-3 mb-8 mb-md-0" style="height: 55%;">
                <div class="h-100 position-relative rounded-3 img-border overflow-hidden hover-animation mx-2 mx-md-0">
                  <img class="w-100 h-100 object-fit-cover transition-all-3" src="https://images.unsplash.com/photo-1564494818455-695fcd1f1f68?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900" alt="腐朽">
                  <div class="position-absolute w-100 bg-black bg-opacity-50 d-flex align-items-center px-6 px-md-4 px-xl-6 py-3 py-xl-4 transition-transform-3 translate-y-n100 bottom-fixed-0">
                    <div class="me-3 rounded-circle border border-white border-2 flex-shrink-0 avatar-size">
                      <img class="rounded-circle object-fit-cover w-100 h-100" :src="students[1]?.img" alt="學生">
                    </div>
                    <div>
                      <p class="text-white mb-2 fs-5 fs-md-6 fs-xl-5 fw-semibold">{{ students[1]?.name }}</p>
                      <p class="text-white mb-0 line-clamp-2 fs-md-8 fs-xl-6">這堂課程讓我對於色彩的運用有了更多的靈感，讓我的畫作更加生動有趣。老師的教學風格非常活潑，讓我在學習的同時也感到非常開心。我希望未來還有機會參加老師的課程。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 右 -->
            <div class="col-md-7 col-lg-6 mb-8 mb-md-0 h-100">
              <div class="h-100 mobile-ratio-3x2 position-relative rounded-3 img-border overflow-hidden hover-animation mx-2 mx-md-0">
                <img class="w-100 h-100 object-fit-cover transition-all-3" src="https://images.unsplash.com/photo-1531913764164-f85c52e6e654?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900" alt="門前景色">
                <div class="position-absolute w-100 bg-black bg-opacity-50 d-flex align-items-center px-6 px-md-4 px-xl-6 py-3 py-xl-4 transition-transform-3 translate-y-n100 bottom-fixed-0 rounded-bottom">
                  <div class="me-3 rounded-circle border border-white border-2 flex-shrink-0 avatar-size">
                    <img class="rounded-circle object-fit-cover w-100 h-100" :src="students[2]?.img" alt="學生">
                  </div>
                  <div>
                    <p class="text-white mb-2 fs-5 fs-md-6 fs-xl-5 fw-semibold">{{ students[2]?.name }}</p>
                    <p class="text-white mb-0 line-clamp-2 fs-md-8 fs-xl-6">我一直很喜歡繪畫，但總覺得自己的畫作缺乏靈魂。課程中我學會了如何在畫作中表達情感和個人風格。老師教授的技巧非常實用，讓我在繪畫的時候更加自信。</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- 熱門推薦 -->
    <section class="section-padding section-recommend-padding">
      <div class="container">
        <h2 class="fs-2 fs-xxl-1 fw-bold text-center mb-8 mb-xl-9 mb-xxl-10 w-fit-content">熱門課程推薦
          <span class="gradient-line gradient-line-14 d-block mt-n14"></span>
        </h2>
      </div>
      <div v-if="errorMessage !== ''" class="container">
        <p class="mb-0 fs-5 text-muted">{{ errorMessage }}</p>
      </div>
      <div v-else class="index-recommend-swiper">
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
                  :pagination="{
                    el: '.custom-pagination',
                    clickable: true
                  }"
                  :freeMode="{
                    momentumBounceRatio: 0.5,
                    momentumRatio: 0.5,
                    momentumVelocityRatio: 0.5
                  }"
                  :modules="modules"
                  >
            <swiper-slide class="h-auto" v-for="prod in filteredProducts" :key="prod.id">
              <a href="#" class="d-flex flex-column h-100 rounded-3 overflow-hidden gradient-border gradient-border-1 before-z-index-2 hover-animation text-decoration-none">
                <div class="overflow-hidden" style="height: 185px;">
                  <img :src="prod.imageUrl" :alt="prod.title" class="object-fit-cover object-position-top w-100 h-100 scale-11 transition-all-3">
                </div>
                <div class="flex-grow-1 p-4 bg-beige d-flex flex-column bg-white bg-opacity-50 ">
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
              </a>
            </swiper-slide>
          </swiper>
          <!-- navigation -->
          <div class="swiper-button-prev custom-prev-button order-0 d-xl-flex me-n6 me-xxl-5 ms-4"></div>
          <div class="swiper-button-next custom-next-button order-2 d-xl-flex ms-n6 ms-xxl-5 me-4"></div>
        </div>
        <!-- pagination -->
        <div class="swiper-pagination custom-pagination position-unset"></div>
      </div>
    </section>
    <!-- 課室專欄 -->
    <div class="container">
      <section class="section-padding">
        <h2 class="fs-2 fs-xxl-1 fw-bold text-center mb-8 mb-xl-9 mb-xxl-10 w-fit-content">課室專欄
          <span class="gradient-line gradient-line-14 d-block mt-n14"></span>
        </h2>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-1 flex-lg-column">
          <div v-for="(article, i) in articles" :key="article.title" class="col mb-8 mb-md-0 mb-lg-10 mb-xl-100"
              :class=" i === 2 ? 'd-md-none d-lg-block' : '' ">
            <div class="row gx-0 align-items-top align-items-xl-end flex-column flex-lg-row">
              <div class="col-lg-5 col-xl-4 col-xxl-5">
                <img class="w-100 object-fit-cover rounded-top-3 rounded-lg-0" :src="article.image" alt="文章附圖" style="max-height: 300px;">
              </div>
              <div class="col mt-n6 mt-lg-9 mt-xl-0 mb-xl-n9 mb-xxl-n8 flex-lg-grow-1 ms-0 ms-lg-n7percent">
                <div class="backdrop-blur-2 gradient-border gradient-border-1 rounded-bottom-3 rounded-lg-3 bg-white bg-opacity-75 py-8 px-5 px-lg-9">
                  <h3 class="fw-bold fs-4 fw-lg-bold fs-xxl-2 mb-3">{{ article.title }}</h3>
                  <div class="gradient-line gradient-line-4 mb-3"></div>
                  <p class="text-dark-3 fs-xxl-5 fw-lg-semibold mb-3 line-clamp-2">{{ article.description }}</p>
                  <p class="text-dark-3 mb-5">{{ dateConverter(article.create_at * 1000) }}</p>
                  <a href="#" class="stretched-link d-flex align-items-center justify-content-end text-decoration-none text-secondary">
                    閱讀更多
                    <span class="material-symbols-outlined">arrow_right</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, FreeMode } from 'swiper';

const { VITE_BASE, VITE_API } = import.meta.env;
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';

export default {
  components: {
      Swiper,
      SwiperSlide,
  },
  data(){
    return {
      students: [],
      modules: [ Navigation, Pagination, FreeMode ],
      products: [],
      errorMessage: '',
      articles: [
        {
          image: 'https://images.unsplash.com/photo-1513758173941-bfbd2e4166f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=600&q=80',
          title: '看不出圖哪裡怪怪的？從觀察開啟「繪畫之眼」',
          description: '初學者剛開始學畫時，經常會想將看到的一切鉅細靡遺地包含在畫作中，這些埋首在小細節上、卻又畫不好的時刻，通常是放棄的引子。然而在繪畫裡，講究的其實是一個「整體」',
          create_at: 1673853662
        },
        {
          image: 'https://images.unsplash.com/photo-1541723011216-c57eaed19919?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=600&q=80',
          title: '色彩三要素：什麼是色相、明度、飽和度？',
          description: '初學者剛開始學畫時，經常會想將看到的一切鉅細靡遺地包含在畫作中，這些埋首在小細節上、卻又畫不好的時刻，通常是放棄的引子。然而在繪畫裡，講究的其實是一個「整體」',
          create_at: 1675850735
        },
        {
          image: 'https://images.unsplash.com/photo-1456086272160-b28b0645b729?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&h=600&q=80',
          title: '挑選水彩用具 - 不是越貴越好，要就挑「最適合」',
          description: '初學者剛開始學畫時，經常會想將看到的一切鉅細靡遺地包含在畫作中，這些埋首在小細節上、卻又畫不好的時刻，通常是放棄的引子。然而在繪畫裡，講究的其實是一個「整體」',
          create_at: 1678855662
        }
      ]
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['numToPriceString', 'dateConverter']),
    getRandomUsers(){
      this.$http.get('https://randomuser.me/api/?inc=name,picture&nat=us&results=3')
      .then(res => {
        this.studentsData(res.data.results)
      })
      .catch(err => {
        console.log(err);
      })
    },
    studentsData(data){
      data.forEach(item => {
        const name = `${item.name.first}`;
        const img = item.picture.medium;
        this.students.push({ name, img })
      })
    },
    getProducts(){
      this.errorMessage = '';
      const url = `${VITE_BASE}/v2/api/${VITE_API}/products/all`;
      this.$http.get(url)
      .then(res => {
        this.products = res.data.products;
      })
      .catch(err => {
        this.errorMessage = `資料取得失敗，錯誤代碼：${err.response.status}`;
      })
    }
  },
  computed: {
    filteredProducts(){
      return this.products.length !== 0 ?
             this.products.filter(item => item.classmates > 200) : []
    }
  },
  mounted(){
    this.getRandomUsers();
    this.getProducts();
  }
}
</script>

<style scoped>
.banner {
  background: url('../assets/images/banner_m.jpg') no-repeat center / cover;
}

@media (min-width: 1200px){
  .banner {
    background-image: url('../assets/images/banner.jpg');
  }
}

@media (min-width: 992px){
  .mb-lg-64{
    margin-bottom: 64px !important;
  }
}

@media (min-width: 992px){
  .section-recommend-padding {
    padding: 120px 0 80px;
  }
}

.img-border {
  box-shadow: 0 0 0 8px white, 0 0 10px 0 black;
}

@media (max-width: 768px) {
  .mobile-ratio-3x2{
    aspect-ratio: 3 / 2;
  }
}

.index-recommend-swiper {
  --swiper-theme-color: #AA864E;
  --swiper-navigation-size: 25px;
  --swiper-pagination-bullet-width: 26px;
  --swiper-pagination-bullet-border-radius: 20px;
  --swiper-pagination-bullet-horizontal-gap: 6px;
  --swiper-pagination-bullet-inactive-color: #AA864E;
}

.index-recommend-swiper .custom-prev-button,
.index-recommend-swiper .custom-next-button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: unset;
  flex-shrink: 0;
  background-color: #fff;
  display: none;
}

@media (min-width: 992px){
  .ms-lg-n7percent {
    margin-left: -7% !important;
  }
}

@media (min-width: 1200px){
  .mb-xl-100{
    margin-bottom: 100px !important;
  }
}

@media (min-width: 768px){
  .section-achievement-container{
    aspect-ratio: 20 / 8;
    max-height: 600px;
  }
}

.avatar-size{
  width: 62px;
  height: 62px;
}

@media (min-width: 768px) and (max-width: 1199.98px){
  .avatar-size{
    width: 50px;
    height: 50px;
  }
}
</style>