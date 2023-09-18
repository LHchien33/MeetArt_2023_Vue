import { defineStore } from 'pinia';
import { useProdStore } from './product';
import axios from 'axios';
const { VITE_BASE, VITE_API } = import.meta.env;

export const useCartsStore = defineStore('carts', {
  state: () => ({
    carts: [],
    total: 0,
    final_total: 0,
    itemRepeated: false,
    couponInfo: {},
    couponInput: ''
  }),
  actions: {
    findRepeatItem(id){
      let repeatedPdIdx = '';
      const pdStore = useProdStore();
      if(id === pdStore.tutorPdId){
        repeatedPdIdx = this.carts.findIndex(item => {
          switch (item.product_id) {
            case pdStore.tutorOriginPricedId:
            case pdStore.tutorDiscountedId:
              return true
            default:
              return false
          }
        })
      } else {
        repeatedPdIdx = this.carts.findIndex(item => item.product_id === id);
      }
      this.itemRepeated = repeatedPdIdx !== -1 || false;      
    },
    async addToCart(id){
      if(this.itemRepeated){
        throw '購物車已有該品項！';
      }
      
      // 課外輔導加入購物車，購物車已有課程便加購，反之為原價
      let requestId = id;
      const pdStore = useProdStore();
      if(id === pdStore.tutorPdId){
        requestId = this.carts.length ? pdStore.tutorDiscountedId : pdStore.tutorOriginPricedId;
      }

      const url = `${VITE_BASE}/v2/api/${VITE_API}/cart`;
      try {
        await axios.post(url, { data: { "product_id": requestId, "qty": 1 } });
        await this.getCarts();
      } catch (err) {
        const { errName, message:msg, status } = err;
        throw errName === 'getCarts' ? `${msg}，錯誤代碼：${status}` : `無法加入購物車，錯誤代碼：${err.response?.status}`;
      }
    },
    async getCarts(){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/cart`;
      try {
        const res = await axios.get(url);
        const { carts, total, final_total } = res.data?.data;
        this.carts = carts;
        this.total = total;
        this.final_total = final_total;

        const idx = this.carts.findIndex(item => item.coupon?.code);
        this.couponInfo = this.carts[idx]?.coupon || {} ;
      } catch (err) {
        this.$reset();
        throw {
          errName: 'getCarts',
          message: '無法取得購物車資料',
          status: err.response?.status
        }
      }
    },
    async useCoupon(couponCode){
      if(this.carts.length === 0){
        return {
          toastType: 'failed',
          message: '購物車是空的！'
        }
      }

      const url = `${VITE_BASE}/v2/api/${VITE_API}/coupon`;
      try {
        await axios.post(url, {data: {code: couponCode}});
        this.couponInput = '';
        return {
          toastType: 'success',
          message: '成功套用優惠券'
        }
      } catch (err) {
        throw {
          errName: 'useCoupon',
          message: '無法使用優惠券',
          status: err.response?.status
        }
      }
    }
  },
})