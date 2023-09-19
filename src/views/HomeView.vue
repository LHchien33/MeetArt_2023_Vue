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
            <!-- 搜尋欄 -->
            <div class="mx-xxl-8">
              <div class="d-flex align-items-center bg-light-1 rounded-pill p-1 ps-5 mb-3 mb-lg-4">
                <!-- 放大鏡 icon -->
                <picture>
                  <source srcset="../assets/images/ic_search_s.png" media="(max-width: 1399.98px)">
                  <source srcset="../assets/images/ic_search.png" media="(min-width: 1400px)">
                  <img src="../assets/images/ic_search_s.png" alt="搜尋">
                </picture>
                <!-- 輸入框 -->
                <div class="input-clear-wrapper flex-grow-1">
                  <!-- 另外以 compositionend event 監聽 IME 的 composition session -->
                  <input type="text" v-model="searchPattern" @input="searchHandler($event)" @compositionend="searchHandler($event)"
                        :placeholder="errorMessage ? errorMessage : '找課程'"
                        class="w-100 border-0 fs-lg-5 px-2 px-lg-3 lh-lg focus-outline-none">
                  <!-- 清除輸入的 x -->
                  <button type="button" @click="clearSearchBtn()" :class="{ 'd-block': inputClearBtnShow }"
                          class="material-symbols-outlined input-clear-btn p-1 text-muted fs-5 fs-lg-4">cancel</button>
                  <!-- 搜尋建議 -->
                  <ul class="position-absolute list-group w-100" style="z-index: 2; top: 120%;">
                    <li v-if="searchDisabled" class="list-group-item text-muted">- 搜尋中 -</li>
                    <li v-else-if="inputClearBtnShow && searchSuggestion.length === 0"
                        class="list-group-item text-muted">- 沒有找到相關課程 -</li>
                    <template v-else-if="searchSuggestion.length !== 0">
                      <li v-for="item in searchSuggestion" :key="item.id" class="list-group-item list-group-item-action p-0">
                        <RouterLink :to="`/product/${item.id}`"
                                    class="d-block p-2 px-lg-3 text-decoration-none text-dark-1">{{ item.title }}</RouterLink>
                      </li>
                      <li v-if="matchPatterns.length > 5" class="list-group-item text-muted">...等 {{ matchPatterns.length }} 項結果</li>
                    </template>
                  </ul>
                </div>
                <!-- 搜尋按鈕 -->
                <button type="button" @click="goToSearchResult()" :disabled="errorMessage || searchDisabled"
                        class="btn btn-primary rounded-pill py-2 px-3 py-lg-3 px-lg-6 py-xxl-5 px-xxl-8 fs-6 fs-lg-5 fs-xxl-4 text-light-1 text-nowrap">搜尋課程
                </button>
              </div>
              <!-- 靜態的快速連結 -->
              <div>
                <template v-for="item in quickLink" :key="item">
                  <RouterLink :to="{path: '/products', query: {index: 'category', filter: item}}"
                              @click="finalSearchPattern = ''; finalSearchResult = []"
                              class="me-2 px-3 py-1 shadow-none rounded-pill btn btn-outline-primary">{{ item }}</RouterLink>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <!-- 平台特色 -->
      <section class="section-padding px-lg-9">
        <h2 class="fs-2 fs-xxl-1 fw-bold mb-8 mb-xl-9 mb-xxl-10 w-fit-content mx-auto pt-5 pt-lg-0 d-md-none d-lg-block">繪課室提供
          <span class="gradient-line gradient-line-14 d-block mt-n14"></span>
        </h2>
        <div class="row justify-content-center icon-wght-300 pt-0 pt-md-9 pt-lg-0">
          <div class="col-md-6 d-none d-md-flex d-lg-none">
            <h2 class="fs-2 fw-bold w-fit-content m-auto pb-8">繪課室提供
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
                  <h2 class="fs-2 fs-xxl-1 fw-bold d-inline-block text-nowrap">作品分享
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
        <h2 class="fs-2 fs-xxl-1 fw-bold mb-8 mb-xl-9 mb-xxl-10 d-inline-block">熱門課程推薦
          <span class="gradient-line gradient-line-14 d-block mt-n14"></span>
        </h2>
      </div>
      <div v-if="errorMessage !== ''" class="container">
        <p class="mb-0 fs-5 text-muted">{{ errorMessage }}</p>
      </div>
      <div class="swiper-theme-set">
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
                    clickable: true,
                    dynamicBullets: true
                  }"
                  :freeMode="{
                    momentumBounceRatio: 0.5,
                    momentumRatio: 0.5,
                    momentumVelocityRatio: 0.5
                  }"
                  :modules="modules"
                  >
            <swiper-slide class="h-auto" v-for="prod in prodPromotion" :key="prod.id">
              <RouterLink :to="`/product/${prod.id}`" class="d-flex flex-column h-100 rounded-3 overflow-hidden gradient-border gradient-border-1 before-z-index-2 hover-animation text-decoration-none">
                <div class="overflow-hidden" style="height: 185px;">
                  <img :src="prod.imageUrl" :alt="prod.title" class="object-fit-cover w-100 h-100 scale-11 transition-all-3">
                </div>
                <div class="flex-grow-1 p-4 d-flex flex-column bg-white bg-opacity-50 border-top">
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
        <!-- pagination -->
        <div class="swiper-pagination custom-pagination position-unset mx-auto translate-middle-unset"></div>
      </div>
    </section>
    <!-- 課室專欄 -->
    <div class="container">
      <section class="section-padding">
        <h2 class="fs-2 fs-xxl-1 fw-bold mb-8 mb-xl-9 mb-xxl-10 d-inline-block">課室專欄
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

import { RouterLink } from 'vue-router';
import { mapState, mapActions, mapWritableState } from 'pinia';
import { useCommonStore } from '@/stores/common';
import { useProdStore } from '@/stores/product';
import { debounce as _debounce } from 'lodash';

export default {
  components: {
    RouterLink,
    Swiper,
    SwiperSlide,
  },
  data(){
    return {
      searchPattern: '',
      matchPatterns: [],
      inputClearBtnShow: false,
      searchDisabled: false,
      products: [],
      errorMessage: '',
      students: [],
      quickLink: ['素描', '水彩', '色鉛筆'],
      modules: [ Navigation, Pagination, FreeMode ],
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
    ...mapActions(useProdStore, ['getAllProds']),
    getRandomUsers(){
      const url = 'https://randomuser.me/api/?inc=name,picture&nat=us&results=3';
      this.$http.get(url).then(res => {
        const data = res.data?.results;
        data.forEach(item => {
          const name = item.name.first;
          const img = item.picture.medium;
          this.students.push({ name, img });
        })
      }).catch(err => {
        this.students = [
          {name: 'Abby', img: 'https://randomuser.me/api/portraits/women/29.jpg'},
          {name: 'Gary', img: 'https://randomuser.me/api/portraits/men/34.jpg'},
          {name: 'Christian', img: 'https://randomuser.me/api/portraits/women/68.jpg'}
        ]
      })
    },
    clearSearchBtn(){
      this.searchPattern = '';
      this.matchPatterns = [];
      this.searchDisabled = false;
      this.inputClearBtnShow = false;
    },
    searchHandler: _debounce(function(e){
      this.matchPatterns = [];
      this.searchDisabled = true;
      this.inputClearBtnShow = true;
      
      if(!e.target.value){
        this.searchDisabled = false;
        this.inputClearBtnShow = false;
        return
      }

      // a boolean that indicates if the event is fired within a composition session
      // 需要組字/選字，文字下方有虛線的輸入法類型，例如注音為 true，英文則為 false
      if(e.isComposing){
        return
      }

      this.searchPdTitle(e);
      this.searchDisabled = false;
    }, 500),
    searchPdTitle(e){
      this.searchPattern = e.target.value;
      // 去頭尾空白、特殊符號跳脫
      const escapePattern = e.target.value.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const separated = escapePattern.replace(/\s+/g, '|'); // 句中空白替換成 |
      const combined = escapePattern.replace(/\s+/g, '');   // 句中空白替換成 ""（組字）
      // 兩者是否相等（搜尋時有沒有使用空白格）
      const rule = separated === combined ? `[${escapePattern}]+` : `[${combined}]+|${separated}`;
      const regex = new RegExp(rule, 'g');

      this.normalProducts.forEach(item => {
        const matches = item.title.match(regex);  // Array or null
        const matchCount = matches?.reduce((ac, cu) => cu.length > 1 ? ac + cu.length*10 : ac + 1, 0); // 加權計算
        if(matches){
          this.matchPatterns.push({ title: item.title, id: item.id, count: matchCount });
        }
      });
      this.matchPatterns.sort((a, b) => b.count - a.count);
    },
    goToSearchResult(){
      this.finalSearchPattern = this.searchPattern;
      this.finalSearchResult = this.matchPatterns.map(item => item.id);
      if(this.finalSearchPattern){
        this.$router.push('/products');
        this.routerPositionRecord = this.$router.options.history.state.position + 1;
      } else {
        this.$toast({toastType: 'failed'}).fire({title: '請先輸入欲搜尋的課程名稱！'})
      }
    }
  },
  computed: {
    ...mapState(useProdStore, ['allProducts', 'tutorPdId']),
    ...mapWritableState(useProdStore, ['finalSearchPattern', 'finalSearchResult', 'routerPositionRecord']),
    normalProducts(){
      return this.allProducts.filter(item => item.id !== this.tutorPdId);
    },
    searchSuggestion(){
      return this.matchPatterns.slice(0, 5);
    },
    prodPromotion(){
      if(this.normalProducts.length !== 0){
        this.errorMessage = '';
        const temp = this.normalProducts.toSorted((a, b) => b.classmates - a.classmates);
        return temp.filter(item => item.classmates > 300).slice(0, 12);
      } else {
        return [];
      }
    }
  },
  mounted(){
    this.getRandomUsers();
    this.getAllProds().catch(err => {
      const { message:msg, status } = err;
      this.errorMessage = `${msg}，錯誤代碼：${status}`;
    });
  }
}
</script>

<style scoped>
.section-padding {
  padding: 60px 0;
}

@media (min-width: 768px){
  .section-padding {
    padding: 80px 0;
  }
}

@media (min-width: 1400px){
  .section-padding {
    padding: 120px 0;
  }
}

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

.input-clear-wrapper {
  position: relative;
}

.input-clear-btn {
  display: none;
  background: transparent;
  border: 0;
  position: absolute;
  right: 0;
  top: 50%;
  translate: -50% -50%;
}
</style>