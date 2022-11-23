<template>
	<div>
	<a-card v-only-admin>
		<h2>用户列表</h2>
		<a-divider />
		<space-between>
			<div class="search">
				<a-input-search
					v-model:value="keyword"
					placeholder="输入账户搜索"
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
				<template v-if="column.dataIndex === 'character'">
					<a href="javascript:;" @click="edit(record)"><edit-outlined /></a>
					{{getCharacterInfoById(record.character).title}}
				</template>
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
	<a-modal
		v-model:visible="showUpdateCharacterModal"
		title="修改用户角色"
		ok-text="提交"
		cancel-text="取消"
		@ok="submit"
		@cancel="close">
		<a-form
		:label-col="{ span: 4 }"
    :wrapper-col="{ span: 10 }">
			<a-form-item label="角色">
				<a-select
				ref="select"
				v-model:value="updateForm.character"
				style="width: 120px">
					<a-select-option
						v-for="item in characterInfo"
						:key="item._id"
						:id="item._id"
						>{{item.title}}
					</a-select-option>
				</a-select>
			</a-form-item>
		</a-form>
	</a-modal>
</div>
</template>

<script src="./index.js"></script>
<style lang="scss">
	@import './index.scss';
</style>