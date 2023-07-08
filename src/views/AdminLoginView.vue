<template>
  <div class="bg-beige d-flex vh-100 justify-content-center align-items-center">
    <div class="container mb-10 mb-md-9">
      <h1 class="h3 mb-4 text-center fw-bold">MeetArt 繪課室</h1>
      <div class="row justify-content-center">
        <div class="col-md-7 col-lg-5">
          <div class="gradient-border gradient-border-3 rounded-3 bg-white p-9">
            <p class="text-center fs-5 mb-5 fw-semibold">- 後台登入 -</p>
            <VForm v-slot="{ errors }" @submit="onSubmit" class="position-relative" style="z-index: 2;">
              <div class="mb-4">
                <label for="username" class="form-label">帳號</label>
                <VField type="text" name="username" class="form-control" id="username" placeholder="請輸入帳號"
                        rules="required|email" :class="{ 'is-invalid': errors['username'] }"
                        ></VField>
                <ErrorMessage name="username" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-6">
                <label for="password" class="form-label">密碼</label>
                <VField type="password" name="password" class="form-control" id="password" placeholder="請輸入密碼"
                        :rules="{ required: true, regex: /^[^ \t\r\n\f:]*$/ }" :class="{ 'is-invalid': errors['password'] }"
                        ></VField>
                <ErrorMessage name="password" class="invalid-feedback"></ErrorMessage>
              </div>
              <button type="submit" class="btn btn-primary text-white w-100 py-2 mb-2">登入</button>
            </VForm>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="bg-dark-1 fixed-bottom">
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
</template>

<script>
import { RouterLink } from 'vue-router';
import { Field, Form, ErrorMessage, configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';

configure({
  generateMessage: localize('zh_TW',{
    names: {
      username: '帳號',
      password: '密碼'
    },
  }),
});

export default {
  components: {
    RouterLink,
    VForm: Form,
    VField: Field,
    ErrorMessage
  },
  methods: {
    onSubmit(values){
      const { VITE_BASE } = import.meta.env;
      const url = `${VITE_BASE}/v2/admin/signin`;

      this.$http.post(url, values)
      .then(res => {
        const { token, expired } = res.data;
        document.cookie = `MeetArtToken = ${token}; expires = ${new Date(expired)};`;
        alert(res.data.message)
        this.$router.push('/admin/orders');
      })
      .catch(err => {
        alert(`登入失敗，錯誤代碼：${err.response.status}`);
      })
    }
  }
}
</script>