export const state = () => ({
    notes: []
})

export const mutations = {
    getOneNote() {

    },
    setNotes(state, notes) {
        state.notes = [];
        state.notes = notes;
    }
}


export const actions = {
    // Fetch all notes when server init
    async nuxtServerInit ({ commit }) {
        const response = await this.$axios.$get('http://afs.alt-point.ru:8080/notes')
        commit('setNotes', response)
    },

    // Fetch all notes action
    async fetchAllNotes({commit}) {
        // Get updated note list from API
        const response = await this.$axios.$get('http://afs.alt-point.ru:8080/notes')
        commit('setNotes', response)

        // Redirect on home page
        this.$router.push('/')
    },

    // Update one note
    async updateOneNote({dispatch}, payload) {
        await this.$axios.$put('http://afs.alt-point.ru:8080/notes/' + payload.id, payload.note)
        await dispatch('fetchAllNotes')
        // // Get updated note list from API
        // const response = await this.$axios.$get('http://afs.alt-point.ru:8080/notes')
        // commit('setNotes', response)

        // // Redirect on home page
        // this.$router.push('/')
    },

    // Create new note
    async createNewNote({dispatch}, newNote) {
        await this.$axios.$post('http://afs.alt-point.ru:8080/notes', newNote)
        await dispatch('fetchAllNotes')

        // // Get updated note list from API
        // const response = await this.$axios.$get('http://afs.alt-point.ru:8080/notes')
        // commit('setNotes', response)
        // // Redirect on home page
        // this.$router.push('/')
    },

    //Delete one note
    async deleteOneNote({dispatch}, id) {
        await this.$axios.$delete('http://afs.alt-point.ru:8080/notes/' + id)
        await dispatch('fetchAllNotes')

        // // Get updated note list from API
        // const response = await this.$axios.$get('http://afs.alt-point.ru:8080/notes')
        // commit('setNotes', response)
    }
}

export const getters = {
    getAllNotes(state) {
        return state.notes
    },
    getOneNote: state => id => {
        return state.notes.filter(note => note.id == id)[0]
    }
}