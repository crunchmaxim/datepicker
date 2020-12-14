<template lang="pug">
    div Edit page
        br
        nuxt-link.home-link(to='/') Home from nuxt-link
        .form-wrapper
            h3 Create new note
            form(@submit.prevent="onSubmit")
                .input-wrapper
                    label(for="title") Title:
                    input(v-model="title", placeholder="Enter title" name="title" id="title")
                .input-wrapper
                    label(for="text") Text:
                    textarea(v-model="text", placeholder="Enter text" name="text" id="text")
                button.form-btn Submit
</template>

<script>
export default {
    data() {
        return {
            title: '',
            text: '',
            id: ''
        }
    },
    methods: {
        onSubmit() {
            if (this.title !== '' && this.text !== '') {
                if (this.$route.query.id) {
                    let payload = {
                        id: this.id,
                        note: {
                            title: this.title,
                            text: this.text
                        }
                    };                    
                    this.$store.dispatch('updateOneNote', payload)
                } else {
                    this.$store.dispatch('createNewNote', {
                        title: this.title,
                        text: this.text
                    })
                }
            }
        }
    },
    mounted() {
        if (this.$route.query.id) {
            let note = this.$store.getters.getOneNote(this.$route.query.id)
            this.title = note.title,
            this.text = note.text,
            this.id = note.id
        }
    }
}
</script>

<style lang="stylus">
    .form-wrapper {
        margin: 20px;
        padding: 20px;
        border-radius: 5px;
        background-color: #1565C0;
        color: #fff;
    }

    .input-wrapper {
        margin-top: 10px;
        display: flex;
        flex-direction: column;

        input {
            width: 300px;
            height: 30px;
            font-size: 16px; 
        }

        textarea {
            font-size: 16px; 
        } 
    }

    .form-btn {
        margin-top: 20px;
        font-size: 16px;
        background-color: #fff;
        border: none;
        cursor: pointer;
        border-radius: 5px;
    }
</style>