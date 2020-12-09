<template lang="pug">
.app
  date-picker(v-model="date", :disableDays="disableDaysStart" :inFormat="inFormat" :outFormat="outFormat")
  date-picker(v-model="date2", :disableDays="disableDaysEnd" :inFormat="inFormat" :outFormat="outFormat")  

  Nuxt
</template>

<script>
import DatePicker from "@/components/DatePicker";

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      date: "Dec 7, 2020",
      date2: "Dec 20, 2020",
      // interval: [new Date(2020, 12, 1), new Date(2020, 12, 20)],
      inFormat: "PP",
      outFormat: "dd.MM.yyyy",
    };
  },
  computed: {
    // disabledDaysArr() {
    //   let disDays = [];
    //   let disMonths = [];
    //   this.disabledDays.days.split(",").forEach((d) => {
    //     if (d.length > 2) {
    //       for (let i = d.split("-")[0]; i <= d.split("-")[1]; i++) {
    //         disDays.push(+i);
    //       }
    //     } else {
    //       disDays.push(+d);
    //     }
    //   });
    //   this.disabledDays.months.split(",").forEach((m) => disMonths.push(+m));
    //   return { disDays, disMonths };
    // },
  },
  methods: {
    disableDaysStart(day) {
      return day > new Date(this.date2);
    },
    disableDaysEnd (day) {
      return day < new Date(this.date);
    },
    // disBeforeStart(date1, date2) {
    //   return date1 < date2
    // },
    // disAfterStart(date1, date2) {
    //   return date1 > date2
    // },
  },
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
}
</style>
