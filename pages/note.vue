<template lang="pug">
  .note-page 
    .note-wrapper
        .home-link-wrapper
            nuxt-link.home-link(to='/')  &lt; Home
        .note-info Note info
        .note-title {{note.title}}
        .note-text {{note.text}}
        .note-date Created: {{new Date(note.date_create*1000).toUTCString()}}
        .note-date Updated: {{new Date(note.date_create*1000).toUTCString()}}

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
        border-radius: 10px;
        background-color: #1565C0;
        color: #fff;
    }

    .note-title {
        font-size: 20px;
        font-weight: 500;
        border-bottom: 1px solid #fff; 
    }

    .note-info {
        font-size: 20px;    
        font-weight: 500;
        margin-bottom: 20px;
    }

    .note-text {
        margin-top: 10px;
        margin-bottom: 25px;
        font-size: 18px;
    }

    .note-date {
        font-size: 14px; 
    }

    .home-link-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;   
    }

    .home-link {
        color: #fff;
    }

    @media (max-width: 576px) {
        .note-wrapper {
            padding: 8px;
        }
    }
</style>