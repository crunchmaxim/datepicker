(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{250:function(t,e,o){var content=o(275);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(71).default)("16e8c084",content,!0,{sourceMap:!1})},274:function(t,e,o){"use strict";o(250)},275:function(t,e,o){(e=o(70)(!1)).push([t.i,".note-wrapper{margin:20px;padding:20px;border-radius:10px;background-color:#1565c0;color:#fff;display:inline-block;box-sizing:border-box;page-break-inside:avoid;-moz-column-break-inside:avoid;break-inside:avoid}.note-title{border-bottom:1px solid #fff}.note-info,.note-title{font-size:20px;font-weight:500}.note-info{margin-bottom:20px}.note-text{margin-top:10px;margin-bottom:25px;font-size:18px}.note-date{font-size:14px}.home-link-wrapper{display:flex;align-items:center;justify-content:flex-end}.home-link{color:#fff}@media (max-width:576px){.note-wrapper{padding:8px}}",""]),t.exports=e},310:function(t,e,o){"use strict";o.r(e);var n={data:function(){return{note:""}},mounted:function(){var t=this.$route.query.id;this.note=this.$store.getters.getOneNote(t)}},r=(o(274),o(31)),component=Object(r.a)(n,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"note-wrapper"},[o("div",{staticClass:"home-link-wrapper"},[o("nuxt-link",{staticClass:"home-link",attrs:{to:"/"}},[t._v(" < Home")])],1),o("div",{staticClass:"note-info"},[t._v("Note info")]),o("div",{staticClass:"note-title"},[t._v(t._s(t.note.title))]),o("div",{staticClass:"note-text"},[t._v(t._s(t.note.text))]),o("div",{staticClass:"note-date"},[t._v("Created: "+t._s(new Date(1e3*t.note.date_create).toUTCString()))]),o("div",{staticClass:"note-date"},[t._v("Updated: "+t._s(new Date(1e3*t.note.date_create).toUTCString()))])])}),[],!1,null,null,null);e.default=component.exports}}]);