<template lang="pug">
.calendar
  img.calendar__icon(:src="require('../assets/img/calendar.png')" @click="toggleOpen = !toggleOpen")
  .wrapper(v-if="toggleOpen")
    .months
      span.arrow(@click="prevYear") &lt;&lt;
      span.arrow(@click="prevMonth") &lt;
      div {{ months[selectedMonth - 1] }} {{ selectedYear }}
      span.arrow(@click="nextMonth") &gt;
      span.arrow(@click="nextYear") &gt;&gt;
    .days
      .day(v-for="day in weekDays") 
        span {{day}}
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

<style lang="stylus">
.calendar {
  position: relative;
  width: 200px;

  &__icon {
    position: absolute;
    top: -28px;
    right: 12px;
    cursor: pointer;
  } 
}

.date-picker {
  position: relative;
}

.wrapper {
  font-size 12px;
  height: 250px;
  width: 100%;
  position: absolute;
  background-color: #fff;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15); 

  z-index: 5;
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

.no-selected {
  transition: 0.5s all;
}

.no-selected:hover {
  background-color: #FF598B;;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

.selected {
  background-color: var(--color);
  border-radius: 500%;
}

.months {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid black;
  height: 30px;
  background-color: #FF598B;
  color: #fff;
  font-size: 18px;

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

.arrow {
  transition: 0.4s all; 
}

.arrow:hover {
  background-color: #fff;
  color: #FF598B;
}

.disabled {
  background-color: gray;
  border-radius: 50%;
}

.today {
  border: 2px solid red;
}

.btn-open {
  width: 220px;
  height: 30px;
  background-color: #fff;
  margin-bottom 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500; 
  transition: 0.3s all;
  border: 1px solid black;
  margin-top 1px;
  border-radius: 5px; 

  &:hover {
    color: #fff;
    background #1565C0;
  }
}
</style>