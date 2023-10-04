<template>
  <h1 class="fs-3 mb-3 px-2">{{ updateId === 'new' ? '新增' : '編輯' }}文章</h1>
  <div v-if="errorMsg" class="p-6 bg-beige">{{ errorMsg }}</div>
  <template v-else>
    <VForm ref="articleForm" v-slot="{ errors, values, meta, setFieldTouched }" :initial-values="tempArticle" @submit="onSubmit" @keydown.enter.exact="preventEnter($event)" @invalid-submit="scrollErrorIntoView" class="overflow-y-scroll bg-beige">
      <div class="p-6">
        <div class="row">
          <!-- 左欄欄位 -->
          <div class="col-md-8">
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
            <!-- 文章標籤 -->
            <div class="mb-4">
              <VFieldArray name="tag" v-slot="{ fields, push, remove }">
                <label for="tag[0]" class="form-label d-block">
                  <span class="text-danger">* </span>文章標籤：
                  <ErrorMessage name="tag[0]" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
                </label>
                <div class="row gx-2 gy-1 align-items-center">
                  <div v-for="(entry, idx) in fields" :key="entry.key" class="col-4">
                    <VField type="text" class="form-control d-inline-block" placeholder="請輸入標籤名稱"
                            rules="required" :name="`tag[${idx}]`" :id="`tag[${idx}]`"
                            :class="{ 'is-invalid': errors[`tag[${idx}]`] }"></VField>
                  </div>
                  <div class="col-auto">
                    <button v-if="fields.length > 1" type="button" class="btn btn-secondary p-1 me-1"
                            @click="remove(fields.length-1); setFieldTouched('title', true);">
                      <span class="d-flex material-symbols-outlined align-top fs-6">remove</span>
                    </button>
                    <button type="button" class="btn btn-primary p-1" @click="push(''); setFieldTouched('title', true);">
                      <span class="d-flex material-symbols-outlined align-top fs-6">add</span>
                    </button>
                  </div>
                </div>
              </VFieldArray>
            </div>
            <!-- 相關課程 -->
            <div class="mb-4">
              <VFieldArray name="related_course" v-slot="{ fields, push, remove }">
                <label class="form-label d-block">相關課程：</label>
                <div class="row gx-2 gy-1 align-items-center">
                  <div v-for="(entry, idx) in fields" :key="entry.key" class="col-6">
                    <VField as="select" class="form-select d-inline-block"
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
                    <button v-if="fields.length > 1" type="button" class="btn btn-secondary p-1 me-1"
                            @click="remove(fields.length-1); setFieldTouched('title', true);">
                      <span class="d-flex material-symbols-outlined align-top fs-6">remove</span>
                    </button>
                    <button type="button" class="btn btn-primary p-1" @click="push(''); setFieldTouched('title', true)">
                      <span class="d-flex material-symbols-outlined align-top fs-6">add</span>
                    </button>
                  </div>
                </div>
              </VFieldArray>
            </div>
          </div>
          <!-- 右欄圖片 -->
          <div class="col-md-4">
            <div class="mb-4">
              <label for="image" class="form-label d-block">
                <span class="text-danger">* </span>主要圖片：
                <ErrorMessage name="image" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
              </label>
              <label v-if="!previewImgUrl && !uploadedImgUrl" for="image" class="d-block btn btn-secondary text-nowrap"
                    @click.once="setFieldTouched('content', true)">新增圖片
                <input type="file" id="image" class="visually-hidden" @change="previewImg($event)">
              </label>
              <!-- 預覽區 -->
              <div v-if="previewImgUrl || uploadedImgUrl"
                    class="position-relative border border-3 border-dashed overflow-hidden hover-animation" style="height: 200px;"
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
              <VField ref="imageUrl" type="text" rules="required" name="image" class="invisible position-absolute start-0"></VField>
            </div>
          </div>
        </div>
        <!-- 下方欄位 -->
        <!-- 文章概述 -->
        <div class="mb-4">
          <label for="description" class="form-label d-block">
            <span class="text-danger">* </span>文章概述：
            <ErrorMessage name="description" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
          </label>
          <VField as="textarea" rules="required" name="description" id="description" class="form-control" style="min-height: 5rem;"
                  :class="{ 'is-invalid': errors['description'] }" placeholder="請輸入文章概述"></VField>
        </div>
        <!-- 主要文章內容 -->
        <div class="mb-4 min-height-8rem" :class="{ 'is-invalid': errors['content'] }">
          <label for="content" class="form-label d-block">
            <span class="text-danger">* </span>主要文章內容：
            <ErrorMessage name="content" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
          </label>
          <VField as="textarea" rules="required" name="content" id="content" class="d-none"
                  v-model="editorData" placeholder="請輸入主要文章內容"></VField>
          <ckeditor :editor="editorMainArticle" v-model="editorData" :config="editorConfig"
                    @blur.once="setFieldTouched('content', true)"></ckeditor>
        </div>
      </div>
      <!-- 完成操作 -->
      <div class="text-end sticky-bottom bg-beige border-top px-6 py-3">
        <RouterLink to="/admin/articles" class="btn btn-outline-dark-3 me-2">取消</RouterLink>
        <button type="submit" class="btn btn-primary">確認{{ updateId === 'new' ? '新增' : '編輯' }}</button>
      </div>
      <!-- 離開頁面確認 modal -->
      <ConfirmModal ref="ConfirmModal" v-bind="{cancelBtnText: '繼續編輯',confirmBtnText: '捨棄'}">
        <template #modal-content>
          <p class="mb-0">尚未儲存，<span class="text-danger">捨棄變更</span>嗎？</p>
        </template>
      </ConfirmModal>
    </VForm>
  </template>
</template>

<script>
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
import { FieldArray, Field, Form, ErrorMessage, configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/zh';
import ImgUploadPlugin from '../plugins/ImgUploadAdapterPlugin';
import ConfirmModal from '@/components/ConfirmModal.vue';
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
    ckeditor: CKEditor.component,
    ConfirmModal
  },
  data(){
    return {
      errorMsg: '',
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
      editorMainArticle: ClassicEditor,
      editorData: '',
      editorConfig: {
        language: 'zh',
        extraPlugins: [ImgUploadPlugin],
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'bulletedList', 'numberedList', '|',
          'link', 'uploadImage', 'blockQuote', '|',
          'undo', 'redo',
        ],
        image: {
          toolbar: [
            'imageStyle:inline',
            'imageStyle:breakText',
            'imageStyle:wrapText',
            'toggleImageCaption',
            'imageTextAlternative',
          ],
        }
      },
      articleSaved: false
    }
  },
  watch: {
    allProducts(){
      this.setCourseOpts();
    }
  },  
  methods: {
    ...mapActions(useCommonStore, ['scrollErrorIntoView']),
    async getSingleArticle(){
      if(this.updateId === 'new'){
        return
      }
      let loader = this.$loading.show();
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/article/${this.updateId}`;
      try {
        const res = await this.$http.get(url);
        this.setInitialVal(res.data.article);
      } catch (err) {
        this.errorMsg = `無法取得文章資料，錯誤代碼：${err.response?.status}`;
        this.$toast({toastType: 'failed'}).fire({title: this.errorMsg});
      } finally {
        loader.hide();
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
      this.editorData = content;
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
    async uploadImg(){
      this.imgUploading = true;
      const formData = new FormData();
      formData.append('file-to-upload', this.imgFile)
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/upload`;
      try {
        const res = await this.$http.post(url, formData);
        this.imgFile = {};
        this.previewImgUrl = URL.revokeObjectURL(this.previewImgUrl);
        this.uploadedImgUrl = res.data.imageUrl;
        // 觸發欄位驗證
        this.$refs.imageUrl.handleChange(this.uploadedImgUrl, true);
        this.$toast({toastType: 'success'}).fire({title: '圖片上傳成功'})
      } catch (err) {
        this.$toast({toastType: 'failed'}).fire({
          title: `圖片上傳失敗，錯誤代碼：${err.response?.status}`
        });
      } finally {
        this.imgUploading = false;
      }
    },
    async onSubmit(values){
      let loader = this.$loading.show();
      const {author, content, description, image, is_public, related_course, tag, title } = values;
      const requestData = {
        author, content, description, image, tag, title,
        "create_at": Math.floor(Date.now()/1000),
        "isPublic": is_public === '1' ? true : false,
        "relatedCourseId": related_course
      }

      const method = this.updateId === 'new' ? 'post' : 'put';
      const path = this.updateId === 'new' ? '' : this.updateId
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/article/${path}`;
      try {
        await this.$http[method](url, {data: {...requestData}});
        this.articleSaved = true;
        this.$router.push('/admin/articles');
      } catch (err) {
        this.articleSaved = false;
        const txt = method === 'post' ? '新增' : '更新';
        this.$toast({toastType: 'failed'}).fire({
          title: `${txt}失敗，錯誤代碼：${err.response?.status}`
        })
      } finally {
        loader.hide();
      }
    },
    preventEnter(e){
      if(!e.target.classList.contains('ck')){
        e.preventDefault();
        return
      }
    },
    handleBeforeUnload(e){
      const formTouched = this.$refs.articleForm.getMeta().touched;
      if(!this.articleSaved && formTouched){
        e.returnValue = '';
      }   
    },
  },
  mounted(){
    this.getSingleArticle();
    this.setCourseOpts();
    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  async beforeRouteLeave () {
    const formTouched = this.$refs.articleForm.getMeta().touched;
    try {
      if(formTouched && !this.articleSaved){
        await this.$refs.ConfirmModal.openModal();
      }
      window.removeEventListener('beforeunload', this.handleBeforeUnload);
      return true;
    } catch (err) {
      return false;
    }
  },
}

</script>

<style>
.ms-11px{
  margin-left: 11px;
}

.border-dashed{
  border-style: dashed !important;
}

.is-invalid .ck-editor {
  border: 1px solid red;
}

.min-height-8rem .ck-content {
  min-height: 8rem;
}
</style>