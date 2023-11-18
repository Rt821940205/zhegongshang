import Request from '@/uni_modules/uview-ui/libs/luch-request/index.js'
import strore from '@/store/index.js'
import {
	BASE_API
} from './url.js'
// import qs from 'qs'
const http = new Request({
	baseURL: BASE_API, //设置请求的base url
	timeout: 300000, //超时时长5分钟,
	header: {
		'Content-Type': 'application/json;charset=UTF-8;'
	}
})

//请求拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	//needUserIds是否是本学者的userId
	if (!config.data.needUserId) {
		const userId = strore.state.home.userId;
		config.data = Object.assign(config.data, {
			userId
		})
	}
	return config
}, error => {
	return Promise.resolve(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
	return response.data
}, (error) => {
	//未登录时清空缓存跳转
	if (error.statusCode == 401) {
		uni.clearStorageSync();
		uni.switchTab({
			url: "/pages/visitingcard/index"
		})
	}
	return Promise.resolve(error)
})
export default http;