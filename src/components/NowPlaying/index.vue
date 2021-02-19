<template>
	<div class="movie_body">
		<Loading v-if="isLoading"></Loading>
		<Scroller v-else :handleOnScroll="handleOnScroll" :handleOnTouchEnd="handleOnTouchEnd">
			<ul>
				<li>{{pulldownMsg}}</li>
				<li v-for="item in movieList" @tap="HandleToDetail(item.id)">
					<div class="pic_show"><img :src="item.images.small"/></div>
					<div class="info_list">
						<h2>
							{{item.title}}
							<!---->
						</h2>
						<p>
							观众评
							<span class="grade">{{item.rating.average}}</span>
						</p>
						<p>主演: <span v-for="star in item.casts">{{star.name + ' '}}</span></p>
						<p></p>
					</div>
					<div class="btn_mall">购票</div>
				</li>
			</ul>
		</Scroller>
	</div>
</template>

<script>
export default {
	name: 'NowPlaying',
	data(){
		return{
			movieList: [],
			pulldownMsg: '',
			isLoading: true,
			preCityId: -1
		}
	},
	activated(){
		var cityId = this.$store.state.city.id;
		if(cityId === this.preCityId){
			return 
		}
		this.isLoading = true
		this.axios.get('/api/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a').then((res)=>{
			// console.log(res)
			var msg = res.statusText
			if(msg === 'OK'){
			this.movieList = res.data.subjects
			this.isLoading = false
			this.preCityId = cityId
			}
		})
	},
	methods:{
		HandleToDetail(movieId){
			this.$router.push('/movie/detail/1/' + movieId)
		},
		handleOnScroll(pos){
			if(pos.y > 30){
				this.pulldownMsg = '正在更新中'
			}
		},
		handleOnTouchEnd(pos){
			if(pos.y > 30){
				this.axios.get('/api/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a').then((res)=>{
					var msg = res.statusText
					if(msg === 'OK'){
						this.pulldownMsg = '更新成功'
						setTimeout(()=>{
							this.movieList = res.data.subjects
							this.pulldownMsg = ''
						},1000)
					}
				})
			}
		}
	}
};
</script>

<style scoped>
#content .movie_body {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	overflow: auto;
}
.movie_body ul {
	margin: 0 12px;
	overflow: hidden;
}
.movie_body ul li {
	margin-top: 12px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	border-bottom: 1px solid #e6e6e6;
	padding-bottom: 10px;
}
.movie_body .pic_show {
	width: 64px;
	height: 90px;
}
.movie_body .pic_show img {
    width: 100%;
}
.movie_body .info_list {
	margin-left: 10px;
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	position: relative;
}
.movie_body .info_list h2 {
	font-size: 17px;
	line-height: 24px;
	width: 150px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.movie_body .info_list p {
	font-size: 13px;
	color: #666;
	line-height: 22px;
	width: 200px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.movie_body .info_list p {
	font-size: 13px;
	color: #666;
	line-height: 22px;
	width: 200px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.movie_body .btn_mall, .movie_body .btn_pre {
    width: 47px;
    height: 27px;
    line-height: 28px;
    text-align: center;
    background-color: #f03d37;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    cursor: pointer;
}
</style>
