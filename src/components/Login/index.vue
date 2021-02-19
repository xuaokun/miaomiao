<template>
	<div class="login_body">
		<div><input v-model="username" type="text" placeholder="账户名/手机号/Email" class="login_text" /></div>
		<div><input v-model="password" type="password" placeholder="请输入您的密码" class="login_text" /></div>
		<div>
			<input type="text" v-model="verifyImg" class="login_text" placeholder="请输入您的验证码"/>
			<img src="/api2/users/verifyImg" @touchstart="handleToVerify"/>
		</div>
		<div class="login_btn">
			<input type="submit" class="login_text" value="登录" @touchstart="handleToLogin"/>
		</div>
		<div class="login_link">
			<router-link to="/mine/register">立即注册</router-link>
			<router-link to="/mine/findpassword">找回密码</router-link>
		</div>
	</div>
</template>

<script>
	import {messageBox} from '@/components/Js'
	export default{
		name: 'Login',
		data(){
			return {
				username: '',
				password: '',
				verifyImg: ''
			}
		},
		methods:{
			handleToLogin(){
				console.log(111)
				this.axios.post('/api2/users/login',{
					username: this.username,
					password: this.password,
					verifyImg: this.verifyImg
				}).then((res)=>{
					var status = res.data.status
					var that = this
					if(status === 0){
						messageBox({
							title: '提示',
							content: '登录成功',
							ok: '确定',
							handleOk(){
								that.$router.push('/mine/center')
							}
						})
					}else{
						messageBox({
							title: '提示',
							content: res.data.msg,
							ok: '确定'
						})
					}
				})
			},
			handleToVerify(ev){
				ev.target.src = '/api2/users/verifyImg?' + Math.random()
			}
		}
	}
</script>

<style scoped>
	#content .login_body {
	    width: 100%;
	}
	.login_body .login_text {
	    width: 100%;
	    height: 40px;
	    border: none;
	    border-bottom: 1px solid #ccc;
	    margin-bottom: 5px;
	    outline: none;
	    text-indent: 10px;
	}
	.login_body .login_btn {
	    height: 50px;
	    margin: 10px;
	}
	.login_body .login_btn input {
	    width: 100%;
	    height: 100%;
	    background: #e54847;
	    border-radius: 3px;
	    border: none;
	    display: block;
	    color: #fff;
	    font-size: 20px;
	}
	.login_body .login_link {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-pack: justify;
	    -ms-flex-pack: justify;
	    justify-content: space-between;
	}
	.login_body .login_link a {
	    text-decoration: none;
	    margin: 0 5px;
	    font-size: 12px;
	    color: #e54847;
	}
</style>
