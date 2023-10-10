<template>
  <div class="bg-beige">
    <div class="container vh-100 d-flex justify-content-center align-items-center">
      <div>
        <RouterLink to="/" class="d-inline-block mb-3 mb-md-4 col-3 col-md-2">
          <img src="../assets/images/logo_m.png" alt="MeetArt 繪課室" class="w-100 object-fit-contain">
        </RouterLink>
        <h1 class="ms-n1 fs-4 fs-md-1">看來你進入了編號 404 的繪課室</h1>
        <p class="fs-7 fs-md-6 mb-3 mb-md-4">很抱歉找不到您要的頁面，您可以...</p>
        <ul class="list-unstyled row g-2 mb-10">
          <li class="col-auto">
            <button type="button" @click="previousPage" class="btn p-0 bg-gradient border-0">
              <span class="btn bg-beige bg-clip-padding-box border border-3 border-transparent hover-bg-transparent fs-8 fs-md-6">
                回上一頁
              </span>
            </button>
          </li>
          <li class="col-auto">
            <RouterLink to="/" class="btn p-0 bg-gradient border-0">
              <span class="btn bg-beige bg-clip-padding-box border border-3 border-transparent hover-bg-transparent fs-8 fs-md-6">
                回首頁
              </span>
            </RouterLink>
          </li>
          <li class="col-auto">
            <a href="https://mail.google.com/mail/u/0/?fs=1&amp;tf=cm&amp;to=judy263562@gmail.com" target="_blank" class="btn p-0 bg-gradient border-0">
              <span class="btn bg-beige bg-clip-padding-box border border-3 border-transparent hover-bg-transparent fs-8 fs-md-6">
                聯絡我們
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  data(){
    return {
      text: 'this is 404 page not found view'
    }
  },
  components: {
    RouterLink
  },
  methods: {
    previousPage(){
      this.$router.go(-1);
    }
  }
}
</script>

<style>
.hover-bg-transparent:hover,
.hover-bg-transparent:active {
  --bs-bg-opacity: 0;
}
</style>