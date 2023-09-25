<template>
  <!-- 標題 -->
  <div class="d-flex align-items-center mb-3">
    <h1 class="fs-3 mb-0 me-3">文章管理</h1>
    <RouterLink to="/admin/products/new" class="btn btn-primary mt-1"
                @click="updateTempProd()">
      <span class="material-symbols-outlined fs-5 align-top ms-n1">add</span>
      建立新文章
    </RouterLink>
  </div>
  <!-- 搜尋列 -->
  <div class="bg-beige p-6 mb-3">
    <div class="row">
      <div class="col-md-6 mb-3 mb-md-0">
        <p class="mb-2">
          搜尋文章
          <span class="material-symbols-outlined align-bottom fs-6">search</span>
        </p>
        <div class="input-group">
          <select class="form-select" style="width: 30%;">
            <option selected disabled>選擇搜尋條件</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
          <input type="text" name="searchProduct" class="form-control" placeholder="請輸入搜尋內容" style="width: 50%;">
          <button class="btn btn-light-2 border-light-2" type="button">搜尋</button>
        </div>
      </div>
      <div class="col-sm-6 col-md-3 mb-4 mb-sm-0">
        <label for="sort" class="form-label w-100">
          排序
          <span class="material-symbols-outlined rotate-90 align-bottom fs-6">sync_alt</span>
        </label>
        <select name="sort" id="sort" class="form-select">
          <option selected disabled>選擇排序方法</option>
          <option value="idAscending">文章編號 A → Z</option>
          <option value="idDescending">文章編號 Z → A</option>
        </select>
      </div>
      <div class="col-sm-6 col-md-auto d-flex">
        <button type="button" class="btn btn-light-2 mt-auto">清除搜尋與排序</button>
      </div>
    </div>
  </div>
  <!-- 文章列表 -->
  <div ref="loadingContainer" class="overflow-y-scroll mb-4 vl-parent">
    <div class="bg-beige px-6 table-responsive-md">
      <table class="w-100 table align-middle table-cell-px-2">
        <thead class="thead-padding sticky-top bg-beige">
          <tr class="text-center">
            <th class="text-start text-nowrap">主要圖片</th>
            <th class="text-start" style="width: 23%;">編號</th>
            <th class="text-start" style="width: 22%;">文章標題</th>
            <th>新增日期</th>
            <th class="text-nowrap">公開</th>
            <th class="text-nowrap">資訊概覽</th>
            <th>操作選項</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pageArticles" :key="item.id" class="text-center">
            <td>
              <div style="max-width:92px; height: 45px;" class="overflow-hidden">
                <img :src="item.image" alt="文章主要圖片" class="object-fit-cover w-100 h-100">
              </div>
            </td>
            <td class="text-start text-nowrap text-md-wrap user-select-all" style="word-break: break-all;">{{ item.id }}</td>
            <td class="text-start text-nowrap text-md-wrap user-select-all">{{ item.title }}</td>
            <td>{{ dateConverter(item.create_at*1000) }}</td>
            <td :class="item.isPublic ? 'text-accent' : 'text-muted' ">{{ item.isPublic ? '公開' : '不公開' }}</td>
            <td>
              <button type="button" class="btn btn-link text-muted hover-bg-light-2 text-nowrap"
                      :class="{'disabled': disabled}"
                      data-bs-toggle="modal" data-bs-target="#infoModal" @click="viewArticleInfo(item)">查看</button>
            </td>
            <td>
              <RouterLink :to="`/admin/articles/${item.id}`" class="btn p-0 bg-gradient border-0 m-1">
                <div class="btn bg-clip-padding-box bg-beige border border-3 border-transparent hover-bg-transparent text-nowrap">編輯</div>
              </RouterLink>
              <button type="button" class="btn btn-danger border border-danger border-3 m-1">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- 分頁導覽 -->
  <Pagination v-if="pagination.total_pages" v-bind="setPagination" class="justify-content-center"></Pagination>
  <!-- 文章資訊概覽 modal -->
  <InfoModal ref="InfoModal" id="infoModal">
    <template #modal-title>資訊概覽</template>
    <template #modal-content>
      <AdminArticleModal :data="{...targetArticle}" @copyArticleId="copyText" :prodErrorMsg="prodErrorMsg"></AdminArticleModal>
    </template>
    <template #confirm-btn="{ hideModal }">
      <RouterLink :to="`/admin/articles/${targetArticle.id}`" @click="hideModal()" class="btn btn-primary">前往編輯</RouterLink>
    </template>
  </InfoModal>
  <!-- 確認刪除文章 modal -->
  <!-- <ConfirmModal ref="ConfirmModal" v-bind="modalContent">
    <template #modal-content>
      <p class="mb-0">刪除後將無法恢復，確定刪除 <span class="text-danger">{{ modalContent.itemName }}</span> 嗎？</p>
    </template>
  </ConfirmModal> -->
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
import Pagination from '@/components/Pagination.vue';
import InfoModal from '@/components/InfoModal.vue';
import AdminArticleModal from '@/components/AdminArticleModal.vue';
// import ConfirmModal from '@/components/ConfirmModal.vue';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  props: ['query', 'allProducts', 'prodError'],
  data(){
    return {
      pageArticles: [],
      pagination: {},
      targetArticle: {},
      disabled: true,
      prodErrorMsg: ''
    }
  },
  components: {
    RouterLink,
    Pagination,
    InfoModal,
    AdminArticleModal
  },
  computed: {
    setPagination(){
      return {
        ...this.pagination,
        pathData: { path: '/admin/articles'}
      };
    }
  },
  watch: {
    "query.page"(newPage, oldPage){
      if(newPage === '1' && !oldPage){
        return
      }
      this.getPageArticles(newPage);
    },
    allProducts(newVal){
      if(newVal !== null){
        this.disabled = false;
      }
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['dateConverter', 'copyText']),
    async getPageArticles(page=1){
      const loader = this.$loading.show({
        isFullPage: false,
        width: 32,
        height: 32,
        container: this.$refs.loadingContainer
      });
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/articles?page=${page}`;
      try {
        const res = await this.$http.get(url);
        const temp = res.data?.articles || [];
        this.pageArticles =  temp.filter(item => item.id);
        this.pagination = res.data?.pagination || {};
      } catch (err) {
        this.$toast({toastType: 'failed'}).fire({title: `無法取得文章列表，錯誤代碼：${err.response?.status}`});
      } finally {
        this.disabled = false;
        loader.hide();
      }
    },
    viewArticleInfo(article){
      const relatedCourseInfo = [];
      if(this.allProducts === null){
        const { message:msg, status } = this.prodError || {};
        this.prodErrorMsg = `${msg}，錯誤代碼：${status}`;
      } else {
        article.relatedCourseId.forEach(item => {
          relatedCourseInfo.push({
            "id": item,
            "title": this.allProducts[item]?.title
          })
        });
      } 

      this.targetArticle = {
        ...article,
        relatedCourseInfo
      };
    }
  },
  mounted(){
    this.getPageArticles(this.query.page);
  }
}
</script>