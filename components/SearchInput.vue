<template lang="pug">
  .search__input-wrapper
    input.search__input(v-model="searchText")
    img.search__search-icon(:src="require('../assets/img/search.png')")
    img.search__filter-icon(:src="require('../assets/img/filter.png')" @click="$emit('onFilterClick')")
    img.search__sort-icon(:src="require('../assets/img/sort.png')" @click="$emit('onSortClick')")
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
    },
}
</script>

<style lang="stylus">
.search {

  &__input-wrapper {
    margin-top: 52px;
    text-align: left;
    position: relative;
    max-width: 940px;
    width: 100%;
  }

  &__search-icon {
    position: absolute;
    left: 22px;
    top: 12px; 
  }
  &__filter-icon {
    position: absolute;
    top: 12px;
    right: 62px;
    cursor: pointer; 
  }
  &__sort-icon {
    position: absolute;
    top: 12px;
    right: 24px;
    cursor: pointer; 
  }

  &__input {
    width: 100%;
    height: 40px;
    border-radius: 15px;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
    font-size: 18px;
    padding-left 50px;
    padding-right: 80px;  

    &:focus {
      outline: none;
    }
  }
}

@media (max-width: 576px) {

}
</style>