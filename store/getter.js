export default {
    researchDirectionCount: (state) => {
        return !!state.home.user.researchDirection ?
            state.home.user.researchDirection : []
    },
    subjectCount: (state) => {
        return !!state.home.user.subject ?
            state.home.user.subject.split(";") : ''
    },
    eUserName: (state) => {
        return !!state.home.user.eUserName ?
            state.home.user.eUserName : []
    },
    researchDirectionCounts: (state) => {
        return !!state.home.user.researchDirection ?
            state.home.user.researchDirection.length :
            0;
    },
    eUserNames: (state) => {
        return !!state.home.user.eUserName ?
            state.home.user.eUserName.length :
            0;
    },

}