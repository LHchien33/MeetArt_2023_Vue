<template>
  <h1 class="fs-4 fs-xxl-3 mb-3 mb-md-5">
    <span class="material-symbols-outlined align-bottom me-1">assignment</span>填寫訂單資訊
  </h1>
  <VForm v-slot="{ errors }" @submit="onSubmit" @invalid-submit="onInvalidSubmit" @keydown.enter.exact="preventEnter($event)">
    <div class="row">
      <!-- 左欄 -->
      <div class="col-lg-9 mb-8">
        <div class="px-6 bg-white bg-opacity-75">
          <!-- 付款方式 -->
          <div class="py-6">
            <div class="mb-4">
              <h2 class="fs-5 d-inline-block w-fit-content me-1 mb-0">付款方式
                <span class="gradient-line gradient-line-8 d-block mt-n2"></span>
              </h2>
              <small class="text-danger">
                <span class="fs-6 align-top"> *</span>
                <ErrorMessage name="payMethod" class="fs-7 d-inline-block w-auto mt-0"></ErrorMessage>
              </small>
            </div>
            <div class="row row-cols-auto gx-3 gy-2 align-items-center">
              <div class="col">
                <VField type="radio" rules="required" name="payMethod" :validateOnChange="true"
                        id="creditCard" class="btn-check" value="信用卡付款"></VField>
                <label class="btn btn-outline-primary fs-7" for="creditCard"
                      :class="{ 'btn-outline-danger': errors.payMethod }">信用卡付款</label>
              </div>
              <div class="col">
                <VField type="radio" rules="required" name="payMethod" :validateOnChange="true"
                        id="ATM" class="btn-check" value="ATM 轉帳"></VField>
                <label class="btn btn-outline-primary fs-7" for="ATM"
                      :class="{ 'btn-outline-danger': errors.payMethod }">ATM 轉帳</label>
              </div>
              <div class="col">
                <VField type="radio" rules="required" name="payMethod" :validateOnChange="true"
                        id="CVS" class="btn-check" value="超商代收"></VField>
                <label class="btn btn-outline-primary fs-7" for="CVS"
                      :class="{ 'btn-outline-danger': errors.payMethod }">超商代收</label>
              </div>
            </div>
          </div>
          <!-- 個人資訊 -->
          <div class="border-top py-6">
            <h2 class="fs-5 w-fit-content mb-4">個人資訊
              <span class="gradient-line gradient-line-8 d-block mt-n2"></span>
            </h2>
            <div class="row row-cols-1 row-cols-md-2 gy-3">
              <div class="col">
                <label for="order_name" class="form-label">姓名
                  <span class="text-danger"> *</span>
                  <ErrorMessage name="order_name" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
                </label>
                <VField type="text" rules="required" name="order_name" :class="{ 'is-invalid': errors.order_name }"
                        class="form-control" id="order_name" placeholder="例如：王小明"></VField>
              </div>
              <div class="col">
                <label for="order_email" class="form-label">電子信箱
                  <span class="text-danger"> *</span>
                  <ErrorMessage name="order_email" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
                </label>
                <VField type="text" rules="required|email" name="order_email" :class="{ 'is-invalid': errors.order_email }"
                        class="form-control" id="order_email" placeholder="例如：example@email.com"></VField>
              </div>
              <div class="col">
                <label for="order_phone" class="form-label">聯絡電話
                  <span class="text-danger"> *</span>
                  <ErrorMessage name="order_phone" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
                </label>
                <VField type="tel" rules="required|phoneNumber" name="order_phone" :class="{ 'is-invalid': errors.order_phone }"
                        class="form-control" id="order_phone" placeholder="例如：0912-345678、03-123-4567"></VField>
              </div>
            </div>
          </div>
          <!-- 課外輔導 -->
          <div v-if="hasTutoring" class="border-top py-6">
            <h2 class="fs-5 w-fit-content mb-4">課外輔導需求
              <span class="gradient-line gradient-line-8 d-block mt-n2"></span>
            </h2>
            <!-- 學習背景 -->
            <div class="mb-6">
              <h3 class="fs-6 fw-normal">學習背景</h3>
              <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 gy-3">
                <div class="col">
                  <VField as="select" name="background.method" class="form-select">
                    <option value="" selected>學習方式</option>
                    <option v-for="item in background.method" :key="item" :value="item">{{ item }}</option>
                  </VField>
                </div>
                <div class="col">
                  <VField as="select" name="background.category" class="form-select">
                    <option value="" selected>學過哪些媒材</option>
                    <option v-for="item in background.category" :key="item" :value="item">{{ item }}</option>
                  </VField>
                </div>
                <div class="col">
                  <VField as="select" name="background.time" class="form-select">
                    <option value="" selected>學了多久</option>
                    <option v-for="item in background.time" :key="item" :value="item">{{ item }}</option>
                  </VField>
                </div>
              </div>
            </div>
            <!-- 輔導類型 -->
            <div class="mb-6">
              <h3 class="fs-6 fw-normal">欲申請的輔導類型
                <span class="text-danger"> *</span>
                <ErrorMessage name="applyType" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
              </h3>
              <div class="form-check form-check-inline">
                <VField type="radio" rules="required" name="applyType" :validateOnChange="true" id="advice" value="作品檢視"      
                        :class="{ 'is-invalid': errors.applyType }" class="form-check-input"></VField>
                <label class="form-check-label" for="advice">作品檢視</label>
              </div>
              <div class="form-check form-check-inline">
                <VField type="radio" rules="required" name="applyType" :validateOnChange="true" id="technique" value="技法請教"       
                        :class="{ 'is-invalid': errors.applyType }" class="form-check-input"></VField>
                <label class="form-check-label" for="technique">技法請教</label>
              </div>
              <div class="form-check form-check-inline">
                <VField type="radio" rules="required" name="applyType" :validateOnChange="true" id="studyPath" value="學習方向諮詢"       
                        :class="{ 'is-invalid': errors.applyType }" class="form-check-input"></VField>
                <label class="form-check-label" for="studyPath">學習方向諮詢</label>
              </div>
              <div class="form-check form-check-inline">
                <VField type="radio" rules="required" name="applyType" :validateOnChange="true" id="others" value="其他"      
                        :class="{ 'is-invalid': errors.applyType }" class="form-check-input"></VField>
                <label class="form-check-label" for="others">其他（請於下方簡述問題）</label>
              </div>
            </div>
            <!-- 作品連結 -->
            <div class="mb-6">
              <label for="link" class="form-label">作品連結
                <span class="text-danger"> *</span>
                <ErrorMessage name="link" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
              </label>
              <VField type="text" rules="required|url" name="link" id="link" class="form-control" placeholder="請提供可瀏覽/下載檔案的連結"
                      :class="{ 'is-invalid': errors.link }"></VField>
            </div>
            <!-- 簡述問題 -->
            <div>
              <label for="problem" class="form-label">請簡述目前遇到的問題
                <small class="text-muted">（限 300 個中英字，含標點）</small>
                <span class="text-danger">*</span>
                <ErrorMessage name="problem" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
              </label>
              <VField as="textarea" rules="required|wordLimit:300" name="problem" :class="{ 'is-invalid': errors.problem }"
                      class="form-control invalid-icon-position" id="problem" style="height: 8rem;"
                      placeholder="例如：想針對作品的某部分請老師給予建議、學習卡關不知道怎麼進行下一步...等">
              </VField>
            </div>
            <small class="d-block mt-5 text-muted ms-auto w-fit-content">※ 待訂單完成付款，我們會盡快於三日內以電子信箱聯絡您</small>
          </div>
        </div>
        <RouterLink to="/checkout/carts" class="btn btn-sm btn-outline-secondary mt-4">
          <span class="material-symbols-outlined align-bottom fs-6">chevron_left</span>
          返回購物車
        </RouterLink>
      </div>
      <!-- 右欄 -->
      <div class="col-lg-3">
        <div class="row flex-lg-column-reverse gx-3">
          <div class="col-12 col-sm-6 col-lg-12">
            <!-- 購買清單 -->
            <div class="accordion white-accordion mb-3" id="cart-list-accordion">
              <h3 class="mb-0">
                <button class="accordion-button px-4 text-nowrap" type="button" data-bs-toggle="collapse" data-bs-target="#cart-list-accordion-body" aria-expanded="false" aria-controls="cart-list-accordion-body">
                  購買清單（ {{carts.length}} ）
                </button>
              </h3>
              <div class="bg-white bg-opacity-75 collapse show" id="cart-list-accordion-body"  data-bs-parent="#cart-list-accordion">
                <div class="p-4">
                  <ul class="list-unstyled mb-0">
                    <li v-for="(cart, idx) in carts" :key="cart.id">
                      <div class="row justify-content-between">
                        <p class="col-md-8 col-lg-12 col-xxl-8 mb-1">{{ cart.product.title }}</p>
                        <p class="col-auto mb-0">NT$ {{ Math.round(cart.final_total) }}</p>
                      </div>
                      <hr v-if="idx !== carts.length-1 " class="my-2">
                    </li>
                  </ul>
                  <p v-if="final_total < total" class="text-end fs-7 mt-3 mb-0 text-muted">※ 僅列出折扣後價格</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-12">
            <!-- 價格資訊欄 -->
            <div class="p-4 bg-white bg-opacity-75 mb-3 text-nowrap">
              <h3 class="fs-6 mb-0">訂單明細</h3>
              <div class="gradient-line gradient-line-2 py-4"></div>
              <div class="d-flex justify-content-between">
                <p class="mb-0 me-2">小計</p>
                <p class="mb-0">NT$ {{ total }}</p>
              </div>
              <div v-if="couponInfo.code" class="d-flex justify-content-between text-secondary mt-4">
                <p class="mb-0 me-2">折扣碼</p>
                <p class="mb-0">- NT$ {{ total - Math.round(final_total) }}</p>
              </div>
              <div class="gradient-line gradient-line-2 py-4"></div>
              <div class="d-flex justify-content-between align-items-end">
                <p class="mb-0 me-2">總計</p>
                <p class="mb-0 fs-4 text-accent">NT$ {{ Math.round(final_total) }}</p>
              </div>
            </div>
            <!-- 送出訂單（lg 以下） -->
            <button type="submit" class="btn btn-primary w-100 py-2 mb-9 d-lg-none">送出訂單</button>
          </div>
        </div>
        <!-- 送出訂單（lg 以上） -->
        <button type="submit" class="btn btn-primary w-100 py-2 mb-9 d-none d-lg-block">送出訂單</button>
      </div>
    </div>
  </VForm>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions } from 'pinia';
import { useCartsStore } from '@/stores/carts';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
const { VITE_BASE, VITE_API } = import.meta.env;

configure({
  generateMessage: localize('zh_TW',{
    names: {
      payMethod: '付款方式',
      order_name: '姓名',
      order_email: '電子信箱',
      order_phone: '聯絡電話',
      applyType: '輔導類型',
      link: '作品連結',
      problem: '簡述問題'
    }
  })
});

defineRule('phoneNumber', (value) => {
  const format = /^(?!.*--)[0-9\-]+$/;
  if(!format.test(value)){
    return '僅接受數字及不連續的連字號（-）';
  }
  
  const number = value.split('').filter(num => num !== '-')
  if(number.length < 9 || 10 < number.length){
    return '號碼長度需介於 9 ~ 10 碼';
  }

  const startNum = /^(0)[2-9]{1}/;
  if(!startNum.test(value)){
    return  '請確認號碼開頭介於 02 ~ 09';
  }

  return true
});

defineRule('wordLimit',(value, [max]) => {
  let totalCharCount = value.match(/(?:[a-zA-Z]+|\S)/g).length || 0;

  if (totalCharCount > max) {
    return `請精簡內容（目前約 ${totalCharCount} 個字）`
  }
  
  return true
});



export default {
  emits: ['updateStep'],
  components: {
    RouterLink,
    VForm: Form,
    VField: Field,
    ErrorMessage,
  },
  data(){
    return {
      background: {
        method: ['影音、書籍自學', '購買線上課程', '參加畫室', '請家教', '以上皆無'],
        category: ['素描', '水彩', '油畫', '色鉛筆', '以上皆無'],
        time: ['半年以下', '半年至一年', '一年以上']
      },
      hasTutoring: true
    }
  },
  computed: {
    ...mapState(useCartsStore, ['carts', 'total', 'final_total', 'couponInfo']),
  },
  methods: {
    ...mapActions(useCartsStore, ['getCarts']),
    onInvalidSubmit({ values, errors}){
      if(this.carts.length === 0){
        alert('請先在購物車加入商品！');
        this.$router.push('/checkout/carts');
        return
      }
      
      const firstError = Object.keys(errors)[0];
      const targetElement = document.getElementsByName(firstError)[0];
      targetElement.scrollIntoView({
        block: "center",
        behavior: "smooth"
      })
      setTimeout(() => alert(`${errors[firstError]}`), 500);
    },
    onSubmit(val){
      const requestData = {
        "data": {
          "user": {
            "name": val.order_name,
            "email": val.order_email,
            "tel": val.order_phone,
            "address": "-",
            "applyType": val.applyType,
            "payMethod": val.payMethod,
            "link": val.link,
            "problem": val.problem,
            "background": {...val.background}
          },
        }
      }
      const url = `${VITE_BASE}/v2/api/${VITE_API}/order`;
      this.$http.post(url, requestData).then(res => {
        alert('成功建立訂單');
        this.getCarts();
        sessionStorage.setItem('orderId', res.data.orderId);
        this.$router.push(`/checkout/payment`);
      })
      .catch(err => {
        alert(`無法建立訂單，錯誤代碼：${err.response.status}`);
      })
    },
    preventEnter(e){
      if(e.target.name !== 'problem'){
        e.preventDefault();
        return
      }
    }
  },
  mounted(){
    this.$emit('updateStep', 2);
  }
}
</script>

<style scoped>
.invalid-icon-position {
  background-position: top calc(0.3em + 0.1875rem) right calc(1.2em + 0.1875rem) !important;
}
</style>