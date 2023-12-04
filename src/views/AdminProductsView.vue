<template>
  <!-- 標題 -->
  <div class="d-flex align-items-center mb-3">
    <h1 class="fs-3 mb-0 me-3">課程管理</h1>
    <RouterLink to="/admin/products/new" class="btn btn-primary mt-1"
                @click="updateTempProd()">
      <span class="material-symbols-outlined fs-5 align-top ms-n1">add</span>
      建立新課程
    </RouterLink>
  </div>
  <!-- 搜尋列 -->
  <div class="bg-beige p-6 mb-3">
    <div class="row">
      <div class="col-md-6 mb-3 mb-md-0">
        <p class="mb-2">
          搜尋課程
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
          <option value="idAscending">課程編號 A → Z</option>
          <option value="idDescending">課程編號 Z → A</option>
        </select>
      </div>
      <div class="col-sm-6 col-md-auto d-flex">
        <button type="button" class="btn btn-light-2 mt-auto">清除搜尋與排序</button>
      </div>
    </div>
  </div>
  <!-- 課程列表 -->
  <div ref="loadingContainer" class="mb-4 overflow-y-scroll vl-parent">
    <div class="bg-beige px-6 table-responsive-md">
      <table class="w-100 table align-middle table-cell-px-2">
        <thead class="thead-padding sticky-top bg-beige">
          <tr class="text-center">
            <th class="text-start text-nowrap">主要圖片</th>
            <th class="text-start" style="width: 23%;">課程編號</th>
            <th class="text-start" style="width: 22%;">課程名稱</th>
            <th>原價</th>
            <th>售價</th>
            <th class="text-nowrap">上架</th>
            <th class="text-nowrap">課程詳情</th>
            <th>操作選項</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="productErrorMsg">
            <td colspan="8" class="text-center py-3">{{ productErrorMsg }}</td>
          </tr>
          <template v-else>
            <tr v-for="prod in pageProducts" :key="prod.id" class="text-center">
              <td>
                <div style="max-width:92px; height: 45px;" class="overflow-hidden">
                  <img :src="prod.imageUrl" alt="課程圖片" class="object-fit-cover w-100 h-100">
                </div>
              </td>
              <td class="text-start text-nowrap text-md-wrap user-select-all" style="word-break: break-all;">{{ prod.id }}</td>
              <td class="text-start text-nowrap text-md-wrap user-select-all">{{ prod.title }}</td>
              <td>{{ numToPriceString(prod.origin_price) }}</td>
              <td>{{ numToPriceString(prod.price) }}</td>
              <td :class="prod.is_enabled ? 'text-accent' : 'text-muted' ">{{ prod.is_enabled ? '是' : '否' }}</td>
              <td>
                <button type="button" class="btn btn-link text-muted hover-bg-light-2 text-nowrap" data-bs-toggle="modal"
                        data-bs-target="#infoModal" @click="updateTempProd(prod)">查看</button>
              </td>
              <td>
                <RouterLink :to="`/admin/products/${prod.id}`" class="btn p-0 bg-gradient border-0 m-1"
                      @click="updateTempProd(prod)">
                  <div class="btn bg-clip-padding-box bg-beige border border-3 border-transparent hover-bg-transparent text-nowrap">編輯</div>
                </RouterLink>
                <button type="button" class="btn btn-danger border border-danger border-3 m-1"
                @click="deleteProduct(prod.id, prod.title)">刪除</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <!-- 分頁導覽 -->
  <Pagination v-if="pagination.total_pages" v-bind="pagination" :pathData="{path: '/admin/products'}" class="justify-content-center"></Pagination>
  <!-- 商品詳情 modal -->
  <InfoModal ref="InfoModal" id="infoModal">
    <template #modal-title>課程詳情</template>
    <template #modal-content>
      <AdminProdModal :tempProd="{...originTempProd}"></AdminProdModal>
    </template>
    <template #confirm-btn="{ hideModal }">
      <RouterLink :to="`/admin/products/${originTempProd.id}`" @click="hideModal()" class="btn btn-primary">前往編輯</RouterLink>
    </template>
  </InfoModal>
  <!-- 確認刪除商品 modal -->
  <ConfirmModal ref="ConfirmModal" v-bind="modalContent">
    <template #modal-content>
      <p class="mb-0">刪除後將無法恢復，確定刪除 <span class="text-danger">{{ modalContent.itemName }}</span> 嗎？</p>
    </template>
  </ConfirmModal>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapActions, mapState, mapWritableState } from 'pinia';
import { useCommonStore } from '@/stores/common';
import { useAdminProdStore } from '@/stores/adminProducts';
import Pagination from '@/components/Pagination.vue';
import InfoModal from '@/components/InfoModal.vue';
import AdminProdModal from '@/components/AdminProdModal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  props: ['query'],
  data(){
    return {
      productErrorMsg: '',
      modalContent: {
        itemName: '',
        title: '刪除課程',
        confirmBtnText: '確定刪除'
      }
    }
  },
  watch: {
    'query.page'(newVal, oldVal){
      if(newVal === '1' && oldVal === undefined){
        return
      }
      this.getProducts(newVal);
    }
  },
  components: {
    RouterLink,
    Pagination,
    InfoModal,
    AdminProdModal,
    ConfirmModal
},
  computed: {
    ...mapState(useAdminProdStore, ['pageProducts', 'pagination']),
    ...mapWritableState(useAdminProdStore, ['originTempProd']),
  },
  methods: {
    ...mapActions(useCommonStore, ['numToPriceString']),
    ...mapActions(useAdminProdStore, ['getPageProducts']),
    async getProducts(page){
      const loader = this.$loading.show({
        isFullPage: false,
        width: 32,
        height: 32,
        container: this.$refs.loadingContainer
      });
      try {
        await this.getPageProducts(page);
      } catch (err) {
        const { message:msg, status } = err;
        this.productErrorMsg = `${msg}，錯誤代碼：${status}`;
        this.$toast({toastType: 'failed'}).fire({title: this.productErrorMsg});
      } finally {
        loader.hide();
      }
    },
    updateTempProd(product={}){
      this.originTempProd = product;
    },
    async deleteProduct(id, title){
      let loader = null;
      this.modalContent.itemName = title;
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/product/${id}`;
      try {
        await this.$refs.ConfirmModal.openModal();
        loader = this.$loading.show();
        const res = await this.$http.delete(url);
        this.getProducts();
        this.$toast({toastType: 'success'}).fire({title: res.data.message});
      } catch (err) {
        let toastTxt = '';
        const { errName } = err;
        if(errName){
          toastTxt = '已取消刪除';
        } else {
          toastTxt = `刪除失敗，錯誤代碼：${err.response?.status}`;
        }
        this.$toast({toastType: 'failed'}).fire({title: toastTxt});
      } finally {
        if(loader){
          loader.hide();
        }
      }
    }
  },
  mounted(){
    this.getProducts(this.query.page);
  }
}
</script>