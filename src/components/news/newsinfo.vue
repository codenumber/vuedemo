<template>
	<div id="templ">
		<div >
			<p class="title">{{info.title}}</p>
			<p class="titleDesc">时间：<span>{{info.createdAt | datefmt('YYYY/MM/DD hh:mm:ss')}}</span></p>
		</div>
		<div class="content">
			<div class="htmlTemp" v-html="info.content"></div>
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
				info: {},
				id: ''
			}
		},
		created() {
			this.id = this.$route.params.id
			this.getNewsInfo()
		},
		methods: {
			getNewsInfo() {
				this.$axios.get("api/getnew/" + this.id )
					.then( res => {
						console.log(res)
						if (res.data.status != 0) {
							return Toast('获取失败')
						}
						console.log(res)
						this.info = res.data.message[0]
					})
			}
		},
		components: {
			comment,
		}
	}
	
</script>

<style scoped>
	p.title  {
		display: inline-block;
		color: #0062CC;
		font-size: 25px;
		font-weight: 600;
		margin: 10px 0 4px 5px;
		height: 35px;
		line-height: 35px;
	}
	.titleDesc  {
		margin: 5px 0 5px;
	}
	.titleDesc span {
		font-size: 12px;
		font-weight: bolder;
		margin-right: 5px;
	}
	.content {
		;
	}
	
	
</style>
