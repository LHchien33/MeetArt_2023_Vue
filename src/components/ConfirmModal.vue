<template>
  <div ref="modal" class="modal fade"  data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-4">
              <span class="material-symbols-outlined text-warning align-bottom me-2">
                warning</span>{{ title ? title : '提醒'}}
            </h1>
            <button type="button" class="btn-close" @click="response(false)" aria-label="Close"></button>
          </div>
          <div class="modal-body px-5 py-7">
            <p class="mb-0">{{ details ? details : '確定執行這項操作嗎？'}}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-dark-3" @click="response(false)">
              {{ cancelBtnText ? cancelBtnText : '取消'}}
            </button>
            <button type="button" class="btn btn-warning" @click="response(true)">
              {{ confirmBtnText ? confirmBtnText : '確定'}}
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ModalMixin from '../mixins/ModalMixin.vue';

export default {
  props: ['title', 'details', 'cancelBtnText', 'confirmBtnText'],
  mixins: [ModalMixin],
  data(){
    return {
      modal: {},
      resolve: null,
      reject: null
    }
  },
  methods: {
    openModal(){
      this.modal.show();
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    response(res){
      if(res){
        this.resolve(res)
      } else {
        this.reject(res)
      }
    }
  }
}

</script>