<template>
	<div id="templ">
		<div class="row" v-for="(item,index) in datalist" :key="item.id">
			<mt-switch class="switch" v-model="value[index]"></mt-switch>
			<img :src="item.thumb_path" alt="">
			<div class="info">
				<h4>{{item.title}}</h4>
				<ul class="info">
					<li>￥{{item.sell_price}}</li>
					<li><carInputNum :initcount="item.cou" :goodsid="item.id" @sendObj="getDataObj"></carInputNum></li>
					<li><a href="javascript:;" @click="delRow(item.id,index)">删除</a></li>
				</ul>
			</div>
		</div>
		<div class="total">
			<ul>
				<li>已选共{{getTotalCount}}件商品</li>
				<div class="sumright">
					<li>合计<span>￥{{sum}}</span></li>
					<li><button>结算</button></li>
				</div>
			</ul>
		</div>
		{{value}}
	</div>
</template>

<script>
	import {getGoodsObj,upDataLocalSg,removeItem} from '../../kits/localSg.js'
	import carInputNum from '../subcomponents/shopcar_inputnumber.vue'

	
	export default {
		data() {
			return {
				value: [],
				datalist: [],
				sum: 0
			}
		},
		computed: {
			getTotalCount() {
				let tureArr = this.value.filter((item) => item )
				let sum = 0
				this.value.forEach((item,index) => {
					if(item) {
						sum += this.datalist[index].sell_price * this.datalist[index].cou
					}
				})
				this.sum = sum
				return tureArr.length
			}
		},
		created() {
			this.getCarData()
		},
		methods: {
			getCarData() {
				let carDataObj = getGoodsObj()
				let urlparams = ''
				for (let key in carDataObj) {
					urlparams += key + ','
				}
				urlparams = urlparams.substring(0,urlparams.length - 1)
				this.$axios.get('api/goods/getshopcarlist/' + urlparams).then(res => {
					if (res.status != 200){
						return Toast('获取购物车数据失败')
					}
					res.data.message.forEach((item) => {
						item.cou = carDataObj[item.id]
						this.value.push(false)
					})
					this.datalist = res.data.message
				})
			},
			getDataObj(obj) {
				upDataLocalSg(obj)
				for (let i = 0; i < this.datalist.length; i ++) {
					let item = this.datalist[i]
					if (item.id == obj.goodsid) {
						if(obj.type == 'add') {
							item.cou ++
						} else {
							item.cou --
						}
						break
					}
				}
			},
			delRow(id,index) {
				this.datalist.splice(index,1)
				removeItem(id)
			}
		},
		components: {
			carInputNum
		}
	}
</script>

<style scoped>
	.row {
		height: 102px;
		border-bottom: 1px solid rgba(0,0,0,.2);
		display: flex;
	}
	img {
		width: 75px;
		height: 75px;
		margin: auto;
		flex: 0 0 75px;
	}
	.switch {
		flex: 0 0 75px;
		padding-left: 5px;
	}
	.info {
		padding: 5px 5px;
		
	}
	.info h4 {
		height: 50px;
		line-height: 25px;
		font-size: 16px;
		color: #0000EE;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		word-break: break-all;
	}
	.info ul ,.total ul{
		padding: 0;
		list-style: none;
		margin: 6px 0;
	}
	.info li ,.total li{
		display: inline-block;
		height: 25px;
		line-height: 25px;
		margin: 0;
		font-size: 16px;
	}
	.info li:first-child , .sumright li span {
		color: #FF0000;
		font-size: 18px;
		width: 60px;
	}
	.total {
		padding: 0;
		position: absolute;
		bottom: 50px;
		background-color: whitesmoke;
		height: 50px;
		width: 100%;
	}
	.total ul {
		margin: 0;
		padding: 0 10px;
	}
	.total>ul>li,.sumright li {
		float: left;
		height: 50px;
		line-height: 50px;
		font-size: 16px;
	}
	.sumright {
		float: right;
	}
	.sumright button {
		margin: 8px;
		background-color: #0062CC;
	}
</style>
