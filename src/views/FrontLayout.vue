<template>
  <!-- back to top button -->
  <div class="fixed-bottom start-auto mb-5 mb-md-10 transition-all-3" style="margin-right: -95px;"
        :class="isOnTheTop ? '' : ['me-7', 'me-xxl-9']">
    <a href="#" class="text-decoration-none bg-beige bg-opacity-75 rounded-circle shadow-sm border border-3 border-white d-flex flex-column justify-content-center align-items-center fixed-button-size" :tabindex="isOnTheTop ? '-1' : '0'">
      <span class="material-symbols-outlined text-dark-1 fs-4 fs-xxl-2">arrow_upward</span>
      <span class="text-dark-2 fw-semibold fs-8 fs-lg-7 fs-xxl-6">TOP</span>
    </a>              
  </div>
  <!-- nav backdrop -->
  <div class="d-lg-none position-fixed bg-dark-1 w-100 opacity-0" style="z-index: 1030; height: 0; transition: opacity .3s"
        data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
        :class="isCollapsed ? '' : ['h-100', 'opacity-50']" @click="isCollapsed = true"></div>
  <!-- header -->
  <header class="fixed-top transition-all-3" :class="isOnTheTop ? '' : ['shadow-sm', 'bg-beige']">
    <nav class="navbar navbar-expand-lg transition-all-3 bg-lg-transparent" :class="isCollapsed ? 'bg-transparent' : 'bg-light-1'">
      <div class="container">
        <a class="navbar-brand py-3 py-lg-0 py-xxl-2 pe-0 pe-lg-6 me-0 me-lg-6" href="#">
          <picture>
            <!-- <source srcset="../assets/images/logo.png" media="(min-width: 1400px)"> -->
            <source srcset="../assets/images/logo_m.png" media="(max-width: 1399.98px)">
            <img src="../assets/images/logo.png" alt="MeetArt 繪課室">
          </picture>
        </a>
        <button class="navbar-toggler border-0 pe-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"
          @click="isCollapsed = !isCollapsed">
          <span class="material-symbols-outlined text-secondary fs-3 fw-semibold">{{ isCollapsed ? 'menu' : 'close' }}</span>
        </button>
        <div class="collapse navbar-collapse fs-4 fs-lg-6 fs-xxl-5 fw-semibold" id="navbarNavDropdown">
          <ul class="navbar-nav w-100 align-items-lg-center py-2 py-lg-0">
            <!-- 探索課程下拉選單 start -->
            <li class="nav-item dropdown dropdown-hover">
              <button type="button" class="nav-link w-100 text-start border-0 bg-transparent py-4 py-lg-2 px-lg-4 px-xxl-5 text-primary fw-bolder d-flex align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                <span class="me-1">探索課程</span>
                <span class="material-symbols-outlined">arrow_drop_down</span>
              </button>
              <ul class="dropdown-menu shadow-none py-6 py-lg-4 py-xxl-6 fs-4 fs-lg-6 fs-xxl-5 fw-semibold m-0">
                <li class="px-3">
                  <a href="#" class="dropdown-item p-3 py-lg-2 p-xxl-3 text-secondary">所有課程</a>
                </li>
                <template v-for="(value, key) in dropdownItems" :key="key">
                  <li class="dropdown-hover px-3">
                    <button type="button" class="dropdown-item p-3 py-lg-2 py-xxl-3 d-flex align-items-center" data-bs-toggle="dropdown">
                      依繪畫{{ key }}
                      <span class="material-symbols-outlined ms-8 ms-lg-5 ms-xxl-6">arrow_right</span>
                    </button>
                    <ul class="dropdown-menu shadow-none py-6 py-lg-4 py-xxl-6 px-3 fs-4 fs-lg-6 fs-xxl-5 fw-semibold top-0 start-100 m-0">
                      <li><a class="dropdown-item p-3 py-lg-2 pe-9 text-secondary" href="#">所有繪畫{{ key }}</a></li>
                      <li v-for="item in value" :key="item"><a class="dropdown-item p-3 py-lg-2 py-xxl-3" href="#">{{ item }}</a></li>
                    </ul>
                  </li>
                </template>
              </ul>
            </li>
            <!-- 探索課程下拉選單 end -->
            <li class="nav-item">
              <a class="nav-link py-4 py-lg-2 text-dark-1 px-lg-4 px-xxl-5" href="#">課外輔導</a>
            </li>
            <li class="nav-item">
              <a class="nav-link py-4 py-lg-2 text-dark-1 px-lg-4 px-xxl-5" href="#">課室專欄</a>
            </li>
            <li class="nav-item">
              <a class="nav-link py-4 py-lg-2 text-dark-1 px-lg-4 px-xxl-5" aria-current="page" href="#">常見問答</a>
            </li>
            <li class="nav-item ms-lg-auto">
              <a class="nav-link py-4 py-lg-2 text-dark-1 ps-lg-4 ps-xxl-5 pe-0" aria-current="page" href="#">
                <span class="d-lg-none">購物車</span>
                <span class="d-none d-lg-block material-symbols-outlined fs-lg-2 fs-xxl-1">shopping_cart</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
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
</template>

<script>
import { RouterView, RouterLink } from 'vue-router';
import { throttle as _throttle } from 'lodash'

export default {
  components: {
    RouterView,
    RouterLink
  },
  data(){
    return {
      isCollapsed: true,
      isOnTheTop: true,
      dropdownItems: {
        '媒材': ['素描', '水彩', '油畫', '色鉛筆'],
        '主題': ['人物/肖像', '動物', '自然/植物', '建築', '美食'],
        '風格': ['寫實', '插畫', '日系', '復古', '奇幻']
      }
    }
  },
  methods: {
    scrollHandler: _throttle(function(){
      if (window.pageYOffset > 50){
        this.isOnTheTop = false
      } else {
        this.isOnTheTop = true
      }
    }, 300)
  },
  mounted(){
    window.addEventListener('scroll', this.scrollHandler)
  },
  unmounted(){
    window.removeEventListener('scroll', this.scrollHandler)
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
    background: linear-gradient(280.94deg, #F1D49C 19.83%, #B3C8DD 85.28%);
  }
}

.dropdown-item.active, .dropdown-item:active,
.dropdown-item:focus {
  color: #1a1a1a;
  background: linear-gradient(280.94deg, #F1D49C 19.83%, #B3C8DD 85.28%);
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

.section-padding {
  padding: 60px 0;
}

@media (min-width: 768px){
  .section-padding {
    padding: 80px 0;
  }
}

@media (min-width: 1400px){
  .section-padding {
    padding: 120px 0;
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
</style>