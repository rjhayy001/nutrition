export const state = () => ({
  sidebarStatus: true,
  miniVariant: false,
  resetForm:false,
})

export const mutations = {
  updateSidebarStatus(state, value = null) {
    if (value) {
      state.sidebarStatus = value
    } else {
      state.sidebarStatus = !state.sidebarStatus
    }
  },
  updateMiniVariant(state, value = null) {
    if (value) {
      state.miniVariant = value
    } else {
      state.miniVariant = !state.miniVariant
    }
  },
  resetForm(state, value) {
    state.resetForm = value
  }
}

export const getters = {
  sidebarStatus(state) {
    return state.sidebarStatus
  },
  miniVariant(state) {
    return state.miniVariant
  }
}
