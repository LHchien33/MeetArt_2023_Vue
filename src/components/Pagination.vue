<template>
  <ul class="pagination mb-0">
    <li class="page-item" :class="{ 'disabled': !has_pre }">
      <RouterLink :to="{path: pathData.path, query: {...pathData.query, page: current_page - 1}}"
                  class="page-link border-0 h-100 px-2" :disabled="!has_pre">
        <span class="material-symbols-outlined align-middle">arrow_left</span>
      </RouterLink>
    </li>
    <li class="page-item" v-for="page in total_pages" :key="page">
      <RouterLink :to="{path: pathData.path, query: {...pathData.query, page: page}}"
                  class="page-link border-0 h-100">{{ page }}
      </RouterLink>
      <span class="gradient-line-4 d-block w-75 mx-auto" style="margin-top: -6px;"
            :class="{'gradient-line': current_page === page }"></span>
    </li>
    <li class="page-item" :class="{ 'disabled': !has_next }">
      <RouterLink :to="{path: pathData.path, query: {...pathData.query, page: current_page + 1}}"
                  class="page-link border-0 h-100 px-2" :disabled="!has_next">
        <span class="material-symbols-outlined align-middle">arrow_right</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: ['current_page', 'has_pre', 'has_next','total_pages', 'pathData'],
  components: {
    RouterLink
  },
}
</script>
