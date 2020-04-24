<template>
	<div id="templ">
		<slider :imgList="imgList"></slider>
		<div id="buy">
			<h4>{{goodsInfo.title}}</h4>
			<hr>
			<ul>
				<li> 销售价：<span>{{goodsInfo.sell_price}}</span>市场价: <s>{{goodsInfo.market_price}}</s></li>
				<li>购买数量:
					<inputNum v-on:objCount="getSelectCount"></inputNum>
				</li>
				<li>
					<mt-button type="primary" size="small">立即购买</mt-button>
					<mt-button type="danger" size="small" @click="toShopCar">加入购物车</mt-button>
				</li>
			</ul>
		</div>
		<div id="params">
			<h6>商品参数</h6>
			<hr>
			<ul>
				<li>商品货号：{{goodsInfo.goods_no}}</li>
				<li>库存情况：{{goodsInfo.stock_quantity}}</li>
				<li>
					上货时间：{{goodsInfo.add_time | datefmt('YYYY-MM-DD')}}
				</li>
			</ul>
		</div>
		<div id="choose">
			
			<router-link v-bind="{to:'/goodsinfo/goodsdesc/' + goodsInfo.id}">
			<mt-button type="danger" size="large" plain>图文介绍</mt-button>
			</router-link>
			<router-link v-bind="{to: '/goodsinfo/goodscomment/' + goodsInfo.id}">
				<mt-button type="primary" size="large" plain>评论详情</mt-button>
			</router-link>
			
		</div>
	</div>
</template>

<script>
import inputNum from '../subcomponents/inputnumber.vue'
import {Toast} from 'mint-ui'
import slider from '../subcomponents/slider.vue'
import {vm,COUNTSTR} from '../../kits/vm.js'
import {setItem} from '../../kits/localSg.js'


export default {
	data() {
		return {
			id: '',
			imgList: [],
			goodsInfo:'',
			count: ""
		}
	},
	methods: {
		getGoodsImg() {
			this.$axios.get("api/getthumimages/" + this.id).then(res => {
				(res.data.message)
				if (res.status != 200) {
					return Toast('获取商品图失败')
				}
				
				this.imgList = res.data.message 
				this.imgList.forEach(item => {
					return item.img = item.src
				})
			})
		},
		getGoodsInfo() {
			this.$axios.get('api/goods/getinfo/' + this.id).then(res => {
				(res.data.message)
				if (res.status != 200) {
					return Toast('获取商品信息失败')
				}
				this.goodsInfo = res.data.message[0]
			})
		},
		getSelectCount(objCount) {
			this.count = objCount
		},
		toShopCar() {
			vm.$emit(COUNTSTR,this.count)
			const value = {goodsId: this.id,goodsCount: this.count}
			setItem(value)
		}
	},
	created() {
		this.id = this.$route.params.id
		this.getGoodsImg()
		this.getGoodsInfo()
	},
	components: {
		slider,
		inputNum
	}
}
	
</script>

<style scoped>
	#templ {
		padding-top: 5px;
	}
	.mint-swipe {
		border: 1px solid rgba(0,0,0,.2);
		margin: 5px;
		border-radius: 5px;
	}
	#buy,#params,#choose {
		margin: 5px;
		border: 1px solid rgba(0,0,0,.2);
		padding: 0 5px;
		border-radius: 5px;
	}
	#buy span {
		margin-right: 6px;
		color: red;
	}
	#buy hr,#params hr {
		margin: 0;
	}
	#buy h4 {
		color: #0000EE;
		margin-left: 5px;
	}
	#buy ul,#params ul {
		padding: 10px 10px 10px;
		margin: 0;
	} 
	#buy li,#params li {
		font-size: 14px;
		list-style-type: none;
		height: 35px;
		line-height: 35px;
		display: block;
	}
	#choose .mint-button  {
		margin: 8px 0px;
	}
	#inputNum {
		display: inline-block;
		
	}
</style>
