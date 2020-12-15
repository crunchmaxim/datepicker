<template lang="pug">
  .search-input
    label(for="searchInput") Search: 
    input(v-model="searchText" placeholder="Enter title of note")
</template>

<script>
import debounce from "debounce";

export default {
    name: "SearchInput",
    data() {
        return {
            searchText: ''
        }
    },
    watch: {
      searchText: debounce(function () {
          this.$store.dispatch('filterNotesByTitle', this.searchText)            
      }, 1300)
    }
}
</script>

<style lang="stylus">
.search-input {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;

  input {
    width: 220px;
    height: 30px;
    margin-left: 5px;
    font-size: 16px;
    background-color: #2196f3;
    // border: 1px solid #fff;
    border: none;
    color: #fff;
    border-radius: 10px;
    padding-left: 10px;

    &::placeholder {
      color: #fff;
    }

    &:focus {
      background-color #fff
      color: black;
    }

    &:focus {
      outline: none; 
    }
  }
}
</style>