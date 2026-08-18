<template>
	<img :src="props.data.Content.ImgUrl" style="max-width: 100%" />
</template>
<script setup>
const props = defineProps(['data']);
</script>
