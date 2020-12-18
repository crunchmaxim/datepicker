<template lang="pug">
.app
  modal-component(v-if="openModalCreate")
    template
      .modal-create
        .modal-create__title {{ editedId ? 'Редактировать заметку' : 'Создать заметку'}}
        input.modal-create__input(placeholder="Заголовок" v-model="title")
        textarea.modal-create__textarea(placeholder="Введите Ваш текст" v-model="text")
        button.modal-create__btn(@click="createNewNote()") {{ editedId ? 'Сохранить' : 'Создать'}}
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
  modal-component(v-if="openModalFilter")
    template
      .modal-filter
        .modal-filter__title Отфильтровать
        .modal-filter__subtitle По дате
        .modal-filter__datepickers
          date-picker(v-model="date", :disableDays="disableDaysStart" :inFormat="inFormat1" :outFormat="outFormat" placeholderText="с")
          date-picker(v-model="date2", :disableDays="disableDaysEnd" :inFormat="inFormat2" :outFormat="outFormat" placeholderText="по")
        .modal-filter__btn-wrapper  
          button.modal-filter__btn(@click="onSetFilter") Применить
          button.modal-filter__btn-close(@click="onClearFilter") Сбросить
        img.modal-filter__close(:src="require('../assets/img/close.png')" @click="openModalFilter = false")
  modal-component(v-if="openModalSort")
    .modal-sort
      .modal-sort__title Сортировать
      .modal-sort__sort-btn-wrapper
        button.modal-sort__sort-btn(@click="selectedSortMode = 'asc'" :class="selectedSortMode === 'asc' ? 'active' : ''")
          img.modal-sort__icon(:src="require('../assets/img/sort_asc.svg')" :class="selectedSortMode === 'asc' ? 'active' : ''")
          span От старых к новым
        button.modal-sort__sort-btn(@click="selectedSortMode = 'desc'" :class="selectedSortMode === 'desc' ? 'active' : ''")
          img.modal-sort__icon(:src="require('../assets/img/sort_desc.svg')" :class="selectedSortMode === 'desc' ? 'active' : ''")
          span От новых к старым
      .modal-sort__btn-wrapper
        button.modal-sort__btn(@click="onSetSort") Применить
        button.modal-sort__btn-close(@click="onClearSort") Сбросить
      img.modal-sort__close(:src="require('../assets/img/close.png')" @click="openModalSort = false")
  .container
    .header
        .header__title Мои заметки
        .header__content
          search-input(@onFilterClick="() => {openModalFilter = true}" @onSortClick="openModalSort = true")
          button.header__create-note(@click="openModalCreate = true") 
            img(:src="require('../assets/img/plus.png')")
            span Создать
    .notes-wrapper 
      transition-group(name="animated")
        note-component(v-for="note in filteredCollection" :key="note.id" :note="note" @editNote="editNote(note)" @deleteNote="onClickDelete(note.id)")
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
      date: "",
      date2: "",
      selectedDate: "",
      selectedDate2: "",
      inFormat1: "yyyy-MM-dd",
      inFormat2: "TT",
      outFormat: "dd.MM.yyyy",
      filterMode: { type: "", variant: "" },
      datepickerVariant: "create",
      openModalCreate: false,
      openModalConfirm: false,
      openModalFilter: false,
      openModalSort: false,
      isFilterMode: false,
      selectedSortMode: "",
      sortMode: "",
      isSorted: false,
      title: "",
      text: "",
      editedId: null,
    };
  },
  methods: {
    // Set sort filter
    onSetSort() {
      if (this.selectedSortMode !== "") {
        this.sortMode = this.selectedSortMode
        this.isSorted = true;
      }
      this.openModalSort = false;
    },
    //Clear sort filter
    onClearSort() {
      this.isSorted = false;
      this.selectedSortMode = "";
      this.sortMode = "";
      this.openModalSort = false;
    },

    // Set date filter
    onSetFilter() {
      if (this.date !== "" && this.date2 !== "") {
        // this.isFilterMode = true;
        this.selectedDate = this.date
        this.selectedDate2 = this.date2
        this.openModalFilter = false;
      }
    },
    // Clear date filter
    onClearFilter() {
      this.date = "";
      this.date2 = "";
      this.selectedDate = '';
      this.selectedDate2 = ''
      this.isFilterMode = false;
      this.openModalFilter = false;
    },

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
        this.$store.dispatch("updateOneNote", payload);
      } else {
        this.$store.dispatch("createNewNote", {
          title: this.title,
          text: this.text,
        });
      }

      this.title = "";
      this.text = "";
      this.editedId = null;
      this.openModalCreate = false;
    },
    editNote(note) {
      (this.editedId = note.id),
        (this.title = note.title),
        (this.text = note.text),
        (this.openModalCreate = true);
    },

    // Delete tone
    onClickDelete(id) {
      this.$store.dispatch("deleteOneNote", id);
    },
    
    // Disable days functions
    disableDaysStart(day) {
      return day > new Date(this.date2);
    },
    disableDaysEnd(day) {
      return day < new Date(this.date);
    },

    // Set filter mode
    // setFilter(variant) {
    //   this.filterMode.variant = variant;

    //   if (this.filterMode.type === "" || this.filterMode.type === "desc") {
    //     return (this.filterMode.type = "asc");
    //   } else {
    //     return (this.filterMode.type = "desc");
    //   }
    // },


    // // Clear filters
    // clearFilters() {
    //   this.datepickerVariant = "create";
    //   this.filterMode.type = "";
    //   this.filterMode.variant = "";
    // },
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

    // Filtered collection
    filteredCollection() {

      let collection = this.$store.getters["getAllNotes"];

      // Filter by search input
      const filterText = this.$store.getters["filter"];
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

      // Asc/desc date sort
      if (this.isSorted) {
        let copyCollection = collection.slice()
        if (this.sortMode === "asc") {
          copyCollection.sort((a, b) => {
            return a.date_create - b.date_create;
          });
        } else if (this.sortMode === "desc") {
          copyCollection.sort((a, b) => {
            return b.date_create - a.date_create;
          });
        }
        collection = copyCollection
        this.isSorted = false;
      } 

      // Format date helper function
      function formatDate(date) {
        return new Date(date).setHours(0, 0, 0, 0);
      }
      
      // Filter by dates and datepicker variant
      if (this.selectedDate !== '' && this.selectedDate2 !== '') {
        let filtered = collection.filter((item) => {
          if (
            formatDate(item.date_create * 1000) >= formatDate(this.selectedDate) &&
            formatDate(item.date_create * 1000) <= formatDate(this.selectedDate2)
          ) {
            return item;
          }
        });
        return filtered;
      }
      return collection;    
    },
  },
  mounted() {
    // debugger;
    localStorage.setItem('notes-app', JSON.stringify(this.$store.state))
  }
};
</script>

<style lang="stylus">
// Variables
$black = #333438;
$grey = #D8D8D8;
$pink = #FF598B;
$white = #FFF;


.animated-move {
  transition: transform 1s;
}

.animated-enter-active, .animated-leave-active {
  transition: all 1s;
}
.animated-enter, .animated-leave-to /* .animated-leave-active до версии 2.1.8 */ {
  opacity: 0;
}


.container {
  max-width: 1160px;
  width: 100%;
  margin: 0 auto;
  margin-top: 128px;
  padding-bottom: 100px; 
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
    font-size: 18px;
    font-weight: 500;

    img {
      margin-right: 8px;
    }
  }
}

.notes-wrapper {
  margin-top: 40px;
  column-count: 3;
  column-gap: 40px
}

.modal-create {
  width: 900px;
  height: 700px;
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

.modal-filter {
  width: 500px;
  height: 260px;
  padding: 40px;
  border-radius: 5px;
  color: $black;
  position: relative;

  &__title {
    font-size: 22px;
    font-weight: 700;
  }

  &__subtitle {
    font-size: 18px;
    margin-top: 20px;
  }

  &__datepickers {
    display: flex;
    margin-top: 20px;
  }

  &__btn-wrapper {
    display: flex;
    margin-top: 20px;
  }

  &__btn {
    width: 150px;
    height: 40px;
    background-color: $pink;
    font-size: 14px;
    color: $white;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    cursor: pointer;
  }

  &__btn-close {
    background-color: #fff;
    border: 2px solid $pink;
    border-radius: 15px;
    color: $pink;
    width: 150px;
    height: 40px;
    cursor: pointer;
    margin-left: 20px;
  }

  &__close {
    position: absolute;
    width: 16px;
    top: 32px;
    right: 32px;
    cursor: pointer;
  }
}

.modal-sort {
  width: 580px;
  height: 220px;
  border-radius: 5px;
  padding: 40px;
  position: relative;

  &__title {
    font-size: 22px;
    color: $black;
    font-weight: 700;
  }

  &__sort-btn-wrapper {
    margin-top: 20px;
    display: flex;
  }

  &__icon.active {
    filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(207deg) brightness(102%) contrast(102%);
  }

  &__sort-btn {
    width: 240px;
    height: 40px;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    text-align: left;

    display: flex;
    align-items: center;
    padding-left: 21px;

    & img {
      margin-right: 17px;
    }

    &:hover {
      background-color: $pink;
      color: $white;

      .modal-sort__icon {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(207deg) brightness(102%) contrast(102%);
      }
    }

    &:focus {
      outline: none;
    }

    &.active {
      background-color: $pink;
      color: $white;
    }

    &:last-child {
      margin-left: 20px;
    }
  }

  &__btn-wrapper {
    margin-top: 20px;
  }

  &__btn {
    width: 150px;
    height: 40px;
    background: $pink;
    border: none;
    border-radius: 15px;
    color: $white;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
  }

  &__btn-close {
    width: 150px;
    height: 40px;
    background-color: #fff;
    border: 2px solid $pink;
    border-radius: 15px;
    margin-left: 20px;
    color: $pink;
    cursor: pointer;
  }

  &__close {
    width: 16px;
    position: absolute;
    top: 32px;
    right: 32px;
    cursor: pointer;
  }
}

.app {
  display: flex;
  flex-direction: column;
}

.picker-wrapper {
  display: flex;
  padding-top: 20px;
}

@media (max-width: 1200px) {
  .container {
    width: 90%;
  }

  .notes-wrapper {
    column-count: 2;
  }

  .modal-create {
  width: 700px;
  height: 500px;
  padding: 20px;

    &__btn {
      margin-top: 20px;
    }

    &__close {
      top: 20px;
      right: 20px;
    }
  }
}

@media (max-width: 768px) {
  .modal-create {
  width: 500px;
  height: 500px;
  padding: 20px;
  }

  .modal-sort {
    width: 500px;
    padding: 20px;

    &__sort-btn {
      width: 200px;
    }
  }
}



@media (max-width: 576px) {
  .notes-wrapper {
    display: flex;
    flex-direction: column;
    jujstify-content: center;
    align-items: center;
    margin-top: 0px;


    width: 98%;
    margin: 0 auto;  
  }

  .container {
    margin-top: 30px;
  }

  .modal-create {
    width: 280px;
    height: 500px;

    &__btn {
      display: block;
      margin: 0 auto;
      margin-top: 20px; 
    }

    &__title {
      font-size: 24px; 
    }

    &__input {
      font-size: 16px; 
    }

    &__textarea {
      font-size: 16px;
      height: 230px; 
    }
  }

  .modal-confirm {
    width: 250px;
    height: 250px;
    padding: 20px;

    div {
      text-align: center;
      font-size: 16px;  
    }
  }

  .modal-filter, .modal-sort {
    width: 300px;
    height: 300px;
    padding: 20px;

    &__datepickers {
      flex-direction: column;
    }
  }

  .modal-sort {
    &__sort-btn-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__sort-btn:last-child {
      margin-left: 0px;
      margin-top: 10px;
    }

    &__btn-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    &__btn-close {
      margin-left: 0px;
      margin-top: 10px;
    }
  }

  .header {
    position: sticky; 
    top: 0;
    z-index: 4;
    padding: 20px 0px;

    &__content {
      flex-direction: column;
    }

    &__title {
      text-align: center !important;
    }

    button {
      display: block;
      margin: 0 auto;
      margin-top: 20px; 
    }
  }
}
</style>