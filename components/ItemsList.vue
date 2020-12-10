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
      return h('div', { class: 'il'}, [
          // Footer
          this.$slots.header && h('div', { class: 'header' }, this.$slots.header),
          
          // Content
          h(this.tag, this.collection.map((item, index) => {
            return h(this.itemTag, {
                class: 'il__item'
            }, 
            [
                h('div', { class: 'il__item__content' }, 
                    [
                        this.$scopedSlots.item ? this.$scopedSlots.item({ item, index }) : item
                    ]
                ),
                this.$scopedSlots.tools && h('div', { class: 'il__item__tools'}, [
                    this.$scopedSlots.tools({ item, index })
                ])
            ]
            )
                })
            ),

          // Footer
          this.$slots.footer && h('div', { class: 'footer'}, this.$slots.footer),
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

<style lang="stylus">
    .il
        margin-top 20px
        background-color #005caf
        padding 20px
        color #fff
        display flex
        flex-flow column wrap
        &__item
          display flex
          flex-flow row nowrap
          max-width 100%          
          &__content
            flex 1 1
            border 1px solid #fff            
          &__tools
            justify-self flex-end
        .header, .footer {
            text-align center
        }

</style>