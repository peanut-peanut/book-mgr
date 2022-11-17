<template>
	<div>
		<a-card>
			<h2>图书列表</h2>
			<a-divider />
			<space-between>
				<div class="search">
					<a-input-search
						v-model:value="keyword"
						placeholder="输入书名关键词"
						enter-button="搜索"
						@search="onSearch"
						/>
						<a v-show="status" href="javascript:;" @click="clear">清空</a>
				</div>
				<a-button @click="show = true">添加一条</a-button>
			</space-between>
			<a-divider />
			<a-table
			:columns="columns"
			:data-source="list"
			:pagination="false">
				<template #bodyCell="{column, record}">
					<template v-if="column.dataIndex === 'publishDate'">
						{{formatTimeDate(record.publishDate)}}
					</template>
				</template>
			</a-table>
			<space-between style="margin-top: 20px;">
				<div></div>
				<a-pagination
				v-model:current="curPage"
				:pageSize="5"
				:total="total"
				@change="setPage"/>
			</space-between>
		</a-card>
		<add-one v-model:show="show"/>
	</div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
	@import './index.scss';
</style>