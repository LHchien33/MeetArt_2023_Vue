<template>
  <div class="pt-lg-8 d-flex flex-column main-content-height" style="padding: 138px 32px 32px;">
    <!-- 標題 -->
    <h1 class="fs-3 mb-3 me-3">訂單管理</h1>
    <!-- 搜尋列 -->
    <div class="bg-beige p-6 mb-3">
      <div class="row">
        <div class="col-md-6 mb-3 mb-md-0">
          <p class="mb-2">
            搜尋訂單
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
            <option value="createLatelyToEarly">新到舊</option>
            <option value="createEarlyToLately">舊到新</option>
          </select>
        </div>
        <div class="col-sm-6 col-md-auto d-flex">
          <button type="button" class="btn btn-light-2 mt-auto">清除搜尋與排序</button>
        </div>
      </div>
    </div>
    <!-- 訂單列表 -->
    <div class="bg-beige px-6 table-responsive mb-4 overflow-y-scroll">
      <table class="w-100 table align-middle table-cell-px-2">
        <thead class="thead-padding sticky-top bg-beige text-nowrap">
          <tr>
            <th>訂單編號</th>
            <th>訂單日期</th>
            <th>姓名</th>
            <th>電子信箱</th>
            <th class="text-center">付款狀態</th>
            <th class="text-center">輔導狀態</th>
            <th class="text-center">訂單詳情</th>
            <th class="text-center">操作選項</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <th class="fw-normal user-select-all" style="word-break: break-all;">{{ order.id }}</th>
            <td style="word-break: break-all;">{{ dateConverter(order.create_at*1000) }}</td>
            <td class="text-nowrap user-select-all">{{ order.user?.name }}</td>
            <td class="user-select-all" style="word-break: break-all;">{{ order.user?.email }}</td>
            <td class="text-center">
              <span :class="order.is_paid ? 'text-muted' : 'text-accent'">
                {{ order.is_paid ? '已付款' : '未付款' }}
              </span>
            </td>
            <td class="text-center">
              <span v-if="order.user?.applyType" :class="order.user?.order_completed ? 'text-muted' : 'text-accent'">
                {{ order.user.order_completed ? '已完成' : '未完成' }}
              </span>
              <span v-else class="text-muted">-</span>
            </td>
            <td class="text-center">
              <button type="button" class="btn btn-link text-muted hover-bg-light-2 text-nowrap"
                      @click="showOrderModal(order, 'info')">查看</button>
            </td>
            <td class="text-center">
              <button type="button" class="btn p-0 bg-gradient border-0 m-1"
                      @click="showOrderModal(order, 'edit')">
                <div class="btn bg-clip-padding-box bg-beige border border-3 border-transparent hover-bg-transparent text-nowrap">編輯</div>
              </button>
              <button type="button" @click="deleteOrder(order.id)"
                      class="btn btn-danger border border-danger border-3 m-1">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 分頁導覽 -->
    <Pagination v-if="pagination.total_pages" v-bind="pagination" :pathData="{path: '/admin/orders'}" class="w-fit-content mx-auto"></Pagination>
  </div>
  <!-- 訂單詳情 Modal -->
  <InfoModal ref="infoModal">
    <template #modal-title>{{ editing ? '編輯訂單' : '訂單詳情' }}</template>
    <template #modal-content>
      <AdminOrderEditModal ref="orderEditModal" v-if="editing" :tempData="tempData" @copyOrderId="copyText"></AdminOrderEditModal>
      <AdminOrderInfoModal v-else :tempData="tempData" @copyOrderId="copyText"></AdminOrderInfoModal>
    </template>
    <template #confirm-btn="{ hideModal }">
      <button v-if="editing" @click="updateOrder(tempData.id)" class="btn btn-primary">確定編輯</button>
      <button v-else @click="editing = true" class="btn btn-primary">前往編輯</button>
    </template>
  </InfoModal>
  <!-- 確認刪除訂單 Modal -->
  <ConfirmModal ref="ConfirmModal" v-bind="delModalContent">
    <template #modal-content>
      <p class="mb-0">刪除後將無法恢復，確定刪除 <span class="text-danger">{{ delModalContent.itemName }}</span> 嗎？</p>
    </template>
  </ConfirmModal>
</template>

<script>
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
import InfoModal from '@/components/InfoModal.vue';
import AdminOrderInfoModal from '@/components/AdminOrderInfoModal.vue';
import AdminOrderEditModal from '@/components/AdminOrderEditModal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
import Pagination from '@/components/Pagination.vue';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  props: ['query'],
  components: {
    InfoModal,
    ConfirmModal,
    AdminOrderInfoModal,
    AdminOrderEditModal,
    Pagination
  },
  data(){
    return {
      orders: [],
      tempData: {},
      editing: null,
      delModalContent: {
        itemName: '',
        title: '刪除訂單',
        confirmBtnText: '確定刪除'
      },
      pagination: {}
    }
  },
  watch: {
    'query.page'(newVal, oldVal){
      if(newVal === '1' && oldVal === undefined){
        return
      }
      this.getOrders(newVal);
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['dateConverter', 'scrollErrorIntoView', 'copyText']),
    getOrders(page=1){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/orders?page=${page}`;
      this.$http.get(url).then(res => {
        this.orders = res.data.orders;
        this.pagination = res.data.pagination;
      }).catch(err => {
        this.$toast({toastType: 'failed'}).fire({
          title: `無法取得訂單，錯誤代碼：${err.response.status}`
        })
      })
    },
    showOrderModal(order, type){
      this.tempData = JSON.parse(JSON.stringify(order));
      this.editing = type === 'edit' ? true : false ;
      this.$refs.infoModal.openModal();
    },
    async updateOrder(orderId){      
      const orderEditForm = this.$refs.orderEditModal.$refs.orderEditForm;
      try {
        const formRes = await orderEditForm.validate();
        if(formRes.valid){
          const values = orderEditForm.getValues();
          // 整理資料
          values.is_paid = JSON.parse(values.is_paid);
          values.paid_date = values.is_paid ? Math.floor(Date.now() / 1000) : null ;
          if(values.user.order_completed){
            values.user.order_completed = JSON.parse(values.user.order_completed);
          }
          // 送出
          const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/order/${orderId}`;
          await this.$http.put(url, {data: {...values}})
          this.getOrders();
          this.$refs.infoModal.hideModal();
          this.$toast({toastType: 'success'}).fire({title: '已更新訂單'});
        } else {
          this.scrollErrorIntoView(res);
        }
      } catch (err) {
        this.$toast({toastType: 'failed'}).fire({
          title: `無法更新訂單，錯誤代碼：${err.response?.status}`
        });
      }
    },
    async deleteOrder(id){
      this.delModalContent.itemName = id;
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/order/${id}`;
      try {
        await this.$refs.ConfirmModal.openModal();
        await this.$http.delete(url);
        this.$toast({toastType: 'success'}).fire({title: '已刪除訂單'});
        this.getOrders();
      } catch (err) {
        let toastTxt = '';
        if(err.errName === 'modalRes'){
          toastTxt = '已取消刪除';
        } else {
          toastTxt = `刪除失敗，錯誤代碼：${err.response?.status}`;
        }
        this.$toast({toastType: 'failed'}).fire({title: toastTxt});
      }

    }
  },
  mounted(){
    this.getOrders(this.query.page);
  }
}
</script>