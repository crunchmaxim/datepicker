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
          // Header
          this.$slots.header && h('div', { class: 'header' }, this.$slots.header),
          
          // Content
          h(this.tag, { class: "il__wrapper" }, this.collection.map((item, index) => {
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
};
</script>

<style lang="stylus">
    .il
        margin: 20px 0px;
        background-color #fff
        color #black
        display flex
        flex-flow column wrap
        &__wrapper {
          padding: 0px 10px;
        }
        &__item
          display flex
          flex-flow row nowrap
          max-width 100%       
          margin-top 5px
          &__content
            flex 1 1
            border-radius: 10px;
            border 2px solid #1565C0 
          &__tools
            justify-self flex-end
            display: flex;
            flex-direction: column;
        .header, .footer {
            text-align center
        }

@media (max-width: 577px) {
  .il__item {
    flex-direction: column;
    margin-bottom: 40px;

    &__tools {
      margin-top: 5px;
      flex-direction: row; 
      justify-content: center;  
    } 
  }
}

</style>