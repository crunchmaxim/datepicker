<template lang="pug">
.date-picker
  //- input(:value="value", placeholder="Choose date")
  input(placeholder="Choose date", v-model="date")
  button(@click="toggleOpen = !toggleOpen") open
  .error(v-if="showError") Must be in format "dd.mm.yyyy"
  .wrapper(v-if="toggleOpen")
    .days
      .day Mo
      .day Tu
      .day We
      .day Th
      .day Fr
      .day Sa
      .day Su
      .day(v-for="space of startWeekDay - 1", :key="-space")
        span
      .day(
        v-for="day of countOfDays",
        :key="day",
        @click="changeCurrentDate(day)"
      )
        span.selected(
          v-if="day == currentDay && currentMonth == selectedMonth && currentYear == selectedYear"
        ) {{ day }}
        span.no-selected(v-else) {{ day }}
    .months
      span(@click="prevMonth") &lt;
      div {{ months[selectedMonth - 1] }} {{ selectedYear }}
      span(@click="nextMonth") &gt;
</template>

<script>
import format from 'date-fns/format'

export default {
  name: "DatePicker",
  props: {
    value: String,
  },
  data() {
    return {
      // Toggle open
      toggleOpen: false,

      // Current date in format dd.mm.yyyy
      date: "",

      // Show error on input
      showError: false,

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
      if (
        this.selectedMonth === 3 ||
        this.selectedMonth === 5 ||
        this.selectedMonth === 8 ||
        this.selectedMonth === 10
      ) {
        return 30;
      } else if (this.selectedMonth === 1) {
        return 28;
      } else {
        return 31;
      }
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
  },
  watch: {
    // On value change
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        this.date = format(new Date(newVal), 'dd.MM.yyyy') // To change if changed props date format
        let dataArr = this.date.split(".");
        this.currentDay = +dataArr[0];
        this.currentMonth = this.selectedMonth = +dataArr[1];
        this.currentYear = this.selectedYear = dataArr[2];
      },
    },
    // Hand input date validation
    date() {
      if (this.date.length !== 10) {
        this.showError = true;
      } else if (
        this.date.split("")[2] !== "." ||
        this.date.split("")[5] !== "."
      ) {
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
        this.date = day + "." + month + "." + year;
        
        let formattedDate = format(new Date(this.currentYear, this.currentMonth-1, this.currentDay), 'PP'); // To change if changed props date format
        this.$emit("input", formattedDate);
      }
    },
    // Emit on date changing
    currentDay() {
      // let date = "";
      // this.currentDay < 10
      //   ? (date += `0${this.currentDay}`)
      //   : (date += this.currentDay);
      // date += ".";
      // this.currentMonth < 10
      //   ? (date += `0${this.currentMonth}`)
      //   : (date += this.currentMonth);
      // date += "." + this.currentYear;
      // this.$emit("input", date);
    },
  },
  methods: {
    // Change current date by click on the day
    changeCurrentDate(day, month = this.selectedMonth, year = this.selectedYear) {
      console.log("case");
      this.currentDay = day;
      this.currentMonth = this.selectedMonth;
      this.currentYear = this.selectedYear;
      // Set date
      let date = '';
      this.currentDay < 10
        ? (date += `0${this.currentDay}`)
        : (date += this.currentDay);
      date += ".";
      this.currentMonth < 10
        ? (date += `0${this.currentMonth}`)
        : (date += this.currentMonth);
      date += "." + this.currentYear;
      this.date = date
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
  },
};
</script>

<style lang="stylus">
.wrapper {
  height: 300px;
  width: 200px;
  border: 1px solid black;
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
  background-color: gray;
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
</style>