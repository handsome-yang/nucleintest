import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Index from '../views/Index.vue'
import { getUserState } from '../http/http'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Index',
		component: Index,
	},
	{
		path: '/approval',
		name:'Approval',
		component: () => import('@/views/Approval.vue')
	},
	{
		path:'/enclosure',
		name:'Enclosure',
		component:() => import('@/views/Enclosure')
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
	mode: 'hash',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	if (to.path === "/") {
		let params = {
			token: "aa47fcf3013c81c35b39dd31821d87da1ded1de7"
		}
		getUserState(params).then(res => {
			// if (!res.isOrg) {
			if (1) {
				store.commit('changeOrgState',1)
				// next('/apply')
			}
		});
	}
	next()
})

export default router
