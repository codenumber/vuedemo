<template>
	<div id="inputNum">
		<div class="inleft" @click="subStrict">-</div>
		<div class="incenter" v-text="count"></div>
		<div class="inright" @click="add">+</div>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default {
		data() {
			return {
				count: 1,
				dataObj: {}
			}
		},
		props: ['initcount','goodsid'],
		created() {
			this.dataObj = {goodsid: this.goodsid,type: 'add'}
			this.count = this.initcount
		},
		methods: {
			add() {
				this.count ++
				this.sendMessage('add')
			},
			subStrict() {
				this.count --
				if (this.count < 1) {
					this.count = 1
					return Toast('不能再减少了哦')
				}
				this.sendMessage('sub')
			},
			sendMessage(type) {
				this.dataObj['type'] = type
				this.$emit('sendObj',this.dataObj)
			}
		}
	}
</script>

<style scoped>
	#inputNum div {
		margin-left: 3px;
		border: 1px solid rgba(0,0,0,.5);
		border-radius: 5px;
		width: 30px;
		height: 32px;
		line-height: 32px;
		display: inline-block;
		text-align: center;
	}
	.inleft,.inright {
		background-color: #EEEEEE;
	}
</style>
