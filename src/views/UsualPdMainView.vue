<template>
  <!-- (行動版) 圖片下方資訊欄 -->
  <div class="p-6 bg-white bg-opacity-75 mb-4 d-lg-none">
    <UsualProductInfo></UsualProductInfo>
  </div>
  <!-- 簡介、大綱、常見問題頁籤 -->
  <div class="bg-white bg-opacity-75">
    <ul class="py-3 px-8 nav">
      <li class="nav-item">
        <button type="button" class="btn btn-link text-decoration-none tab-color"
                :class="{'text-dark-1': currentTab === 'brief'}" @click="currentTab = 'brief'">課程簡介
          <span :class="{'w-0': currentTab !== 'brief'}" class="gradient-line gradient-line-8 d-block mt-n2"></span>
        </button>
      </li>
      <li class="nav-item">
        <button type="button" class="btn btn-link text-decoration-none tab-color"
                :class="{'text-dark-1': currentTab === 'outlines'}" @click="currentTab = 'outlines'">課程章節
          <span :class="{'w-0': currentTab !== 'outlines'}" class="gradient-line gradient-line-8 d-block mt-n2"></span>
        </button>
      </li>
      <li class="nav-item">
        <button type="button" class="btn btn-link text-decoration-none tab-color"
                :class="{'text-dark-1': currentTab === 'QA'}" @click="currentTab = 'QA'">常見問題
          <span :class="{'w-0': currentTab !== 'QA'}" class="gradient-line gradient-line-8 d-block mt-n2"></span>
        </button>
      </li>
    </ul>
    <hr class="m-0">
  </div>
  <!-- 主要內容 -->
  <div class="p-8 bg-white bg-opacity-75">
    <template v-if="currentTab === 'brief'">
      <div class="mb-9">
        <div class="d-flex mb-3">
          <div class="bg-gradient me-3" style="width: 4px;"></div>
          <h2 class="fw-bold fs-5 mb-1">這門課你將會學到：</h2>
        </div>
        <p v-html="currentPd.intro?.willLearn" class="list-space-sm"></p>
      </div>
      <div class="mb-9">
        <div class="d-flex mb-3">
          <div class="bg-gradient me-3" style="width: 4px;"></div>
          <h2 class="fw-bold fs-5 mb-1">課前準備：</h2>
        </div>
        <p v-html="currentPd.intro?.preparation" class="list-space-sm"></p>
      </div>
      <div>
        <div class="d-flex mb-3">
          <div class="bg-gradient me-3" style="width: 4px;"></div>
          <h2 class="fw-bold fs-5 mb-1">關於老師：</h2>
        </div>
        <div class="d-flex">
          <img class="rounded-circle me-3 align-self-start" src="../assets/images/teacher_avatar.jpg" alt="老師大頭照"
                style="max-width: 60px;">
          <div>
            <p class="mb-1 fw-semibold">{{ currentPd.teacher?.name }}</p>
            <p class="mb-2 fs-7">{{ currentPd.teacher?.brief }}</p>
            <a class="d-inline-block me-2">
              <img src="../assets/images/facebook.svg" alt="" style="width: 20px;">
            </a>
            <a class="d-inline-block">
              <img src="../assets/images/instagram.svg" alt="" style="width: 20px;">
            </a>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="currentTab === 'outlines'">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">章節名稱</th>
            <th scope="col" class="w-50">概述</th>
            <th scope="col" class="text-nowrap text-center">分鐘</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in currentPd.outlines" :key="item.title">
            <th scope="row">{{ item.title }}</th>
            <td>{{ item.brief }}</td>
            <td class="text-center">{{ item.minutes }}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else-if="currentTab === 'QA'">
      <ol class="list-space-lg">
        <li v-for="q in commonQuestions" :key="q.question">
          <h4 class="fs-6 fw-bold" v-html="q.question"></h4>
          <div v-html="q.answer" class="list-space-sm"></div>
        </li>
      </ol>
    </template>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useProdStore } from '@/stores/product';
import UsualProductInfo from '@/components/UsualProductInfo.vue';

export default {
  components: {
    UsualProductInfo
  },
  computed: {
    ...mapState(useProdStore, ['currentPd']),
  },
  watch: {
    "currentPd.id"(){
      this.currentTab = 'brief'
    }
  },
  data(){
    return {
      currentTab: 'brief',
      commonQuestions: [
        {
          question: '如何觀看已購買的影音課程？',
          answer: '<p>MeetArt 提供專屬的課程平台，可以由購買後的課程開通 email 前往。</p>'
        },
        {
          question: '影音課程是否有時效性呢？',
          answer: '<p>無時效性，同學擁有永久觀看的權利，敬請放心。</p>'
        },
        {
          question: '購買的課程包含哪些服務呢？',
          answer: '<p>包含「永久觀看」、「課程問題發問」及「作業批改」等三項。</p>'
        },
        {
          question: '課程中有包含「課外輔導」嗎？',
          answer: '<p>課外輔導為額外的作品輔導，當同學有課程作業以外的作品想要尋求老師的建議與批註，可依據需求購買，詳細內容請至 <a href="#">課外輔導頁面</a> 了解。</p>'
        },
        {
          question: '課程購買後可以退費嗎？如何申請？',
          answer: '<ul class="mb-4"><li>購買 7 日內未觀看任一付費單元，退還 100% 課程費用。</li><li>購買 8 - 14 日內未觀看任一付費單元，退還 30% 課程費用。</li><li>購買第 15 日起，恕不提供退費。</li></ul><p class="mb-2">※ 如欲申請退費請來信 <a href="#">MeetArt 客服信箱</a> 說明原因，信件內容應包含以下：</p><ul><li>使用者帳號</li><li>課程名稱</li><li>退款原因</li></ul>'
        }
      ]
    }
  }
}
</script>