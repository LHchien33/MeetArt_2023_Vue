import { defineStore } from 'pinia';
import axios from 'axios';
const { VITE_BASE, VITE_API } = import.meta.env;

export const useAdminProdStore = defineStore('adminProd', {
  state: () => ({
    originTempProd: {},
    pageProducts: [],
    pagination: {},
  }),
  actions: {
    getPageProducts(page=1){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/products?page=${page}`;
      axios.get(url)
      .then(res => {
        this.pageProducts = res.data.products;
        this.pagination = res.data.pagination;
      })
      .catch(err => {
        alert(`資料取得失敗，錯誤代碼：${err.response.status}`);
      })
    }
  },
})