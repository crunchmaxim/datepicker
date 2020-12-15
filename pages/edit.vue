<template lang="pug">
    div 
        .form-wrapper
            .home-link-wrapper
                nuxt-link.home-link(to='/')  &lt; Home
            .create-new-note(v-if="this.$route.query.id") Edit note
            .create-new-note(v-else) Create new note
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
        border-radius: 10px;
        background-color: #1565C0;
        color: #fff;
    }

    .input-wrapper {
        margin-top: 10px;
        display: flex;
        flex-direction: column;

        label {
            font-size: 18px; 
        }

        input {
            width: 500px;
            height: 30px;
            font-size: 16px;
            border-radius: 10px;
            border: none;
            &:focus {
                outline: none;
            } 
        }

        textarea {
            font-size: 16px;
            width: 500px;
            border-radius: 10px;
            &:focus {
                outline: none;
            } 
        } 
    }

    .form-btn {
        margin-top: 20px;
        font-size: 16px;
        background-color: #2196f3;
        border: none;
        cursor: pointer;
        border-radius: 10px;
        color: #fff;
        width: 200px;
        height: 30px;
        transition: 0.3s all;
        margin-left: 10px; 

        &:hover {
            background-color #fff;
            color: black;
        }
    }

    .create-new-note {
        font-size: 20px;
        font-weight: 500; 
        padding-left: 0px;
    }

    .home-link-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;   
    }

    .home-link {
        color: #fff;
    }
</style>