<template>
	<div class="comment">
		<h3>发表评论</h3>
		<hr>
		<textarea placeholder="请输入你想提交的评论" v-model="msg"></textarea>
		<mt-button type="primary" @click="postComment">提交评论</mt-button>
		<div v-show="!isshow">
			<h3 class="list">评论列表</h3>
			<hr>
			<div class="mui-content"  v-for="item of comments" :key="item.id">
				<div class="title">
					<span>{{comments.indexOf(item) + 1}}</span>楼
					用户名：<span>{{item.user_name}}</span>
					评论时间：<span>{{item.add_time | datefmt('YYYY/MM/DD hh:mm:ss' )}}</span>
				</div>
				<ul class="mui-table-view">
					 <li class="mui-table-view-cell">{{item.content}}</li>
				</ul>
			</div>
			<mt-button @click="changPageNum" plain :disabled="!showBtn"> <span v-show="showBtn">已显示{{comments.length}}条评论,显示更多</span>
			<span v-show="!showBtn">共{{comments.length}}条评论,加载完毕</span></mt-button>
		</div>
		<div class="nullcomment" v-show="isshow">
			<p>-暂无评论-</p>
		</div>
	</div>
	
</template>

<script>
	import {Toast} from 'mint-ui'
	
	export default {
		data() {
			return {
				isshow: false,
				comments: [],
				msg: '',
				pageNum: 1 ,
				showBtn: true
			}
		},
		props: ['id'],
		methods: {
			getPostComment() {
				this.$axios.get('api/getcomments/'+ this.id +  "?pageindex=" + this.pageNum).then(res => {
					if (res.status != 200 ) {
						Toast('获取评论错误')
						this.isshow = !this.isshow
						return
					}
					this.comments = res.data.message
					
					})
			},
			changPageNum() {
				this.pageNum ++
				this.$axios.get('api/getcomments/'+ this.id +  "?pageindex=" + this.pageNum).then(res => {
					if (res.status != 200 ) {
						Toast('获取评论错误')
						//错误是直接显示无其他评论
						this.showBtn = false
						return
					}
					this.comments = this.comments.concat(res.data.message)
					console.log(this.comments)
				})
				
			},
			postComment() {
				this.$axios.post('api/postcomment/'+this.$route.params.id,this.$qs.stringify({
					content: this.msg.trim()
				})).then((res) => {
					if (res.status == 200) {
						Toast(res.data.message)
					}
					console.log(res)
					this.comments.unshift({
						user_name: '匿名用户',
						content: this.msg.trim(),
						add_time: Date.now()
					})
					this.msg = ""
				})
				
			}
		},
		created() {
			this.getPostComment()
		}
	}
</script>

<style scoped>
	.comment {
		margin-top: 10px;
	}
	.comment h3 {
		font-size: 18px;
	}
	.comment textarea {
		padding: 5px 5px 0;
		margin-bottom: 5px; 
		font-size: 14px;
	}
	button {
		width: 100%;
		
	}
	.title {
		padding: 8px 5px 3px;
		font-size: 12px;
	}
	.title span {
		color: #282A36;
		margin-right: 10px;
	}
	.title span:first-child {
		margin: 0;
		color: red;
	}
	.mui-table-view {
		height: 30px;
		font-size: 14px;
	}
	.nullcomment p{
		text-align: center;
		margin: 10px;
		font-size: 16px;
	}
	.mint-button--default.is-plain:active {
		background-color: #000080;
	}
	.mint-button--default.is-plain:disabled {
		border: 0;
		color: #282A36;
		font-size: 14px;
	}
	.mui-table-view-cell {
		padding: 0;
		line-height: 30px;
		height: 30px;
		
	}
	
</style>
