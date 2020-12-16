<template lang="pug">
.app
  modal-component(v-if="openModalCreate")
    template
      .modal-create
        .modal-create__title {{ editedId ? 'Редактировать заметку' : 'Создать заметку'}}
        input.modal-create__input(placeholder="Заголовок" v-model="title")
        textarea.modal-create__textarea(placeholder="Введите Ваш текст" v-model="text")
        button.modal-create__btn(@click="createNewNote()") Создать
        img.modal-create__close(:src="require('../assets/img/close.png')" @click="openModalConfirm = true")
  modal-component(v-if="openModalConfirm")
    template
      .modal-confirm
        .modal-confirm__title 
          div Вы уверены, что хотите закрыть окно? 
          div В этом случае, изменения не сохранятся
        .modal-confirm__btn-wrapper
          button.modal-confirm__btn(@click="openModalConfirm = false") Вернуться
          button.modal-confirm__btn-close(@click="() => {openModalConfirm = false; openModalCreate = false;}") Закрыть
  .container
    .picker-wrapper
      date-picker(v-model="date", :disableDays="disableDaysStart" :style="stylePrimary" :inFormat="inFormat1" :outFormat="outFormat")
      date-picker(v-model="date2", :disableDays="disableDaysEnd" :style="styleSecondary" :inFormat="inFormat2" :outFormat="outFormat")
    .header
        .header__title  Мои заметки
        .header__content
          search-input
          button.header__create-note(@click="openModalCreate = true") 
            img(:src="require('../assets/img/plus.png')")
            span Создать
    .notes-wrapper 
      note-component(v-for="note in filteredCollection" :note="note" @editNote="editNote(note)")




    //- items-list(:collection="filteredCollection" tag="ul" item-tag="li")
    //-   template(v-slot:header)

        //- .header-content
        //-   .filter-wrapper
        //-     div.filter
        //-       button.btn-filter(@click="setDatepickerMode('create')") Filter by date create
        //-       button.btn-filter(@click="setDatepickerMode('update')") Filter by date update
        //-     div.filter 
        //-       button.btn-filter(@click="setFilter('create')") Sort by date create
        //-       button.btn-filter(@click="setFilter('update')") Sort by date update
        //-   .search-wrapper
        //-     .current-filters
        //-       div(v-for="filter in currentFilters") {{}}
        //-       button.btn-filter(@click="clearFilters" v-if="filterMode.type !== ''") Clear filters
        //- .create-new-note
        //-   nuxt-link(to='/edit') +Create new note

      //- template(#item="{ item: { title, date_create, date_update, id, text }, index }")
      //-   .note
      //-     .note-title {{}}
      //-     .note-text {{}}
      //-     .note-date {{()}}
      //-     img(:src="require('../assets/img/edit.png')")
      //-     img(:src="require('../assets/img/delete.png')")



      //- template(#tools="{item, index}")
      //-   nuxt-link(:to="'/edit?id=' + item.id") 
      //-     button.item-btn
      //-       img(:src="require('../assets/img/edit.png')" class="btn-icon")
      //-   button.item-btn(@click="onClickDelete(item.id)")
      //-     img(:src="require('../assets/img/delete.png')" class="btn-icon")
      template(v-slot:footer) 
        .count-info Count of items: {{}}
        button.show-more(@click="showMore" v-if="collection.length > countOfItems") Show more +
</template>

<script>
import DatePicker from "@/components/DatePicker";
import ItemsList from "@/components/ItemsList";
import SearchInput from "@/components/SearchInput";
import NoteComponent from "@/components/NoteComponent";
import ModalComponent from "@/components/ModalComponent";

export default {
  components: {
    DatePicker,
    ItemsList,
    SearchInput,
    NoteComponent,
    ModalComponent,
  },
  data() {
    return {
      countOfItems: 10,
      date: "2020-12-07",
      date2: Date.now(),
      inFormat1: "yyyy-MM-dd",
      inFormat2: "TT",
      outFormat: "dd.MM.yyyy",
      filterMode: { type: "", variant: "" },
      datepickerVariant: "create",
      openModalCreate: false,
      openModalConfirm: false,
      title: "",
      text: "",
      editedId: null,
    };
  },
  methods: {
    // Create / edit note
    createNewNote() {
      if (this.editedId) {
        let payload = {
          id: this.editedId,
          note: {
            title: this.title,
            text: this.text,
          },
        };
        this.$store.dispatch('updateOneNote', payload)
      } else {
        this.$store.dispatch("createNewNote", {
          title: this.title,
          text: this.text,
        });
      }

      this.editedId = null;
      this.openModalCreate = false;
    },
    editNote(note) {
      (this.editedId = note.id),
        (this.title = note.title),
        (this.text = note.text),
        (this.openModalCreate = true);
    },

    // Check index
    onClickDelete(id) {
      this.$store.dispatch("deleteOneNote", id);
    },
    disableDaysStart(day) {
      return day > new Date(this.date2);
    },
    disableDaysEnd(day) {
      return day < new Date(this.date);
    },
    showMore() {
      this.countOfItems += 10;
    },

    // Set filter mode
    setFilter(variant) {
      this.filterMode.variant = variant;

      if (this.filterMode.type === "" || this.filterMode.type === "desc") {
        return (this.filterMode.type = "asc");
      } else {
        return (this.filterMode.type = "desc");
      }
    },

    // Set datepicker mode
    setDatepickerMode(variant) {
      this.datepickerVariant = variant;
    },

    // Clear filters
    clearFilters() {
      this.datepickerVariant = "create";
      this.filterMode.type = "";
      this.filterMode.variant = "";
    },
  },
  computed: {
    stylePrimary() {
      return {
        "--color": "#caffbf",
      };
    },
    styleSecondary() {
      return {
        "--color": "#9bf6ff",
      };
    },
    // Collection from vuex
    collection() {
      return this.$store.getters["getAllNotes"];
    },
    // Filtered collection
    filteredCollection() {
      // let collection = this.$store.getters["getAllNotes"];

      let collection = this.$store.getters["getAllNotes"];

      const filterText = this.$store.getters["filter"];

      // Filter by search input
      if (filterText !== "") {
        collection = collection.filter((note) => {
          if (note.title.toLowerCase().startsWith(filterText.toLowerCase())) {
            return note;
          } else if (
            note.text.toLowerCase().startsWith(filterText.toLowerCase())
          ) {
            return note;
          }
        });
      }

      // Asc/desc created date filter
      if (this.filterMode.type === "asc") {
        if (this.filterMode.variant === "create") {
          collection.sort((a, b) => {
            return a.date_create - b.date_create;
          });
        } else {
          collection.sort((a, b) => {
            return a.date_update - b.date_update;
          });
        }
      } else if (this.filterMode.type === "desc") {
        if (this.filterMode.variant === "create") {
          collection.sort((a, b) => {
            return b.date_create - a.date_create;
          });
        } else {
          collection.sort((a, b) => {
            return b.date_update - a.date_update;
          });
        }
      }

      // Format date helper function
      function formatDate(date) {
        return new Date(date).setHours(0, 0, 0, 0);
      }

      // Filter by dates and datepicker variant
      if (this.datepickerVariant === "create") {
        let filtered = collection.filter((item) => {
          if (
            formatDate(item.date_create * 1000) >= formatDate(this.date) &&
            formatDate(item.date_create * 1000) <= formatDate(this.date2)
          ) {
            return item;
          }
        });
        return filtered;
      } else if (this.datepickerVariant === "update") {
        let filtered = collection.filter((item) => {
          if (
            formatDate(item.date_update * 1000) >= formatDate(this.date) &&
            formatDate(item.date_update * 1000) <= formatDate(this.date2)
          ) {
            return item;
          }
        });
        return filtered;
      }
    },

    // Current using filters
    currentFilters() {
      let filters = [];

      filters.push(`Filtered by: ${this.datepickerVariant}`);

      if (this.filterMode.variant !== "" && this.filterMode.type !== "") {
        filters.push(
          `Sorted by: ${this.filterMode.variant} (${this.filterMode.type})`
        );
      }

      return filters;
    },
  },
};
</script>

<style lang="stylus">
// Variables
$black = #333438;
$grey = #D8D8D8;
$pink = #FF598B;
$white = #FFF;

.container {
  // padding 0 140px
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
}

.header {
  background-color: #fff;

  &__title {
    color: $black;
    font-size: 36px;
    font-weight: 500;
    text-align: left;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  &__create-note {
    width: 180px;
    height: 40px;
    background-color: $pink;
    border-radius: 15px;
    border: none;
    margin-left: 30px;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    img {
      margin-right: 8px;
    }
  }
}

.notes-wrapper {
  margin-top: 40px;
  display: flex;
  flex-flow: column wrap;
  // flex-flow: row wrap;
  height: 2000px;
}

.modal-create {
  width: 900px;
  height: 700px;
  border-radius: 5px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  position: relative;

  &__title {
    font-size: 36px;
    font-weight: 500;
  }

  &__input {
    margin-top: 40px;
    height: 60px;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    font-size: 22px;
    color: $black;
    padding-left: 20px;
  }

  &__textarea {
    margin-top: 20px;
    height: 380px;
    width: 100%;
    font-size: 22px;
    color: $black;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    padding: 20px;
  }

  &__input, &__textarea {
    &:focus {
      outline: none;
    }
  }

  &__btn {
    width: 180px;
    height: 40px;
    background-color: $pink;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
    border: none;
    border-radius: 15px;
    margin-top: 40px;
  }

  &__close {
    position: absolute;
    right: 40px;
    top: 47px;
    cursor: pointer;
  }
}

.modal-confirm {
  width: 420px;
  height: 200px;
  padding: 40px 20px;
  border-radius: 5px;

  &__title {
    font-size: 18px;
    color: $black;
  }

  &__btn-wrapper {
    margin-top: 31px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__btn {
    width: 150px;
    height: 40px;
    background-color: $pink;
    color: #fff;
    font-size: 14px;
    // font-family: "Roboto"
    border: none;
    border-radius: 15px;
    margin-right: 10px;
    cursor: pointer;
  }

  &__btn-close {
    width: 150px;
    height: 40px;
    background-color: #fff;
    border-radius: 15px;
    font-size: 14px;
    color: $pink;
    border: 2px solid $pink;
    margin-left: 10px;
    cursor: pointer;
  }
}

// ////////////////////////////////////////////////////
.app {
  display: flex;
  flex-direction: column;
}

.picker-wrapper {
  display: flex;
  padding-top: 20px;
}
</style>