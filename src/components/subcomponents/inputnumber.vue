<template>
	<div id="inputNum">
		<div class="inleft" @click="subStrict">-</div>
		<div class="incenter" v-text="count"></div>
		<div class="inright" @click="add">+</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				count: 1
			}
		},
		methods: {
			add() {
				this.count ++
				this.getCount()
			},
			subStrict() {
				this.count --
				if (this.count < 1) {
					this.count = 1
				}
				this.getCount()
			},
			getCount() {
				this.$emit('objCount',this.count)
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
