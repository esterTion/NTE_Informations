<template>
	<div v-html="convertedText" class="text-content"></div>
</template>
<script setup>
import { watch, ref } from 'vue';

const props = defineProps(['data']);
const convertedText = ref('');

watch(() => props.data, () => {
	convertedText.value = props.data.Content.DisplayText
		.replace(/<(\w+)>/g, '<span class="$1">')
		.replace(/<\/>/g, '</span>');
}, { immediate: true, deep: true });
</script>
<style>
.text-content {
	white-space: pre-wrap;
}
.bold {
	font-weight: bold;
}
.red {
	color: red;
}
</style>
