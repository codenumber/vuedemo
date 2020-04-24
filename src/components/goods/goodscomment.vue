<template>
	<div id="templ">
		<comment :id="id"></comment>
	</div>
</template>

<script>
	import comment from '../subcomponents/comment.vue'
	import {Toast} from 'mint-ui'
	
	export default {
		data() {
			return {
				id: ''
			}
		},
		created() {
			this.id = this.$route.params.id
		},
		components: {
			comment
		}
	}
</script>

<style scoped>
</style>
