<template>
	<div id="templ">
		<h3>{{info.title}}</h3>
		<div class="content" v-html="info.content"></div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default {
		data() {
			return {
				id: '',
				info: []
			}
		},
		created() {
			this.id = this.$route.params.id
			this.getGoodsDesc()
		},
		methods: {
			getGoodsDesc() {
				this.$axios.get('api/goods/getdesc/' + this.id).then(res => {
					if (res.status != 200) {
						return Toast('获取图文信息失败')
					}
					this.info = res.data.message[0]
					
				})
			}
		}
	}
</script>

<style scoped>
	#templ {
		padding: 5px 0;
	}
	h3 {
		color: #0000EE;
	}
	.content >>> img {
		width: 100%;
	}
	.content >>> p:first-child {
		text-indent: 20px;
	}
</style>
