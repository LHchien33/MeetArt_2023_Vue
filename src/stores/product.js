import { defineStore } from 'pinia';
import axios from 'axios';
const { VITE_BASE, VITE_API } = import.meta.env;

export const useProdStore = defineStore('product', {
  state: () => ({
    allProducts: [],
    finalSearchPattern: '',
    finalSearchResult: [],
  }),
  actions: {
    async getAllProds(){
      const url = `${VITE_BASE}/v2/api/${VITE_API}/products/all`;
      try {
        const res = await axios.get(url);
        this.allProducts = res.data.products;
      } catch (err) {
        throw `無法取得課程資訊，錯誤代碼：${err.response.status}`;
      }
    },
  },
})