<template>
  <main class="bg-beige page-padding-top min-vh-100">
    <div class="container py-8">
      <!-- breadcrumb -->
      <ol class="breadcrumb mb-3">
        <li class="breadcrumb-item">
          <RouterLink to="/">首頁</RouterLink>
        </li>
        <template v-if="query.index && query.filter">
          <li class="breadcrumb-item">
            <RouterLink :to="`/products?index=${query.index}`">繪畫{{ catagories[query.index].name }}</RouterLink>
          </li>
          <li class="breadcrumb-item active" aria-current="page">{{ query.filter }}</li>
        </template>
        <li v-else class="breadcrumb-item active">{{ query.index ? `繪畫${catagories[query.index].name}` : '所有課程' }}</li>
      </ol>
      <!-- page title -->
      <div class="bg-gradient mb-5">
        <div class="bg-beige bg-opacity-75 p-6 gradient-border gradient-border-2">
          <template v-if="!query.index">
            <h2 class="fs-2 fs-xxl-1 fw-bold mb-4 mx-1">所有課程</h2>
            <ul class="position-relative list-unstyled mb-0" style="z-index: 2;">
              <li class="d-inline-block" v-for="(value, key) in catagories" :key="value.name">
                <RouterLink :to="`/products?index=${key}`"
                  class="fs-7 me-2 px-3 py-1 shadow-none rounded-pill btn btn-primary-white-bg">繪畫{{ value.name }}
                </RouterLink>
              </li>
            </ul>
          </template>
          <template v-else>
            <h2 class="fs-2 fs-xxl-1 fw-bold mb-4 mx-1">
              {{ query.filter ? query.filter : `繪畫${catagories[query.index].name}` }}
            </h2>
            <ul class="position-relative list-unstyled mb-0" style="z-index: 2;">
              <li class="d-inline-block">
                <RouterLink :to="`/products?index=${query.index}`"
                  class="fs-7 me-2 px-3 py-1 shadow-none rounded-pill btn btn-primary-white-bg"
                  :class="{'active': !query.filter }">全部
                </RouterLink>
              </li>
              <li class="d-inline-block" v-for="item in catagories[query.index].sub" :key="item">
                <RouterLink :to="`/products?index=${query.index}&filter=${item}`"
                  class="fs-7 me-2 px-3 py-1 shadow-none rounded-pill btn btn-primary-white-bg"
                  :class="{'active': query.filter === item }">{{ item }}
                </RouterLink>
              </li>
            </ul>
          </template>
        </div>
      </div>
      <!-- sort button -->
      <div class="d-flex justify-content-end mb-2">
        <button type="button" class="border-0 bg-transparent text-decoration-none px-4 py-1"
                :class="sort_by === 'enabledTime' ? 'text-secondary' : 'text-dark-3'"
                @click="sortProd('enabledTime')">最新上架</button>
        <div class="py-1"><div class="vr align-bottom"></div></div>
        <button type="button" class="border-0 bg-transparent text-decoration-none ps-4 py-1"
                :class="sort_by === 'classmates' ? 'text-secondary' : 'text-dark-3'"
                @click="sortProd('classmates')">最熱門</button>
      </div>
      <!-- products list -->
      <div v-show="filteredProd.length === 0" class="text-center">- 沒有符合此分類的課程 -</div>
      <div class="row row-cols-1 row-cols-lg-3 row-cols-xl-4 gy-5 mb-5">
        <div class="col" v-for="prod in prodContainer" :key="prod.id">
          <a href="#" class="d-flex flex-column flex-sm-row flex-lg-column h-100 rounded-3 overflow-hidden gradient-border gradient-border-1 before-z-index-2 hover-animation text-decoration-none">
            <div class="overflow-hidden prod-img-size">
              <img :src="prod.imageUrl" :alt="prod.title" class="object-fit-cover object-position-top w-100 h-100 scale-11 transition-all-3">
            </div>
            <div class="flex-grow-1 p-4 d-flex flex-column bg-white bg-opacity-50">
              <h3 class="mb-2 fs-5 fw-semibold text-dark-1">{{ prod.title }}</h3>
              <p class="fs-7 mb-2 text-secondary fw-semibold d-flex align-items-center">
                <span class="material-symbols-outlined me-1">auto_fix_high</span>
                {{ prod.teacher.name }}
              </p>
              <div class="fs-7 text-dark-3 flex-grow-1">
                <p class="mb-1">時長 {{ prod.outlines_total.minutes }} 分鐘</p>
                <p class="mb-0">{{ prod.classmates }} 位同學</p>
              </div>
              <div class="text-end">
                <p class="fs-7 mb-0 text-dark-3"><s>NT$ {{ numToPriceString(prod.origin_price) }}</s></p>
                <p class="mb-0 fs-5 fw-semibold text-accent">NT$ {{ numToPriceString(prod.price) }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <!-- pagination -->
      <div v-show="filteredProd.length > 12" class="py-5">
        <Pagination class="w-fit-content mx-auto" v-bind="setPagination"></Pagination>
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { mapActions, mapState } from 'pinia';
import { useCommonStore } from '@/stores/common';
import Pagination from '@/components/Pagination.vue';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  props: ['query'],
  data(){
    return {
      allProducts: [],
      sort_by: 'enabledTime',
      prodContainer: []
    }
  },
  components: {
    Pagination
  },
  watch: {
    filteredProd(newVal, oldVal){
      const n = this.query.page ? Number(this.query.page) : 1;
      if(newVal.length > 12){
        this.prodContainer = newVal.slice(12*(n-1), 12*n);
      } else {
        this.prodContainer = newVal;
      }
    }
  },
  computed:{
    ...mapState(useCommonStore, ['catagories']),
    filteredProd(){
      return this.allProducts.filter(item => {
        if(this.query.filter){
          return item[this.query.index] === this.query.filter;
        } else {
          return this.allProducts;
        }
      })
    },
    setPagination(){
      const total = Math.ceil(this.filteredProd.length/12);
      const current = this.query.page ? Number(this.query.page) : 1;
      return {
        pathData: { path: '/products', query: {...this.query}},
        total_pages:  total,
        current_page: current,
        has_pre: current !== 1,
        has_next: (total - current) > 0
      };
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['numToPriceString']),
    getAllProd(){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/products/all`;
      this.$http.get(url).then(res => {
        this.allProducts = res.data.products;
        this.sortProd();
      })
      .catch(err => {
        alert(`取得產品失敗，錯誤代碼：${err.response.status}`)
      })
    },
    sortProd(sortBy='enabledTime'){
      this.sort_by = sortBy;
      this.allProducts.sort((a, b) => {
        return b[sortBy] - a[sortBy];
      })
    },
  },
  mounted(){
    this.getAllProd();
  }
}
</script>

<style scoped>
.breadcrumb-item a {
  text-decoration: none;
  color: #666666;
  font-weight: 300;
}

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