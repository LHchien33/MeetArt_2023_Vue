<template>
  <p>{{ updateId }}這是新增/編輯文章頁面</p>
</template>

<script>
export default {
  props: ['updateId'],
  mounted(){
    console.log(this.updateId);
    
  }
}

</script>