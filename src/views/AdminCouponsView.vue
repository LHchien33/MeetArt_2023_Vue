<template>
  <div class="pt-lg-8 d-flex flex-column main-content-height" style="padding: 138px 32px 32px;">
    <!-- 標題 -->
    <div class="d-flex align-items-center mb-3">
      <h1 class="fs-3 mb-0 me-3">優惠券管理</h1>
      <button type="button" class="btn btn-primary mt-1" @click="editCoupon({})">
        <span class="material-symbols-outlined fs-5 align-top ms-n1">add</span>
        建立新優惠券
      </button>
    </div>
    <!-- 優惠券列表 -->
    <div class="bg-beige px-6 table-responsive-md mb-4 overflow-y-scroll">
      <table class="w-100 table align-middle table-cell-px-2">
        <thead class="thead-padding sticky-top bg-beige text-nowrap">
          <tr>
            <th>優惠名稱</th>
            <th>優惠券編號</th>
            <th>折扣碼</th>
            <th class="text-center">折數</th>
            <th class="text-center">到期日</th>
            <th class="text-center">是否啟用</th>
            <th class="text-center">操作選項</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="coupon in coupons" :key="coupon.id">
            <th>{{ coupon.title }}</th>
            <td style="word-break: break-all;">{{ coupon.id }}</td>
            <td>{{ coupon.code }}</td>
            <td class="text-center">{{ coupon.percent }}%</td>
            <td class="text-center">{{ dateConverter(coupon.due_date * 1000, 'whole') }}</td>
            <td class="text-center" :class="coupon.is_enabled ? 'text-accent' : 'text-secondary' ">{{ coupon.is_enabled ? '是' : '否' }}</td>
            <td class="text-center">
              <button type="button" class="btn p-0 bg-gradient border-0 m-1"
                      @click="editCoupon(coupon)">
                <div class="btn bg-clip-padding-box bg-beige border border-3 border-transparent hover-bg-transparent text-nowrap">編輯</div>
              </button>
              <button type="button" @click="deleteCoupon(coupon.id, coupon.title)"
                      class="btn btn-danger border border-danger border-3 m-1">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <InfoModal ref="InfoModal" id="infoModal">
    <template #modal-title>{{ tempData.id ? '編輯' : '新增' }}優惠券</template>
    <template #modal-content>
      <AdminCouponModal ref="couponModal" :tempData="{...tempData}"></AdminCouponModal>
    </template>
    <template #cancel-btn-text>取消</template>
    <template #confirm-btn>
      <button type="button" @click="updateCoupon()" class="btn btn-primary">{{ tempData.id ? '儲存編輯' : '確定新增' }}</button>
    </template>
  </InfoModal>
  <ConfirmModal ref="ConfirmModal" v-bind="modalContent">
    <template #modal-content>
      <p class="mb-0">刪除後將無法恢復，確定刪除 <span class="text-danger">{{ modalContent.itemName }}</span> 嗎？</p>
    </template>
  </ConfirmModal>
</template>

<script>
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
import InfoModal from '@/components/InfoModal.vue';
import AdminCouponModal from '@/components/AdminCouponModal.vue';
import ConfirmModal from '@/components/ConfirmModal.vue';
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  components: {
    InfoModal,
    AdminCouponModal,
    ConfirmModal
  },
  data(){
    return {
      coupons: [],
      tempData: {},
      modalContent: {
        itemName: '',
        title: '刪除優惠券',
        confirmBtnText: '確定刪除'
      }
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['dateConverter']),
    getCoupons(){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/coupons`;
      this.$http.get(url).then(res => {
        this.coupons = res.data.coupons;
      })
      .catch(err => {
        alert(`無法取得優惠券，錯誤代碼：${err.response.status}`)
      })
    },
    editCoupon(item){
      this.tempData = {}; // 重置
      this.tempData = item;
      this.$refs.InfoModal.openModal();
    },
    updateCoupon(){
      const couponForm = this.$refs.couponModal.$refs.couponForm;
      couponForm.validate().then(res => {
        if(res.valid){
          const values = couponForm.getValues();
          const method = values.id ? 'put' : 'post';
          const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/coupon/${values.id || ''}`;
          // 整理資料
          values.percent = parseInt(values.percent);
          values.is_enabled = values.is_enabled ? parseInt(values.is_enabled) : 0;
          values.due_date = values.due_date/1000;
          // 送出
          this.$http[method](url, {data: {...values}}).then(res => {
            alert(`已${values.id ? '更新' : '新增'}優惠券`)
            this.$refs.InfoModal.hideModal();
            this.getCoupons();
          })
          .catch(err => {
            alert(`無法更新優惠券，錯誤代碼：${err.response.status}`)
          })
        } else {
          const firstError = Object.keys(res.errors)[0];
          const targetEl = document.getElementsByName(firstError)[0];
          targetEl.scrollIntoView({
            block: "center",
            behavior: "smooth"
          })
          setTimeout(() => alert(res.errors[firstError]), 500)
        }
      })
      .catch(err => {
        console.log(err);
      })
    },
    deleteCoupon(id, title){
      this.modalContent.itemName = title;
      let alertText = '';
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/coupon/${id}`;
      this.$refs.ConfirmModal.openModal().then(res => {
        return this.$http.delete(url)
      }).then(res => {
        alertText = '已刪除優惠券';
        this.getCoupons();
      }).catch(err => {
        err === false ?
        alertText = '已取消刪除' :
        alertText = `無法刪除優惠券，錯誤代碼：${err.response.status}`;
      }).finally(() => {
        setTimeout(() => alert(alertText), 500)
      })
    }
  },
  mounted(){
    this.getCoupons();
  }
}
</script>
