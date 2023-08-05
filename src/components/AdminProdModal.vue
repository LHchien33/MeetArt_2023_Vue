<template>
  <div class="bg-beige gradient-border gradient-border-3 p-6 mb-3 text-secondary">
    <div class="row position-relative" style="z-index: 2;">
      <div class="col">
        <p class="mb-0 text-nowrap">課程編號：
          <span class="user-select-all">{{ tempProd.id }}</span>
        </p>
      </div>
      <div class="col">
        <p class="mb-0 text-nowrap">已售出： {{ tempProd.classmates }}</p>
      </div>
    </div>
  </div>
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
          <div class="row">
            <div class="col-6">
              <div class="d-flex mb-4">
                <h3 class="fs-6 mb-0 me-2 text-nowrap">課程標題：</h3>
                <p class="mb-0">{{ tempProd.title }}</p>
              </div>
              <div class="d-flex mb-4">
                <h3 class="fs-6 mb-0 me-2 text-nowrap">繪畫媒材：</h3>
                <p class="mb-0">{{ tempProd.category }}</p>
              </div>
              <div class="d-flex mb-4">
                <h3 class="fs-6 mb-0 me-2 text-nowrap">繪畫主題：</h3>
                <p class="mb-0">
                  {{ tempProd.theme ? tempProd.theme : '--' }}
                </p>
              </div>
              <div class="d-flex mb-4">
                <h3 class="fs-6 mb-0 me-2 text-nowrap">繪畫風格：</h3>
                <p class="mb-0">
                  {{ tempProd.style ? tempProd.style : '--' }}
                </p>
              </div>
            </div>
            <div class="col-6">
              <h3 class="fs-6 mb-2 me-2 text-nowrap">主要圖片：</h3>
              <div class="border border-3 border-light-1" style="width: 240px; height: 160px;">
                <img :src="tempProd.imageUrl" class="w-100 h-100 object-fit-contain" alt="主要圖片">
              </div>
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
                <h3 class="fs-6 mb-0 me-2 text-nowrap">原價：</h3>
                <p class="mb-0">{{ numToPriceString(tempProd.origin_price) }}</p>
              </div>
            </div>
            <div class="col-6">
              <div class="d-flex align-items-center">
                <h3 class="fs-6 mb-0 me-2 text-nowrap">單位：</h3>
                <p class="mb-0">{{ tempProd.unit }}</p>
              </div>
            </div>
            <div class="col-6">
              <div class="d-flex align-items-center">
                <h3 class="fs-6 mb-0 me-2 text-nowrap">售價：</h3>
                <p class="mb-0">{{ numToPriceString(tempProd.price) }}</p>
              </div>
            </div>
            <div class="col-6">
              <div class="d-flex align-items-center">
                <h3 class="fs-6 mb-0 me-2 text-nowrap">上架：</h3>
                <p class="mb-0" :class="tempProd.is_enabled ? 'text-accent' : 'text-secondary'">
                  {{ tempProd.is_enabled ? '已上架' : '未上架' }}
                </p>
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
          <div class="d-flex align-items-center mb-4">
            <h3 class="fs-6 mb-0 me-2 text-nowrap">老師名字：</h3>
            <p class="mb-0">{{ tempProd.teacher?.name }}</p>
          </div>
          <div class="d-flex">
            <h3 class="fs-6 mb-0 me-2 text-nowrap">老師簡介：</h3>
            <p class="mb-0">{{ tempProd.teacher?.brief }}</p>
          </div>
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
            <h3 class="fs-6 mb-2 me-2 text-nowrap">課程內容（將會學到）：</h3>
            <div v-html="tempProd.intro?.willLearn" class="bg-white p-3 rounded-2"></div>
          </div>
          <div>
            <h3 class="fs-6 mb-2 me-2 text-nowrap">課前準備：</h3>
            <div  v-html="tempProd.intro?.preparation" class="bg-white p-3 rounded-2"></div>
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
          <div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" class="align-top">章節標題</th>
                  <th scope="col" class="text-center text-nowrap align-top">單元數</th>
                  <th scope="col" class="text-center text-nowrap align-top">
                    <p class="mb-0">總時長</p>
                    <span style="font-size: 12px;">（分鐘）</span>
                  </th>
                  <th scope="col" class="align-top w-50">章節概述</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in tempProd.outlines" :key="item.title">
                  <th scope="row" class="fw-normal">{{ item.title }}</th>
                  <td class="text-center">{{ item.lectures }}</td>
                  <td class="text-center">{{ item.minutes }}</td>
                  <td>{{ item.brief }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colspan="4" class="pt-6">總計：</th>
                </tr>
                <tr>
                  <td>{{ tempProd.outlines_total?.outlines }} 章節</td>
                  <td class="text-center">{{ tempProd.outlines_total?.lectures }} 單元</td>
                  <td class="text-center">{{ tempProd.outlines_total?.minutes }} 分鐘</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import { useCommonStore } from '@/stores/common';

export default {
  props: ['tempProd'],
  methods: {
    ...mapActions(useCommonStore, ['numToPriceString']),
  }
}
</script>