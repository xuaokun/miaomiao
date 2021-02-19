<template>
	<div class="register_body">
		<div class="register_email">
			email：<input v-model="email" type="text" class="register_text"><button @touchstart="handleVerify">{{verifyInfo}}</button>
		</div>
		<div>
			验证码： <input v-model="verify" type="text" class="register_text">
		</div>
		<div>
			姓名：<input v-model="username" type="text" class="register_text">
		</div>
		<div>
			密码：<input v-model="password" type="text" class="register_text">
		</div>
		<div>
			确认密码：<input type="password" class="register_text">
		</div>
		<div class="register_btn">
			<button @touchstart="handleRegister">注册</button>
		</div>
		<div class="register_link">
			<router-link to="/mine/login">已有账号，去登录</router-link>
			<router-link to="/mine/findpassword">找回密码</router-link>
		</div>
	</div>
</template>

<script>
	import {messageBox} from '@/components/Js'
	export default{
		name: 'Register',
		data(){
			return{
				email: '',
				username: '',
				password: '',
				verify: '',
				verifyInfo: '发送验证码',
				verifyDisabled: false
			}
		},
		methods:{
			handleVerify(){
				if(this.verifyDisabled){return}
				var that = this
				this.axios.get('/api2/users/verify?email=' + this.email).then((res)=>{
					var status = res.data.status
					if(status === 0){
						messageBox({
							title: '提示',
							content: '验证码已经发送',
							ok: '确定',
							handleOk(){
								that.countDown()
							}
						})
					}else{
						messageBox({
							title: '提示',
							content: '验证码发送失败',
							ok: '确定'
						})
					}
				})
			},
			handleRegister(){
				this.axios.post('/api2/users/register',{
					email: this.email,
					verify: this.verify,
					username: this.username,
					password: this.password
				}).then((res)=>{
					var status = res.data.status
					var that = this
					if(status === 0){
						messageBox({
							title: '提示',
							content: res.data.msg,
							ok: '确定',
							handleOk: function(){
								that.$router.push('/mine/login')
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
			countDown(){
				this.verifyDisabled = true
				var count = 60
				var timer = setInterval(()=>{
					count--
					this.verifyInfo = '剩余' + count + '秒可再次发送'
					if(count === 0){
						this.verifyDisabled = false
						this.verifyInfo = '发送验证码'
						clearInterval(timer)
					}
				},1000)
				console.log(timer)
			}
		}
	}
</script>

<style scoped>
	#content .register_body {
	    width: 100%;
	}
	.register_email{
		position: relative;
	}
	.register_email button{
		position: absolute;
		right: 10px;
		top: 5px;
		padding: 5px;
	}
	.register_body .register_text {
	    width: 100%;
	    height: 40px;
	    border: none;
	    border-bottom: 1px solid #ccc;
	    margin-bottom: 5px;
	    outline: none;
	    text-indent: 10px;
	}
	.register_body .register_btn {
	    height: 50px;
	    margin: 10px;
	}
	.register_body .register_btn button {
	    width: 100%;
	    height: 100%;
	    background: #e54847;
	    border-radius: 3px;
	    border: none;
	    display: block;
	    color: #fff;
	    font-size: 20px;
	}
	.register_body .register_link {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-pack: justify;
	    -ms-flex-pack: justify;
	    justify-content: space-between;
	}
	.register_body .register_link a {
	    text-decoration: none;
	    margin: 0 5px;
	    font-size: 12px;
	    color: #e54847;
	}
</style>
