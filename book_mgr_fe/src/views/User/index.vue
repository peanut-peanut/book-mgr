<template>
	<div>
	<a-card>
		<h2>用户管理</h2>
		<a-divider />
		<space-between>
			<div class="search">
				<a-input-search
					v-model:value="keyword"
					placeholder="输入账户"
					enter-button="搜索"
					@search="onSearch"
					/>
					<a v-show="status" href="javascript:;" @click="clear">清空</a>
			</div>
			<a-button size="middle" @click="show = true">添加用户</a-button>
		</space-between>
		<a-divider />
		<div>
			<a-table
			bordered
			:columns="columns"
			:data-source="userList"
			:pagination="false"
			>
			<template #bodyCell="{column, record}">
				<template v-if="column.dataIndex === 'createdAt'">
					{{formatFullTimeDate(record.meta.createdAt)}}
				</template>
				<template v-if="column.dataIndex === 'updatedAt'">
					{{formatFullTimeDate(record.meta.updatedAt)}}
				</template>
				<template v-if="column.dataIndex === 'option'">
					<a href="javascript:;" @click="resetPassword(record)">重置密码&emsp;&emsp;</a>
					<a href="javascript:;" @click="remove(record)">删除</a>
				</template>
			</template>
			</a-table>
		</div>
		<flex-end style="margin-top: 20px;">
			<a-pagination
			v-model:current="curUserPage"
			:pageSize="5"
			:total="totalUser"
			@change="setPage"/>
		</flex-end>
	</a-card>
	<add-one v-model:show="show" @update="updateAddUser"/>
</div>
</template>

<script src="./index.js"></script>
<style lang="scss">
	@import './index.scss';
</style>