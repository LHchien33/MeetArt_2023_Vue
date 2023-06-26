import { defineStore } from 'pinia';
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
    getCarts(){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/cart`;
      axios.get(url).then(res => {
        this.carts = res.data.data.carts;
        this.total = res.data.data.total;
        this.final_total = res.data.data.final_total;

        if(this.carts[0]?.coupon){
          this.couponInfo = this.carts[0].coupon;
        } else {
          this.couponInfo = {}
        }
      })
      .catch(err => {
        alert(`無法取得購物車資料，錯誤代碼：${err.response.status}`)
      })
    },
    findRepeatItem(id){
      const repeatedProd = this.carts.find(item => item.product_id === id);
      repeatedProd ? this.itemRepeated = true : this.itemRepeated = false;
    },
    addToCart(id, buyNow = false){
      this.findRepeatItem(id);
      if(this.itemRepeated){
        return
      }

      const url = `${VITE_BASE}/v2/api/${VITE_API}/cart`;
      return axios.post(url, {data: {"product_id": id, "qty": 1}}).then(res => {
        this.getCarts();
      })
      .catch(err => {
        throw `無法加入購物車，錯誤代碼：${err.response.status}`;
      })
    },
    useCoupon(couponCode){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/coupon`;
      axios.post(url, {data: {code: couponCode}}).then(res => {
        if(!this.couponInfo.code){ alert(`已套用優惠券`) };
        this.couponInput = '';
        this.getCarts();
      })
      .catch(err => {
        alert(`無法使用優惠券，錯誤代碼：${err.response.status}`)
      })
    }
  },
})