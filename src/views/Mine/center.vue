<template>
	<div>
		<div>个人中心:</div>
		<div>{{$store.state.user.name}} 
			<div>
				用户身份：{{$store.state.user.isAdmin ? '管理员':'普通'}}
				<router-link to="/admin" target="_blank" v-if="$store.state.user.isAdmin">去管理后台</router-link>
			</div>
			<div>
				<input type="file" name="file" value="上传头像"  @change="handleToUpload"/>
				<img :src="$store.state.user.userHead" class="user-head"/>
			</div>
			<div @touchstart="handleLogout">退出</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import {messageBox} from '@/components/Js'
	export default{
		name: 'Center',
		methods:{
			handleLogout(){
				this.axios.get('/api2/users/logout').then((res)=>{
					var status = res.data.status
					if(status === 0){
						localStorage.removeItem('name')
						localStorage.removeItem('isAdmin')
						this.$store.commit('user/USER_NAME',{name:'',isAdmin: false})
						this.$router.push('/mine/login')
					}
				})
			},
			handleToUpload(ev){
				var file = ev.target.files[0]
				console.log(file)
				var param = new FormData()
				param.append('avatar',file,file.name)
				var config = {
					headers:{
						'Content-Type': 'multipart/form-data'
					}
				}
				var that = this
				this.axios.post('/api2/users/uploadUserHead',param,config).then((res)=>{
					var status = res.data.status
					if(status === 0){
						messageBox({
							title:'提示',
							content: '头像上传成功',
							ok: '确定',
							handleOk(){
								that.$store.commit('user/USER_NAME',
								{
									name: that.$store.state.user.name,
									isAdmin: that.$store.state.user.isAdmin,
									userHead: res.data.data.userHead + '?' + Math.random(),
								})
							}
						})
					}else{
						messageBox({
							title:'提示',
							content: '头像上传失败',
							ok: '确定'
						})
					}
				})
			}
		},
		beforeRouteEnter (to, from, next) {
			axios.get('/api2/users/getUser').then((res)=>{
				var status = res.data.status
				if(status === 0){
					next(vm=>{
						localStorage.setItem('name',res.data.data.username)
						localStorage.setItem('isAdmin',res.data.data.isAdmin)
						vm.$store.commit('user/USER_NAME',{
							name: res.data.data.username,
							isAdmin: res.data.data.isAdmin,
							userHead: res.data.data.userHead
						})
					})
				}else{
					next('/mine/login')
				}
			})
		}
	}
</script>

<style scoped>
	.user-head{width: 100px;height: 100px;border-radius: 50%;overflow: hidden;}
</style>
