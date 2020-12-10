<template lang="pug">
.app
  .picker-wrapper
    date-picker(v-model="date", :disableDays="disableDaysStart" :style="stylePrimary" :inFormat="inFormat1" :outFormat="outFormat")
    date-picker(v-model="date2", :disableDays="disableDaysEnd" :style="styleSecondary" :inFormat="inFormat2" :outFormat="outFormat")
  items-list(:collection="filteredCollection" tag="ul" item-tag="li")
    template(v-slot:header) Some header
    template(v-slot:footer) count of items: {{filteredCollection.length}}
      button(@click="showMore" v-if="filteredCollection.length == countOfItems") Show more
    template(#item="{ item: { title, date }, index }") 
      | Заголовок {{title}} 
      br
      | {{date}}
    template(#tools="{item, index}") 
      button(@click="onClickDelete(item, index)") {{item.title}}

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
      collection: [{id: 1, title: "title 1", date: "2020-12-07" }, {id: 2, title: "title 2", date: "2020-12-08"}, 
      {id: 3, title: "title 3", date: "2020-12-09"}, {id: 4, title: "title 4", date: "2020-12-10" }, 
      {id: 5, title: "title 5", date: "2020-12-11" }, {id: 6, title: "title 6", date: "2020-12-12" }, {id: 7, title: "title 7", date: "2020-12-13" },
      {id: 8, title: "title 8", date: "2020-12-14" }, {id: 9, title: "title 9", date: "2020-12-15" }, {id: 10, title: "title 10", date: "2020-12-16" },
      {id: 11, title: "title 11", date: "2020-12-17" }, {id: 12, title: "title 12", date: "2020-12-18" }],
      countOfItems: 10,
      date: "2020-12-07",
      date2: Date.now(),
      inFormat1: "yyyy-MM-dd",
      inFormat2: "TT",
      outFormat: "dd.MM.yyyy",
    };
  },
  methods: {
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
        if (formatDate(item.date) >= formatDate(this.date) && formatDate(item.date) <= formatDate(this.date2)) {
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
</style>
