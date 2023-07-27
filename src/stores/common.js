import { defineStore } from 'pinia';

export const useCommonStore = defineStore('common', {
  state: () => ({
    catagories: {
      category: {
        name: '媒材',
        sub: ['素描', '水彩', '油畫', '色鉛筆']
      },
      theme: {
        name: '主題',
        sub: ['人物/肖像', '動物', '自然/植物', '建築', '美食']
      },
      style: {
        name: '風格',
        sub: ['寫實', '插畫', '日系', '復古', '奇幻']
      }
    }
  }),
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
    },
    scrollErrorIntoView({ values, errors}){
      const firstError = Object.keys(errors)[0];
      const targetElement = document.getElementsByName(firstError)[0];
      targetElement.scrollIntoView({
        block: "center",
        behavior: "smooth"
      })
      setTimeout(() => alert(`${errors[firstError]}`), 500);
    },
    async copyText(text){
      try {
        await navigator.clipboard.writeText(text);
        alert('已複製到剪貼簿');
      } catch (error) {
        alert('複製失敗')
      }
    },
  }
})
