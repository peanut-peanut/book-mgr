<template>
	<div>
		<a-card>
			<h2>图书列表</h2>
			<a-divider />
			<space-between>
				<div class="search">
					<a-input-search
						v-model:value="value"
						placeholder="输入书名关键词"
						enter-button="Search"/>
				</div>
				<a-button @click="show = true">添加一条</a-button>
			</space-between>
			<a-divider />
			<a-table :columns="columns" :data-source="data">

			</a-table>
		</a-card>
		<add-one v-model:show="show"/>
	</div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
	@import './index.scss';
</style>