<template>
  <RouterView :allProducts="allProducts" :prodError="prodError"></RouterView>
</template>

<script>
import { RouterView } from 'vue-router';
import { mapState, mapActions } from 'pinia';
import { useAdminProdStore } from '@/stores/adminProducts';

export default {
  data(){
    return {
      prodError: null
    }
  },
  components: {
    RouterView
  },
  computed: {
    ...mapState(useAdminProdStore, ['allProducts']),
  },
  methods: {
    ...mapActions(useAdminProdStore, ['getAllProducts']),
  },
  async mounted(){
    try {
      await this.getAllProducts()
    } catch (err) {
      this.prodError = err
    }
  }
}
</script>