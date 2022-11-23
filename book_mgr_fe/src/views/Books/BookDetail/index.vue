<template>
	<div>
		<a-card>
			<space-between>
				<h2>{{detailMsg.name}}</h2>
				<div>
					<a-button size="middle" type="primary" @click="showUpdateModal = true" v-only-admin>编辑</a-button>
					&nbsp;
					<a-button size="middle" type="danger" @click="remove" v-only-admin>删除</a-button>
				</div>
			</space-between>
			<a-divider />
			<div class="item-info">
				<div class="items">
					<div class="item">
						<div class="title">作者</div>
						<div class="content">{{detailMsg.author}}</div>
					</div>
					<div class="item">
						<div class="title">价格</div>
						<div class="content">{{detailMsg.price}}</div>
					</div>
					<div class="item">
						<div class="title">库存</div>
						<div class="content">{{detailMsg.count}}</div>
					</div>
				
				</div>
				<div class="items">
					<div class="item">
						<div class="title">分类</div>
						<div class="content">{{detailMsg.classify}}</div>
					</div>
					<div class="item">
						<div class="title">出版日期</div>
						<div class="content">{{formatTimeDate(detailMsg.publishDate)}}</div>
					</div>
					<div class="item">
						<div class="title">创建日期</div>
						<div class="content">{{formatFullTimeDate(detailMsg.createdAt)}}</div>
					</div>
				</div>
			</div>
		</a-card>
			<div class="log-info">
				<a-card>
					<template #extra>
						<span>
							<a href="javascript:;"  @click="filter('IN_COUNT')">
									<check-outlined v-if="typeStatus === 'IN_COUNT'" />
								入库日志</a>
						</span>
						<span style="margin-left: 15px;">
							<a href="javascript:;" @click="filter('OUT_COUNT')">
									<check-outlined v-if="typeStatus === 'OUT_COUNT'"/>
								出库日志</a>
						</span>
					</template>
					<div>
						<a-table
						bordered
						:data-source="log"
						:columns="columns"
						:pagination="false">
						<template #bodyCell="{column, record}">
							<template v-if="column.dataIndex === 'createdAt'">
								{{formatFullTimeDate(record.meta.createdAt)}}
							</template>
						</template>
						</a-table>
					</div>
					<space-between style="margin-top:20px;">
						<div />
						<a-pagination 
						v-model:current="curLogPage"
						:pageSize="5"
						:total="totalLog"
						@change="setLogPage"/>
					</space-between>
				</a-card>
			</div>
			<update v-model:show="showUpdateModal" :book="detailMsg" @update="updateMsg" />
	</div>
</template>

<script src="./index.js"></script>
<style lang="scss">
	@import './index.scss';
</style>