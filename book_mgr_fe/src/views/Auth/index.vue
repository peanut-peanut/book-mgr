<template>
	<div class="content">
		<div class="bg"></div>
		<div class="title-info">
			<img src="https://cdn.pixabay.com/photo/2015/06/02/12/59/book-794978_1280.jpg" alt="">
			<h2 class="title">图书管理系统</h2>
		</div>
		<div class="form">
			<a-tabs>
				<a-tab-pane key="1" tab="登录">
					<div class="item">
						<a-input size="large" placeholder="账户">
							<template #prefix>
								<user-outlined type="user" />
							</template>
						</a-input>
					</div>
					<div class="item">
						<a-input size="large" placeholder="密码">
							<template #prefix>
								<lock-outlined type="password" />
							</template>
						</a-input>
					</div>
					<div class="item">
						<a href="">忘记密码</a>
					</div>
					<div class="item">
						<a-button size="large" type="primary">登录</a-button>
					</div>
				</a-tab-pane>
				<a-tab-pane key="2" tab="注册">
					<div class="item">
						<a-input size="large"
						placeholder="账户"
						v-model:value="regForm.account">
							<template #prefix>
								<user-outlined type="user" />
							</template>
						</a-input>
					</div>
					<div class="item">
						<a-input size="large"
						placeholder="密码"
						v-model:value="regForm.password">
							<template #prefix>
								<lock-outlined type="password" />
							</template>
						</a-input>
					</div>
					<div class="item">
						<a-input size="large" placeholder="邀请码">
							<template #prefix>
								<mail-outlined type="mail" />
							</template>
						</a-input>
					</div>
					<div class="item">
						<a-button size="large"
						type="primary"
						@click="register"
						>注册</a-button>
					</div>
				</a-tab-pane>
			</a-tabs>
		</div>
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
	@import './index.scss';
</style>
