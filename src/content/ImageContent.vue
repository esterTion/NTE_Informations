<template>
	<a-spin :spinning="loading">
		<img :src="imgUrl" style="max-width: 100%" @load="load" @error="load"/>
	</a-spin>
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import { Spin as ASpin } from 'ant-design-vue';

const props = defineProps(['data']);
const loading = ref(true);
const imgUrl = computed(() => props.data.Content.ImgUrl);

function load() {
	loading.value = false;
}

watch(imgUrl, () => {
	loading.value = true;
});
</script>
