const jsonData = [
  {
    "tagName": "section",
    "name": "tree",
    "classes": ["container","mx-auto"],
    "attrs": {data: 'test'},
    "textNode": "Root Node",
    "children": [
      {
        "tagName": "div",
        "classes": ["flex","flex-wrap"],
        "attrs": {},
        "textNode": "",
        "children": [
          {
            "tagName": "div",
            "classes": ["w-1/2"],
            "attrs": {},
            "textNode": "Hello"
          },
          {
            "tagName": "div",
            "classes": ["w-1/2"],
            "attrs": {},
            "textNode": "Goodbye"
          }
        ]
      }
    ]
  }
];

const RecursiveComponent = Vue.component('recursive-component', {
  render: function(createElement) {
    let childNodes = [this.nestedData.textNode];
    childNodes = this.nestedData.children && this.nestedData.children.length > 0 ?
      childNodes.concat(this.nestedData.children.map(child => (
        createElement(
          RecursiveComponent,
          {
            props: {
              nestedData: child,
            }
          }
        )
      ))) : childNodes;

    return createElement(
      this.nestedData.tagName,
      {
        class: this.nestedData.classes,
        on: {
          click: this.greet
        },
        attrs: this.nestedData.attrs,
      },
      childNodes
    );
  },
  props: {
    nestedData: Object,
  },
  methods: {
    greet(e) {
      e.stopPropagation();
      // store.setMessageAction(this)
      console.log('greet', this.nestedData.tagName, this.nestedData.classes);
    }
  },
});

const App = new Vue({
  el: '#app',

  data: {
    nestedData: jsonData
  },
  beforeCreate() {

  },

  mounted() {

  },
});




