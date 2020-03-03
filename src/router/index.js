import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Index from '../views/Index.vue'
import { getUserState } from '../http/http'
import { UrlSearch } from '../tools/index'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Index',
		component: Index,
	},
	{
		path: '/approval',
		name: 'Approval',
		component: () => import('@/views/Approval.vue')
	},
	{
		path: '/enclosure',
		name: 'Enclosure',
		component: () => import('@/views/Enclosure')
	},
	{
		path: '/apply',
		name: 'Apply',
		component: () => import('@/views/Apply.vue')
	},
	{
		path: '/examine',
		name: 'Examine',
		component: () => import('@/views/Examine.vue')
	},
	{
		path: '/entryResult',
		name: 'EntryResult',
		component: () => import('@/views/EntryResult.vue')
	},
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.path === "/") {
		let localToken = UrlSearch('token');
		store.commit("setLocalToken", localToken)
		getUserState({ token: localToken }).then(res => {
			store.commit('changeOrgState', res.isOrg)
			if (!res.isOrg) { //如果普通员工，跳转到核酸检测提交页
				next('/apply')
			}else{
				next()
			}
		});
	}else{
		next()
	}
})

export default router
