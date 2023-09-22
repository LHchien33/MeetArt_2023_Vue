<template>
  <main class="bg-beige page-padding-top flex-grow-1">
    <div class="container py-8">
      <!-- breadcrumb -->
      <ol class="breadcrumb mb-3">
        <li class="breadcrumb-item"><RouterLink to="/">首頁</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/articles">課室專欄</RouterLink></li>
        <li v-if="article?.title" class="breadcrumb-item active" aria-current="page">{{ article.title}}</li>
      </ol>
      <div v-if="errorMsg">{{ errorMsg }}</div>
      <div v-else class="row gy-6">
        <!-- 左欄主要內容 -->
        <div class="col-lg-8 col-xl-9">
          <div class="p-6 px-8 bg-white bg-opacity-50">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <div>
                <small class="text-muted me-4 icon-fill-1">
                  <span class="material-symbols-outlined align-middle fs-5 mb-1">person</span>
                  {{ article.author }}
                </small>
                <small class="text-muted">
                  <span class="material-symbols-outlined align-middle fs-5 mb-1">calendar_today</span>
                  {{ dateConverter(article.create_at*1000) }}
                </small>
              </div>
              <div>
                <button type="button" class="border-0 bg-transparent text-muted icon-fill-1">
                  <span class="material-symbols-outlined hover-text-primary">share</span>
                </button>
                <button type="button" class="border-0 bg-transparent"
                        :class="bookMarkFill ? ['icon-fill-1', 'text-primary'] : 'text-muted'"
                        @click="bookMarkFill = !bookMarkFill">
                  <span class="material-symbols-outlined hover-text-primary">bookmark</span>
                </button>
              </div>
            </div>
            <!-- 文章內容 -->
            <article>
              <div class="gradient-line gradient-line-1"></div>
              <h1 class="fs-4 fs-md-3 fs-xxl-2 fw-bold mt-6 mb-4">{{ article.title }}</h1>
              <div class="d-flex bg-gradient mb-4">
                <div class="bg-gradient flex-shrink-0" style="width: 4px;"></div>
                <p class="w-100 mb-0 bg-white bg-opacity-75 fs-7 fs-md-6 p-4 p-md-5">{{ article.description }}</p>
              </div>
              <div v-html="article.content" class="articleContentSet"></div>
              <div class="gradient-line gradient-line-1 pt-5 pb-2"></div>
            </article>
          </div>
        </div>
        <!-- 右欄標籤 & 推薦課程 -->
        <div class="col-lg-4 col-xl-3">
          <div class="row flex-lg-column sticky-lg-top" style="top: 100px;">
            <div class="col-sm-6 col-lg-12">
              <div class="bg-white bg-opacity-50 p-5 mb-8">
                <h3 class="fs-5 mb-4">探索更多</h3>
                <div class="row gx-2 gy-3">
                  <div v-for="tag in article.tag" :key="tag" class="col-auto">
                    <RouterLink :to="`/articles?tag=${tag}`" class="btn btn-outline-secondary btn-sm rounded-pill fs-8 lh-1"># {{ tag }}</RouterLink>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-lg-12">
              <div class="bg-white bg-opacity-50 p-5">
                <h3 class="fs-5 mb-4">相關課程</h3>
                <div v-if="courseLoading" class="d-flex justify-content-center py-4">
                  <div class="spinner-border text-light-2" style="--bs-spinner-border-width: .2rem;"></div>
                </div>
                <ul v-else class="list-unstyled">
                  <li v-for="course in relatedCourses" :key="course.id" class="mb-3 hover-animation">
                    <div class="translate-y-n5 transition-all-3">
                      <RouterLink :to="`/product/${course.id}`" class="rounded-3 overflow-hidden gradient-border gradient-border-1 text-decoration-none mb-3">
                        <div class="row gx-2 p-3">
                          <div class="col-4">
                            <div class="overflow-hidden w-100 h-100">
                              <img :src="course.imageUrl" :alt="course.title || course.id" class="object-fit-cover w-100 h-100">
                            </div>
                          </div>
                          <div class="col-8">
                            <div class="bg-white bg-opacity-50">
                              <h2 class="mb-2 fs-7 fw-semibold text-dark-1">{{ course.title || course.id }}</h2>
                              <p class="mb-0 fs-8 text-muted">{{ course.classmates || "--" }} 位同學</p>
                            </div>
                          </div>
                        </div>
                      </RouterLink>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  props: ['articleId'],
  components: {
    RouterLink,
  },
  data(){
    return {
      article: {},
      errorMsg: '',
      relatedCourses: [],
      courseLoading: null,
      bookMarkFill: false
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['dateConverter']),
    async getSingleArticle(){
      let loader = this.$loading.show();
      const url = `${VITE_BASE}/v2/api/${VITE_API}/article/${this.articleId}`;
      try {
        const res = await this.$http.get(url);
        this.article = res.data?.article || {};
        this.getRelatedPd();
      } catch (err) {
        this.errorMsg = `無法取得此文資料，錯誤代碼：${err.response?.status}`;
        this.$toast({toastType: 'failed'}).fire({title: this.errorMsg});
      } finally {
        loader.hide();
      }
    },
    async getRelatedPd(){
      this.courseLoading = true;
      const allProductId = this.article.relatedCourseId || [];
      let url = `${VITE_BASE}/v2/api/${VITE_API}/product/`;
      let data = allProductId.map(id => this.$http.get(url + id));
      try {
        const result = [];
        const res = await Promise.allSettled(data);
        res.forEach((obj, idx) => {
          if(obj.status === 'rejected'){
            result.push({
              'id': allProductId[idx],
              'errMsg': obj.reason?.response?.status
            });
          } else {
            const { id, title, classmates, imageUrl } = obj.value?.data?.product || {};
            result.push({ id, title, classmates, imageUrl });
          }
        });
        this.relatedCourses = result;
      } finally {
        this.courseLoading = false;
      }
    }
  },
  mounted(){
    this.getSingleArticle();
  }
}

</script>

<style>
.hover-text-primary:hover {
  color: var(--bs-primary) !important;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}

.articleContentSet img {
  display: block;
  width: 100%;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
}

.articleContentSet p {
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .articleContentSet p {
    font-size: 1rem;
  }
}
</style>