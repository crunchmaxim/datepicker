<template lang="pug">
.app
  .picker-wrapper
    date-picker(v-model="date", :disableDays="disableDaysStart" :style="stylePrimary" :inFormat="inFormat1" :outFormat="outFormat")
    date-picker(v-model="date2", :disableDays="disableDaysEnd" :style="styleSecondary" :inFormat="inFormat2" :outFormat="outFormat")
  items-list(:collection="filteredCollection" tag="ul" item-tag="li")
    template(v-slot:header) 
      div Some header
      div.filter 
        button.btn-filter(@click="setFilter") Filter by date create
      search-input
      .create-new-note
        h3
          nuxt-link(to='/edit') +Create new note
    template(#item="{ item: { title, date_create, date_update, id, text }, index }")
      .item
        div id: {{id}}
        div
          nuxt-link(:to="'/note?id=' + id") Title: {{title}}
        div Text: {{text}}
        div Date create: {{new Date(date_create*1000)}}
        div Date update: {{new Date(date_update*1000)}}
    template(#tools="{item, index}")
      nuxt-link(:to="'/edit?id=' + item.id") 
        button.item-btn Edit
      button.item-btn(@click="onClickDelete(item.id)") Delete
    template(v-slot:footer) count of items: {{filteredCollection.length}}
      button(@click="showMore" v-if="filteredCollection.length == countOfItems") Show more
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
  // Fetch data from API
  // async asyncData({ store }) {
  //   await store.dispatch('fetchAllNotes')
  // },
  data() {
    return {
      collection: [],
      countOfItems: 10,
      date: "2020-12-07",
      // date2: "2020-12-25",
      date2: Date.now(),
      inFormat1: "yyyy-MM-dd",
      // inFormat2: "yyyy-MM-dd",
      inFormat2: "TT",
      outFormat: "dd.MM.yyyy",
      filter: "",
    };
  },
  methods: {
    onClickEdit(item) {
      console.log(item);
    },
    onClickDelete(id) {
      this.$store.dispatch("deleteOneNote", id);
      // console.log(item.id)
      // this.collection.splice(this.collection.indexOf(item), 1)
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
    setFilter() {
      if (this.filter === "" || this.filter === "desc") {
        return (this.filter = "asc");
      } else {
        return (this.filter = "desc");
      }
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
    filteredCollection() {
      let collection = this.$store.getters["getAllNotes"];
      const filterText = this.$store.getters["filter"]

      if (filterText !== '') {
        collection = collection.slice().filter(note => {
          let a = note.title.toLowerCase()
          let b = filterText.toLowerCase()
          // debugger;
          if (note.title.toLowerCase().startsWith(filterText.toLowerCase())) {
            // debugger;
            return note
          } else if (note.text.toLowerCase().startsWith(filterText.toLowerCase())) {
            // debugger;
            return note
          }
        })
      }


      // Asc/desc created date filter
      if (this.filter === "asc") {
        collection.sort((a, b) => {
          return a.date_create - b.date_create;
        });
      } else if (this.filter === "desc") {
        collection.sort((a, b) => {
          return b.date_create - a.date_create;
        });
      }

      function formatDate(date) {
        return new Date(date).setHours(0, 0, 0, 0);
      }

      let filtered = collection.filter((item) => {
        if (
          formatDate(item.date_create * 1000) >= formatDate(this.date) &&
          formatDate(item.date_create * 1000) <= formatDate(this.date2)
        ) {
          return item;
        }
      });
      filtered = filtered.slice(0, this.countOfItems);


      // filtered.sort((a, b) => {
      //   return a.date_create - b.date_create
      // });
      
      return filtered
    },
  },
};
</script>

<style lang="stylus">
.app {
  margin: 20px;
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
  border: 1px solid #fff;
  background-color #005caf;
  color: #fff;

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

.create-new-note {
  text-align: left;
  padding-left: 38px;
}

.filter {
  display: flex;
  justify-content: flex-end;  
}

.btn-filter {
  width: 185px;
  margin-bottom: 2px;
  background: #fff;
  border: none;
  cursor pointer;

  &:focus {
    outline: none; 
  }
}
</style>
