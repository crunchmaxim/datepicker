<template lang="pug">
.app
  .picker-wrapper
    date-picker(v-model="date", :disableDays="disableDaysStart" :style="stylePrimary" :inFormat="inFormat1" :outFormat="outFormat")
    date-picker(v-model="date2", :disableDays="disableDaysEnd" :style="styleSecondary" :inFormat="inFormat2" :outFormat="outFormat")
  items-list(:collection="filteredCollection" tag="ul" item-tag="li")
    template(v-slot:header) Some header
      .create-new-note
        h3
          nuxt-link(to='/edit') +Create new note
    template(v-slot:footer) count of items: {{filteredCollection.length}}
      button(@click="showMore" v-if="filteredCollection.length == countOfItems") Show more
    template(#item="{ item: { title, date_create, id, text }, index }")
      .item
        div id: {{id}}
        div
          nuxt-link(:to="'/note?id=' + id") Title: {{title}}
        div Text: {{text}}
        div Created at: {{new Date(date_create)}}
    template(#tools="{item, index}")
      nuxt-link(:to="'/edit?id=' + item.id") 
        button.item-btn Edit
      button.item-btn(@click="onClickDelete(item.id)") Delete
</template>

<script>
import DatePicker from "@/components/DatePicker";
import ItemsList from "@/components/ItemsList";

export default {
  components: {
    DatePicker,
    ItemsList
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
      date2: Date.now(),
      inFormat1: "yyyy-MM-dd",
      inFormat2: "TT",
      outFormat: "dd.MM.yyyy",
    };
  },
  methods: {
    onClickEdit(item) {
      console.log(item)
    },
    onClickDelete (id) {
      this.$store.dispatch('deleteOneNote', id)
      // console.log(item.id)
      // this.collection.splice(this.collection.indexOf(item), 1)
    },
    disableDaysStart(day) {
      return day > new Date(this.date2);
    },
    disableDaysEnd (day) {
      return day < new Date(this.date);
    },
    showMore() {
      this.countOfItems+=10;
    }
  },
  mounted() {
    // Get notes from vuex
    this.collection = this.$store.getters['getAllNotes']
  },
  computed: {
    stylePrimary() {
      return {
      '--color': "#caffbf"
      }
    },
    styleSecondary() {
      return {
        '--color': "#9bf6ff"
      }
    },
    filteredCollection() {
        function formatDate(date) {
          return new Date(date).setHours(0,0,0,0)
        }

        // let filtered = this.collection.filter(item => {
        //   if (formatDate(item.date_create) >= formatDate(this.date) && formatDate(item.date_create) <= formatDate(this.date2)) {
        //     return item;
        //   }
        // })
        // filtered = filtered.slice(0, this.countOfItems);
        // return filtered;
        return this.collection
    }
  }
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
  height: 100%;
  border-radius: 5px;
  margin: 0 2px;
  cursor: pointer;
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
</style>
