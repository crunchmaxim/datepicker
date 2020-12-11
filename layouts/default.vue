<template lang="pug">
.app
  .picker-wrapper
    date-picker(v-model="date", :disableDays="disableDaysStart" :style="stylePrimary" :inFormat="inFormat1" :outFormat="outFormat")
    date-picker(v-model="date2", :disableDays="disableDaysEnd" :style="styleSecondary" :inFormat="inFormat2" :outFormat="outFormat")
  items-list(:collection="filteredCollection" tag="ul" item-tag="li")
    template(v-slot:header) Some header
    template(v-slot:footer) count of items: {{filteredCollection.length}}
      button(@click="showMore" v-if="filteredCollection.length == countOfItems") Show more
    template(#item="{ item: { title, date_create, id }, index }")
      .item
        div id: {{id}}
        div
          nuxt-link(:to="'/note?id=' + id") Title: {{title}}
        div Date create {{date_create}}
    template(#tools="{item, index}") 
      button.item-btn(@click="onClickEdit(item)") Edit
      button.item-btn(@click="onClickDelete(item, index)") Delete

  Nuxt
</template>

<script>
import DatePicker from "@/components/DatePicker";
import ItemsList from "@/components/ItemsList";

export default {
  components: {
    DatePicker,
    ItemsList
  },
  data() {
    return {
      collection: [{id: 1, title: "title 1", date_create: "2020-12-07" }, {id: 2, title: "title 2", date_create: "2020-12-08"}, 
      {id: 3, title: "title 3", date_create: "2020-12-09"}, {id: 4, title: "title 4", date_create: "2020-12-10" }],
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
    onClickDelete (item, index) {
      this.collection.splice(this.collection.indexOf(item), 1)
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
    this.$store.dispatch('fetchAllNotes')
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

      let filtered = this.collection.filter(item => {
        if (formatDate(item.date_create) >= formatDate(this.date) && formatDate(item.date_create) <= formatDate(this.date2)) {
          return item;
        }
      })
      return filtered.slice(0, this.countOfItems);
    }
  }
};
</script>

<style lang="stylus">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

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
</style>
