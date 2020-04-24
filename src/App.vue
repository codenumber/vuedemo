<template>
	<div>
		<mt-header fixed title="商城"></mt-header>
		<div v-show="isshow" id="back"><a href="javascript:;" @click="backTo">返回</a></div>
		
		<router-view></router-view>		
		
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/Home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-chat">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopCar">
				<span class="mui-icon mui-icon-contact"><span class="mui-badge" id="badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/tabbar-with-map">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>
		
	</div>
</template>
<script>
	import {Toast} from 'mint-ui'
	import axios from 'axios'
	import {vm,COUNTSTR} from './kits/vm.js'
	
	vm.$on(COUNTSTR,(count) => {
		let badgeObj = document.getElementById('badge')
		badgeObj.innerText = parseInt(badgeObj.innerText) + count
	})
	
	export default {
		data() {
			return {
				isshow: false
			}
		},
		methods: {
			show() {
				Toast('heih')
			},
			backTo() {
				this.$router.go(-1)
			}
		},
		watch: {
			$route(to,from) {   
			    if(to.path == '/Home') {
					this.isshow = false
					return
				}
				this.isshow = true
			}
		}
	
	}
</script>
<style>
	#back {
		color: white;
		position: fixed;
		z-index: 200;
		top: 9px;
		left: 10px;
	}
	#back a {
		color: white;
		font-size: 14px;
	}
</style>