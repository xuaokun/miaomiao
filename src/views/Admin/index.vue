<template>
	<el-container>
		<el-header>喵喵网管理后台，{{ $store.state.user.name }}您好!</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu default-active="1" class="el-menu-vertical-demo">
					<el-menu-item index="1">
						<i class="el-icon-menu"></i>
						<router-link tag="span" to="/admin/users" slot="title">用户管理</router-link>
					</el-menu-item>
					<el-menu-item index="2">
						<i class="el-icon-document"></i>
						<router-link tag="span" to="/admin/movies" slot="title">电影管理</router-link>
					</el-menu-item>
					<el-menu-item index="3">
						<i class="el-icon-setting"></i>
						<router-link tag="span" to="/admin/cinemas" slot="title">影院管理</router-link>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
import axios from 'axios';
export default {
	name: 'Admin',
	beforeRouteEnter(to, from, next) {
		axios.get('/api2/admin').then(res => {
			var status = res.data.status;
			if (status === 0) {
				next();
			} else {
				next('/mine/login');
			}
		});
	}
};
</script>

<style scoped>
.el-header {
	background-color: #b3c0d1;
	color: #333;
	line-height: 60px;
}

.el-aside {
	background-color: #d3dce6;
	color: #333;
	text-align: center;
	line-height: 200px;
}

.el-main {
	background-color: #e9eef3;
	color: #333;
	text-align: center;
}

body > .el-container {
	margin-bottom: 40px;
}
</style>
