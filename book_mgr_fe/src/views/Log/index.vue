<template>
	<div>
		<a-spin :spinning="loading">
			<a-card v-only-admin>
				<h2>操作日志</h2>
				<a-divider />
				<div>
					<a-table
					bordered
					:columns="columns"
					:data-source="list"
					:pagination="false"
					>
					<template #bodyCell="{column, record}">
						<template v-if="column.dataIndex === 'createdAt'">
							{{formatFullTimeDate(record.meta.createdAt)}}
						</template>
						<template v-if="column.dataIndex === 'option'">
							<a href="javascript:;" @click="remove(record)">删除</a>
						</template>
					</template>
					</a-table>
				</div>
				<flex-end style="margin-top: 20px;">
					<a-pagination
					v-model:current="curPage"
					:pageSize="10"
					:total="total"
					@change="setPage"/>
				</flex-end>
			</a-card>
		</a-spin>
	</div>
</template>
<script src="./index.js"></script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
