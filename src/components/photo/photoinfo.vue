<template>
	<div id="templ">
		<div>
			<h3 class="title">{{info.title}}</h3>
			<p class="titleDesc">时间：<span>{{info.add_time | datefmt('YYYY/MM/DD')}}</span>阅读数：<span>{{info.click}}</span> </p>
		</div>
		<div class="content">
			<div class="mui-content">
				<ul class="mui-table-view mui-grid-view mui-grid-9">
					 <li  class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-viewer v-for="item of list" >
						<img :src="item.src">
					</li>
				</ul> 
			</div>
			<p>{{info.desc}}</p>
		</div>
		<comment :id="id"></comment>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	import comment from '../subcomponents/comment.vue'
	
	export default {
		data() {
			return {
				id: "",
				info:[],
				list: []
			}
		},
		created() {
			this.id = this.$route.params.id
			this.getData()
			this.getThumbImage()
		},
		methods: {
			getData() {
				//api/getimageInfo/
				//api/getthumimages/
				this.$axios.get('api/getimageInfo/' + this.id).then(res => {
					if (res.status != 200) {
						return Toast('获取图文信息失败')
					}
					this.info = res.data.message[0]
				})
			},
			getThumbImage() {
				this.$axios.get('api/getthumimages/' + this.id).then(res => {					
					if (res.status != 200) {
						return Toast('获取主题照片失败')
					}
					this.list = res.data.message
				})
			}
		},
		components: {
			comment
		}
	}
</script>

<style scoped>
	h3.title {
		color: #0000EE;
		
	}
	.content ul {
		padding: 10px 0;
	}
	.content img {
		width: 90px;
		height: 90px;
		border-radius: 5px;
		box-shadow: 3px 3px 5px rgba(0,0,0,.2);
	}
	.titleDesc {
		margin-bottom: 5px;
	}
	.titleDesc span {
		margin-right: 10px;
	}
	.mui-grid-view.mui-grid-9 .mui-table-view-cell {
		padding: 0;
	}
	.mui-content>.mui-table-view:first-child  {
		margin-top: 5px;
	}
</style>
