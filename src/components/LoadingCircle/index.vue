<template>
	<div>
		<div class="circlebox">
			<p></p>
			<p></p>
			<p></p>
			<p></p>
		</div>
		<div class="circlebox">
			<p></p>
			<p></p>
			<p></p>
			<p></p>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'Loading'
	}
</script>

<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.circlebox{
		width: 100px;
		height: 100px;
		margin-top: 100px;
		margin-left: calc(50% - 50px);
		position: absolute;
	}
	.circlebox p{
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background-color: #f00;
		position: absolute;
		animation: loading 1.5s infinite linear;
	}
	.circlebox p:nth-child(1) {
		left: 0;
		top: 0;
	}
	.circlebox p:nth-child(2) {
		right: 0;
		top: 0;
	}
	.circlebox p:nth-child(3) {
		right: 0;
		bottom: 0;
	}
	.circlebox p:nth-child(4) {
		left: 0;
		bottom: 0;
	}
	.circlebox:nth-child(2) {
		transform: rotateZ(45deg);
	}
	@keyframes loading{
		0%{transform: scale(0);}
		50%{transform: scale(1);}
		100%{transform: scale(0);}
	}
	.circlebox:nth-child(1) p:nth-child(1){animation-delay: -0.1s;}
	.circlebox:nth-child(2) p:nth-child(1){animation-delay: -0.3s;}
	.circlebox:nth-child(1) p:nth-child(2){animation-delay: -0.5s;}
	.circlebox:nth-child(2) p:nth-child(2){animation-delay: -0.7s;}
	.circlebox:nth-child(1) p:nth-child(3){animation-delay: -0.9s;}
	.circlebox:nth-child(2) p:nth-child(3){animation-delay: -1.1s;}
	.circlebox:nth-child(1) p:nth-child(4){animation-delay: -1.3s;}
	.circlebox:nth-child(2) p:nth-child(4){animation-delay: -1.5s;}
</style>
