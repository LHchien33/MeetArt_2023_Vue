<template>
  <main class="bg-beige page-padding-top flex-grow-1">
    <div class="container py-8">
      <!-- breadcrumb -->
      <ol class="breadcrumb mb-3">
        <li class="breadcrumb-item"><RouterLink to="/">首頁</RouterLink></li>
        <li v-if="!query.tag" class="breadcrumb-item active" aria-current="page">課室專欄</li>
        <template v-else-if="query.tag">
          <li class="breadcrumb-item"><RouterLink to="/articles">課室專欄</RouterLink></li>
          <li class="breadcrumb-item active" aria-current="page">{{ query.tag }}</li>
        </template>
      </ol>
      <!-- page title -->
      <div class="bg-gradient mb-5">
        <div class="bg-beige bg-opacity-75 p-6 gradient-border gradient-border-2">
          <h1 class="fs-2 fs-xxl-1 mx-1">課室專欄</h1>
        </div>
      </div>
      <!-- 主要內容 -->
      <div v-if="errorMsg" class="text-center py-3">- {{ errorMsg }} -</div>
      <div v-else>
        <div class="row gy-4 flex-md-row-reverse">
          <!-- 熱門標籤 -->
          <div class="col-md-4 col-xl-3">
            <div class="bg-white bg-opacity-50 p-4 p-lg-5 sticky-md-top" style="top: 100px;">
              <h3 class="fs-6 fs-lg-5 mb-3 mb-lg-4">探索本頁主題</h3>
              <div class="row gx-2 gy-3">
                <div class="col-auto">
                  <RouterLink :to="query.page ? `/articles?page=${query.page}` : '/articles'"
                      :class="{'active': !query.tag }" class="btn btn-outline-secondary btn-sm rounded-pill fs-8 lh-1"># 所有主題</RouterLink>
                </div>
                <div v-for="obj in allTags" :key="obj.name" class="col-auto">
                  <RouterLink :to="query.page ? `/articles?tag=${obj.name}&page=${query.page}` : `/articles?tag=${obj.name}`"
                      :class="{'active': query.tag === obj.name }" class="btn btn-outline-secondary btn-sm rounded-pill fs-8 lh-1"># {{ obj.name }}</RouterLink>
                </div>
              </div>
            </div>
          </div>
          <!-- 文章列表 -->
          <div class="col-12 col-md-8 col-xl-9">
            <ul class="list-unstyled px-5 px-lg-7 bg-white bg-opacity-50">
              <template v-for="(item, idx) in pageFilter" :key="item.id">
                <li :class="idx >=1 ? ['mt-2', 'gradient-line', 'gradient-line-1'] : ''">
                  <section class="py-4 py-lg-5">
                    <div class="mb-2">
                      <small class="d-inline-block text-muted me-4 fs-8 fs-lg-7 icon-fill-1">
                        <span class="material-symbols-outlined align-middle fs-5 mb-1">person</span>
                        {{ item.author }}
                      </small>
                      <small class="d-inline-block text-muted me-4 fs-8 fs-lg-7">
                        <span class="material-symbols-outlined align-middle fs-5 mb-1">calendar_today</span>
                        {{ dateConverter(item.create_at*1000) }}
                      </small>
                      <ul class="list-unstyled d-inline-block">
                        <li v-for="tag in item.tag" :key="tag" class="d-inline-block p-1">
                          <RouterLink :to="`/articles?tag=${tag}`" class="btn btn-outline-secondary btn-sm rounded-pill fs-8 lh-1"># {{ tag }}</RouterLink>
                        </li>
                      </ul>
                    </div>
                    <RouterLink :to="`/article/${item.id}`" class="row gx-3 gy-2 hover-animation text-dark-1 text-decoration-none">
                      <div class="col-sm-3 col-xl-2">
                        <div class="ratio ratio-3x2 w-100 overflow-hidden">
                          <img class="object-fit-cover w-100 h-100 scale-11 transition-all-3" :src="item.image" :alt="item.title">
                        </div>
                      </div>
                      <div class="col-sm-9 col-xl-10">
                        <div>
                          <h2 class="fs-6 fs-lg-5 mb-2 mb-sm-1 mb-lg-2">{{ item.title }}</h2>
                          <p class="my-1 mb-2 fs-8 fs-lg-7 line-clamp-2">
                            {{ item.description }}
                          </p>
                        </div>
                      </div>
                    </RouterLink>
                  </section>
                </li>
              </template>
            </ul>
          </div>
          
        </div>
        <!-- pagination -->
        <div class="py-5">
          <Pagination class="justify-content-center" v-bind="setPagination"></Pagination>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import Pagination from '@/components/Pagination.vue';
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  props: ['query'],
  data(){
    return {
      pageArticles: [],
      pagination: {},
      errorMsg: ''
    }
  },
  components: {
    RouterLink,
    Pagination
  },
  watch: {
    "query.page"(newPage, oldPage){
      if(newPage === '1' && !oldPage){
        return
      }
      this.getPageArticles(newPage);
    }
  },
  computed: {
    setPagination(){
      return {
        ...this.pagination,
        pathData: { path: '/articles'}
      };
    },
    pageFilter(){
      let temp = this.pageArticles;
      if(this.query.tag){
        temp = this.pageArticles.filter(item => item.tag.includes(this.query.tag));
      }
      return temp;
    },
    allTags(){
      let temp = [];
      if(this.pageArticles.length){
        const classify = this.pageArticles.reduce((acc, cur) => {
          cur.tag.forEach(tagName => {
            if(acc[tagName]){
              acc[tagName].count += 1;
            } else {
              acc[tagName] = {'name': tagName, 'count': 1};
            }
          });
          return acc;
        }, {});
        temp = Object.values(classify).sort((a, b) => b.count - a.count);
      }
      return temp;
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['dateConverter']),
    async getPageArticles(page=1){
      const loader = this.$loading.show();
      const url = `${VITE_BASE}/v2/api/${VITE_API}/articles?page=${page}`;
      try {
        const res = await this.$http.get(url);
        const rawArticles = res.data?.articles;
        this.pageArticles = rawArticles ? rawArticles.filter(item => item.id) : []; // 要濾掉一篇刪不掉的文章...
        this.pagination = res.data?.pagination || {};
      } catch (err) {
        this.errorMsg = `無法取得文章資料，錯誤代碼：${err.response?.status}`;
        this.$toast({toastType: 'failed'}).fire({title: this.errorMsg});
      } finally {
        loader.hide();
      }
    }
  },
  mounted(){
    this.getPageArticles(this.query.page);
  }
}

</script>

<style scoped>
@media (max-width: 575.98px) {
  .ratio-3x2{
    aspect-ratio: 16/9 !important;
  }
}
</style>