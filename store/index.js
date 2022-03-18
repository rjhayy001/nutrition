export const state = () => ({
  sidebarStatus: true,
  miniVariant: false
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