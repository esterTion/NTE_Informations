<template>
	<div>
		{{ JSON.stringify(props.data) }}
	</div>
</template>
<script setup>
const props = defineProps(['data']);
</script>
