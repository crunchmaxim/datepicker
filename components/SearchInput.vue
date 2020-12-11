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
    methods: {
        
    },
    watch: {
        searchText: debounce(function () {
            this.$store.dispatch('filterNotesByTitle', this.searchText)            
        }, 130)
    }
}
</script>

<style lang="stylus">
.search-input {
  display: flex;
  justify-content: flex-end;

  input {
    margin-left: 5px;
  }
}
</style>