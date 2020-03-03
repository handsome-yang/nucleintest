import axios from 'axios';
import QS from 'qs';
import Vue from 'vue'
import { Toast,Loading } from 'vant';

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
	axios.defaults.baseURL = 'http://iot.xiaofuonline.com/Staff_management_app/home/NucleicAcid';
}
var loading;
// 设置请求超时时间
axios.defaults.timeout = 60000;
axios.interceptors.request.use(
	req => {
		loading = Toast.loading({
            // mask: true, //蒙层
            duration: 10000,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            loadingType: 'spinner',
            message: '加载中...'
        })
		return req
	},
	err => {
		return Promise.reject(err)
	}
);
// http响应拦截器
axios.interceptors.response.use(res => {
	if(res.data['reason']){
		Toast(res.data.reason)
	}
	
	if(res.data.success == 1){
		loading.clear();
		return res
	}else{
		return
	}
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
export const addFormData = params => { return post('/createNatApplication', params,{headers: { 'Content-Type':'application/x-www-form-urlencoded'}}).then(res => res) }
// 获取签核中表单
export const getSignatureInfo = params => { return post('/getSignatureInfo', QS.stringify(params)).then(res => res.data) }

// 获取审核列表
export const getSignatureList = params => { return post('/getSignatureList',QS.stringify(params)).then(res => res.data)}


// 通过审核
export const setPass = params => { return post('/signatureNAT',QS.stringify(params)).then(res => res.data)}

// 获取附件列表
export const getFileList = params => {return post('/getAttachmentList',QS.stringify(params)).then(res => res.data)}

// 确认申请单

export const confirmOd = params => { return post('/confirm',QS.stringify(params)).then(res => res)}

// 设置检查地点、时间

export const setCheckInfo = params => {return post('/setCheckInfo',QS.stringify(params)).then(res => res.data)}

// 录入结果
export const updateCheckResult = params => { return post('/updateCheckResult',params,{headers: { 'Content-Type':'application/x-www-form-urlencoded'}}).then(res => res)}