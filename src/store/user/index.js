const state = {
	name: localStorage.getItem('name') || '',
	isAdmin: localStorage.getItem('isAdmin') || false,
	userHead: ''
}
const actions = {
	
}
const mutations= {
	USER_NAME(state,payload){
		state.name = payload.name
		state.isAdmin = payload.isAdmin
		state.userHead = payload.userHead
	}
}

export default{
	namespaced: true,
	state,
	actions,
	mutations
}

for(int i = num.length-1;i>0;i--){
	for(int j = 0;j < i;j++){
		if(num[j] > num[j+1]){
			swap(num,j,j+1)
		}
	}
}
for(int j = i - 1;j >= 0;j--){
	
}