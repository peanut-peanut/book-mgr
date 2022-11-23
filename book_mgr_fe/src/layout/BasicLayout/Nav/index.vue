<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    style="width: 100%"
    mode="inline"
		v-for="item in menu"
		:key="item.url"
		v-only-admin="item.onlyAdmin"
  >
    <a-sub-menu v-if="item.children">
      <template #title>{{item.title}}</template>

		</a-sub-menu>
			<a-menu-item v-else
			:key="item.url"
			@click="to(item.url)"
			>{{item.title}}</a-menu-item>
   

  </a-menu>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
	@import './index.scss';
</style>