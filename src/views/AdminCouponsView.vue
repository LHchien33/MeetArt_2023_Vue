<template>
  <!-- 標題 -->
  <div class="d-flex align-items-center mb-3">
    <h1 class="fs-3 mb-0 me-3">優惠券管理</h1>
    <button type="button" class="btn btn-primary mt-1" @click="editCoupon({})">
      <span class="material-symbols-outlined fs-5 align-top ms-n1">add</span>
      建立新優惠券
    </button>
  </div>
  <!-- 優惠券列表 -->
  <div ref="loadingContainer" class="mb-4 overflow-y-scroll vl-parent">
    <div class="bg-beige px-6 table-responsive-md">
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
          <tr v-if="couponErrorMsg">
            <td colspan="7" class="text-center py-3">{{ couponErrorMsg }}</td>
          </tr>
          <template v-else>
            <tr v-for="coupon in coupons" :key="coupon.id">
              <th>{{ coupon.title }}</th>
              <td style="word-break: break-all;">{{ coupon.id }}</td>
              <td>{{ coupon.code }}</td>
              <td class="text-center">{{ coupon.percent }}%</td>
              <td class="text-center">{{ dateConverter(coupon.due_date * 1000, 'whole') }}</td>
              <td class="text-center" :class="coupon.is_enabled ? 'text-accent' : 'text-muted' ">{{ coupon.is_enabled ? '是' : '否' }}</td>
              <td class="text-center">
                <button type="button" class="btn p-0 bg-gradient border-0 m-1"
                        @click="editCoupon(coupon)">
                  <div class="btn bg-clip-padding-box bg-beige border border-3 border-transparent hover-bg-transparent text-nowrap">編輯</div>
                </button>
                <button type="button" @click="deleteCoupon(coupon.id, coupon.title)"
                        class="btn btn-danger border border-danger border-3 m-1">刪除</button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <InfoModal ref="InfoModal">
    <template #modal-title>{{ tempData.id ? '編輯' : '新增' }}優惠券</template>
    <template #modal-content>
      <AdminCouponModal ref="couponModal" :tempData="{...tempData}" :isDisabled="disabled"></AdminCouponModal>
    </template>
    <template #cancel-btn-text>取消</template>
    <template #confirm-btn>
      <button type="button" @click="updateCoupon()" :class="{'disabled': disabled}" class="btn btn-primary">
        <span :class="{'spinner-border': disabled}" class="spinner-border-sm"></span>
        {{ tempData.id ? '儲存編輯' : '確定新增' }}
      </button>
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
      disabled: false,
      couponErrorMsg: '',
      modalContent: {
        itemName: '',
        title: '刪除優惠券',
        confirmBtnText: '確定刪除'
      }
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['dateConverter', 'scrollErrorIntoView']),
    async getCoupons(){
      const loader = this.$loading.show({
        isFullPage: false,
        width: 32,
        height: 32,
        container: this.$refs.loadingContainer
      });
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/coupons`;
      try {
        const res = await this.$http.get(url);
        this.coupons = res.data.coupons;
      } catch (err) {
        this.couponErrorMsg = `無法取得優惠券，錯誤代碼：${err.response?.status}`;
        this.$toast({toastType: 'failed'}).fire({title: this.couponErrorMsg});
      } finally {
        loader.hide();
      }
    },
    editCoupon(item){
      this.tempData = {}; // 重置
      this.tempData = item;
      this.$refs.InfoModal.openModal();
    },
    async updateCoupon(){
      this.disabled = true;
      const couponForm = this.$refs.couponModal.$refs.couponForm;
      try {
        const res = await couponForm.validate();
        if(res.valid){
          const values = couponForm.getValues();
          const method = values.id ? 'put' : 'post';
          const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/coupon/${values.id || ''}`;
          // 整理資料
          values.percent = parseInt(values.percent);
          values.is_enabled = values.is_enabled ? parseInt(values.is_enabled) : 0;
          values.due_date = values.due_date/1000;
          // 送出
          await this.$http[method](url, {data: {...values}});
          this.getCoupons();
          this.$refs.InfoModal.hideModal();
          this.$toast({toastType: 'success'}).fire({ title: `已${values.id ? '更新' : '新增'}優惠券` });
        } else {
          this.scrollErrorIntoView(res);
        }
      } catch (err) {
        this.$toast({toastType: 'failed'}).fire({
          title: `無法更新優惠券，錯誤代碼：${err.response?.status}`
        })
      } finally {
        this.disabled = false;
      }
    },
    async deleteCoupon(id, title){
      let loader = null;
      this.modalContent.itemName = title;
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/coupon/${id}`;
      try {
        await this.$refs.ConfirmModal.openModal();
        loader = this.$loading.show();
        await this.$http.delete(url);
        this.$toast({toastType: 'success'}).fire({title: '已刪除優惠券'})
        this.getCoupons();
      } catch (err) {
        let toastTxt = '';
        if(err.errName === 'modalRes'){
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
    this.getCoupons();
  }
}
</script>
