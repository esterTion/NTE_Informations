<template>
	<a :href="props.data.Content.Hyperlink" target="_blank" referrerpolicy="no-referrer">
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
	width: calc(100% - 20px);
	padding: 8px 10px;
	margin: 5px 0;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #f5f5f5;
	cursor: pointer;
	text-align: center;
}
</style>
