<template>
  <div ref="modal" class="modal fade" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-4">
            <span class="material-symbols-outlined text-primary align-bottom me-2">info</span>
            <slot name="modal-title">資訊</slot>
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body px-5 py-7">
          <slot name="modal-content"></slot>
        </div>
        <div class="modal-footer">
          <slot name="cancel-btn">
            <button type="button" class="btn btn-outline-dark-3" data-bs-dismiss="modal">關閉</button>
          </slot>
          <slot name="confirm-btn" :hideModal="hideModal">
            <button type="button" class="btn btn-primary">確定</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalMixin from '../mixins/ModalMixin.vue';

export default {
  mixins: [ModalMixin],
  data(){
    return {
      modal: {},
    }
  }
}

</script>