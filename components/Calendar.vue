<template lang="pug">
.calendar
  button(@click="toggleOpen = !toggleOpen") open
  .wrapper(v-if="toggleOpen")
    .months
      span.arrow(@click="prevYear") &lt;&lt;
      span.arrow(@click="prevMonth") &lt;
      div {{ months[selectedMonth - 1] }} {{ selectedYear }}
      span.arrow(@click="nextMonth") &gt;
      span.arrow(@click="nextYear") &gt;&gt;
    .days
      .day(v-for="day in weekDays") {{day}}
      .day(v-for="space of startWeekDay - 1", :key="-space")
        span
      .day(v-for="day of countOfDays", :key="day" v-bind:class="{'today': isToday(day)}")
        span.selected(v-if="day == currentDay && currentMonth == selectedMonth && currentYear == selectedYear") {{ day }}
        span.disabled(v-else-if="disableDays(new Date(selectedYear, selectedMonth-1, day))") {{ day }}
        span.no-selected(v-else @click="changeCurrentDate(day)") {{ day }}
</template>

<script>
import getDaysInMonth from "date-fns/getDaysInMonth";
import { format, isValid } from 'date-fns';

export default {
  name: "Calendar",
  props: {
    // date: {
    //   type: String,
    //   default() {
    //     return "";
    //   }
    // },
    disableDays: {
      type: Function,
      default(day) {
        return false;
      }
    },
    value: {
      type: [String, Number],
      default() {
        return "";
      }
    },
  },
  data() {
    return {
      toggleOpen: false,
      currentDay: "",
      currentMonth: "",
      currentYear: "",
      selectedMonth: "",
      selectedYear: "",
      weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      months: [
        "January",
        "Februrary",
        "March",
        "April",
        "May",
        "June",
        "Jule",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    };
  },
  computed: {
    // Count of days in selected months
    countOfDays() {
      return getDaysInMonth(
        new Date(this.selectedYear, this.selectedMonth - 1)
      );
    },

    // Month start weekday
    startWeekDay() {
      let date = new Date(
        `${this.months[this.selectedMonth - 1]} 1, ${this.selectedYear}`
      );
      let day = date.getDay();
      if (day === 0) {
        return 7;
      } else {
        return day;
      }
    },

    // Today date
    today() {
      let date = new Date();
      return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      };
      //   let date = format(Date.now(), "dd.MM.yyyy");
      //   return {
      //     day: +date.split(".")[0],
      //     month: +date.split(".")[1],
      //     year: +date.split(".")[2]
      //   };
    }
  },
  watch: {
    // On value change
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        if (isValid(new Date(this.value))) {
          this.currentDay = +format(new Date(this.value), 'dd');
          this.currentMonth = this.selectedMonth = +format(new Date(this.value), 'MM');
          this.currentYear = this.selectedYear = +format(new Date(this.value), 'yyyy');
        } else {
          let date = new Date()
          this.currentDay = 0
          this.currentMonth = this.selectedMonth = date.getMonth()+1
          this.currentYear = this.selectedYear = date.getFullYear()
        }
      }
    }
  },
  methods: {
    prevMonth() {
      if (this.selectedMonth === 1) {
        this.selectedYear--;
        this.selectedMonth = 12;
      } else {
        this.selectedMonth--;
      }
    },
    nextMonth() {
      if (this.selectedMonth === 12) {
        this.selectedYear++;
        this.selectedMonth = 1;
      } else {
        this.selectedMonth++;
      }
    },
    prevYear() {
      this.selectedYear--;
    },
    nextYear() {
      this.selectedYear++;
    },

    // check if day is today
    isToday(day) {
      if (this.selectedMonth == this.today.month &&  this.selectedYear == this.today.year) {
        if (day === this.today.day) {
          return true;
        }
      }
    },

    // Change current date by click on the day
    changeCurrentDate(day, month = this.selectedMonth, year = this.selectedYear) {
      this.currentDay = day;
      this.currentMonth = this.selectedMonth;
      this.currentYear = this.selectedYear;
      let date = new Date(this.currentYear, this.currentMonth-1, this.currentDay);
      this.$emit('changeCurrentDate', date);
    },
  }
};
</script>

<style lang="stylus"></style>