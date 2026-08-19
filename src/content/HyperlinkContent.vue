<template>
	<a :href="props.data.Content.Hyperlink">
		<div class="link-button">
			{{ props.data.Content.DisplayText }}
		</div>
	</a>
</template>
<script setup>
const props = defineProps(['data']);
</script>
<style scoped>
.link-button {
	width: calc(100% - 18px);
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #f5f5f5;
	cursor: pointer;
	text-align: center;
}
</style>
