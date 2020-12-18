import createPersistedState from 'vuex-persistedstate'
// import * as shvl from 'shvl'

// export default ({ store }) => {
//   createPersistedState({
//     key: 'test',
//     reducer (state, paths) {
//      if (!state.auth.access_token || paths.length === 0) {
//        return {}
//      }
//      return paths.reduce(function (substate, path) {
//        return shvl.set(substate, path, shvl.get(state, path))
//      }, {})
//    },
//     paths: [
//      'user'
//     ]
//   })(store)
// }

// export default ({store}) => {
//     createPersistedState({
//       key: 'test',
//     })(store)
// }

// export default ({ store }) => {
//   createPersistedState({
//     key: 'lekey',
//     paths: [],
//     storage: {
//       getItem: key => localStorage.getItem(key),
//       setItem: (key, value) => localStorage.setItem(key, value),
//       removeItem: key => localStorage.removeItem(key)
//     }
//   })(store)
// }

// export default ({ store }) => {
//   window.onNuxtReady(() => {
//     createPersistedState({
//       key: 'test'
//     })(store)
//   })
// }