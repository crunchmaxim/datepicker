<template lang="pug">
.date-picker
  input.date-input(placeholder="Choose date", maxlength=10 v-model="date" @change="changeInputDate")
  span.close(@click="date = ''") &#10005;
  
  .error(v-if="showError") {{ error }}
  Calendar(
    :disableDays="disableDays"
    @changeCurrentDate="setNewDate"
    :value="value"
  )
</template>

<script>
import format from "date-fns/format";

import { getDate, isValid } from "date-fns";

import Calendar from "@/components/Calendar";

import parse from "date-fns/parse";

export default {
  name: "DatePicker",
  components: {
    Calendar,
  },
  props: {
    disableDays: {
      type: Function,
      default(day) {
        return false;
      },
    },
    value: {
      type: String,
      default() {
        return "";
      },
    },
    inFormat: {
      type: String,
      default() {
        return "";
      },
    },
    outFormat: {
      type: String,
      default() {
        return "";
      },
    },
  },
  data() {
    return {
      // Current date in format dd.mm.yyyy
      date: "",

      // Show error on input
      showError: false,
      error: "",

      // Current date values
      // currentDay: "",
      // currentMonth: "",
      // currentYear: "",

      // // Selected date values
      // selectedMonth: "",
      // selectedYear: "",
    };
  },
  computed: {},
  watch: {
    // On value change
    value: {
      immediate: true,
      handler(newVal, oldVal) {
        this.date = format(new Date(newVal), this.outFormat); // To change if changed props date format
      },
    },
  },
  methods: {
    setNewDate(date) {
      let day = format(new Date(date), "dd");
      let month = format(new Date(date), "MM");
      let year = format(new Date(date), "yyyy");
      let formattedDate = format(new Date(date), this.inFormat);
      this.$emit("input", formattedDate);
    },
    changeInputDate() {
      // let changedDate = new Date(this.date)
      let parsedDate = parse(this.date, this.outFormat, new Date());

      if (isValid(parsedDate)) {
        this.showError = false;
        this.error = "";
        if (this.disableDays(parsedDate)) {
          this.showError = true;
          this.error = "You cannot select disabled day";
          return;
        }

        // End date validation
        if (this.mode === "start") {
          if (parsedDate > new Date(this.end)) {
            this.showError = true;
            this.error = "Date cannot be more then end date";
            return;
          }
        }

        // Start date validation
        if (this.mode === "end") {
          if (parsedDate < new Date(this.end)) {
            this.showError = true;
            this.error = "Date cannot be less then start date";
            return;
          }
        }
        
        // let day = changedDate.getMonth()
        // let month = changedDate.getDate()
        // let year = changedDate.getFullYear()

        // Clear error
        this.showError = false;
        this.error = '';

        let formattedDate = format(parsedDate, this.inFormat);
        this.$emit("input", formattedDate);
      } else {
        this.showError = true;
        this.error = "Incorrect data";
      }
    },
  },
};
</script>

<style lang="stylus">
.date-picker {
  position: relative;
  margin: 0 20px;
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