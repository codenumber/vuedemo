<template>
	<mt-swipe :auto="2000">
	  <mt-swipe-item v-for="item of imgList" v-cloak :key="item.id" >
		  <img :src="item.img" alt="">
	  </mt-swipe-item>
	</mt-swipe>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		props: ['imgList'],
		
	}
</script>

<style scoped>
	[v-cloak] {
		display: none;
	}
	.mint-swipe-item {
		height: 300px;
		width: 100%;
	}
	.mint-swipe {
		height: 300px;
	}
	.mint-swipe img {
		width: 100%;
		height: 300px;
	}
</style>
