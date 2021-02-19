<template>
	<div>
		<el-table
			:data="nowTableData"
			border
			style="width: 100%">
			<el-table-column
			  prop="userHead"
			  label="用户头像">
				<template slot-scope="scope">
					<img :src="scope.row.userHead" class="user-head"/>
				</template>
			</el-table-column>
			<el-table-column
			  prop="date"
			  label="注册日期">
			</el-table-column>
			<el-table-column
			  prop="username"
			  label="用户姓名">
			</el-table-column>
			<el-table-column
			  prop="email"
			  label="注册邮箱">
			</el-table-column>
			<el-table-column>
				<template slot-scope="scope">
				  <el-button type="button" @click="handleFreeze(scope.$index,scope.row)" size="small">{{scope.row.isFreeze ? '已冻结':'未冻结'}}</el-button>
				  <el-button type="danger" @click="handleDelete(scope.$index,scope.row)" size="small">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination class="page"
		  background
		  layout="prev, pager, next"
		  :page-size="pageSize"
		  :current-page.sync="currentPage"
		  :total="tableData.length">
		</el-pagination>
	</div>
</template>

<script>
	export default{
		name: 'users',
		data(){
			return {
				tableData: [],
				currentPage: 1,
				pageSize: 2
			}
		},
		computed:{
			nowTableData(){
				return this.tableData.slice((this.currentPage -1) * this.pageSize,this.currentPage * this.pageSize) || []
			}
		},
		mounted(){
			this.axios.get('/api2/admin/userlist').then((res)=>{
				// console.log(res)
				if(res.data.status === 0){
					this.tableData = res.data.data.userList
				}
			})
		},
		methods:{
			handleFreeze(index,row){
				this.axios.post('/api2/admin/updateIsFreeze',{
					email:row.email,
					isFreeze: !row.isFreeze
				}).then((res)=>{
					if(res.data.status === 0){
						this.$alert('冻结操作成功', '提示', {
						  confirmButtonText: '确定',
						  callback: action => {
							row.isFreeze = !row.isFreeze
						  }
						});
					}else{
						this.$alert('冻结操作失败', '提示', {
						  confirmButtonText: '确定',
						  callback: action => {
						  }
						});
					}
				})
			},
			handleDelete(index,row){
				this.axios.post('/api2/admin/deleteUser',{
					email: row.email
				}).then((res)=>{
					if(res.data.status === 0){
						this.$alert('删除操作成功', '提示', {
						  confirmButtonText: '确定',
						  callback: action => {
							this.tableData.splice(index,1)
						  }
						});
					}else{
						this.$alert('删除操作失败', '提示', {
						  confirmButtonText: '确定',
						  callback: action => {
						  }
						});
					}
				})
			}
		}
	}
</script>

<style scoped>
	.user-head{width: 50px;height: 50px;border-radius: 50%;overflow: hidden;}
	.page{margin-top: 20px;}
</style>
