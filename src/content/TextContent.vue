<template>
	<div class="text-content">
		<template v-for="(part, index) in textParts" :key="index">
			<template v-if="part.tag === StringType">{{ part.text }}</template>
			<span v-else-if="part.tag === 'bold'" class="bold">{{ part.text }}</span>
			<span v-else-if="part.tag === 'red'" class="red">{{ part.text }}</span>
			<span v-else-if="part.tag === 'subtitle'" class="subtitle">{{ part.text }}</span>
			<span v-else>{{ `<${part.tag}>` + part.text }}</span>
		</template>
	</div>
</template>
<script setup>
import { watch, ref } from 'vue';

const props = defineProps(['data']);
const textParts = ref([]);
const StringType = Symbol('StringType');

watch(() => props.data, () => {
	const sep = `||${Math.random()}||`;
	const text = props.data.Content.DisplayText
		.replace(/(<\w+>)/g, sep+'$1')
		.replace(/<\/>/g, sep);
	textParts.value = text.split(sep).map(i => {
		if (i[0] !== '<') return { tag: StringType, text: i };
		const tagIdx = i.indexOf('>');
		const tag = i.slice(1, tagIdx).toLowerCase();
		return { tag, text: i.slice(tagIdx + 1) };
	});
}, { immediate: true, deep: true });
</script>
<style scoped>
.text-content {
	white-space: pre-wrap;
}
.bold {
	font-weight: bold;
}
.red {
	color: red;
}
.subtitle {
	font-size: 1.4em;
}
</style>
