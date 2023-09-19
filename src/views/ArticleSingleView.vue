<template>
  <main class="bg-beige page-padding-top flex-grow-1">
    <div class="container py-8">
      <!-- breadcrumb -->
      <ol class="breadcrumb mb-3">
        <li class="breadcrumb-item"><RouterLink to="/">首頁</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/articles">課室專欄</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">看不出圖哪裡怪怪的？從觀察開啟「繪畫之眼」</li>
      </ol>
      <div class="row">
        <div class="col-9">
          <div class="p-6 px-8 bg-white bg-opacity-50">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <small class="text-muted">2023/09/29</small>
              <div>
                <button type="button" class="border-0 bg-transparent icon-fill-1">
                  <span class="material-symbols-outlined text-muted">share</span>
                </button>
                <button type="button" class="border-0 bg-transparent">
                  <span class="material-symbols-outlined text-muted">bookmark</span>
                </button>
              </div>
            </div>
            <!-- 文章內容 -->
            <article>
              <div class="gradient-line gradient-line-1"></div>
              <h1 class="fs-3 fs-xxl-2 fw-bold mt-6 mb-4">看不出圖哪裡怪怪的？從觀察開啟「繪畫之眼」</h1>
              <div class="d-flex bg-gradient">
                <div class="bg-gradient flex-shrink-0" style="width: 4px;"></div>
                <p class="mb-0 bg-white bg-opacity-75 p-5">初學者剛開始學畫時，經常會想將看到的一切鉅細靡遺地包含在畫作當中，這些埋首在小細節上、卻又畫不好的時刻，通常是放棄的引子。在繪畫中，講究的其實是一個「整體」結構關係，因此你必須先將頭抬起來、後退一步，重新觀察眼前之事物。</p>
              </div>
              <img class="w-100 my-5" src="../assets/images/course_bird.png" alt="">
              <p>這裡有一百個字，樣打造完全小子讓人聯繫電話承諾基礎上，相當清除積分方案，律師德國通知西部以外休閒股市經銷商男人電源關閉投資者台北，等方面提示失望鎖定幾天公斤設立最新臉上一份特色哥哥一家我就，插入見過。</p>
              <p>這裡有一百五十字，品知識情緒不詳自我只有有一定每一個適合才會，那種立刻是在目的，採取理念，情人物理真正選單存在激情家族環保我去合理取得，小區運作可愛小組，一條軟體三大品牌責任順利轉換不要不用應當很久熱情求助淡淡，轉移總經理恐怖不必今年遊戲藥物目錄這就是，種種偉大一道防止，實驗和平島不代表皮膚數碼空。</p>
              <img class="w-100 my-5" src="../assets/images/course_bird.png" alt="">
              <p>這裡有一百個字，樣打造完全小子讓人聯繫電話承諾基礎上，相當清除積分方案，律師德國通知西部以外休閒股市經銷商男人電源關閉投資者台北，等方面提示失望鎖定幾天公斤設立最新臉上一份特色哥哥一家我就，插入見過。</p>
              <div class="gradient-line gradient-line-1 pt-5 pb-2"></div>
            </article>
            <!-- 上下頁 -->
            <div class="d-flex justify-content-between align-items-center mb-2">
              <a href="#" class="link-dark-3 text-decoration-none hover-text-decoration">
                <span class="material-symbols-outlined align-middle">chevron_left</span>
                <span class="fs-7">上一篇</span>
              </a>
              <a href="#" class="link-dark-3 text-decoration-none hover-text-decoration">
                <span class="fs-7">下一篇</span>
                <span class="material-symbols-outlined align-middle">chevron_right</span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-3">
          <div class="bg-white bg-opacity-50 p-5 mb-8">
            <h3 class="fs-5 mb-4">探索更多</h3>
            <div class="row gx-2 gy-3">
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標籤1</RouterLink>
              </div>
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標籤標籤1</RouterLink>
              </div>
              <div class="col-auto">
                <RouterLink to="/" class="text-decoration-none badge rounded-pill border border-secondary text-secondary">#標籤標籤標1</RouterLink>
              </div>
            </div>
          </div>
          <div class="bg-white bg-opacity-50 p-5">
            <h3 class="fs-5 mb-4">相關課程</h3>
            <ul class="list-unstyled">
              <li class="mb-3">
                <RouterLink to="/" class="rounded-3 overflow-hidden gradient-border gradient-border-1 before-z-index-2 hover-animation text-decoration-none mb-3">
                  <div class="row gx-2 p-3">
                    <div class="col-4">
                      <div class="overflow-hidden w-100 h-100">
                        <img src="../assets/images/course_bird.png" class="object-fit-cover w-100 h-100 scale-11 transition-all-3">
                      </div>
                    </div>
                    <div class="col-8">
                      <div class="bg-white bg-opacity-50">
                        <h2 class="mb-2 fs-7 fw-semibold text-dark-1">進階素描 - 人體動態捕捉</h2>
                        <p class="mb-0 fs-8 text-muted">123 位同學</p>
                      </div>
                    </div>
                  </div>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/" class="rounded-3 overflow-hidden gradient-border gradient-border-1 before-z-index-2 hover-animation text-decoration-none mb-3">
                  <div class="row gx-2 p-3">
                    <div class="col-4">
                      <div class="overflow-hidden w-100 h-100">
                        <img src="../assets/images/course_bird.png" class="object-fit-cover w-100 h-100 scale-11 transition-all-3">
                      </div>
                    </div>
                    <div class="col-8">
                      <div class="bg-white bg-opacity-50">
                        <h2 class="mb-2 fs-7 fw-semibold text-dark-1">進階素描 - 人體動態捕捉</h2>
                        <p class="mb-0 fs-8 text-muted">123 位同學</p>
                      </div>
                    </div>
                  </div>
                </RouterLink>
              </li>
            </ul>
            
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: ['articleId'],
  components: {
    RouterLink,
  },
}

</script>

<style scoped>
.hover-text-decoration:hover{
  text-decoration: underline !important;
}
</style>