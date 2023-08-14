import { defineStore } from 'pinia';
import { useCommonStore } from './common';
import axios from 'axios';
const { VITE_BASE, VITE_API } = import.meta.env;

export const useProdStore = defineStore('product', {
  state: () => ({
    tutorPdId: '-Nb8fXN7LRUba7pY8IhX',
    allProducts: [],
    currentPd: {
      outlines_total: []
    },
    finalSearchPattern: '',
    finalSearchResult: [],
  }),
  getters: {
    keywords({currentPd, tutorPdId}){
      const common = useCommonStore();
      const temp = [];
      const keys = Object.keys(common.categories);
      keys.forEach(key => {
        if(currentPd[key]){
          temp.push({
            index: key,
            filter: currentPd[key]
          })
        }
      })
      return temp
    }
  },
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