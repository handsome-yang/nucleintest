import axios from 'axios';
import QS from 'qs';
import Vue from 'vue'
import { Toast } from 'vant';

Vue.use(Toast);
/**
 * 环境切换
 */

if (process.env.NODE_ENV == 'development') {
	// axios.defaults.baseURL = 'http://192.168.1.31/Staff_management_app/home/NucleicAcid';
	axios.defaults.baseURL = 'http://zzz.ngrok.ibanzhuan.cn/Staff_management_app/home/NucleicAcid';
} else if (process.env.NODE_ENV == "debug") {
	axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV == "production") {
	axios.defaults.baseURL = 'http://iot.xiaofuonline.com/Staff_management_app/Home/HealthStatus';
}

// 设置请求超时时间
axios.defaults.timeout = 60000;

// http响应拦截器
axios.interceptors.response.use(res => {
	if(!res.data.success){
		Toast(res.data.reason)
	}
	return res
}, error => {
	Toast('请求失败，请稍后重试！')
	return Promise.reject(error)
})
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		})
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err.data)
			})
	});
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
	return new Promise((resolve, reject) => {
		axios.post(url, params)
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data)
			})
	});
}
// 
export const getUserState = params => { return post('/getNatApplicationInfo', QS.stringify(params)).then(res => res.data) }
// 获取下拉框数据
export const getSelectList = params => { return post('/getOption', QS.stringify(params)).then(res => res.data) }
// 提交表单
export const addFormData = params => { return post('/createNatApplication', params,{headers: { 'Content-Type':'application/x-www-form-urlencoded'}}).then(res => res.data) }
// 获取签核中表单
export const getSignatureInfo = params => { return post('/getSignatureInfo', QS.stringify(params)).then(res => res.data) }
