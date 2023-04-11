<template>
  <div class="d-flex align-items-center mb-3">
    <h1 class="fs-3 mb-0 me-3" style="padding-bottom: 3px;">商品管理</h1>
    <button type="button" class="btn btn-primary">
      <span class="material-symbols-outlined fs-5 align-top">add</span>
      建立新商品
    </button>
  </div>
  <!-- 搜尋列 -->
  <div class="bg-beige p-6 mb-3">
    <div class="row">
      <div class="col-md-6 mb-3 mb-md-0">
        <p class="mb-2">
          搜尋商品
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
          <option value="idAscending">商品編號 A → Z</option>
          <option value="idDescending">商品編號 Z → A</option>
        </select>
      </div>
      <div class="col-sm-6 col-md-auto d-flex">
        <button type="button" class="btn btn-light-2 mt-auto">清除搜尋與排序</button>
      </div>
    </div>
  </div>
  <!-- 商品列表 -->
  <div class="bg-beige p-6 table-responsive-md mb-4 overflow-y-scroll">
    <table class="w-100 table align-middle th-py-3 table-cell-px-2">
      <thead>
        <tr class="text-center">
          <th class="text-start text-nowrap">主要圖片</th>
          <th class="text-start" style="width: 23%;">商品編號</th>
          <th class="text-start" style="width: 22%;">商品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th class="text-nowrap">上架</th>
          <th class="text-nowrap">商品詳情</th>
          <th>操作選項</th>
        </tr>
      </thead>
      <tbody class="td-py-2">
        <tr v-for="prod in pageProducts" :key="prod.id" class="text-center">
          <td>
            <div style="max-width:92px; max-height: 45px;" class="overflow-hidden">
              <img :src="prod.imageUrl" alt="商品圖片" class="object-fit-cover w-100 h-100">
            </div>
          </td>
          <td class="text-start text-nowrap text-md-wrap" style="word-break: break-all;">{{ prod.id }}</td>
          <td class="text-start text-nowrap text-md-wrap">{{ prod.title }}</td>
          <td>{{ numToPriceString(prod.origin_price) }}</td>
          <td>{{ numToPriceString(prod.price) }}</td>
          <td
              :class="prod.is_enabled ? 'text-accent' : 'text-muted' ">{{ prod.is_enabled ? '是' : '否' }}</td>
          <td>
            <button type="button" class="btn btn-link text-muted hover-bg-light-2 text-nowrap">查看</button>
          </td>
          <td>
            <button type="button" class="btn p-0 bg-gradient border-0 m-1">
              <div class="btn bg-clip-padding-box bg-beige border border-3 border-transparent hover-bg-transparent text-nowrap">編輯</div>
            </button>
            <button type="button" class="btn btn-danger border border-danger border-3 m-1">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- 分頁導覽 -->
  <Pagination v-if="pagination.total_pages" v-bind="pagination" @changePage="getPageProducts" class="w-fit-content mx-auto"></Pagination>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
import Pagination from '@/components/Pagination.vue'
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  data(){
    return {
      pageProducts: [],
      currentProductPage: 1,
      pagination: {}
    }
  },
  components: {
    RouterLink,
    Pagination
  },
  methods: {
    ...mapActions(useCommonStore, ['numToPriceString']),
    getPageProducts(page=1){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/products?page=${page}`;
      this.$http.get(url)
      .then(res => {
        this.pageProducts = res.data.products;
        this.pagination =  res.data.pagination;
      })
      .catch(err => {
        this.errorMessage = `資料取得失敗，錯誤代碼：${err.response.status}`;
      })
    }
  },
  mounted(){
    this.getPageProducts();
  }
}
</script>

<style scoped>
@media (max-width: 767px){
  .md-table-width{
    width: 770px !important;
  }
}

.rotate-90{
  transform: rotate(90deg)
}

.th-py-3 th{
  padding: .75rem 0;
}

.td-py-2 td{
  padding: .5rem 0;
}

.table-cell-px-2 th,
.table-cell-px-2 td {
  padding-left: .5rem;
  padding-right: .5rem;
}

.table-cell-px-2 th:first-child,
.table-cell-px-2 td:first-child {
  padding-left: 0;
}

.table-cell-px-2 th:last-child,
.table-cell-px-2 td:last-child {
  padding-right: 0;
}

.hover-bg-transparent:hover,
.hover-bg-transparent:active {
  --bs-bg-opacity: 0;
}

.hover-bg-light-2:hover,
.hover-bg-light-2:active {
  color: #1a1a1a !important;
  background: rgba(100,100,100, 0.1);
}
</style>