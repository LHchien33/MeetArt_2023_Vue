<template>
  <div class="pt-lg-8 d-flex flex-column main-content-height" style="padding: 138px 32px 32px;"
        @touchstart="imgOptionsShow ? imgOptionsShow = false : null ">
    <h1 class="fs-3 mb-3">{{ updateId === 'new' ? '新增' : '編輯' }}課程</h1>
    <div class="p-1 m-n1 overflow-y-scroll flex-grow-1">
      <!-- 正在編輯的課程 -->
      <div v-if="tempProduct.id" class="bg-beige gradient-border gradient-border-3 p-6 mb-3 text-secondary">
        <div class="row position-relative" style="z-index: 2;">
          <div class="col">
            <p class="mb-0 text-nowrap">課程編號： {{ tempProduct.id }}</p>
          </div>
          <div class="col">
            <p class="mb-0 text-nowrap">已售出： {{ tempProduct.classmates }}</p>
          </div>
        </div>
      </div>
      <!-- 表單 -->
      <VForm ref="VForm" v-slot="{ errors, meta, setFieldTouched }" @submit="onSubmit" :initial-values="tempProduct">
        <div class="accordion accordion-flush">
          <!-- 課程基本資訊 -->
          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="prodData_basic_heading">
              <button class="accordion-button fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#prodData_basic" aria-expanded="true" aria-controls="prodData_basic">
                課程基本資訊
              </button>
            </h2>
            <div id="prodData_basic" class="accordion-collapse collapse show" aria-labelledby="prodData_basic_heading">
              <div class="accordion-body p-6">
                <div class="mb-4">
                  <div class="d-flex align-items-center">
                    <label for="title" class="form-label mb-0 me-2 text-nowrap">
                      <span class="text-danger">* </span>課程標題：
                    </label>
                    <VField type="text" rules="required" name="title" id="title" class="form-control d-inline-block flex-grow-1"
                            :class="{ 'is-invalid': errors['title'] }" placeholder="請輸入課程標題"></VField>
                  </div>
                  <ErrorMessage name="title" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                </div>
                <div class="mb-4">
                  <div class="d-flex align-items-center">
                    <label for="imageUrl" class="form-label mb-0 me-2 text-nowrap">
                      <span class="text-danger">* </span>主要圖片：
                    </label>
                    <!-- 新增圖片按鈕 -->
                    <label v-if="!previewImgUrl && !uploadedImgUrl" for="imageUrl" class="btn btn-secondary">新增圖片
                      <input type="file" id="imageUrl" class="visually-hidden" @change="previewImg($event)">
                    </label>
                    <div>
                      <!-- 預覽區 -->
                      <div v-if="previewImgUrl || uploadedImgUrl " style="width: 240px; height: 160px;"
                            class="position-relative border border-3 border-dashed overflow-hidden hover-animation"
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
                        <div v-if="imgUploading" class="position-absolute top-0 w-100 h-100 bg-dark-1 bg-opacity-50 spinner"></div>
                      </div>
                      <!-- 驗證/存回傳 url -->
                      <VField ref="imageUrl" type="text" rules="required" name="imageUrl" class="d-none"></VField>
                    </div>
                  </div>
                  <ErrorMessage name="imageUrl" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                </div>
                <div>
                  <div class="row gy-4">
                    <div class="col-6">
                      <div class="d-flex align-items-center">
                        <label for="category" class="form-label mb-0 me-2 text-nowrap">
                          <span class="text-danger">* </span>繪畫媒材：
                        </label>
                        <VField as="select" rules="required" name="category" id="category" class="form-select"
                                :class="{ 'is-invalid': errors['category'] }">
                          <option value="" selected class="text-light-2">請選擇繪畫{{ catagories.category.name }}</option>
                          <option v-for="item in catagories.category.sub" :key="item" :value="item">{{ item }}</option>
                        </VField>
                      </div>
                      <ErrorMessage name="category" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                    </div>
                    <template v-for="(value, key) in catagories" :key="key">
                      <div v-if="key !== 'category'" class="col-6">
                        <div class="d-flex align-items-center">
                          <label :for="key" class="form-label mb-0 me-2 text-nowrap ms-11px">繪畫{{ value.name }}：</label>
                          <VField as="select" :name="key" :id="key" class="form-select">
                            <option value="" selected class="text-light-2">請選擇繪畫{{ value.name }}</option>
                            <option v-for="item in value.sub" :value="item">{{ item }}</option>
                          </VField>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 銷售資訊 -->
          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="prodData_sell_heading">
              <button class="accordion-button fs-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#prodData_sell" aria-expanded="false" aria-controls="prodData_sell">
                銷售資訊
              </button>
            </h2>
            <div id="prodData_sell" class="accordion-collapse collapse" aria-labelledby="prodData_sell_heading">
              <div class="accordion-body p-6">
                <div class="row gy-4">
                  <div class="col-6">
                    <div class="d-flex align-items-center">
                      <label for="origin_price" class="form-label mb-0 me-2 text-nowrap">
                        <span class="text-danger">* </span>原價：
                      </label>
                      <VField rules="required|min_value:0" type="number" name="origin_price" id="origin_price"
                              class="form-control d-inline-block flex-grow-1" placeholder="請輸入課程原價"
                              :class="{ 'is-invalid': errors['origin_price'] }"></VField>
                    </div>
                    <ErrorMessage name="origin_price" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                  </div>
                  <div class="col-6">
                    <div class="d-flex align-items-center">
                      <label for="unit" class="form-label mb-0 me-2 text-nowrap">
                        <span class="text-danger">* </span>單位：
                      </label>
                      <VField type="text" rules="required" name="unit" id="unit"
                              class="form-control d-inline-block flex-grow-1" placeholder="請輸入單位"
                              :class="{ 'is-invalid': errors['unit'] }"></VField>
                    </div>
                    <ErrorMessage name="unit" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                  </div>
                  <div class="col-6">
                    <div class="d-flex align-items-center">
                      <label for="price" class="form-label mb-0 me-2 text-nowrap">
                        <span class="text-danger">* </span>售價：
                      </label>
                      <VField type="number" rules="required|min_value:0" name="price" id="price"
                              class="form-control d-inline-block flex-grow-1" placeholder="請輸入課程售價"
                              :class="{ 'is-invalid': errors['price'] }"></VField>
                    </div>
                    <ErrorMessage name="price" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                  </div>
                  <div class="col-6">
                    <div class="d-flex align-items-center">
                      <label for="is_enabled" class="form-label mb-0 me-2 text-nowrap ms-11px">上架：</label>
                      <VField as="select" name="is_enabled" id="is_enabled" class="form-select">
                        <option value="1">是</option>
                        <option value="0" selected>否</option>
                      </VField>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 授課老師資料 -->
          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="prodData_teacher_heading">
              <button class="accordion-button fs-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#prodData_teacher" aria-expanded="false" aria-controls="prodData_teacher">
                授課老師資料
              </button>
            </h2>
            <div id="prodData_teacher" class="accordion-collapse collapse" aria-labelledby="prodData_teacher_heading">
              <div class="accordion-body p-6">
                <div class="row mb-4">
                  <div class="col-6">
                    <div class="d-flex align-items-center">
                      <label for="name" class="form-label mb-0 me-2 text-nowrap">
                        <span class="text-danger">* </span>老師名字：
                      </label>
                      <VField type="text" rules="required" name="teacher.name" id="name"
                              class="form-control d-inline-block flex-grow-1" placeholder="請輸入授課老師名字"
                              :class="{ 'is-invalid': errors['teacher.name'] }"></VField>
                    </div>
                    <ErrorMessage name="teacher.name" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                  </div>
                </div>
                <div class="d-flex">
                  <label for="brief" class="form-label mb-0 me-2 text-nowrap">
                    <span class="text-danger">* </span>老師簡介：
                  </label>
                  <VField as="textarea" rules="required" name="teacher.brief" id="brief" class="form-control"
                          placeholder="請輸入授課老師簡介" :class="{ 'is-invalid': errors['teacher.brief'] }"></VField>
                </div>
                <ErrorMessage name="teacher.brief" class="invalid-feedback d-block ms-11px"></ErrorMessage>
              </div>
            </div>
          </div>
          <!-- 課程簡介 -->
          <div class="accordion-item mb-3">
            <h2 class="accordion-header" id="prodData_intro_heading">
              <button class="accordion-button fs-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#prodData_intro" aria-expanded="false" aria-controls="prodData_intro">
                課程簡介
              </button>
            </h2>
            <div id="prodData_intro" class="accordion-collapse collapse" aria-labelledby="prodData_intro_heading">
              <div class="accordion-body p-6">
                <div class="mb-5">
                  <label for="willLearn" class="form-label me-2 text-nowrap d-block"
                          :class="errors['intro.willLearn'] ? 'mb-0' : 'mb-2' ">
                    <span class="text-danger">* </span>課程內容（將會學到）：
                  </label>
                  <ErrorMessage name="intro.willLearn" class="invalid-feedback d-block ms-11px mb-2"></ErrorMessage>
                  <VField as="textarea" rules="required" name="intro.willLearn" id="willLearn" class="form-control d-none"
                          v-model="editorWillLearnData"></VField>
                  <ckeditor :editor="editorWillLearn" v-model="editorWillLearnData" :config="editorConfig"
                            @blur.once="setFieldTouched('intro.willLearn', true)"></ckeditor>
                </div>
                <div>
                  <label for="preparation" class="form-label me-2 text-nowrap d-block"
                          :class="errors['intro.preparation'] ? 'mb-0' : 'mb-2' ">
                    <span class="text-danger">* </span>課前準備：
                  </label>
                  <ErrorMessage name="intro.preparation" class="invalid-feedback d-block ms-11px mb-2"></ErrorMessage>
                  <VField as="textarea" rules="required" name="intro.preparation" id="preparation" class="form-control d-none"
                          v-model="editorPreparationData"></VField>
                  <ckeditor :editor="editorPreparation" v-model="editorPreparationData" :config="editorConfig"
                            @blur.once="setFieldTouched('intro.preparation', true)"></ckeditor>
                </div>
              </div>
            </div>
          </div>
          <!-- 課程大綱 -->
          <div class="accordion-item mb-3 border-bottom">
            <h2 class="accordion-header" id="prodData_outline_heading">
              <button class="accordion-button fs-5 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#prodData_outline" aria-expanded="false" aria-controls="prodData_outline">
                課程大綱
              </button>
            </h2>
            <div id="prodData_outline" class="accordion-collapse collapse" aria-labelledby="prodData_outline_heading">
              <div class="accordion-body p-6">
                <VFieldArray name="outlines" v-slot="{ fields, push, remove }">
                  <template v-for="(entry, idx) in fields" :key="entry.key">
                    <div class="row gy-4 mb-4">
                      <div class="col-6">
                        <div class="mb-4">
                          <label :for="`outlines[${idx}].title`" class="form-label me-2 text-nowrap d-block">
                            <span class="text-danger">* </span>章節標題：
                          </label>
                          <VField type="text" class="form-control" placeholder="請輸入章節標題"
                                  rules="required" :name="`outlines[${idx}].title`" :id="`outlines[${idx}].title`"
                                  label="章節標題" :class="{ 'is-invalid': errors[`outlines[${idx}].title`] }"></VField>
                          <ErrorMessage :name="`outlines[${idx}].title`" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                        </div>
                        <div class="row">
                          <div class="col-6">
                            <label :for="`outlines[${idx}].lectures`" class="form-label me-2 text-nowrap d-block">
                              <span class="text-danger">* </span>單元數：
                            </label>
                            <VField type="number" class="form-control" placeholder="請輸入單元數"
                                    rules="required|min_value:1" :name="`outlines[${idx}].lectures`"
                                    :id="`outlines[${idx}].lectures`" :class="{ 'is-invalid': errors[`outlines[${idx}].lectures`] }"
                                    label="單元數"></VField>
                            <ErrorMessage :name="`outlines[${idx}].lectures`" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                          </div>
                          <div class="col-6">
                            <label :for="`outlines[${idx}].minutes`" class="form-label me-2 text-nowrap d-block">
                              <span class="text-danger">* </span>總時長（分鐘）：
                            </label>
                            <VField type="number" class="form-control" placeholder="請輸入總時長（分鐘）"
                                    rules="required|min_value:0" :name="`outlines[${idx}].minutes`"
                                    :id="`outlines[${idx}].minutes`" :class="{ 'is-invalid': errors[`outlines[${idx}].minutes`] }"
                                    label="總時長（分鐘）"></VField>
                            <ErrorMessage :name="`outlines[${idx}].minutes`" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                          </div>
                        </div>
                      </div>
                      <div class="col-6">
                        <div class="d-flex flex-column h-100">
                          <label :for="`outlines[${idx}].brief`" class="form-label me-2 text-nowrap">
                            <span class="text-danger">* </span>章節概述：
                          </label>
                          <VField as="textarea" class="form-control flex-grow-1" placeholder="請輸入關於此章節的內容概述"
                                  rules="required" :name="`outlines[${idx}].brief`" :id="`outlines[${idx}].brief`"
                                  label="章節概述" :class="{ 'is-invalid': errors[`outlines[${idx}].brief`] }"></VField>
                          <ErrorMessage :name="`outlines[${idx}].brief`" class="invalid-feedback d-block ms-11px"></ErrorMessage>
                        </div>
                      </div>
                    </div>
                    <button v-if="fields.length !== 1" type="button" class="btn btn-outline-danger d-block w-fit-content ms-auto"
                            @click="remove(idx)">移除章節</button>
                    <hr class="my-6">
                  </template>
                  <button type="button" class="btn btn-outline-secondary d-block w-100"
                          @click="push({})">新增章節</button>
                </VFieldArray>
              </div>
            </div>
          </div>
        </div>
        <!-- 完成操作 -->
        <div class="text-end">
          <button type="button" class="btn btn-outline-dark-3 me-2" @click="beforeCancel(meta.touched)">取消</button>
          <button type="submit" class="btn btn-primary">確認{{ updateId === 'new' ? '新增' : '編輯' }}</button>
        </div>
        <!-- 離開頁面確認 modal -->
        <ConfirmModal ref="ConfirmModal" v-bind="modalContent">
          <template #modal-content>
            <p class="mb-0">尚未儲存，<span class="text-danger">捨棄變更</span>嗎？</p>
          </template>
        </ConfirmModal>
      </VForm>
    </div>

  </div>
</template>

<script>
import { mapWritableState, mapState } from 'pinia';
import { useAdminProdStore } from '@/stores/adminProducts';
import { useCommonStore } from '@/stores/common';
import { FieldArray, Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { required, min_value } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ConfirmModal from '@/components/ConfirmModal.vue';
const { VITE_BASE, VITE_API } = import.meta.env;

defineRule('required', required);
defineRule('min_value', min_value);

configure({
  generateMessage: localize('zh_TW',{
    names: {
      title: '課程標題',
      imageUrl: '主要圖片',
      category: '繪畫媒材',
      origin_price: '原價',
      price: '售價',
      unit: '單位',
      'teacher.name': '老師名字',
      'teacher.brief': '老師簡介',
      'intro.willLearn': '課程內容',
      'intro.preparation': '課前準備',
      'outline.title': '章節標題',
      'outline.minutes': '總時長',
      'outline.lectures': '單元數',
      'outline.brief': '章節概述'
    },
    fields: {
      imageUrl: {
        required: '{field} 為必填（需上傳圖片）',
      },
      outlines: {
        required: '此為必填',
      }
    },
  }),
});

export default {
  props: ['updateId'],
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
    VFieldArray: FieldArray,
    ConfirmModal,
    ckeditor: CKEditor.component
  },
  data(){
    return {
      tempProduct: {},
      imgFile: {},
      previewImgUrl: '',
      uploadedImgUrl: '',
      imgUploading: false,
      imgOptionsShow: false,
      editorWillLearn: ClassicEditor,
      editorPreparation: ClassicEditor,
      editorWillLearnData: '',
      editorPreparationData: '',
      editorConfig: {
        toolbar: [
          'heading', '|',
          'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
          'undo', 'redo'
        ]
      },
      modalContent: {
        cancelBtnText: '繼續編輯',
        confirmBtnText: '捨棄'
      },
      discardEdit: false,
      productSaved: false,
    }
  },
  computed: {
    ...mapWritableState(useAdminProdStore, ['originTempProd']),
    ...mapState(useCommonStore, ['catagories']),
  },
  methods: {
    setInitialVal(){
      if(this.updateId === 'new'){
        this.tempProduct.unit = '門';
        this.tempProduct.is_enabled = 0;
        this.tempProduct.outlines = [{title: '', minutes: null, lectures: null, brief: ''}];
      } else {
        this.editorWillLearnData = this.tempProduct.intro?.willLearn;
        this.editorPreparationData = this.tempProduct.intro?.preparation;
        this.uploadedImgUrl = this.tempProduct.imageUrl;
      }
    },
    previewImg(e){
      this.imgFile = e.target.files[0];
      this.previewImgUrl = URL.createObjectURL(this.imgFile);
      this.$refs.imageUrl.setTouched(true)
    },
    removeImg(){
      this.imgFile = {};
      this.previewImgUrl = URL.revokeObjectURL(this.previewImgUrl);
      this.uploadedImgUrl = '';
      // 觸發欄位驗證
      this.$refs.imageUrl.handleChange(this.uploadedImgUrl, true)
      this.$refs.imageUrl.setTouched(true)
    },
    uploadImg(){
      this.imgUploading = true;

      const formData = new FormData();
      formData.append('file-to-upload', this.imgFile)
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/upload`;

      this.$http.post(url, formData).then(res => {
        this.imgFile = {};
        this.previewImgUrl = URL.revokeObjectURL(this.previewImgUrl);
        this.uploadedImgUrl = res.data.imageUrl;
        // 觸發欄位驗證
        this.$refs.imageUrl.handleChange(this.uploadedImgUrl, true)
        alert('圖片上傳成功')
      }).catch(err => {
        alert(`圖片上傳失敗，錯誤代碼：${err.response.status}`);
      }).finally(() => this.imgUploading = false)
    },
    valueProcessing(val){
      val.origin_price = Number(val.origin_price);
      val.price = Number(val.price);
      // 上架與否，轉數字 + 更新時間
      val.is_enabled = Number(val.is_enabled);
      if(val.is_enabled === 1 && !this.tempProduct.enabledTime){
        val.enabledTime = Number((Date.now()/1000).toFixed(0));
      } else if (val.is_enabled === 0) {
        val.enabledTime = 0
      }
      // 假定的售出數 100 ~ 999
      if(!val.classmates){ val.classmates = Math.floor(Math.random() * 900) + 100; }
      // 課程大綱資訊 轉數字 & 統計
      val.outlines_total = val.outlines.reduce((acc, cur) => {
        cur.minutes = Number(cur.minutes);
        cur.lectures = Number(cur.lectures);
        acc.minutes += cur.minutes;
        acc.lectures += cur.lectures;
        return acc;
      }, { outlines: val.outlines.length, minutes: 0, lectures: 0, });
      return val
    },
    onSubmit(values){
      const requestData = this.valueProcessing(values);
      const method = this.updateId === 'new' ? 'post' : 'put';
      const path = this.updateId === 'new' ? '' : this.updateId
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/product/${path}`;

      this.$http[method](url, {data: {...requestData}}).then(res => {
        alert(res.data.message);
        this.productSaved = true;
        method === 'post' ? location.reload() : this.$router.go(-1);
      }).catch(err => {
        alert(`新增商品失敗，錯誤代碼：${err.response.status}`);
      })
    },
    beforeCancel(formTouched){
      if(!this.productSaved && formTouched){
        this.$refs.ConfirmModal.openModal().then(res => {
          this.discardEdit = true;
          setTimeout(() => this.$router.push('/admin/products'), 500)
        }).catch(err => {
          this.discardEdit = false;
        })
      } else {
        this.discardEdit = true;
        this.$router.go(-1);
      }
    },
    handleBeforeUnload(e){
      const formTouched = this.$refs.VForm.getMeta().touched;
      if(!this.productSaved && formTouched){
        e.returnValue = '';
      }   
      localStorage.setItem('adminTempProd', JSON.stringify(this.originTempProd));
    }
  },
  async beforeRouteLeave () {
    const formTouched = this.$refs.VForm.getMeta().touched;
    if(!this.discardEdit && !this.productSaved && formTouched) {
      try {
        const response = await this.$refs.ConfirmModal.openModal();
        localStorage.removeItem('adminTempProd');
        window.removeEventListener('beforeunload', this.handleBeforeUnload)
        return true
      }
      catch (err){
        return false
      }
    } else {
      localStorage.removeItem('adminTempProd');
      window.removeEventListener('beforeunload', this.handleBeforeUnload)
    }
  },
  created(){
    const storedData = localStorage.getItem('adminTempProd');
    if(storedData){
      this.tempProduct = JSON.parse(storedData)
      this.originTempProd = this.tempProduct
    } else {
      this.tempProduct = {...this.originTempProd}
    }
    this.setInitialVal();
    window.addEventListener('beforeunload', this.handleBeforeUnload)
  },
}
</script>

<style scoped>
.ms-11px{
  margin-left: 11px;
}

.border-dashed{
  border-style: dashed !important;
}

.spinner::after {
  content: '';
  display: block;
  height: 30%;
  border: 5px solid white;
  border-right-color: transparent;
  border-radius: 50%;
  aspect-ratio: 1/1;
  animation: infinite spin .7s linear;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>