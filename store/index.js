export const state = () => ({
    notes: []
})

export const mutations = {
    getOneNote() {

    },
    setNotes(state, notes) {
        state.notes = notes;
    }
}

export const actions = {
    async fetchAllNotes({commit}) {
        const response = await this.$axios.$get('http://afs.alt-point.ru:8080/notes')

        commit('setNotes', response)
    },
    updateOneNote() {},
    deleteOneNote() {}
}

export const getters = {
    getAllNotes(state) {},
    getOneNote(state) {}
}