export const state = () => ({
    notes: [],
    filter: ''
})

export const mutations = {
    getOneNote() {

    },
    setNotes(state, notes) {
        state.notes = [];
        state.notes = notes;
    },

    filterNotes(state, value) {
        state.filter = value
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
        try {
            // Get updated note list from API
            const response = await this.$axios.$get('http://afs.alt-point.ru:8080/notes')
            commit('setNotes', response)

            // Redirect on home page
            this.$router.push('/')
        } catch (error) {
            console.log(error)
        }

    },

    // Update one note
    async updateOneNote({dispatch}, payload) {
        try {
            await this.$axios.$put('http://afs.alt-point.ru:8080/notes/' + payload.id, payload.note)
            await dispatch('fetchAllNotes')
        } catch (error) {
            console.log(error)
        }
    },

    // Create new note
    async createNewNote({dispatch}, newNote) {
        try {
            await this.$axios.$post('http://afs.alt-point.ru:8080/notes', newNote)
            await dispatch('fetchAllNotes')
        } catch (error) {
            console.log(error)
        }
    },

    //Delete one note
    async deleteOneNote({dispatch}, id) {
        try {
            await this.$axios.$delete('http://afs.alt-point.ru:8080/notes/' + id)
            await dispatch('fetchAllNotes')
        } catch (error) {
            console.log(error)
        }
    },

    // Search notes by titles
    filterNotesByTitle({commit}, value) {
        commit('filterNotes', value)
    }
}

export const getters = {
    filter: s => s.filter,
    getAllNotes(state, getters) {
        return state.notes.slice().filter(({ title, text }) => getters.filter ? (() => {
            return title.toLowerCase().startsWith(getters.filter.toLowerCase()) ||
            text.toLowerCase().startsWith(getters.filter.toLowerCase())
        })() : true) 
    },
    getOneNote: state => id => {
        return state.notes.filter(note => note.id == id)[0]
    }
}