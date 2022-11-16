<template>
	<div>
		<a-modal
		:visible="props.show"
		title="添加书籍"
		ok-text="提交"
		cancel-text="取消"
		@ok="submit"
		@cancel="close">
		<a-form
		:label-col="{ span: 4 }"
    :wrapper-col="{ span: 10 }">
			<a-form-item label="书名">
				<a-input v-model:value="addForm.name" />
			</a-form-item>
			<a-form-item label="价格">
				<a-input-number v-model:value="addForm.price" :min="0" :max="999999" />
			</a-form-item>
			<a-form-item label="作者">
				<a-input v-model:value="addForm.author" />
			</a-form-item>
			<a-form-item label="出版日期">
				<a-date-picker v-model:value="addForm.publishDate" />
			</a-form-item>
			<a-form-item label="分类">
				<a-input v-model:value="addForm.classify" />
			</a-form-item>
		</a-form>
		</a-modal>
	</div>
</template>

<script src="./index.js"></script>