const store = {
	state: {
		user: {},
		// snNo: '',
		userNo: uni.getStorageSync("userNo") || '',
		share: false,
		accessToken: '',
		userId: uni.getStorageSync("userId") || '',
	},
	mutations: {
		async setUser(state, user) {
			state.user = user
		},
		// async setSnNo(state, snNo) {
		// 	state.snNo = snNo
		// },
		async setUserNo(state, userNo) {
			state.userNo = userNo
		},
		async setShare(state, share) {
			state.share = share
		},
		async setAccessToken(state, accessToken) {
			state.accessToken = accessToken
		},
		async setUserId(state, userId) {
			state.userId = userId
		},
	},
	actions: {
		setUser: ({
			commit
		}, user) => {
			commit('setUser', user)
		},
		// setSnNo: ({
		// 	commit
		// }, snNo) => {
		// 	commit('setSnNo', snNo)
		// },
		setUserNo: ({
			commit
		}, userNo) => {
			commit('setUserNo', userNo)
		},
		setShare: ({
			commit
		}, share) => {
			commit('setShare', share)
		},
		setAccessToken: ({
			commit
		}, accessToken) => {
			commit('setAccessToken', accessToken)
		},
		setUserId: ({
			commit
		}, userId) => {
			commit('setUserId', userId)
		},
	}
}
export default store