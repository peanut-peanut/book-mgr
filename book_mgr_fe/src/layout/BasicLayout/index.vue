<template>
	<div class="layout">
		<div class="header">
			<div class="left">
				<img src="https://cdn.pixabay.com/photo/2015/06/02/12/59/book-794978_1280.jpg" alt="">
				<div class="title">图书管理系统</div>
			</div>
			<div class="right">
				<div class="hello-msg">hello xxx</div>
				<div class="logout">退出</div>
			</div>
		</div>
		<div class="header-placeholder"></div>
		<div class="content">
			<div class="left">
				<my-nav/>
			</div>
			<div class="right">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
	@import './index.scss';
</style>