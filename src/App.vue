<template>
  <div class="grid">
    <a-tabs v-model:activeKey="activeTab">
      <a-tab-pane :key="1" tab="Info" />
      <a-tab-pane :key="0" tab="Event" />
    </a-tabs>
    <info-display :infos="infosOfType" class="info-display" />
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
import {
  Tabs as ATabs,
  TabPane as ATabPane,
} from 'ant-design-vue';
import InfoDisplay from './InfoDisplay.vue';

const infos = ref([]);
const activeTab = ref(1);
const infosOfType = computed(() => infos.value.filter(i => i.NoticeType === activeTab.value));

function getInfo() {
  fetch('/nte_info_cn.json')
    .then(r => r.json())
    .then(setInfo);
}
function setInfo(res) {
  infos.value = res;
}

onMounted(() => {
  getInfo();
});
</script>
<style scoped>
.grid {
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
  display: grid;
  grid-template-rows: 50px 1fr;
}
.info-display {
  height: calc(100vh - 50px);
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
}
</style>
