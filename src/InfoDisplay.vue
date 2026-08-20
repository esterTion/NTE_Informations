<template>
  <a-row>
    <a-col :xs="10" :sm="8" :md="6" class="scroll">
      <a-list :data-source="infoList" class="info-list">
				<template #renderItem="{ item }">
					<a-list-item class="info-title-item" :class="{ selected: item.selected }"
						@click="selectInfo(item)"
					>
						{{ item.NoticeTitle }}
					</a-list-item>
				</template>
			</a-list>
    </a-col>
    <a-col :xs="14" :sm="16" :md="18" tyle="padding: 5px" class="scroll">
			<template v-for="(item, index) in infoContent" :key="index">
				<component :is="item[0]" :data="item[1]" />
			</template>
    </a-col>
  </a-row>
</template>
<script setup>
import { markRaw, ref, watch } from 'vue';
import {
  Row as ARow,
  Col as ACol,
  List as AList,
  ListItem as AListItem,
} from 'ant-design-vue';

import ImageContent from './content/ImageContent.vue';
import TextContent from './content/TextContent.vue';
import FormContent from './content/FormContent.vue';
import HyperlinkButton from './content/HyperlinkContent.vue';
import UnknownContent from './content/UnknownContent.vue';

const props = defineProps(['infos']);

const infoList = ref([]);
const infoContent = ref('');

function selectInfo(item) {
	infoList.value.forEach(i => {
		if (i.selected) {
			i.selected = false;
		}
	});
	if (!item) return;
	item.selected = true;

	infoContent.value = item.NoticeContent.map(i => {
		switch (i.Type) {
			case 'Image': {
				return [markRaw(ImageContent), i];
			} // case
			case 'Text': {
				return [markRaw(TextContent), i];
			} // case
			case 'Form': {
				return [markRaw(FormContent), i];
			} // case
			case 'HyperlinkButton': {
				return [markRaw(HyperlinkButton), i];
			}
		}
		return [markRaw(UnknownContent), i];
	});
}

watch(() => props.infos, () => {
	infoList.value = props.infos;
	selectInfo(infoList.value[0]);
}, { immediate: true });
</script>
<style scoped>
.info-list {
	border-right: 1px solid #c8c8c8;
}
.scroll {
	height: 100%;
	overflow: hidden auto;
}
.info-title-item {
	cursor: pointer;
	transition: background-color 0.3s;
}
.info-title-item:hover, .info-title-item.selected {
	background-color: #e5e5e5;
}
</style>
