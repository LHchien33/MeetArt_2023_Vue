<template>
  <main class="bg-beige page-padding-top flex-grow-1">
    <div class="container py-8">
      <!-- breadcrumb -->
      <ol class="breadcrumb mb-3">
        <li class="breadcrumb-item">
          <RouterLink to="/">首頁</RouterLink>
        </li>
        <li v-if="!query.filter" class="breadcrumb-item active">{{ query.index ? `繪畫${categories[query.index].name}` : '所有課程' }}</li>
        <template v-else-if="query.index && query.filter">
          <li class="breadcrumb-item">
            <RouterLink :to="`/products?index=${query.index}`">繪畫{{ categories[query.index].name }}</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ query.filter }}</li>
        </template>
      </ol>
      <!-- page title -->
      <div class="bg-gradient mb-5">
        <div class="bg-beige bg-opacity-75 p-6 gradient-border gradient-border-2">
          <template v-if="finalSearchPattern">
            <h1 class="fs-2 fs-xxl-1 mx-1">"{{ finalSearchPattern }}" 相關的搜尋結果</h1>
          </template>
          <template v-else-if="!query.index">
            <h1 class="fs-2 fs-xxl-1 fw-bold mb-4 mx-1">所有課程</h1>
            <ul class="position-relative list-unstyled mb-0 row g-2" style="z-index: 2;">
              <li class="col-auto" v-for="(value, key) in categories" :key="value.name">
                <RouterLink :to="`/products?index=${key}`"
                  class="fs-7 px-3 py-1 shadow-none rounded-pill btn btn-primary-white-bg">繪畫{{ value.name }}
                </RouterLink>
              </li>
            </ul>
          </template>
          <template v-else>
            <h1 class="fs-2 fs-xxl-1 fw-bold mb-4 mx-1">
              {{ query.filter ? query.filter : `繪畫${categories[query.index].name}` }}
            </h1>
            <ul class="position-relative list-unstyled mb-0 row g-2" style="z-index: 2;">
              <li class="col-auto">
                <RouterLink :to="`/products?index=${query.index}`"
                  class="fs-7 px-3 py-1 shadow-none rounded-pill btn btn-primary-white-bg"
                  :class="{'active': !query.filter }">全部
                </RouterLink>
              </li>
              <li class="col-auto" v-for="item in categories[query.index].sub" :key="item">
                <RouterLink :to="`/products?index=${query.index}&filter=${item}`"
                  class="fs-7 px-3 py-1 shadow-none rounded-pill btn btn-primary-white-bg"
                  :class="{'active': query.filter === item }">{{ item }}
                </RouterLink>
              </li>
            </ul>
          </template>
        </div>
      </div>
      <!-- sort button -->
      <div class="d-flex justify-content-end mb-2">
        <button type="button" class="border-0 bg-transparent px-4 py-1"
                :class="sortBy === 'enabledTime' ? ['text-secondary', 'text-decoration-underline'] : 'text-dark-3'"
                @click="sortBy = 'enabledTime'">最新上架</button>
        <div class="py-1"><div class="vr align-bottom"></div></div>
        <button type="button" class="border-0 bg-transparent ps-4 py-1"
                :class="sortBy === 'classmates' ? ['text-secondary', 'text-decoration-underline'] : 'text-dark-3'"
                @click="sortBy = 'classmates'">最熱門</button>
      </div>
      <!-- products list -->
      <div v-if="sortedPd.length === 0" class="text-center">- 沒有符合此分類的課程 -</div>
      <div class="row row-cols-1 row-cols-lg-3 row-cols-xl-4 gy-5 mb-5">
        <div class="col" v-for="prod in singlePagePd" :key="prod.id">
          <RouterLink :to="`/product/${prod.id}`" class="d-flex flex-column flex-sm-row flex-lg-column h-100 rounded-3 overflow-hidden gradient-border gradient-border-1 before-z-index-2 hover-animation text-decoration-none">
            <div class="overflow-hidden prod-img-size">
              <img :src="prod.imageUrl" :alt="prod.title" class="object-fit-cover object-position-top w-100 h-100 scale-11 transition-all-3">
            </div>
            <div class="flex-grow-1 p-4 d-flex flex-column bg-white bg-opacity-50">
              <h2 class="mb-2 fs-5 fw-semibold text-dark-1">{{ prod.title }}</h2>
              <p class="fs-7 mb-2 text-secondary fw-semibold d-flex align-items-center">
                <span class="material-symbols-outlined me-1">auto_fix_high</span>
                {{ prod.teacher.name }}
              </p>
              <div class="fs-7 text-dark-3 flex-grow-1">
                <p class="mb-1">時長 {{ prod.outlines_total.minutes }} 分鐘</p>
                <p class="mb-0">{{ prod.classmates }} 位同學</p>
              </div>
              <div class="text-end">
                <p :class="{'invisible': prod.origin_price === prod.price }" class="fs-7 mb-0 text-dark-3">
                  <s>NT$ {{ numToPriceString(prod.origin_price) }}</s></p>
                <p class="mb-0 fs-5 fw-semibold text-accent">NT$ {{ numToPriceString(prod.price) }}</p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
      <!-- pagination -->
      <div v-if="sortedPd.length > 12" class="py-5">
        <Pagination class="w-fit-content mx-auto" v-bind="setPagination"></Pagination>
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import { useCommonStore } from '@/stores/common';
import { useProdStore } from '@/stores/product';
import Pagination from '@/components/Pagination.vue';

export default {
  props: ['query'],
  data(){
    return {
      filteredPd: [],
      sortedPd: [],
      sortBy: 'enabledTime',
      singlePagePd: []
    }
  },
  components: {
    RouterLink,
    Pagination
  },
  computed:{
    ...mapState(useCommonStore, ['categories']),
    ...mapState(useProdStore, ['allProducts', 'finalSearchPattern', 'finalSearchResult', 'tutorPdId']),
    setPagination(){
      const total = Math.ceil(this.sortedPd.length/12);
      const current = Number(this.query.page) || 1;
      return {
        pathData: { path: '/products', query: {...this.query}},
        total_pages:  total,
        current_page: current,
        has_pre: current !== 1,
        has_next: (total - current) > 0
      };
    },
    pdFromFinalSearch(){
      return this.allProducts.filter(item => this.finalSearchResult.includes(item.id) && item.id !== this.tutorPdId);
    },
    usualProducts(){
      return this.allProducts.filter(item => item.id !== this.tutorPdId);
    }
  },
  // 集中控制
  watch: {
    "query.filter"(){
      this.filterProd();
      this.sortProd();
      this.sliceProd();
    },
    "query.page"(){
      this.sliceProd();
    },
    sortBy(){
      this.sortProd();
      this.sliceProd();
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['numToPriceString']),
    ...mapActions(useProdStore, ['getAllProds']),
    filterProd(){
      if(!this.query.filter){
        this.filteredProd = [];
      } else {
        this.filteredPd = this.usualProducts.filter(pd => pd[this.query.index] === this.query.filter);
      }
    },
    sortProd(){
      const arr = this.query.filter ? this.filteredPd : this.finalSearchPattern ? this.pdFromFinalSearch : this.usualProducts;
      this.sortedPd = arr.toSorted((a, b) => b[this.sortBy] - a[this.sortBy]);
    },
    sliceProd(){
      const n = Number(this.query.page) || 1;
      if(this.sortedPd.length > 12){  // 固定一頁 12 個
        this.singlePagePd = this.sortedPd.slice(12*(n-1), 12*n);
      } else {
        this.singlePagePd = this.sortedPd;
      }
    }
  },
  async mounted(){
    try {
      await this.getAllProds();
      this.filterProd();
      this.sortProd();
      this.sliceProd();
    } catch (err) {
      alert(err)
    }
  }
}
</script>

<style scoped>
.prod-img-size{
  height: 45%;
  min-height: 170px;
  max-height: 180px;
}

@media (min-width: 576px) and (max-width: 991.98px) {
  .prod-img-size{
    height: unset;
    max-height: 180px;
    min-height: unset;
    width: 35%;
    min-width: 170px;
  }
}
</style>