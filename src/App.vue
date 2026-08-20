<template>
  <div class="grid">
    <a-tabs v-model:activeKey="server" :tabBarStyle="{ padding: '0 10px' }">
      <a-tab-pane key="cn" tab="CN" />
      <a-tab-pane key="global" tab="Global(ZH)" />
      <a-tab-pane key="global_en" tab="Global(EN)" />
      <a-tab-pane key="global_ja" tab="Global(JA)" />
    </a-tabs>
    <a-spin :spinning="loading">
      <a-tabs v-model:activeKey="activeTab" :tabBarStyle="{ padding: '0 10px' }">
        <a-tab-pane :key="1" tab="Info" />
        <a-tab-pane :key="0" tab="Event" />
      </a-tabs>
      <info-display :infos="infosOfType" class="info-display" />
    </a-spin>
  </div>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import {
  Tabs as ATabs,
  TabPane as ATabPane,
  Spin as ASpin,
} from 'ant-design-vue';
import InfoDisplay from './InfoDisplay.vue';

const loading = ref(false);
const server = ref('cn');
const infos = ref([]);
const activeTab = ref(1);
const infosOfType = computed(() => infos.value.filter(i => i.NoticeType === activeTab.value));

let fetchAbrt;
function getInfo(server) {
  if (fetchAbrt) {
		fetchAbrt.abort();
	}
  loading.value = true;
  fetchAbrt = new AbortController();
  fetch(`/nte_info_${server}.json?t=${Date.now()}`, { signal: fetchAbrt.signal })
    .then(r => r.json())
    .then(setInfo);
}
function setInfo(res) {
  infos.value = res;
  loading.value = false;
}

watch(server, (s) => getInfo(s), { immediate: true });
</script>
<style scoped>
.grid {
  max-width: 800px;
  margin: 0 auto;
  height: 100dvh;
  display: grid;
  grid-template-rows: 50px 50px 1fr;
}
.info-display {
  height: calc(100dvh - 120px);
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
}
</style>
