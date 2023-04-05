<template>
  <div class="d-lg-flex">
    <nav class="navbar bg-beige vh-lg-100 sticky-top py-5 py-lg-7 flex-nowrap flex-shrink-0 text-nowrap">
      <div class="container flex-column justify-content-start align-items-start h-100 p-lg-0">
        <div class="d-flex align-items-center w-100">
          <RouterLink to="/admin/orders" class="navbar-brand fw-bold px-7 py-4 mx-2 fs-3 nav-text-show"
                :class="{ 'nav-text-hidden': !isExpanded }">MeetArt</RouterLink>
          <button type="button" class="mx-auto d-none d-lg-block btn shadow-none border-0 px-5 py-4" @click="isExpanded = !isExpanded">
            <span class="material-symbols-outlined align-middle">
              {{ isExpanded ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right' }}
            </span>
          </button>
          <button type="button" class="d-block d-lg-none btn shadow-none border-0 px-5 py-4 ms-auto"
                @click="isCollapsed = !isCollapsed">
            <span class="material-symbols-outlined align-middle">menu</span>
          </button>
        </div>
        <div class="collapse-hidden w-100 h-lg-100" :class="{ 'collapse-show': isCollapsed }">
          <ul class="navbar-nav h-lg-100 py-3">
            <li v-for="item in navItems" :key="item.itemName" class="nav-item">
              <RouterLink :to="item.path"
                  class="nav-link px-6 py-4 d-flex justify-content-between gradient-line gradient-line-0 position-relative"
                  :class="{ 'gradient-line-90': currentPath === `${item.path}`}">
                <span class="ms-3 fs-5 nav-text-show" :class="{ 'nav-text-hidden': !isExpanded }">{{ item.itemName }}</span>
                <span :class="{'opacity-0': isExpanded }" class="material-symbols-outlined d-none d-lg-block">{{ item.icon }}</span>
              </RouterLink>
            </li>
            <li class="nav-item hover-animation mt-7 mt-lg-auto">
              <RouterLink to="/login"
                  class="nav-link w-100 border-0 bg-transparent px-6 py-4 d-flex justify-content-between gradient-line gradient-line-0  position-relative">
                <span class="ms-3 fs-5 nav-text-show" :class="{ 'nav-text-hidden': !isExpanded }">登出</span>
                <span :class="{'opacity-0': isExpanded }" class="material-symbols-outlined d-none d-lg-block">logout</span>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="flex-grow-1">
      <!-- main content -->
      <RouterView></RouterView>
      <!-- footer -->
      <footer class="bg-dark-1 sticky-bottom">
        <div class="container py-5 py-md-3">
          <div class="row">
            <p class="mb-md-0 text-light-1 col">僅個人作品使用，無任何商業用途 &copy; 2023 MeetArt 繪課室 |
              <RouterLink to="/" class="text-light-1">前台</RouterLink>
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
  </div>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
    RouterView
  },
  data(){
    return {
      navItems: [
        {
          itemName: '訂單管理',
          path: '/admin/orders',
          icon: 'assignment'
        },
        {
          itemName: '商品管理',
          path: '/admin/products',
          icon: 'dashboard_customize'
        },
        {
          itemName: '優惠券管理',
          path: '/admin/coupons',
          icon: 'sell'
        },
        {
          itemName: '文章管理',
          path: '/admin/articles',
          icon: 'edit'
        },
        {
          itemName: '營收圖表',
          path: '/admin',
          icon: 'bar_chart'
        }
      ],
      currentPath: this.$route.path,
      isLoggedIn: false,
      isExpanded: true,
      isCollapsed: false
    }
  },
  methods: {
    checkAdmin(){
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)MeetArtToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      this.$http.defaults.headers.common.Authorization = token;
      const url = `${import.meta.env.VITE_BASE}/v2/api/user/check`;

      this.$http.post(url)
      .then(res => {
        this.isLoggedIn = true;
      })
      .catch(err => {
        alert('驗證錯誤，請先登入');
        this.$router.push('/login')
      })
    }
  },
  mounted(){
    this.checkAdmin();
  },
  beforeUpdate(){
    this.currentPath = this.$route.path;
  },
  async beforeRouteLeave (to, from) {
    if(to.path === '/login' && this.isLoggedIn === true) {
      try {
        const response = await this.$http.post(`${import.meta.env.VITE_BASE}/v2/logout`);
        document.cookie = 'MeetArtToken = ; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        alert('登出成功');
        return true
      }
      catch (err){
        alert(`登出失敗，錯誤代碼：${err.response.status}`)
        return false
      }
    }
  }
}
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings:
  'FILL' 1,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

.router-link-exact-active{
  color: #1a1a1a;
  font-weight: 500;
}

@media (min-width: 992px){
  .nav-text-show {
    max-width: 165px;
    transition: ease-in-out all .3s;
  }
  .nav-text-hidden {
    max-width: 0px;
    overflow: hidden;
    opacity: 0;
    margin: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

@media (max-width: 991.98px){
  .collapse-hidden {
    max-height: 0px;
    overflow: hidden;
    transition: ease-in-out all .5s;
  }
  .collapse-show {
    max-height: 500px;
  }
}
</style>