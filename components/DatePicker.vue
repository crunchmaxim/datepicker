<template lang="pug">
.date-picker
  input.date-input(placeholder="Choose date", v-model="date", maxlength=10)
  span.close(@click="date = ''") &#10005;
  button(@click="toggleOpen = !toggleOpen") open
  .error(v-if="showError") Must be in format "dd.mm.yyyy"
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
        span.no-selected(v-else, @click="changeCurrentDate(day)") {{ day }}
</template>

<script>
import format from "date-fns/format";
import getDaysInMonth from 'date-fns/getDaysInMonth'
import { getDate } from 'date-fns';

export default {
  name: "DatePicker",
  props: {
    disableDays: {
      type: Function,
      default (day) {
        return false    
      }
    },
    value: {
      type: String,
      default () {
        return ''
      }
    },
    inFormat: {
      type: String,
      default() {
        return ''
      }
    },
    outFormat: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      // Toggle open
      toggleOpen: false,

      // Current date in format dd.mm.yyyy
      date: "",

      // Show error on input
      showError: false,

      // Array of weekdays
      weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],

      // Array of months
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
        "December",
      ],

      // Current date values
      currentDay: "",
      currentMonth: "",
      currentYear: "",

      // Selected date values
      selectedMonth: "",
      selectedYear: "",
    };
  },
  computed: {
    // Count of days in selected months
    countOfDays() {
      return getDaysInMonth(new Date(this.selectedYear, this.selectedMonth-1))
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
      let date = format(Date.now(), "dd.MM.yyyy");
      return {
        day: +date.split(".")[0],
        month: +date.split(".")[1],
        year: +date.split(".")[2],
      };
    },
  },
  watch: {
    // On value change
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        console.log(newVal.length);
        this.date = format(new Date(newVal), this.outFormat); // To change if changed props date format
        let dataArr = this.date.split(".");
        this.currentDay = +dataArr[0];
        this.currentMonth = this.selectedMonth = +dataArr[1];
        this.currentYear = this.selectedYear = dataArr[2];
      },
    },
    // Hand input date validation
    date() {
      // Validation
      if (this.date.length !== 10) {
        this.showError = true;
      } else if (this.date.split("")[2] !== "." || this.date.split("")[5] !== ".") {
        this.showError = true;
      } else {
        this.showError = false;
        let day = this.date.split(".")[0];
        let month = this.date.split(".")[1];
        let year = this.date.split(".")[2];

        // Set new date to data
        this.currentDay = day;
        this.currentMonth = this.selectedMonth = month;
        this.currentYear = this.selectedYear = year;

        // Check if data is disabled
        if (this.disableDays(new Date(year, month-1, day))) return;

        // Change value of date in input
        this.date = day + "." + month + "." + year;

        // Emit to parent
        let formattedDate = format(new Date(this.currentYear, this.currentMonth - 1, this.currentDay), this.inFormat); // To change if changed props date format
        this.$emit("input", formattedDate);
      }
    },
  },
  methods: {
    // Change current date by click on the day
    changeCurrentDate(
      day,
      month = this.selectedMonth,
      year = this.selectedYear
    ) {
      this.currentDay = day;
      this.currentMonth = this.selectedMonth;
      this.currentYear = this.selectedYear;

      // Set date
      let date = "";
      this.currentDay < 10
        ? (date += `0${this.currentDay}`)
        : (date += this.currentDay);
      date += ".";
      this.currentMonth < 10
        ? (date += `0${this.currentMonth}`)
        : (date += this.currentMonth);
      date += "." + this.currentYear;
      this.date = date;
    },
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
      if (this.selectedMonth == this.today.month && this.selectedYear == this.today.year) {
        if (day === this.today.day) {
          return true;
        }
      }
    }
  },
};
</script>

<style lang="stylus">
.date-picker {
  position: relative;
}

.wrapper {
  height: 250px;
  width: 200px;
  border: 1px solid black;
}

.date-input {
  width: 200px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.day {
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
  }
}

.no-selected:hover {
  background-color: yellow;
  border-radius: 50%;
  cursor: pointer;
}

.selected {
  background-color: green;
  border-radius: 500%;
}

.months {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid black;
  height: 30px;

  div {
    dispay: flex;
  }

  span {
    cursor: pointer;
  }
}

.error {
  border: 1px solid red;
  width: 200px;
}

.arrow:hover {
  background-color: green;
}

.close {
  border-radius: 50%;
  border: 1px solid gray;
  height: 19px;
  width: 19px;
  position: absolute;
  left: 180px;
  top: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: green;
  }
}

.disabled {
  background-color: gray;
  border-radius: 50%;
}

.today {
  border: 2px solid red;
}
</style>