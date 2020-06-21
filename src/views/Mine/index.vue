<template>
	<div id="main">
		<Header title="我的喵喵"></Header>
		<div id="content">
			<login></login>
		</div>
		<Tabbar></Tabbar>
	</div>
</template>

<script>
import Header from '@/components/Header';
import login from '@/components/Login';
import Tabbar from '@/components/Tabbar';
export default {
	name: 'Mine',
	components: {
		Header,
		login,
		Tabbar
	}
};
</script>

<style></style>
