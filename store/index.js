export const state = () => ({
  sidebarStatus: true,
  miniVariant: false,
  resetForm: false,
  feedbackFlag: false,
  trackingFlag:false,
  profileDrawer:false
})

export const mutations = {
  updateSidebarStatus (state, value = null) {
    if (value) {
      state.sidebarStatus = value
    } else {
      state.sidebarStatus = !state.sidebarStatus
    }
  },
  updateMiniVariant (state, value = null) {
    if (value) {
      state.miniVariant = value
    } else {
      state.miniVariant = !state.miniVariant
    }
  },
  resetForm(state, value) {
    state.resetForm = value
  },
  updateFeedbackFlag (state, value) {
    state.feedbackFlag = value
  },
  updateTrackingFlag (state, value) {
    state.trackingFlag = value
  },
updateprofileDrawer (state, value) {
  state.profileDrawer = value
},
}

export const getters = {
  sidebarStatus (state) {
    return state.sidebarStatus
  },
  miniVariant (state) {
    return state.miniVariant
  },
  feedbackFlag (state) {
    return state.feedbackFlag
  },
  trackingFlag (state) {
    return state.trackingFlag
  },
  profileDrawer (state) {
    return state.profileDrawer
  }
}
