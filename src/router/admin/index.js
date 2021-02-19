export default{
	path: '/admin',
	component: ()=> import ('@/views/Admin'),
	children:[
		{
			path: 'users',
			component: ()=> import('@/views/Admin/user')
		},
		{
			path: 'movies',
			component: ()=> import('@/views/Admin/movie')
		},
		{
			path: 'cinemas',
			component: ()=> import('@/views/Admin/cinema')
		},
		{
			path: '/admin',
			redirect: 'users'
		},
	]
}