<template>
  <h1 class="fs-3 mb-3 px-2">{{ updateId === 'new' ? '新增' : '編輯' }}文章 {{ updateId }}</h1>
  <VForm ref="articleForm" v-slot="{ errors, values, meta }" :initial-values="tempArticle" @submit="onSubmit"
        @invalid-submit="onInvalidSubmit" class="overflow-y-scroll bg-beige">
    <div class="p-6 pb-0">
      <div class="row">
        <!-- 左欄欄位 -->
        <div class="col-8">
          <!-- 文章標題 -->
          <div class="mb-4">
            <div class="d-sm-flex align-items-center">
              <label for="title" class="form-label mb-sm-0 me-2 text-nowrap">
                <span class="text-danger">* </span>文章標題：
              </label>
              <VField type="text" rules="required" name="title" id="title" class="form-control d-inline-block flex-grow-1"
                      :class="{ 'is-invalid': errors['title'] }" placeholder="請輸入文章標題"></VField>
            </div>
            <ErrorMessage name="title" class="invalid-feedback d-block ms-11px"></ErrorMessage>
          </div>
          <!-- 作者 -->
          <div class="mb-4">
            <div class="d-sm-flex align-items-center">
              <label for="author" class="form-label mb-sm-0 me-2 text-nowrap">
                <span class="text-danger">* </span>作者名稱：
              </label>
              <VField type="text" rules="required" name="author" id="author" class="form-control d-inline-block flex-grow-1"
                      :class="{ 'is-invalid': errors['author'] }" placeholder="請輸入作者名稱"></VField>
            </div>
            <ErrorMessage name="author" class="invalid-feedback d-block ms-11px"></ErrorMessage>
          </div>
          <!-- 公開否 -->
          <div class="mb-4 form-check form-switch d-flex align-items-center ps-0">
            <label for="is_public" class="form-check-label me-2">公開狀態：</label>
            <div>
              <VField type="checkbox" name="is_public" value="1" id="is_public" class="form-check-input ms-0 me-2"></VField>
              <span :class="values.is_public ? 'text-accent' : 'text-muted' "
                    class="d-inline-block">{{ values.is_public ? '公開' : '不公開'}}</span>
            </div>
          </div>
          <!-- 標籤 -->
          <div class="mb-4">
            <VFieldArray name="tag" v-slot="{ fields, push, remove }">
              <label class="form-label text-nowrap">
                <span class="text-danger">* </span>文章標籤：
                <ErrorMessage name="tag[0]" class="invalid-feedback d-inline-block"></ErrorMessage>
              </label>
              <div class="row gx-2 gy-1 align-items-center">
                <div v-for="(entry, idx) in fields" :key="entry.value" class="col-4">
                  <VField type="text" class="form-control d-inline-block" placeholder="請輸入標籤名稱"
                          rules="required" :name="`tag[${idx}]`" :id="`tag[${idx}]`"
                          :class="{ 'is-invalid': errors[`tag[${idx}]`] }"></VField>
                </div>
                <div class="col-auto">
                  <button type="button" class="btn btn-secondary p-1 me-1" @click="remove(fields.length-1);">
                    <span class="d-flex material-symbols-outlined align-top fs-6">remove</span>
                  </button>
                  <button type="button" class="btn btn-primary p-1" @click="push('');">
                    <span class="d-flex material-symbols-outlined align-top fs-6">add</span>
                  </button>
                </div>
              </div>
            </VFieldArray>
          </div>
        </div>
        <!-- 右欄圖片 -->
        <div class="col-4">
          <div class="mb-4">
            <label for="image" class="form-label mb-2 text-nowrap">
              <span class="text-danger">* </span>主要圖片：
            </label>
            <label v-if="!previewImgUrl && !uploadedImgUrl" for="image" class="d-block btn btn-secondary text-nowrap">新增圖片
              <input type="file" id="image" class="visually-hidden" @change="previewImg($event)">
            </label>
            <!-- 預覽區 -->
            <div v-if="previewImgUrl || uploadedImgUrl"
                  class="position-relative border border-3 border-dashed overflow-hidden hover-animation img-container"
                  :class="{'touched': imgOptionsShow}" @touchstart.stop="imgOptionsShow = !imgOptionsShow">
              <img :src="previewImgUrl || uploadedImgUrl " alt="預覽圖片" class="w-100 h-100 object-fit-contain">
              <span class="badge text-secondary bg-light border border-1 border-secondary position-absolute top-0 start-0 m-3">
                {{ uploadedImgUrl ? '已上傳' : '上傳預覽' }}
              </span>
              <!-- 圖片操作選項 -->
              <div class="position-absolute top-100 w-100 p-2 bg-light bg-opacity-75 d-flex justify-content-around transition-transform-3 translate-y-n100">
                <button type="button" class="btn btn-sm btn-danger"
                        @click.prevent="removeImg()"
                        @touchstart.prevent="removeImg()">移除圖片</button>
                <button v-if="!uploadedImgUrl" type="button" class="btn btn-sm btn-primary"
                        @click.prevent="uploadImg()"
                        @touchstart.prevent="uploadImg()">上傳圖片</button>
              </div>
              <!-- 上傳圖片 spinner -->
              <div v-if="imgUploading" class="position-absolute top-0 w-100 h-100 bg-dark-1 bg-opacity-50 d-flex justify-content-center align-items-center">
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
            <!-- 驗證/存回傳 url -->
            <VField ref="imageUrl" type="text" rules="required" name="image"
            class="invisible position-absolute start-0"></VField>
            <ErrorMessage name="image" class="invalid-feedback d-block ms-11px"></ErrorMessage>
          </div>
        </div>
      </div>
      <!-- 下方欄位 -->
      <!-- 相關課程 -->
      <div class="mb-4">
        <VFieldArray name="related_course" v-slot="{ fields, push, remove }">
          <label class="form-label text-nowrap d-block">相關課程：</label>
          <div class="row gx-2 gy-1 align-items-center">
            <div v-for="(entry, idx) in fields" :key="entry.key" class="col-4">
              <VField as="select" class="form-select"
                      :name="`related_course[${idx}]`" :id="`related_course[${idx}]`"
                      :class="{ 'is-invalid': errors[`related_course[${idx}]`] }">
                <option value="" selected disabled>請選擇相關課程</option>
                <option v-if="relatedCourseOpts.length === 0 && prodError" :value="entry.value" disabled>
                  {{ prodError.message }}（{{ prodError.status }}）
                </option>
                <template v-else>
                  <option v-for="item in relatedCourseOpts" :key="item.id" :value="item.id">{{ item.title }}（{{ item.id }}）</option>
                </template>
              </VField>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-secondary p-1 me-1" @click="remove(fields.length-1);">
                <span class="d-flex material-symbols-outlined align-top fs-6">remove</span>
              </button>
              <button type="button" class="btn btn-primary p-1" @click="push('');">
                <span class="d-flex material-symbols-outlined align-top fs-6">add</span>
              </button>
            </div>
          </div>
        </VFieldArray>
      </div>
      <!-- 文章概述 -->
      <div class="mb-4">
        <label for="description" class="form-label mb-2 me-2 text-nowrap d-block">
          <span class="text-danger">* </span>文章概述：
          <ErrorMessage name="description" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
        </label>
        <VField as="textarea" rules="required" name="description" id="description" class="form-control"
                :class="{ 'is-invalid': errors['description'] }" placeholder="請輸入文章概述"></VField>
      </div>
      <!-- 主要文章內容 -->
      <div class="mb-4">
        <label for="content" class="form-label mb-2 me-2 text-nowrap d-block">
          <span class="text-danger">* </span>主要文章內容：
          <ErrorMessage name="content" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
        </label>
        <VField as="textarea" rules="required" name="content" id="content" class="form-control"
                :class="{ 'is-invalid': errors['content'] }" placeholder="請輸入主要文章內容"></VField>
      </div>
    </div>
    <!-- 完成操作 -->
    <div class="text-end sticky-bottom bg-beige border-top px-6 py-3">
      <button type="button" class="btn btn-outline-dark-3 me-2" @click="beforeCancel(meta.touched)">取消</button>
      <button type="submit" class="btn btn-primary">確認{{ updateId === 'new' ? '新增' : '編輯' }}</button>
    </div>
    <!-- 離開頁面確認 modal -->
    <!-- <ConfirmModal ref="ConfirmModal" v-bind="{cancelBtnText: '繼續編輯',confirmBtnText: '捨棄'}">
      <template #modal-content>
        <p class="mb-0">尚未儲存，<span class="text-danger">捨棄變更</span>嗎？</p>
      </template>
    </ConfirmModal> -->
  </VForm>
</template>

<script>
import { FieldArray, Field, Form, ErrorMessage, configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
const { VITE_BASE, VITE_API } = import.meta.env;

configure({
  generateMessage: localize('zh_TW',{
    names: {
      title: '文章標題',
      author: '作者名稱',
      is_public: '公開狀態',
      'tag[0]': '文章標籤',
      description: '文章概述',
      content: '主要文章內容',
      image: '主要圖片'
    },
    fields: {
      image: {
        required: '{field} 為必填（需上傳圖片）',
      },
    },
  }),
});

export default {
  props: ['updateId', 'allProducts', 'prodError'],
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
    VFieldArray: FieldArray,
  },
  data(){
    return {
      tempArticle: {
        tag: [''],
        related_course: ['']
      },
      relatedCourseOpts: [],
      imgFile: {},
      previewImgUrl: '',
      uploadedImgUrl: '',
      imgUploading: false,
      imgOptionsShow: false,
    }
  },
  watch: {
    allProducts(){
      this.setCourseOpts();
    }
  },  
  methods: {
    async getSingleArticle(){
      if(this.updateId === 'new'){
        return
      }
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/article/${this.updateId}`;
      try {
        const res = await this.$http.get(url);
        this.setInitialVal(res.data.article)
      } catch (err) {
        console.log(err);
      }
    },
    setCourseOpts(){
      if(this.allProducts === null){
        return
      }
      const keys = Object.keys(this.allProducts);
      const result = [];
      keys.forEach(key => {
        if(!!this.allProducts[key].is_enabled){
          result.push({
            'id': key,
            'title': this.allProducts[key].title
          })
        }
      });
      this.relatedCourseOpts = result;
    },
    setInitialVal(data){
      const { title, author, image, tag, description, content } = data;
      this.tempArticle = {
        title, author, image, tag, description, content,
        is_public: data.isPublic ? '1' : '',
        related_course: data.relatedCourseId
      };
      this.$refs.articleForm.setValues(this.tempArticle);
      this.uploadedImgUrl = image;
    },
    previewImg(e){
      this.imgFile = e.target.files[0];
      this.previewImgUrl = URL.createObjectURL(this.imgFile);
      this.$refs.imageUrl.setTouched(true);
    },
    removeImg(){
      this.imgFile = {};
      this.previewImgUrl = URL.revokeObjectURL(this.previewImgUrl);
      this.uploadedImgUrl = '';
      // 觸發欄位驗證
      this.$refs.imageUrl.handleChange(this.uploadedImgUrl, true);
      this.$refs.imageUrl.setTouched(true);
    },
  },
  mounted(){
    this.getSingleArticle();
    this.setCourseOpts();
  }
}

</script>

<style scoped>
.img-container {
  height: 200px;
}

.ms-11px{
  margin-left: 11px;
}

.border-dashed{
  border-style: dashed !important;
}
</style>