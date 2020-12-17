<template lang="pug">
  .note
    .note__title {{note.title}}
    .note__text {{note.text}}
    .note__footer
        .note__date {{formatedDate}}
        .note__icons
          img(:src="require('../assets/img/edit.png')" @click="$emit('editNote')")
          img(:src="require('../assets/img/delete.png')" @click="$emit('deleteNote')")
</template>

<script>
import { format } from 'date-fns';

export default {
    name: "NoteComponent",
    props: {
      note: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      formatedDate() {
        return format(new Date(this.note.date_create*1000), 'dd.MM.yyyy')
      }
    }
}
</script>

<style lang="stylus">
.note {
  padding: 40px 19px 30px 20px;
  // width: 360px;
  width: 100%;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  margin-top: 40px;
  display: inline-block;
  box-sizing: border-box;
  break-inside: avoid-column;
  background-color: #fff;

  &__title {
    font-size: 22px;
    font-weight: 700;  
  }

  &__text {
    font-size: 14px;
    font-weight: 400;
    color: $black;
    margin-top: 25px;  
  }

  &__footer {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;   
  }

  &__icons {
    display: flex;

    img {
      margin-left: 25px;
      cursor: pointer;
      width: 12px;
      height: 16px;
    }
  }
}

@media (max-width: 1200px) {
  .note {
    // width: 98%;
  }
}
</style>