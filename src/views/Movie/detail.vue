<template>
	<div id="detailContainer" class="slide-enter-active">
		<Header title="影片详情"><i class="iconfont icon-right" @touchstart="handleToBack"></i></Header>
		<Loading v-if="isLoading"></Loading>
		<div v-else id="content" class="contentDetail">
			<div class="detail_list">
				<!-- <div class="detail_list_bg" :style="'background-image:url(' + detailMovie.img.replace(/w\.h/,'148.208') + ')'" -->
				<div class="detail_list_bg" :style="{'background-image' : 'url(' + detailMovie.images.small + ')'} "
				></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img"><img :src="detailMovie.images.small" preview="1" alt="" /></div>
					<div class="detail_list_info">
						<h2>{{detailMovie.title}}</h2>
						<p>{{detailMovie.original_title}}</p>
						<p>{{detailMovie.rating.average}}</p>
						<p>{{detailMovie.genres}}</p>
						<p>{{detailMovie.durations}}</p>
						<p>{{detailMovie.pubdate}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>
					{{detailMovie.summary}}
				</p>
			</div>
<!-- 			<div class=" swiper-container gallery">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="photo in detailMovie.photos">
						<div><img :src="photo.image" alt="" /></div>
					</li>
				</ul>
				
			</div> -->
			<div class="detail_player swiper-container thumbs">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(photo,index) in detailMovie.photos">
						<div><img :src="photo.image"  preview="0"/></div>
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
		this.axios.get('/api/subject/' + this.movieId + '?apikey=0df993c66c0c636e29ecbb5344252a4a').then(res => {
			// console.log(res)
			var msg = res.statusText;
			if (msg === 'OK') {
				this.detailMovie = res.data;
				this.isLoading = false;
				this.$nextTick(()=>{
					var thumbsSwiper = new Swiper ('.thumbs', {
						spaceBetween: 10,
					    slidesPerView: 3,
						watchSlidesVisibility: true,//防止不可点击
					})
					this.$previewRefresh()

					// var gallerySwiper = new Swiper('.gallery',{
					//   spaceBetween: 10,
					//   thumbs: {
					//     swiper: thumbsSwiper
					//   }
					// })
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
