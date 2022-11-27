<template>
	<div>
		<a-card>
			<h2>重置密码列表</h2>
			<a-divider />
			<div>
				<a-table
				bordered
				:pagination="false"
				:columns="columns"
				:data-source="list"
				>
					<template #bodyCell="{column, record}">
						<template v-if="column.dataIndex === 'option'">
							<a-button size="small" type="primary" @click="update(record._id,2)">重置</a-button>
							
							<a-button size="small" style="margin-left: 40px;" @click="update(record._id,3)">忽略</a-button>
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
	</div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
	@import './index.scss';
</style>