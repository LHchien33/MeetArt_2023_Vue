<template>
  <ul class="pagination mb-0">
    <li class="page-item" :class="{ 'disabled': !has_pre }">
      <button type="button" class="page-link border-0 h-100 px-2" :disabled="!has_pre"
              @click="changePage(current_page - 1)">
        <span class="material-symbols-outlined align-middle">arrow_left</span>
      </button>
    </li>
    <li class="page-item" v-for="page in total_pages" :key="page">
      <button type="button" class="page-link border-0 h-100"
              @click="changePage(page)">{{ page }}</button>
      <span class="gradient-line-4 d-block w-75 mx-auto" style="margin-top: -6px;"
            :class="{'gradient-line': current_page === page }"></span>
    </li>
    <li class="page-item" :class="{ 'disabled': !has_next }">
      <button type="button" class="page-link border-0 h-100 px-2" :disabled="!has_next"
              @click="changePage(current_page + 1)">
        <span class="material-symbols-outlined align-middle">arrow_right</span>
      </button>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['current_page', 'has_pre', 'has_next','total_pages'],
  emits: ['changePage'],
  methods: {
    changePage(pageNum){
      if (pageNum === this.current_page){
        return
      }
      this.$emit('changePage', pageNum)
    }
  }
}
</script>
