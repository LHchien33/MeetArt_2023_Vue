<template>
  <div class="bg-beige p-5">
    <div class="row gy-0">
      <div class="col-lg-8">
        <div class="mb-2">
          <p class="d-inline-block mb-0" style="word-break: break-all;">
            編號：<span class="user-select-all">{{ data.id }}</span><span @click="$emit('copyArticleId', data.id)"
            class="ms-1 btn btn-sm btn-outline-secondary fs-8">複製</span>
          </p>
        </div>
        <p class="mb-3">文章標題：{{ data.title }}</p>
        <p class="mb-3">新增時間：{{ dateConverter(data.create_at*1000, 'whole') }}</p>
        <p class="mb-3">作者：{{ data.author }}</p>
        <p class="mb-3">是否公開：
          <span :class="data.isPublic ? 'text-accent': 'text-muted'">{{ data.isPublic ? '公開' : '不公開' }}</span>
        </p>
        <div class="mb-3">
          <p class="mb-0 d-inline-block">標籤：</p>
          <ul class="list-unstyled d-inline-block mb-0">
            <li v-for="tag in data.tag" :key="tag" class="d-inline-block mx-1">
              <span class="badge border border-primary bg-transparent text-primary fw-normal">{{ tag }}</span>
            </li>
          </ul>
        </div>    
      </div>
      <div class="col-lg-4">
        <p class="mb-1">主要圖片：</p>
        <img :src="data.image" :alt="data.title" class="w-100 mb-3">
      </div>
    </div>
    <div class="mb-3">
      <p class="mb-1">內容描述：</p>
      <p class="mb-0 border rounded-3 p-3 bg-white bg-opacity-75 fs-7">{{ data.description }}</p>
    </div>
    <div>
      <p class="mb-1">相關課程：</p>
      <div class="border rounded-3 p-3 bg-white bg-opacity-75 fs-7">
        <p v-if="prodErrorMsg" class="mb-0">{{ prodErrorMsg }}</p>
        <template v-else>
          <div class="row gx-1 gx-md-6 text-muted">
            <div class="col-auto col-md-6">課程編號</div>
            <div class="col-auto d-md-none">/</div>
            <div class="col-auto col-md-6">課程名稱</div>
          </div>
          <ul class="list-unstyled mb-0">
            <li v-for="(item) in data.relatedCourseInfo" :key="item.id">
              <hr class="my-1">
              <div class="row">
                <div class="col-md-6">{{ item.id }}</div>
                <div class="col-md-6">{{ item.title }}</div>
              </div>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';

export default {
  props: ['data', 'prodErrorMsg'],
  methods: {
    ...mapActions(useCommonStore, ['dateConverter']),
  }
}


</script>