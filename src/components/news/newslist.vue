<template>
	<div id="templ">
		<ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
				<router-link v-bind="{to:'/news/newsinfo/'+item.id}">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<span class="title">{{item.title}}</span>
						<span class='mui-ellipsis ft'>创建时间：{{item.publishedAt | datefmt('YYYY-MM-DD') }}</span>
						<span class="ft">{{item.author}}<span>点击数：{{item.click}}</span></span>
						
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios'
	import {Toast} from 'mint-ui'
	
	export default {
		data() {
			return {
				list: []
			}
		},
		created() {
			this.getNews()
		},
		methods: {
			getNews() {
				this.$axios.get("api/getnewslist").then(res=> {
					if (res.status != 200) {
						return Toast(res.data.message)
					}
					
					this.list = res.data.message
				})
				}
		},
		components: {
		
		}
	}
</script>

<style scoped>
	.mui-table-view img {
		width: 140px;
		height: 45px;
	}
	.title {
		display: block;
		width: 300px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: grey;
		font-size: 15px;
	}
	.ft {
		margin-top: 3px;
		color: #26a2ff;
		font-size: 12px;
	}
	.ft:last-child {
		color: #26a2ff;
		float: right;
	
	}
</style>
