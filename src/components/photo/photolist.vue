<template >
	<div id="templ">
		<div class="catego">
			<ul :style="{width: (categories.length+1)*80 + 'px'}">
				<li>干货全部分类</li>
				<li v-for="item of categories" :key="item.id" :class="['mui-control-item', item.id == 14 ? 'mui-active' : '']" 
					@click="getPhotoListByCateId(item.id)"
				>
				{{item.title}}</li>
			</ul>
		</div>
		<div class="container">
			<ul>
				<li  v-for="item of list" :key="item.id">
					<router-link v-bind="{to: '/photolist/photoinfo/'+item.id}">
						<img v-lazy="item.img_url" >
						<div><p>{{item.title}}</p></div>
					</router-link>
				</li >
			</ul>
		</div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	
	export default {
		data() {
			return {
				categories: [],
				list: []
			}
		},
		created() {
			this.getdata()
			this.getPhotoListByCateId(0)
		},
		methods: {
			getdata() {
				this.$axios.get('/api/getimgcategory').then((res) => {
					if (res.status != 200) {
						return Toast('获取分类失败')
					}
					this.categories = res.data.message
				})
			},
			getPhotoListByCateId(cateId) {
				//接口的参数为0时才有数据
				this.$axios.get("api/getimages/" + cateId).then((res) => {
					if (res.status != 200) {
						return Toast(res.data.message)
					}
					this.list = res.data.message
				})
			}
		}
	}
</script>

<style scoped>
	.catego {
		width:375px;
		max-width: 375px;
		overflow-x: auto;
	}
	.catego ul{
		list-style-type: none;
		padding: 0;
		width: 1000px;
		margin: 0;
	}
	.catego li {
		display: inline-block;
		color: #0000EE;
		font-size: 14px;
		padding-left: 10px;
		margin: 2px;
	}
	image[lazy=loading] {
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}
	.container ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.container img {
		width: 100%;
		height: auto;
		display: block;
	}
	.container li {
		margin-top: 0;
		width: 375px;
		position: relative;
		margin-bottom: 5px; 
	}
	.container div {
		background-color: rgba(0,0,0,.2);
		padding: 5px 5px 0;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	.container p {
		color: white;
	}
</style>
