<template>
	<table>
		<thead>
			<th v-for="(name, index) in tableHeader" :key="index">
				{{ name }}
			</th>
		</thead>
		<tbody>
			<tr v-for="(row, index) in tableContent" :key="index">
				<td v-for="(cell, index) in row" :key="index">{{ cell }}</td>
			</tr>
		</tbody>
	</table>
</template>
<script setup>
import { watch, ref } from 'vue';

const props = defineProps(['data']);
const tableHeader = ref('');
const tableContent = ref([]);

watch(() => props.data, () => {
	const rows = props.data.Content.FormCSV.split('\n');
	tableHeader.value = rows.shift().split(',');
	tableContent.value = rows.map(i => i.split(','));
}, { immediate: true, deep: true });
</script>
