<template lang="pug">
.app
  .picker-wrapper
    date-picker(v-model="date", :disableDays="disableDaysStart" :style="stylePrimary" :inFormat="inFormat1" :outFormat="outFormat")
    date-picker(v-model="date2", :disableDays="disableDaysEnd" :style="styleSecondary" :inFormat="inFormat2" :outFormat="outFormat")
  items-list(:collection="collection" tag="ul" item-tag="li" :testCollection="testCollection")
    template(v-slot:header) header template
    template(v-slot:footer) footer template
    template(#item="{ model, index }") {{model.title}}
    template(#testItem="{testItem}") {{testItem.name}}

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
      collection: [{id: 1, title: "title 1", }, {id: 2, title: "title 2", }, {id: 3, title: "title 3", }, {id: 4, title: "title 4" }],
      testCollection: [{id: 1, name: "Name 1"}, {id: 2, name: "Name 2"}, {id: 3, name: "Name 3"}, {id: 4, name: "Name 4"},],
      date: "2020-12-07",
      date2: Date.now(),
      inFormat1: "yyyy-MM-dd",
      inFormat2: "TT",
      outFormat: "dd.MM.yyyy",
    };
  },
  methods: {
    disableDaysStart(day) {
      return day > new Date(this.date2);
    },
    disableDaysEnd (day) {
      return day < new Date(this.date);
    },
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
