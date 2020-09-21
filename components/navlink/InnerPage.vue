<template lang="pug">
section
  b-sidebar(fullheight, :open="menuOnOpen", @close="onCancel()")
    .innerNav
      b-menu
        b-menu-list(label="Menu")
          b-menu-item.menu-item(
            tag="nuxt-link",
            v-for="k in link_list",
            prefetch,
            :label="k.name",
            :to="k.path",
            :key="k.name"
          ) {{ k.name }}
      hr.navbar-divider
      slot
</template>

<script>
import _groupBy from "lodash/groupBy";
import _value from "lodash/values";
import { mapState } from "vuex";
export default {
  layout: "inner_page",
  computed: {
    menuOnOpen: (self) => self.$store.state.menu_on_open,
    link_list: (self) => {
      // console.log(self.$router.options.routes);
      let list_a = self.$router.options.routes
        .filter((e) => !e.path.includes("/:") && !/[\w]+\//.test(e.name))
        .map((e) => ({
          path: e.path,
          name: e.name,
        }))
        .sort((a, b) => a.path.length - b.path.length);
      return list_a;
    },
    link_set: (self) => {
      let list_b = self.$router.options.routes
        .filter((e) => /[\w]+\//.test(e.name) && !e.path.includes("/:"))
        .map((e) => ({
          path: e.path,
          name: e.name,
          header: e.name.replace(/\/[\w]+/, ""),
        }));
      list_b = _groupBy(list_b, "header");
      let o = [];
      for (let key in list_b) {
        o.push({
          name: key,
          sub_path: list_b[key].sort((a, b) => a.path.length - b.path.length),
        });
      }
      return o;
    },
  },
  data: () => ({
    isOpened: false,
  }),
  methods: {
    isToogledActive(event) {
      console.log(event);
      console.log("is toogle active");
    },
    set_slot() {},
    onCancel() {
      this.$store.commit("open_menu", false);
    },
  },
  created() {},
};
</script>


<style lang="scss" >
@import "~assets/css/theme.scss";

.innerNav {
  padding: 15px;
  font-family: "Copr";
  .menu-list {
    .menu-item {
      transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover,
      a:hover {
        color: #fff;
        background-color: #7957d5;
      }
      a {
        font-size: 24px;
      }
    }
  }
}
// TODO : resolve the scoped issue
</style>