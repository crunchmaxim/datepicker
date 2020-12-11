<template lang="pug">
  .note-page 
    nuxt-link.home-link(to="/") Home
    .note-wrapper
        h3 Note info
        .note-field Id: {{note.id}}
        .note-field Title: {{note.title}}
        .note-field Text: {{note.text}}
        .note-field Date create {{note.date_create}}
</template>

<script>
export default {
    data() {
        return {
            note: ""
        }
    },
    mounted() {
        let id = this.$route.query.id;
        this.note = this.$store.getters.getOneNote(id);
    }
}
</script>

<style lang="stylus">
    .note-wrapper {
        margin: 20px;
        padding: 20px;
        border-radius: 5px;
        background-color: #005caf;
        color: #fff;
    }
</style>