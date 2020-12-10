<script>
export default {
  name: "ItemsList",
  props: {
    collection: {
      type: Array,
      default() {
        return [];
      },
    },
    tag: {
      type: String,
      default() {
        return "";
      },
    },
    itemTag: {
      type: String,
      default() {
        return "";
      },
    },
  },

  render: function(h) {
      return h('div', [
          // Footer
          h('h1', 'Header'),
          
          // Content
          h(this.tag, [...this.collection.map(item => {
            return h(this.itemTag, `Id: ${item.id}, Title: ${item.title}`)  
        })]),

          h('h2', 'Footer')
      ])
  }

//   render: function (createElement) {
//   return createElement(this.tag,[
//         ...this.collection.map(item => {
//             return createElement(this.itemTag, `Id: ${item.id}, Title: ${item.title}`)  
//         })
//     ]
//   )
// }

};
</script>

<style lang="stylus"></style>