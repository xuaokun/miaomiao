<template>
	<div id="detailContainer" class="slide-enter-active">
		<Header title="影片详情"><i class="iconfont icon-right" @touchstart="handleToBack"></i></Header>
		<Loading v-if="isLoading"></Loading>
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<div
					class="detail_list_bg"
					style="background-image: url(&quot;http://p1.meituan.net/148.208/moviemachine/6664cd8c31f1254bc52793a158dc53ff8811971.jpg&quot;);"
				></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img"><img :src="detailMovie.img | setWH('148.208')" alt="" /></div>
					<div class="detail_list_info">
						<h2>{{detailMovie.nm}}</h2>
						<p>{{detailMovie.enm}}</p>
						<p>{{detailMovie.sc}}</p>
						<p>{{detailMovie.cat}}</p>
						<p>{{detailMovie.src}}/{{detailMovie.dur}}分钟</p>
						<p>{{detailMovie.pubDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>
					{{detailMovie.dra}}
				</p>
			</div>
			<div class="detail_player swiper-container swiper-container-horizontal swiper-container-free-mode swiper-container-wp8-horizontal">
				<ul class="swiper-wrapper" style="transform: translate3d(0px, 0px, 0px);">
					<li class="swiper-slide swiper-slide-active" v-for="img in detailMovie.photos">
						<div><img :src="img | setWH('140.120')" alt="" /></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '@/components/Header';
export default {
	name: 'Detail',
	data() {
		return {
			detailMovie: {},
			isLoading: true
		};
	},
	components: {
		Header
	},
	props: ['movieId'],
	methods: {
		handleToBack() {
			this.$router.back();
		}
	},
	mounted() {
		// console.log(this.movieId)
		this.axios.get('/api/detailmovie?movieId=' + this.movieId).then(res => {
			var msg = res.data.msg;
			if (msg === 'ok') {
				this.detailMovie = res.data.data.detailMovie;
				this.isLoading = false;
				this.$nextTick(()=>{
					new Swiper ('.swiper-container', {
					    slidesPerView: 'auto',
						freeMode: true,
						freeModeSticky: true
					})
				})
			}
		});
	}
};
</script>

<style scoped>
#detailContainer {
	width: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 100;
	min-height: 100%;
	background-color: #fff;
}
#detailContainer.slide-enter-active {
	animation: 0.3s slideMove;
}
@keyframes slideMove {
	0% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(0);
	}
}
#content.contentDetail {
	display: block;
	margin-bottom: 0;
}
#content .detail_list {
	height: 200px;
	width: 100%;
	position: relative;
	overflow: hidden;
}
.detail_list .detail_list_img {
	width: 108px;
	height: 150px;
	border: 1px solid #f0f2f3;
	margin: 20px;
}
.detail_list .detail_list_img img {
	width: 100%;
	height: 100%;
}
.detail_list .detail_list_info {
	margin-top: 20px;
}

.detail_list .detail_list_bg {
	width: 100%;
	height: 100%;
	background: 0 40%;
	-webkit-filter: blur(20px);
	filter: blur(20px);
	background-size: cover;
	position: absolute;
	left: 0;
	top: 0;
}
.detail_list .detail_list_filter {
	width: 100%;
	height: 100%;
	background-color: #40454d;
	opacity: 0.55;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 1;
}
.detail_list .detail_list_content {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	z-index: 2;
}
#content .detail_intro {
	padding: 10px;
}
#content .detail_player {
    margin: 20px;
}
.detail_player .swiper-slide {
    width: 70px;
    margin-right: 20px;
    text-align: center;
    font-size: 14px;
}
.detail_player .swiper-slide img {
    width: 100%;
    margin-bottom: 5px;
}
.detail_player .swiper-slide {
    width: 70px;
    margin-right: 20px;
    text-align: center;
    font-size: 14px;
}
</style>
