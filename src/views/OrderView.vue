<template>
  <h1 class="fs-4 fs-xxl-3 mb-3 mb-md-5">
    <span class="material-symbols-outlined align-bottom me-1">assignment</span>填寫訂單資訊
  </h1>
  <div class="row">
    <!-- 左欄 -->
    <div class="col-lg-9 mb-8">
      <div class="px-6 bg-white bg-opacity-75">
        <!-- 付款方式 -->
        <div class="py-6">
          <h2 class="fs-5 w-fit-content mb-4">付款方式
            <span class="gradient-line gradient-line-8 d-block mt-n2"></span>
          </h2>
          <div class="row row-cols-auto gx-3 gy-2">
            <div class="col">
              <input type="radio" class="btn-check" name="payment" id="creditCard" autocomplete="off">
              <label class="btn btn-outline-primary fs-7" for="creditCard">信用卡付款</label>
            </div>
            <div class="col">
              <input type="radio" class="btn-check" name="payment" id="ATM" autocomplete="off">
              <label class="btn btn-outline-primary fs-7" for="ATM">ATM 轉帳</label>
            </div>
            <div class="col">
              <input type="radio" class="btn-check" name="payment" id="CVS" autocomplete="off">
              <label class="btn btn-outline-primary fs-7" for="CVS">超商代收</label>
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
              <label for="userName" class="form-label">姓名<span class="text-danger"> *</span></label>
              <input type="text" class="form-control" id="userName" placeholder="例如：王小明">
            </div>
            <div class="col">
              <label for="email" class="form-label">電子信箱<span class="text-danger"> *</span></label>
              <input type="text" class="form-control" id="email" placeholder="例如：example@email.com">
            </div>
            <div class="col">
              <label for="phoneNumber" class="form-label">聯絡電話<span class="text-danger"> *</span></label>
              <input type="text" class="form-control" id="phoneNumber" placeholder="例如：0912345678">
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
            <h3 class="fs-6">學習背景</h3>
            <div class="row row-cols-2 row-cols-md-3 gy-3">
              <div class="col">
                <select class="form-select">
                  <option value="" selected>學習方式</option>
                  <option v-for="item in background.method" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
              <div class="col">
                <select class="form-select">
                  <option value="" selected>學過哪些媒材</option>
                  <option v-for="item in background.category" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
              <div class="col">
                <select class="form-select">
                  <option value="" selected>學了多久</option>
                  <option v-for="item in background.time" :key="item" :value="item">{{ item }}</option>
                </select>
              </div>
            </div>
          </div>
          <!-- 輔導類型 -->
          <div class="mb-6">
            <h3 class="fs-6">欲申請的輔導類型<span class="text-danger"> *</span></h3>
            <div class="form-check form-check-inline">
              <input class="form-check-input" name="applyType" type="radio" id="advice" value="option1">
              <label class="form-check-label" for="advice">作品檢視</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" name="applyType" type="radio" id="technique" value="option2">
              <label class="form-check-label" for="technique">技法請教</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" name="applyType" type="radio" id="studyPath" value="option3">
              <label class="form-check-label" for="studyPath">學習方向諮詢</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" name="applyType" type="radio" id="others" value="option4">
              <label class="form-check-label" for="others">其他（請於下方簡述問題）</label>
            </div>
          </div>
          <!-- 作品連結 -->
          <div class="mb-6">
            <label for="link" class="form-label">作品連結<span class="text-danger"> *</span></label>
            <input type="text" id="link" class="form-control" placeholder="請提供可瀏覽/下載檔案的連結">
            <!-- <div id="passwordHelpBlock" class="form-text">請提供雲端連結</div> -->
          </div>
          <!-- 簡述問題 -->
          <div>
            <label for="problem" class="form-label">請簡述目前遇到的問題<span class="text-danger"> *</span></label>
            <textarea id="problem" class="form-control" style="height: 6rem;"
                      placeholder="例如：想針對作品的某部分請老師給予建議、學習卡關不知道怎麼進行下一步...等"></textarea>
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
                <ul class="list-unstyled mb-3">
                  <li v-for="(cart, idx) in carts" :key="cart.id">
                    <div class="row justify-content-between">
                      <p class="col-md-8 col-lg-12 col-xxl-8 mb-1">{{ cart.product.title }}</p>
                      <p class="col-auto mb-0">NT$ {{ Math.round(cart.final_total) }}</p>
                    </div>
                    <hr v-if="idx !== carts.length-1 " class="my-2">
                  </li>
                </ul>
                <p v-if="final_total < total" class="text-end fs-7 mb-0 text-muted">※ 皆為折扣後價格</p>
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
          <RouterLink to="/checkout/payment" class="btn btn-primary w-100 py-2 mb-9 d-lg-none">送出訂單</RouterLink>
        </div>
      </div>
      <!-- 送出訂單（lg 以上） -->
      <RouterLink to="/checkout/payment" class="btn btn-primary w-100 py-2 mb-9 d-none d-lg-block">送出訂單</RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapState } from 'pinia';
import { useCartsStore } from '@/stores/carts'
const { VITE_BASE, VITE_API } = import.meta.env;

export default {
  emits: ['updateStep'],
  components: {
    RouterLink
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
  mounted(){
    this.$emit('updateStep', 2)
  }
}
</script>
