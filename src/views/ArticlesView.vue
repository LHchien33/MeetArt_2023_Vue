<template>
  <main class="bg-beige page-padding-top flex-grow-1">
    <div class="container py-8">
      <!-- breadcrumb -->
      <ol class="breadcrumb mb-3">
        <li class="breadcrumb-item"><RouterLink to="/">首頁</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">課室專欄</li>
      </ol>
      <!-- page title -->
      <div class="bg-gradient mb-5">
        <div class="bg-beige bg-opacity-75 p-6 gradient-border gradient-border-2">
          <h1 class="fs-2 fs-xxl-1 mx-1">課室專欄</h1>
        </div>
      </div>
      <!-- 主要內容 -->
      <div class="row">
        <div class="col-12 col-md-8 col-xl-9">
          <!-- article list -->
          <!-- <div v-if="errMsg" class="text-center py-3">- 沒有符合此分類的課程 -</div> -->
          <ul class="list-unstyled px-6 bg-white bg-opacity-50">
            <li>
              <section class="py-5">
                <div class="mb-1">
                  <small class="d-inline-block text-muted me-4 mb-2">作者名字</small>
                  <small class="d-inline-block text-muted me-4 mb-2">2023/09/20</small>
                  <div class="d-inline-block">
                    <ul class="list-unstyled row gx-2 gy-1">
                      <li class="col-auto">
                        <RouterLink to="/" class="badge rounded-pill border border-secondary text-secondary text-decoration-none"># 標籤</RouterLink>
                      </li>
                      <li class="col-auto">
                        <RouterLink to="/" class="badge rounded-pill border border-secondary text-secondary text-decoration-none"># 標籤</RouterLink>
                      </li>
                      <li class="col-auto">
                        <RouterLink to="/" class="badge rounded-pill border border-secondary text-secondary text-decoration-none"># 標籤</RouterLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="row gx-4">
                  <div class="col-3">
                    <div class="ratio ratio-3x2 w-100">
                      <img class="object-fit-cover w-100 h-100" src="../assets/images/course_bird.png" alt="">
                    </div>
                  </div>
                  <div class="col-9">
                    <div>
                      <h2 class="fs-5 mb-3">看不出圖哪裡怪怪的？從觀察開啟「繪畫之眼」</h2>
                      <p class="my-1 mb-2 fs-7 fs-md-6 line-clamp-3">
                        初學者剛開始學畫時，經常會想將看到的一切鉅細靡遺地包含在畫作當中，這些埋首在小細節上、卻又畫不好的時刻，通常是放棄的引子。在繪畫中，講究的其實是一個「整體」結構關係，因此你必須先將頭抬起來、後退一步，重新觀察眼前之事物。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </li>
            <li class="mt-2 gradient-line gradient-line-1">
              <section class="py-5">
                <div class="mb-1">
                  <small class="d-inline-block text-muted me-4 mb-2">作者名字</small>
                  <small class="d-inline-block text-muted me-4 mb-2">2023/09/20</small>
                  <div class="d-inline-block">
                    <ul class="list-unstyled row gx-2 gy-1">
                      <li class="col-auto">
                        <RouterLink to="/" class="badge rounded-pill border border-secondary text-secondary text-decoration-none"># 標籤</RouterLink>
                      </li>
                      <li class="col-auto">
                        <RouterLink to="/" class="badge rounded-pill border border-secondary text-secondary text-decoration-none"># 標籤</RouterLink>
                      </li>
                      <li class="col-auto">
                        <RouterLink to="/" class="badge rounded-pill border border-secondary text-secondary text-decoration-none"># 標籤</RouterLink>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="row gx-4">
                  <div class="col-3">
                    <div class="ratio ratio-3x2 w-100">
                      <img class="object-fit-cover w-100 h-100" src="../assets/images/course_bird.png" alt="">
                    </div>
                  </div>
                  <div class="col-9">
                    <div>
                      <h2 class="fs-5 mb-3">看不出圖哪裡怪怪的？從觀察開啟「繪畫之眼」</h2>
                      <p class="my-1 mb-2 fs-7 fs-md-6 line-clamp-3">
                        初學者剛開始學畫時，經常會想將看到的一切鉅細靡遺地包含在畫作當中，這些埋首在小細節上、卻又畫不好的時刻，通常是放棄的引子。在繪畫中，講究的其實是一個「整體」結構關係，因此你必須先將頭抬起來、後退一步，重新觀察眼前之事物。
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </li>
          </ul>
        </div>
        <!-- 熱門標籤 -->
        <div class="d-none d-md-block col-md-4 col-xl-3">
          <div class="bg-white bg-opacity-50 p-5">
            <h3 class="fs-5 mb-4">熱門主題</h3>
            <div class="row gx-2 gy-3">
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標籤1</RouterLink>
              </div>
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標籤標籤1</RouterLink>
              </div>
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標籤標1</RouterLink>
              </div>
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標籤籤1</RouterLink>
              </div>
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標標籤標籤籤1</RouterLink>
              </div>
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標籤1</RouterLink>
              </div>
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標籤籤1</RouterLink>
              </div>
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標籤1</RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- pagination -->
      <div class="py-5">
        <Pagination class="justify-content-center" v-bind="setPagination"></Pagination>
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    RouterLink,
    Pagination
  },
  computed: {
    setPagination(){
      const total = 3;
      const current = 1;
      return {
        pathData: { path: '/articles'},
        total_pages:  total,
        current_page: current,
        has_pre: current !== 1,
        has_next: (total - current) > 0
      };
    },
    tempUrl(){
      return '/article/-NegneKanxRabJMnOhkk'
    }
  }
}

</script>
