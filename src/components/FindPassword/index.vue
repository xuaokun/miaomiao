<template>
	<div>
		<div class="findPassword_body">
			<div class="findPassword_email">
				email：<input v-model="email" type="text" class="findPassword_text"><button @touchstart="handleVerify">发送验证码</button>
			</div>
			<div>
				验证码： <input v-model="verify" type="text" class="findPassword_text">
			</div>
			<div>
				新密码：<input v-model="password" type="text" class="findPassword_text">
			</div>
			<div class="findPassword_btn">
				<button @touchstart="handleFindPass">提交</button>
			</div>
			<div class="findPassword_link">
				<router-link to="/mine/login">登录</router-link>
				<router-link to="/mine/register">注册</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import {messageBox} from '@/components/Js'
	export default{
		name: 'FindPassword',
		data(){
			return{
				email: '',
				verify: '',
				password: ''
			}
		},
		methods:{
			handleVerify(){
				this.axios.get('/api2/users/verify?email=' + this.email).then((res)=>{
					var status = res.data.status
					if(status === 0){
						messageBox({
							title: '提示',
							content: '验证码已经发送',
							ok: '确定'
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
			handleFindPass(){
				this.axios.post('/api2/users/findPassword',{
					email: this.email,
					verify: this.verify,
					newPass: this.password
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
			}
		}
	}
</script>

<style scoped>
	#content .findPassword_body {
	    width: 100%;
	}
	.findPassword_email{
		position: relative;
	}
	.findPassword_email button{
		position: absolute;
		right: 10px;
		top: 5px;
		padding: 5px;
	}
	.findPassword_body .findPassword_text {
	    width: 100%;
	    height: 40px;
	    border: none;
	    border-bottom: 1px solid #ccc;
	    margin-bottom: 5px;
	    outline: none;
	    text-indent: 10px;
	}
	.findPassword_body .findPassword_btn {
	    height: 50px;
	    margin: 10px;
	}
	.findPassword_body .findPassword_btn button {
	    width: 100%;
	    height: 100%;
	    background: #e54847;
	    border-radius: 3px;
	    border: none;
	    display: block;
	    color: #fff;
	    font-size: 20px;
	}
	.findPassword_body .findPassword_link {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: flex;
	    -webkit-box-pack: justify;
	    -ms-flex-pack: justify;
	    justify-content: space-between;
	}
	.findPassword_body .findPassword_link a {
	    text-decoration: none;
	    margin: 0 5px;
	    font-size: 12px;
	    color: #e54847;
	}
</style>
