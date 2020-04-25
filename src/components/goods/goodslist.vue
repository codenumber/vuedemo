<template>
	<div id="templ">
		<ul class="mui-table-view mui-grid-view">
				        <router-link v-bind="{to: '/goodslist/goodsinfo/' + item.id}" class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item of list" :key="item.id">
				            <a href="#">
				                <img class="mui-media-object" :src="item.img_url">
				                <div class="mui-media-body">
									{{item.title}}
								</div>
								<div class="content">
									<p><span>￥{{item.sell_price}}<s>￥{{item.market_price}}</s></span>
									</p>
									<p><span>热卖中</span><span>剩{{item.stock_quantity}}件</span></p>
								</div>
								</a></router-link>
				    </ul>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	
	export default {
		data() {
			return {
				pageindex: 1,
				list: []
			}
		},
		created() {
			this.getGoodsData()
		},
		methods: {
			getGoodsData() {
				this.$axios.get("api/getgoods?pageindex=" + this.pageindex).then(res => {
					if (res.status != 200) {
						return Toast('获取商品数据失败')
					}
					this.list = res.data.message
				})
			}
		}
	}
</script>

<style scoped>
	a {
		border: 1px solid rgba(0,0,0,.2);
		margin: 3px;
	}
	.mui-table-view.mui-grid-view .mui-table-view-cell>a:not(.mui-btn) {
		padding: 0;
		margin: 0;
	}
	.mui-table-view.mui-grid-view .mui-table-view-cell  {
		padding: 0;
	}
	.content {
		height: 50px;
		background: rgba(0,0,0,.05);
		padding-top: 5px;
	}
	.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
		font-size: 14px;
	}
	.content p {
		font-size: 16px;
	}
	.content p:first-child{
		color: red;
		overflow: hidden;
	}
	.content p:first-child span {
		float: left;
	}
	.content p:first-child s {
		color: #222222;
		margin-left: 5px;
		font-size: 12px;
		vertical-align: baseline;
	}
	.content p:last-child span:first-child {
		margin-left: 10px;
		color: red;
		float: left;
		font-size: 14px;
	}
	.content p:last-child span:last-child {
		margin-right: 5px;
		float: right;
		color: #000080;
		font-size: 14px;
	}
	
	
</style>
