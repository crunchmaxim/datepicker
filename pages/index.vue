<template lang="pug">
.app
  .container
    .picker-wrapper
      date-picker(v-model="date", :disableDays="disableDaysStart" :style="stylePrimary" :inFormat="inFormat1" :outFormat="outFormat")
      date-picker(v-model="date2", :disableDays="disableDaysEnd" :style="styleSecondary" :inFormat="inFormat2" :outFormat="outFormat")
    items-list(:collection="filteredCollection" tag="ul" item-tag="li")
      template(v-slot:header) 
        h1 Item List
        div.filter
          div Datepicker mode: 
          button.btn-filter(@click="setDatepickerMode('create')") By date create
          button.btn-filter(@click="setDatepickerMode('update')") By date update
        div.filter 
          div Filter by: 
          button.btn-filter(@click="setFilter('create')") Filter by date create
          button.btn-filter(@click="setFilter('update')") Filter by date update
        search-input
        .current-filters
          div(v-for="filter in currentFilters") {{filter}}
          button.btn-filter(@click="clearFilters" v-if="filterMode.type !== ''") Clear filters
        .create-new-note
          h2
            nuxt-link(to='/edit') +Create new note
      template(#item="{ item: { title, date_create, date_update, id, text }, index }")
        .item
          div id: {{id}}
          div
            nuxt-link.item-title(:to="'/note?id=' + id") Title: {{title}}
          div.item-text Text: {{text}}
          div.item-date Date create: {{new Date(date_create*1000)}}
          div.item-date Date update: {{new Date(date_update*1000)}}
      template(#tools="{item, index}")
        nuxt-link(:to="'/edit?id=' + item.id") 
          button.item-btn Edit
        button.item-btn(@click="onClickDelete(item.id)") Delete
      template(v-slot:footer) 
        .count-info Count of items: {{filteredCollection.length}}
        button.show-more(@click="showMore" v-if="collection.length > countOfItems") Show more +
</template>

<script>
import DatePicker from "@/components/DatePicker";
import ItemsList from "@/components/ItemsList";
import SearchInput from "@/components/SearchInput";

export default {
  components: {
    DatePicker,
    ItemsList,
    SearchInput,
  },
  data() {
    return {
      countOfItems: 10,
      date: "2020-12-07",
      date2: Date.now(),
      inFormat1: "yyyy-MM-dd",
      inFormat2: "TT",
      outFormat: "dd.MM.yyyy",
      filterMode: {type: '', variant: ''},
      datepickerVariant: "create",
    };
  },
  methods: {
    onClickEdit(item) {
      console.log(item);
    },
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
    }
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
      return this.$store.getters["getAllNotes"]
    },    
    // Filtered collection
    filteredCollection() {
      // let collection = this.$store.getters["getAllNotes"];

      let collection = this.$store.getters["getAllNotes"];

      const filterText = this.$store.getters["filter"];

      // Filter by search input
      if (filterText !== '') {
        collection = collection.filter(note => {
          if (note.title.toLowerCase().startsWith(filterText.toLowerCase())) {
            return note
          } else if (note.text.toLowerCase().startsWith(filterText.toLowerCase())) {
            return note
          }
        })
      }

      // Asc/desc created date filter
      if (this.filterMode.type === "asc") {
        if (this.filterMode.variant === 'create') {
          collection.sort((a, b) => {
            return a.date_create - b.date_create;
          });
        } else {
          collection.sort((a, b) => {
            return a.date_update - b.date_update;
        });
        }
      } else if (this.filterMode.type === "desc") {
        if (this.filterMode.variant === 'create') {
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
      if (this.datepickerVariant === 'create') {
        let filtered = collection.filter((item) => {
          if (
            formatDate(item.date_create * 1000) >= formatDate(this.date) &&
            formatDate(item.date_create * 1000) <= formatDate(this.date2)
          ) {
            return item;
          }
        });
        return filtered.slice(0, this.countOfItems);;
      } else if (this.datepickerVariant === 'update') {
        let filtered = collection.filter((item) => {
          if (
            formatDate(item.date_update * 1000) >= formatDate(this.date) &&
            formatDate(item.date_update * 1000) <= formatDate(this.date2)
          ) {
            return item;
          }
        });
        return filtered.slice(0, this.countOfItems);;
      }
    },

    // Current using filters
    currentFilters() {
      let filters = [];

      filters.push(`Datepicker vairant: ${this.datepickerVariant}`)

      if (this.filterMode.variant !== '' && this.filterMode.type !== '') {
        filters.push(`Filtered by: ${this.filterMode.variant} (${this.filterMode.type})`)
      }

      return filters;
    },
  },
};
</script>

<style lang="stylus">
.app {
  display: flex;
  flex-direction: column;
}

.picker-wrapper {
  display: flex;
}

.item {
  padding: 5px;
}

.item-btn {
  width: 60px;
  height: 100%;
  border-radius: 5px;
  margin: 0 2px;
  cursor: pointer;
  border: 2px solid #1565C0;
  background-color #1565C0;
  color: #fff;
  transition: 0.3s all; 

  &:hover {
    background-color: #fff;
    color: #005caf;
  }
}

a {
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.item-title, .item-text {
  color: black;
  font-size: 20px;
  font-weight: 500; 
}

.create-new-note {
  text-align: left;
  padding-left: 38px;
}

.filter {
  display: flex;
  justify-content: flex-end;
  align-items: center;   
}

.btn-filter {
  width: 220px;
  height: 30px;
  font-size: 16px;
  margin-bottom: 2px;
  background: #005caf;  
  cursor pointer;
  border: 1px solid #fff;
  border-radius: 5px;
  color: #fff;
  transition: 0.3s all;
  margin-left: 5px;

  &:hover {
    color: #005caf;
    background-color: #fff;
  } 

  &:focus {
    outline: none; 
  }
}

.current-filters {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end; 

  div {
    text-align right
  }
}

.header {
  background-color: #1565C0;
  padding: 10px 20px;
  color: #fff;
}

.item-text {
  margin-bottom 25px;
}

.item-date {
  font-size: 14px;
}

.count-info {
  text-align: left;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 500; 
}

.show-more {
  background-color: #1565C0;
  border: 2px solid #1565C0;
  color: #fff;
  width: 180px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s all; 

  &:hover {
    background-color: #fff;
    color: #1565C0;
  }
}
</style>