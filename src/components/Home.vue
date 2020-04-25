<template>
	<div id="templ">
		<slider :imgList="list"></slider>
		<div class="mui-content">
				        <ul class="mui-table-view mui-grid-view mui-grid-9">
				            <li  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/news/newslist">
				                    <span class="mui-icon mui-icon-home"></span>
				                    <div class="mui-media-body">新闻咨询</div></router-link></li>
				            <li  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/photo/photolist">
				                    <span class="mui-icon mui-icon-email"><span class="mui-badge">5</span></span>
				                    <div class="mui-media-body">图片分享</div></router-link></li>
				            <li  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/goods/goodslist">
				                    <span class="mui-icon mui-icon-chatbubble"></span>
				                    <div class="mui-media-body">商品购买</div></router-link></li>
				            <li  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/feedback">
				                    <span class="mui-icon mui-icon-location"></span>
				                    <div class="mui-media-body">留言反馈</div></router-link></li>
				            <li  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/voide">
				                    <span class="mui-icon mui-icon-search"></span>
				                    <div class="mui-media-body">视频专区</div></router-link></li>
				            <li  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/callme">
				                    <span class="mui-icon mui-icon-phone"></span>
				                    <div class="mui-media-body">联系我们</div></router-link></li>
				        </ul> 
		</div>
		
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import slider from './subcomponents/slider.vue'
	
	export default {
		data() {
			return {
				list: []
			}
		},
		created() {
			this.getBannerImg()
		},
		methods: {
			getBannerImg() {
				this.$axios.get('api/getlunbo')
					.then((res) => {
						if (res.status != 200) {
							return Toast('异步请求错误')
						}
						
						this.list = res.data.message
					})
			},
		},
		components: {
			slider
		}
	}
</script>

<style scoped>
	.mui-grid-view.mui-grid-9,.mui-grid-view.mui-grid-9 .mui-table-view-cell.mui-active {
		background: white;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		border-right: 0;
		border-bottom: 0;
	}
	.mui-grid-view.mui-grid-9 {
		border-top: 0;
		border-left: 0;
	}
	.mui-table-view  .mui-icon-home:before,
	.mui-table-view .mui-icon-email:before,
	.mui-table-view .mui-icon-chatbubble:before,
	.mui-table-view .mui-icon-location:before,
	.mui-table-view .mui-icon-search:before,
	.mui-table-view .mui-icon-phone:before 
	{
		content: '';
		display: inline-block;
		width: 50px;
		height: 50px;
		background-repeat: round;
	}
	.mui-table-view  .mui-icon-home:before {
		background-image: url('../../static/imgs/1.png');
	}
	.mui-table-view .mui-icon-email:before {
		background-image: url('../../static/imgs/2.png');
	}
	.mui-table-view .mui-icon-chatbubble:before {
		background-image: url('../../static/imgs/3.png');
	}
	.mui-table-view .mui-icon-location:before {
		background-image: url('../../static/imgs/4.png');
	}
	.mui-table-view .mui-icon-search:before {
		background-image: url('../../static/imgs/5.png');
	}
	.mui-table-view .mui-icon-phone:before {
		background-image: url('../../static/imgs/6.png');
	}
</style>
