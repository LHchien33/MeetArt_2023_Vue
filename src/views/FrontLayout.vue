<template>
  <!-- 側邊小工具 -->
  <div v-if="!currentPath.includes('/checkout')" class="fixed-bottom start-auto mb-10 transition-all-3" style="margin-right: -95px;"
        :class="currentPath !== '/' || !isOnTheTop ? ['me-7', 'me-xxl-9'] : '' ">
    <!-- coupon button -->
    <div :class="{ 'd-none': !couponBtnShow }" class="position-relative mb-2">
      <button type="button" @click="couponToastShow = true"
              class="text-decoration-none bg-beige rounded-circle shadow-sm border border-3 border-white d-flex justify-content-center align-items-center fixed-button-size" :tabindex="isOnTheTop ? '-1' : '0'">
        <img src="../assets/images/gift-fill.svg" alt="折扣碼" style="width: 24px;">
      </button>
      <!-- coupon close button -->
      <div @click="couponBtnShow = false" class="position-absolute top-0 start-100 rounded-circle text-center text-bg-dark-3 opacity-75 button-x"></div>
      <!-- coupon backdrop -->
      <div v-if="couponToastShow" @click="couponToastShow = false" class="coupon-backdrop"></div>
      <!-- coupon toast -->
      <div class="rounded-3 bg-beige gradient-border gradient-border-3 position-absolute top-0 end-100 shadow-sm coupon-toast-hide"
            :class="{ 'coupon-toast-show': couponToastShow }">
        <p class="text-nowrap mb-2 fs-7">{{ coupon.info }}</p>
        <div class="input-group input-group-sm flex-nowrap">
          <input type="text" class="form-control text-secondary" :value="coupon.code">
          <button @click="copyCoupon" type="button" class="input-group-text" id="couponCopyBtn">複製</button>
        </div>
      </div>
    </div>
    <!-- back to top button -->
    <button type="button" @click="backToTop()" class="text-decoration-none bg-beige rounded-circle shadow-sm border border-3 border-white d-flex flex-column justify-content-center align-items-center fixed-button-size" :tabindex="isOnTheTop ? '-1' : '0'">
      <span class="material-symbols-outlined text-dark-1 fs-4 fs-xxl-2">arrow_upward</span>
      <span class="text-dark-2 fw-semibold fs-8 fs-lg-7 fs-xxl-6">TOP</span>
    </button>              
  </div>
  <!-- nav backdrop -->
  <div class="d-lg-none position-fixed bg-dark-1 w-100 opacity-0" style="z-index: 1030; height: 0; transition: opacity .3s"
        :class="isCollapsed ? '' : ['h-100', 'opacity-50']" @click="toggleNavbar()"></div>
  <!-- header --> 
  <header class="fixed-top transition-all-3 shadow-sm bg-beige"
          :class="isOnTheTop && currentPath === '/' ? ['shadow-none', 'bg-transparent'] : '' ">
    <nav class="navbar navbar-expand-lg transition-all-3 bg-lg-transparent" :class="isCollapsed ? 'bg-transparent' : 'bg-light-1'">
      <div class="container">
        <a class="navbar-brand py-3 py-lg-0 py-xxl-2 pe-0 pe-lg-6 me-0 me-lg-6" href="#">
          <picture>
            <source srcset="../assets/images/logo.png" media="(min-width: 1400px)">
            <source srcset="../assets/images/logo_m.png" media="(max-width: 1399.98px)">
            <img src="../assets/images/logo_m.png" alt="MeetArt 繪課室">
          </picture>
        </a>
        <button class="navbar-toggler border-0" type="button" @click="toggleNavbar()">
          <span class="material-symbols-outlined text-secondary fs-3 fw-semibold">{{ isCollapsed ? 'menu' : 'close' }}</span>
        </button>
        <div ref="navbarCollapse" class="collapse navbar-collapse fs-4 fs-lg-6 fs-xxl-5 fw-semibold">
          <ul class="navbar-nav w-100 align-items-lg-center py-2 py-lg-0">
            <!-- 探索課程下拉選單 start -->
            <li class="nav-item dropdown dropdown-hover">
              <button type="button" class="nav-link w-100 text-start border-0 bg-transparent py-4 py-lg-2 px-lg-4 px-xxl-5 text-primary fw-bolder d-flex align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                <span class="me-1">探索課程</span>
                <span class="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul class="dropdown-menu shadow-none py-6 py-lg-4 py-xxl-6 fs-4 fs-lg-6 fs-xxl-5 fw-semibold m-0">
                <li class="px-3">
                  <RouterLink to="/products" class="dropdown-item p-3 py-lg-2 p-xxl-3 text-secondary">所有課程</RouterLink>
                </li>
                <template v-for="(value, key) in categories" :key="value.name">
                  <li class="dropdown-hover px-3">
                    <button type="button" class="dropdown-item p-3 py-lg-2 py-xxl-3 d-flex align-items-center" data-bs-toggle="dropdown">
                      依繪畫{{ value.name }}
                      <span class="material-symbols-outlined ms-8 ms-lg-5 ms-xxl-6">arrow_right</span>
                    </button>
                    <ul class="dropdown-menu shadow-none py-6 py-lg-4 py-xxl-6 px-3 fs-4 fs-lg-6 fs-xxl-5 fw-semibold top-0 start-100 m-0">
                      <li>
                        <RouterLink :to="`/products?index=${key}`"
                              class="dropdown-item p-3 py-lg-2 pe-9 text-secondary">所有繪畫{{ value.name }}
                        </RouterLink>
                      </li>
                      <li v-for="item in value.sub" :key="item">
                        <RouterLink :to="`/products?index=${key}&filter=${item}`"
                              class="dropdown-item p-3 py-lg-2 py-xxl-3">{{ item }}
                        </RouterLink>
                      </li>
                    </ul>
                  </li>
                </template>
              </ul>
            </li>
            <!-- 探索課程下拉選單 end -->
            <li class="nav-item">
              <RouterLink :to="`/product/${tutorPdId}`" class="nav-link py-4 py-lg-2 text-dark-1 px-lg-4 px-xxl-5">課外輔導</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/articles" class="nav-link py-4 py-lg-2 text-dark-1 px-lg-4 px-xxl-5" href="#">課室專欄</RouterLink>
            </li>
            <li class="nav-item">
              <a class="nav-link py-4 py-lg-2 text-dark-1 px-lg-4 px-xxl-5" aria-current="page" href="#">常見問答</a>
            </li>
            <li class="nav-item ms-lg-auto">
              <RouterLink to="/checkout/carts" class="nav-link py-4 py-lg-2 text-dark-1 ps-lg-4 ps-xxl-5 pe-0 position-relative" aria-current="page">
                <span class="d-lg-none">購物車</span>
                <span class="badge rounded-pill bg-primary ms-2 d-lg-none">{{ carts.length }}</span>
                <span class="d-none d-lg-block material-symbols-outlined fs-lg-2 fs-xxl-1">shopping_cart</span>
                <span class="badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle-x d-none d-lg-block">{{ carts.length }}</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
  <div class="min-vh-100 d-flex flex-column">
    <!-- content -->
    <RouterView />
    <!-- footer -->
    <footer class="bg-dark-1">
      <div class="container py-5 py-md-3">
        <div class="row">
          <p class="mb-md-0 text-light-1 col">僅個人作品使用，無任何商業用途 &copy; 2023 MeetArt 繪課室 |
            <RouterLink to="/login" class="text-light-1">後台</RouterLink>
          </p>
          <div class="col-md-2 text-md-end">
            <a class="me-3" href="https://mail.google.com/mail/u/0/?fs=1&amp;tf=cm&amp;to=judy263562@gmail.com" target="_blank">
              <img src="../assets/images/ic_mail.png" alt="聯絡信箱">
            </a>
            <a href="https://github.com/LHchien33/MeetArt_2023_Vue" target="_blank">
              <img src="../assets/images/ic_iconmonstr-github.png" alt="GitHub 連結">
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router';
import { throttle as _throttle } from 'lodash';
import { mapState, mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
import { useCartsStore } from '@/stores/carts';
import { useProdStore } from '@/stores/product';
import { Collapse } from 'bootstrap';

export default {
  props: ['currentPath'],
  components: {
    RouterView,
    RouterLink
  },
  data(){
    return {
      navbarCollapse: {},
      isCollapsed: true,
      isOnTheTop: true,
      couponBtnShow: true,
      couponToastShow: false,
      coupon: {
        info: '領取單筆八折優惠！',
        code: '20%OFF'
      }
    }
  },
  computed:{
    ...mapState(useCommonStore, ['categories']),
    ...mapState(useCartsStore, ['carts']),
    ...mapState(useProdStore, ['tutorPdId']),
  },
  methods: {
    ...mapActions(useCartsStore, ['getCarts']),
    ...mapActions(useCommonStore, ['copyText']),
    scrollHandler: _throttle(function(){
      if (window.pageYOffset > 50){
        this.isOnTheTop = false
      } else {
        this.isOnTheTop = true;
        this.couponToastShow = false;
      }
    }, 300),
    toggleNavbar(){
      this.isCollapsed = !this.isCollapsed;
      this.navbarCollapse.toggle();
    },
    copyCoupon(){
      this.copyText(this.coupon.code).then(() => this.couponToastShow = false);
    },
    backToTop(){
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  },
  mounted(){
    this.navbarCollapse = new Collapse(this.$refs.navbarCollapse, {toggle: false});
    window.addEventListener('scroll', this.scrollHandler);
    if(this.currentPath !== '/checkout/carts'){
      this.getCarts().catch(err => {
        const { message, status } = err;
        this.$toast({toastType: 'failed'}).fire({title: `${message}，錯誤代碼：${status}`});
      })
    }
  },
  unmounted(){
    window.removeEventListener('scroll', this.scrollHandler)
  },
  beforeRouteUpdate(){
    this.isCollapsed = true;
    this.navbarCollapse.hide();
  }
}
</script>

<style>
@media(any-hover: hover){
  .dropdown-hover > .dropdown-menu {
    display: none;
  }
  .dropdown-hover:hover > .dropdown-menu {
    display: block;
  }
  .dropdown-item:hover {
    color: #1a1a1a;
    background: var(--bs-gradient);
  }
}

.dropdown-item.active, .dropdown-item:active,
.dropdown-item:focus {
  color: #1a1a1a;
  background: var(--bs-gradient);
}

.fixed-button-size{
  width: 52px;
  height: 52px;
}

@media (min-width: 1200px){
  .fixed-button-size {
    width: 60px;
    height: 60px;
  }
}

@media (min-width: 1400px){
  .fixed-button-size {
    width: 80px;
    height: 80px;
  }
}

.page-padding-top {
  padding-top: 88px;
}

@media(min-width: 992px){
  .page-padding-top {
    padding-top: 64px;
  }
}

@media(min-width: 1400px){
  .page-padding-top {
    padding-top: 80px;
  }
}

.breadcrumb-item a {
  text-decoration: none;
  color: #666666;
  font-weight: 300;
}

.swiper-theme-set {
  --swiper-theme-color: #AA864E;
  --swiper-navigation-size: 20px;
  --swiper-pagination-bullet-width: 26px;
  --swiper-pagination-bullet-border-radius: 20px;
  --swiper-pagination-bullet-horizontal-gap: 6px;
  --swiper-pagination-bullet-inactive-color: #AA864E;
}

.swiper-theme-set .custom-prev-button,
.swiper-theme-set .custom-next-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: unset;
  flex-shrink: 0;
  background-color: #fff;
  display: none;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.button-x {
  aspect-ratio: 1 / 1;
  width: 20px;
  margin-left: -12px;
  margin-top: -5px;
}

.button-x::before{
  font-family: 'Material Symbols Outlined';
  content: '\e5cd';
}

.coupon-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.coupon-toast-hide {
  width: 0;
  overflow: hidden;
  opacity: 0;
  transition: all .3s;
}

.coupon-toast-show {
  width: 180px;
  padding: .75rem 1.25rem;
  margin-top: -0.5rem;
  margin-right: .5rem;
  opacity: 1;
}
</style>