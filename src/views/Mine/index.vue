<template>
	<div id="main">
		<Header title="我的喵喵"></Header>
		<div id="content">
			<router-view></router-view>
		</div>
		<Tabbar></Tabbar>
	</div>
</template>

<script>
import Header from '@/components/Header';
import Tabbar from '@/components/Tabbar';
export default {
	name: 'Mine',
	components: {
		Header,
		Tabbar
	}
};
</script>

<style></style>
