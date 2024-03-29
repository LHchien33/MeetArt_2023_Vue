import { defineStore } from 'pinia';
import { useCommonStore } from './common';
import axios from 'axios';
const { VITE_BASE, VITE_API } = import.meta.env;

export const useProdStore = defineStore('product', {
  state: () => ({
    tutorPdId: '-Nb8fXN7LRUba7pY8IhX',
    tutorOriginPricedId: '-Na7DVZwX2D-82ngmV-_',
    tutorDiscountedId: '-Nb8dDSmBnjcfyDim7bD',
    allProducts: [],
    currentPd: {
      outlines_total: []
    },
    finalSearchPattern: '',
    finalSearchResult: [],
    routerPositionRecord: null
  }),
  getters: {
    keywords({currentPd}){
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
        throw {
          errName: 'getAllProds',
          message: '無法取得課程資訊',
          status: err.response?.status
        }
      }
    },
  },
})