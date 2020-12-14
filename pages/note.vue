<template lang="pug">
  .note-page 
    .note-wrapper
        .home-link-wrapper
            nuxt-link.home-link(to='/')  &lt; Home
        .note-info Note info
        .note-field.title Title: {{note.title}}
        .note-field.text Text: {{note.text}}
        .note-field Date create: {{new Date(note.date_create*1000).toUTCString()}}
        .note-field Date update: {{new Date(note.date_create*1000).toUTCString()}}

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
        background-color: #1565C0;
        color: #fff;
    }

    .note-field.title {
        font-size: 20px;
        font-weight: 500; 
    }

    .note-info {
        font-size: 20px; 
        font-weight: 500;
        margin-bottom: 20px;
    }

    .note-field.text {
        margin-top: 10px;
        margin-bottom: 25px;
        font-size: 20px;
        font-weight: 500; 
    }
</style>