import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  actions: {
    // 千分位分隔符，1000000 -> 1,000,000
    numToPriceString(num){
      let result = String(num);
      return result.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&,');
    },
    dateConverter(timeStamp, format = 'part'){
      let date = new Date(timeStamp);
      const dateValues = [
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      ];

      const tempArr = dateValues.map(item => item < 10 ? `0${item}` : item);  
      const [y, m, d, hr, min, sec] = tempArr;

      return format === 'whole' ?
                        `${y}/${m}/${d} ${hr}:${min}:${sec}` :
                        `${y}/${m}/${d}`;
    }
  }
})
