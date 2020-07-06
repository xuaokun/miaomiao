<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		name: 'Scroller',
		props:{
			handleOnScroll:{
				type: Function,
				default: function(){}
			},
			handleOnTouchEnd:{
				type: Function,
				default: function(){}
			}
		},
		mounted(){
			var scroller = new BScroll(this.$refs.wrapper,{
				tap:true,
				probeType: 1 //滚动时会派发scroll事件
			})
			scroller.on('scroll',(pos)=>{
				this.handleOnScroll(pos)
			})
			scroller.on('touchEnd',(pos)=>{
				this.handleOnTouchEnd(pos)
			})
			this.scroller = scroller
		},
		methods:{
			toScrollTop(y){
				this.scroller.scrollTo(0,y)
			}
		}
	}
</script>

<style scoped>
	.wrapper{
		height: 100%;
	}
</style>
