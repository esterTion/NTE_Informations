<template>
  <div class="grid">
    <a-tabs v-model:activeKey="server">
      <a-tab-pane key="cn" tab="CN" />
      <a-tab-pane key="global" tab="Global" />
    </a-tabs>
    <a-tabs v-model:activeKey="activeTab">
      <a-tab-pane :key="1" tab="Info" />
      <a-tab-pane :key="0" tab="Event" />
    </a-tabs>
    <info-display :infos="infosOfType" class="info-display" />
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import {
  Tabs as ATabs,
  TabPane as ATabPane,
} from 'ant-design-vue';
import InfoDisplay from './InfoDisplay.vue';

const server = ref('cn');
const infos = ref([]);
const activeTab = ref(1);
const infosOfType = computed(() => infos.value.filter(i => i.NoticeType === activeTab.value));

let fetchAbrt;
function getInfo(server) {
  if (fetchAbrt) {
		fetchAbrt.abort();
	}
  fetchAbrt = new AbortController();
  fetch(`/nte_info_${server}.json`, { signal: fetchAbrt.signal })
    .then(r => r.json())
    .then(setInfo);
}
function setInfo(res) {
  infos.value = res;
}

watch(server, (s) => getInfo(s), { immediate: true });
</script>
<style scoped>
.grid {
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
  display: grid;
  grid-template-rows: 50px 50px 1fr;
}
.info-display {
  height: calc(100vh - 100px);
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
}
</style>
