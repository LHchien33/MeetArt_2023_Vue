<template>
  <div class="d-lg-flex min-vh-100">
    <!-- backdrop -->
    <div class="d-lg-none position-fixed bg-dark-1 w-100 opacity-0" style="z-index: 1021; height: 0; transition: opacity .3s"
          :class="isCollapsed ? '' : ['h-100', 'opacity-50'] "
          @click="isCollapsed = true"></div>
    <!-- navbar -->
    <nav class="navbar bg-beige py-5 flex-nowrap text-nowrap shadow-sm fixed-top position-lg-static">
      <div class="container-lg flex-column justify-content-start align-items-start h-100 p-lg-0">
        <div class="d-flex align-items-center w-100">
          <RouterLink to="/admin/orders" @click="isCollapsed = true"
                class="navbar-brand fw-bold pe-7 ps-3 px-lg-7 py-4 mx-2 fs-3 nav-text-show"
                :class="{ 'nav-text-hidden': !isExpanded }">MeetArt</RouterLink>
          <button type="button" class="mx-auto d-none d-lg-block btn shadow-none border-0 px-5 py-4"
                  @click="isExpanded = !isExpanded">
            <span class="material-symbols-outlined align-middle">
              {{ isExpanded ? 'keyboard_double_arrow_left' : 'keyboard_double_arrow_right' }}
            </span>
          </button>
          <button type="button" class="d-block d-lg-none btn shadow-none border-0 px-5 py-4 ms-auto"
                @click="isCollapsed = !isCollapsed">
            <span class="material-symbols-outlined align-middle">menu</span>
          </button>
        </div>
        <div class="collapse-hidden w-100 h-lg-100" :class="{ 'collapse-show': !isCollapsed }">
          <ul class="navbar-nav h-lg-100 py-3 py-lg-0">
            <li v-for="item in navItems" :key="item.itemName" class="nav-item">
              <RouterLink :to="item.path" @click="isCollapsed = true" v-slot="link" class="text-decoration-none">
                <div class="nav-link px-6 py-4 d-flex justify-content-between gradient-line gradient-line-0 position-relative"
                    :class="{ 'gradient-line-90': link.isActive }">
                  <span class="ms-lg-3 fs-5 nav-text-show " :class="{ 'nav-text-hidden': !isExpanded }">{{ item.itemName }}</span>
                  <span :class="{'opacity-0': isExpanded }" class="material-symbols-outlined icon-fill-1 d-none d-lg-block">{{ item.icon }}</span>
                </div>
              </RouterLink>
            </li>
            <li class="nav-item mt-7 mt-lg-auto border-top">
              <RouterLink to="/login" class="nav-link w-100 border-0 bg-transparent px-6 py-4 d-flex justify-content-between position-relative interactive mt-4 ">
                <div class="nav-text-show" :class="{ 'nav-text-hidden': !isExpanded }">
                  <span class="gradient-line gradient-line-0"></span>
                  <span class="ms-lg-3 fs-5">登出</span>
                </div>
                <div class="gradient-line gradient-line-0"><span :class="{'opacity-0': isExpanded }" class="material-symbols-outlined d-none d-lg-block">logout</span></div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- main content -->
    <div class="flex-grow-1">
      <RouterView v-if="isLoggedIn"></RouterView>
      <!-- footer -->
      <footer class="bg-dark-1 sticky-bottom">
        <div class="p-5 py-md-3">
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
const { VITE_BASE } = import.meta.env;

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
          itemName: '課程管理',
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
        // {
        //   itemName: '營收圖表',
        //   path: '/admin/chart',
        //   icon: 'bar_chart'
        // }
      ],
      isLoggedIn: false,
      isExpanded: true,
      isCollapsed: true
    }
  },
  methods: {
    checkAdmin(){
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)MeetArtToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      this.$http.defaults.headers.common.Authorization = token;
      const url = `${VITE_BASE}/v2/api/user/check`;

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
  created(){
    this.checkAdmin();
  },
  async beforeRouteLeave (to, from) {
    if(to.path === '/login' && this.isLoggedIn === true) {
      try {
        const response = await this.$http.post(`${VITE_BASE}/v2/logout`);
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

<style>
.interactive .gradient-line-0::before {
  transition: all .5s;
}
.interactive:hover .gradient-line-0::before,
.interactive:active .gradient-line-0::before {
  width: 90%;
  opacity: 1;
}

.main-content-height {
    min-height: 100vh;
  }

@media (min-width: 768px){
  .main-content-height {
    min-height: unset;
    height: calc(100vh - 48px);
  }
}
.navbar .router-link-exact-active{
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

.table-cell-px-2 th,
.table-cell-px-2 td {
  padding-left: .5rem;
  padding-right: .5rem;
}

.table-cell-px-2 th:first-child,
.table-cell-px-2 td:first-child {
  padding-left: 0;
}

.table-cell-px-2 th:last-child,
.table-cell-px-2 td:last-child {
  padding-right: 0;
}

.thead-padding th {
  padding-top: 20px;
  padding-bottom: 12px;
}

.hover-bg-transparent:hover,
.hover-bg-transparent:active {
  --bs-bg-opacity: 0;
}
</style>