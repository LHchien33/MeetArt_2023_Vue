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
    async getPageProducts(page=1){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/products?page=${page}`;
      try {
        const res = await axios.get(url);
        this.pageProducts = res.data.products;
        this.pagination = res.data.pagination;
      } catch (err) {
        throw {
          errName: 'getPageProducts',
          message: '無法取得頁面資料',
          status: err.response?.status
        }
      }
    }
  },
})