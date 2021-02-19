<template>
	<div>
		<el-table
			:data="nowTableData"
			border
			style="width: 100%">
			<el-table-column
			  prop="movieImg"
			  label="封面">
				<template slot-scope="scope">
					<img :src="scope.row.images.small" class="user-head"/>
				</template>
			</el-table-column>
			<el-table-column
			  prop="pubdates[0]"
			  label="上映日期">
			</el-table-column>
			<el-table-column
			  prop="title"
			  label="电影名">
			</el-table-column>
			<el-table-column
			  prop="rating.average"
			  label="观众评分">
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
			this.axios.get('/api/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a').then((res)=>{
				// console.log(res)
				if(res.statusText === 'OK'){
					this.tableData = res.data.subjects
					console.log(this.tableData)
				}
			})
		}
	}
</script>

<style scoped>
	.user-head{
		width: 100px;
		height: 100px;
		overflow: hidden;
	}
</style>
