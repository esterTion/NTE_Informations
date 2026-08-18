<template>
  <info-display :infos="infos" class="info-display" />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import InfoDisplay from './InfoDisplay.vue';

const infos = ref([]);

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
.info-display {
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
}
</style>
