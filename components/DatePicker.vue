<template lang="pug">
.date-picker
  input.date-input(placeholder="Choose date", maxlength=10 v-model="date" @change="changeInputDate")
  //- span.close(@click="date = ''") &#10005;
  
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
      type: [String, Number],
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
        if (newVal !== '') {
          this.date = format(new Date(newVal), this.outFormat); // To change if changed props date format
        } else {
          this.date = ''
        }
      },
    },
    date() {
      if (this.date === '') {
        this.$emit("input", '')
        return;
      }
    }
  },
  methods: {
    setNewDate(date) {
      // debugger;
      let day = format(new Date(date), "dd");
      let month = format(new Date(date), "MM");
      let year = format(new Date(date), "yyyy");
      let formattedDate = format(new Date(date), this.inFormat);
      // let formattedDate = format(new Date(date), this.outFormat);
      // debugger;
      if (Number.isInteger(+formattedDate)) {
        this.$emit("input", +formattedDate);
      } else {
        this.$emit("input", formattedDate);
      }
    },
    changeInputDate() {
      // let changedDate = new Date(this.date)
      // If input is empty


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
        // let formattedDate = format(parsedDate, this.outFormat);

        if (Number.isInteger(+formattedDate)) {
        this.$emit("input", +formattedDate);
        } else {
          this.$emit("input", formattedDate);
        }
        // this.$emit("input", formattedDate);
      } else {
        this.showError = true;
        this.error = "Incorrect data";
      }
    },
  },
};
</script>

<style lang="stylus">
.date-input {
  width: 200px;
  height: 40px;
  font-size: 14px;
  transition: 0.3s all;
  color: #333438;
  border: none;
  border-radius: 15px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  padding-left: 15px;
  margin-right: 20px;

  &:focus {
    outline: none;
  }
}

.close {
  border-radius: 50%;
  border: 1px solid black;
  height: 19px;
  width: 19px;
  position: absolute;
  left: 198px;
  top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: gray;
  }
}
</style>