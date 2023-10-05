<template>
  <VForm ref="couponForm" v-slot="{ errors, values }" @submit="onSubmit" @invalid-submit="scrollErrorIntoView">
    <InfoModal ref="InfoModal">
      <template #modal-title>{{ tempData.id ? '編輯' : '新增' }}優惠券</template>
      <template #modal-content>
        <p v-if="tempData.id" class="text-secondary">優惠券編號： {{ tempData.id }}</p>
        <div class="row g-5">
          <div class="col-12">
            <label for="title" class="form-label">優惠名稱：</label>
            <VField type="text" rules="required" name="title" :disabled="disabled"
                    :class="{'is-invalid': errors.title }" id="title" class="form-control"></VField>
            <ErrorMessage name="title" class="invalid-feedback d-block"></ErrorMessage>
          </div>
          <div class="col-6">
            <label for="code" class="form-label">折扣碼：</label>
            <VField type="text" rules="required" name="code" :disabled="disabled"
                    :class="{'is-invalid': errors.code }" id="code" class="form-control"></VField>
            <ErrorMessage name="code" class="invalid-feedback d-block"></ErrorMessage>
          </div>
          <div class="col-6">
            <label for="percent" class="form-label">折數（%）：</label>
            <VField type="number" rules="required|min_value:0|max_value:100" name="percent" :disabled="disabled"
                    :class="{'is-invalid': errors.percent }" id="percent" class="form-control"></VField>
            <ErrorMessage name="percent" class="invalid-feedback d-block"></ErrorMessage>
          </div>
          <div class="col-12">
            <label for="due_date" class="form-label">到期日：</label>
            <VField type="text" v-model="date" rules="required" name="due_date" id="due_date" class="form-control d-none"></VField>
            <DatePicker v-model="date" :disabled="disabled" model-type="timestamp" :format="'yyyy/MM/dd HH:mm:ss'"
                        :min-date="new Date()" prevent-min-max-navigation :flow="['calendar', 'time']"
                        week-start="0" hide-input-icon enable-seconds :month-change-on-scroll="false"
                        locale="zh-TW" cancel-text="取消" select-text="確定"
                        position="left" :auto-position="false" :offset="20"
                        placeholder="請選擇日期與時間"
                        :class="{'is-invalid': errors.due_date }" class="form-control"></DatePicker>
            <ErrorMessage name="due_date" class="invalid-feedback d-block"></ErrorMessage>
          </div>
          <div class="col-12">
            <div class="form-check form-switch">
              <VField type="checkbox" name="is_enabled" :disabled="disabled" value="1" id="is_enabled" class="form-check-input"></VField>
              <label for="is_enabled" class="form-check-label">{{ values.is_enabled === '1' ? '啟用' : '未啟用' }}</label>
            </div>
          </div>
        </div>
      </template>
      <template #cancel-btn>
        <button type="button" class="btn btn-outline-dark-3" data-bs-dismiss="modal" :class="{'disabled': disabled}">取消</button>
      </template>
      <template #confirm-btn>
        <button type="submit" :class="{'disabled': disabled}" class="btn btn-primary">
          <span :class="{'spinner-border': disabled}" class="spinner-border-sm"></span>
          {{ tempData.id ? '儲存編輯' : '確定新增' }}
        </button>
      </template>
    </InfoModal>
  </VForm>
</template>

<script>
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
import InfoModal from '@/components/InfoModal.vue';
import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate';
import { max_value } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const { VITE_BASE, VITE_API } = import.meta.env;

defineRule('max_value', max_value);

configure({
  generateMessage: localize('zh_TW',{
    names: {
      title: '優惠名稱',
      code: '折扣碼',
      percent: '折數',
      due_date: '到期日'
    }
  }),
});

export default {
  props: ['tempData'],
  emits: ['getCoupons'],
  components: {
    InfoModal,
    VForm: Form,
    VField: Field,
    ErrorMessage,
    DatePicker: VueDatePicker
  },
  data(){
    return {
      date: null,
      disabled: false
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['scrollErrorIntoView']),
    async onSubmit(values){
      this.disabled = true;
      const method = values.id ? 'put' : 'post';
      const url = `${VITE_BASE}/v2/api/${VITE_API}/admin/coupon/${values.id || ''}`;
      // 整理資料
      values.percent = parseInt(values.percent);
      values.is_enabled = values.is_enabled ? parseInt(values.is_enabled) : 0;
      values.due_date = values.due_date/1000;
      try {
        await this.$http[method](url, {data: {...values}});
        this.$emit('getCoupons');
        this.$refs.InfoModal.hideModal();
        this.$toast({toastType: 'success'}).fire({ title: `已${values.id ? '更新' : '新增'}優惠券` });
      } catch (err) {
        this.$toast({toastType: 'failed'}).fire({
          title: `無法更新優惠券，錯誤代碼：${err.response?.status}`
        })
      } finally {
        this.disabled = false;
      }
    }
  },
  beforeUpdate(){
    if(this.tempData.is_enabled !== undefined){
      this.tempData.is_enabled += ''
    }
    if(this.tempData.due_date){
      this.tempData.due_date = this.tempData.due_date * 1000;
    }
    this.$refs.couponForm.resetForm({values: {...this.tempData}});
  }
}
</script>

<style>
.dp__input{
  line-height: 1;
  border: 0px;
  padding: 0px;
}

.dp__action_buttons{
  flex: unset;
}
</style>