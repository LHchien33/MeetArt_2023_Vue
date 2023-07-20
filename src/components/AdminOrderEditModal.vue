<template>
  <VForm ref="orderEditForm" v-slot="{ errors }">
    <!-- 基本資訊 -->
    <div class="bg-beige p-5">
      <div class="row gy-5">
        <!-- 訂單資訊 -->
        <div class="col-md-6">
          <h2 class="fs-5 me-1 mb-3 pb-2 border-bottom">訂單資訊</h2>
          <ul class="list-unstyled mb-0">
            <li class="mb-2 row gx-1">
              <div class="col-auto">
                <p class="mb-0">訂單編號：</p>
              </div>
              <div class="col">
                <span class="me-1" style="word-break: break-all;">{{ tempData.id }}</span>
                <button type="button" @click="$emit('copyOrderId', tempData.id)" 
                        class="btn btn-sm btn-outline-secondary fs-8">複製</button>
              </div>
            </li>
            <li class="mb-3">訂單日期： {{ dateConverter(tempData.create_at * 1000, 'whole') }}</li>
            <li class="mb-3">付款方式：
              <VField name="user.payMethod" v-slot="{ value }"><span>{{ value }}</span></VField>
            </li>
            <li class="mb-3">付款狀態：
              <div class="form-check form-check-inline">
                <VField class="form-check-input" type="radio" name="is_paid" id="is_paid_false" value="false"></VField>
                <label class="form-check-label" for="is_paid_false">未付款</label>
              </div>
              <div class="form-check form-check-inline">
                <VField class="form-check-input" type="radio" name="is_paid" id="is_paid_true" value="true"></VField>
                <label class="form-check-label" for="is_paid_true">已付款</label>
              </div>
            </li>
            <li class="mb-3">申請輔導：
              <VField name="user.applyType" v-slot="{ value }">
                <span :class="{ 'text-accent': value }">{{ value ? '是' : '否' }}</span>
              </VField>
            </li>
            <VField name="user.order_completed" v-slot="{ field }">
              <li v-if="field.value">輔導狀態：
                <div class="form-check form-check-inline">
                  <input type="radio" v-bind="field" value="false" :checked="field.value === 'false'"
                          class="form-check-input" id="order_completed_false">
                  <label class="form-check-label" for="order_completed_false">未完成</label>
                </div>
                <div class="form-check form-check-inline">
                  <input type="radio" v-bind="field" value="true" :checked="field.value === 'true'"
                          class="form-check-input"  id="order_completed_true">
                  <label class="form-check-label" for="order_completed_true">已完成</label>
                </div>
              </li>
            </VField>
          </ul>
        </div>
        <!-- 個人資訊 -->
        <div class="col-md-6">
          <h2 class="fs-5 pb-2 border-bottom mb-3">個人資訊</h2>
          <ul class="list-unstyled mb-0">
            <li class="mb-3">
              <label for="user_name" class="form-label">姓名
                <span class="text-danger"> *</span>
                <ErrorMessage name="user.name" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
              </label>
              <VField type="text" rules="required" name="user.name" :class="{ 'is-invalid': errors.user?.name }"
                      class="form-control" id="user_name" placeholder="例如：王小明"></VField>
            </li>
            <li class="mb-3">
              <label for="user_email" class="form-label">電子信箱
                <span class="text-danger"> *</span>
                <ErrorMessage name="user.email" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
              </label>
              <VField type="text" rules="required|email" name="user.email" :class="{ 'is-invalid': errors.user?.email }"
                      class="form-control" id="user_email" placeholder="例如：example@email.com"></VField>
            </li>
            <li>
              <label for="user_tel" class="form-label">聯絡電話
                <span class="text-danger"> *</span>
                <ErrorMessage name="user.tel" class="invalid-feedback d-inline-block w-auto"></ErrorMessage>
              </label>
              <VField type="tel" rules="required|phoneNumber" name="user.tel" :class="{ 'is-invalid': errors.user?.tel }"
                      class="form-control" id="user_tel" placeholder="例如：0912-345678、03-123-4567"></VField>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </VForm>
</template>

<script>
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';
import { Field, Form, ErrorMessage, configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';

configure({
  generateMessage: localize('zh_TW',{
    names: {
      'user.name': '姓名',
      'user.email': '電子信箱',
      'user.tel': '聯絡電話'
    }
  })
});

export default {
  props: ['tempData'],
  emits: ['copyOrderId'],
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
  },
  data(){
    return {
      user: {}
    }
  },
  watch: {
    tempData(newVal, oldVal){
      this.$refs.orderEditForm.resetForm();
      const formVal = this.resetFormVal(newVal);
      this.$refs.orderEditForm.setValues(formVal)
    }
  },
  methods: {
    ...mapActions(useCommonStore, ['dateConverter']),
    resetFormVal(data){
      if(Object.keys(data).length === 0)
      return

      const { user } = data;
      const values = {
        is_paid: `${data.is_paid}`,
        user
      }

      if(user.applyType){
        values.user.order_completed = `${data.user.order_completed}`
      }

      return values
    }
  },
  
  mounted(){
    const formVal = this.resetFormVal(this.tempData);
    this.$refs.orderEditForm.setValues(formVal)
  }
}
</script>