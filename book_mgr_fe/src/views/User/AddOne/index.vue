<template>
	<div>
		<a-modal
		:visible="props.show"
		title="添加一个用户"
		ok-text="提交"
		cancel-text="取消"
		@ok="submit"
		@cancel="close">
		<a-form
		:label-col="{ span: 4 }"
    :wrapper-col="{ span: 10 }">
			<a-form-item label="账户">
				<a-input v-model:value="addForm.account" />
			</a-form-item>
			<a-form-item label="密码">
				<a-input v-model:value="addForm.password" placeholder="默认密码 123456 " />
			</a-form-item>
		</a-form>
		</a-modal>
	</div>
</template>

<script src="./index.js"></script>