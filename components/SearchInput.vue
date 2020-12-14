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
  margin-top: 10px;

  input {
    width: 220px;
    height: 30px;
    margin-left: 5px;
    font-size: 16px;
    background-color: #005caf;
    border: 1px solid #fff;
    color: #fff;
    border-radius: 5px;

    &::placeholder {
      color: #fff;
    }

    &:focus {
      outline: none; 
    }
  }
}
</style>