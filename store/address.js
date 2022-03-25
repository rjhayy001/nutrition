export const state = () => ({
  countries: [],
  zipcodes:[],
  cities:[],
})

export const mutations = {
  setCountries(state, countries) {
    state.countries = countries
  },
  setZipcodes(state, zipcodes) {
    state.zipcodes = zipcodes
  },
  setCities(state, cities) {
    state.cities = cities
  },
}

export const getters = {
  countries(state) {
    return state.countries
  },
  zipcodes(state) {
    return state.zipcodes
  },
  cities(state) {
    return state.cities
  }
}

export const actions = {
  FETCH_COUNTRIES({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.countries.length) {
        resolve(state.countries);
        return
      }

      this.$axios.get(`countries`).then(async({ data }) => {
        commit('setCountries', data.data)
        resolve(data);
      }).catch(({ response }) => {
        reject(response)
      })
    })
  },
  FETCH_ZIPCODES({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.zipcodes.length) {
        resolve(state.zipcodes);
        return
      }

      this.$axios.get(`zipcodes`).then(async({ data }) => {
        commit('setZipcodes', data.data)
        resolve(data);
      }).catch(({ response }) => {
        reject(response)
      })
    })
  },
  FETCH_CITIES({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.cities.length) {
        resolve(state.cities);
        return
      }

      this.$axios.get(`cities`).then(async({ data }) => {
        commit('setCities', data.data)
        resolve(data);
      }).catch(({ response }) => {
        reject(response)
      })
    })
  }
}