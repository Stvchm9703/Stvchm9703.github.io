<template lang="pug">
nav.navbar.sv-navbar-mob.is-dark.is-fixed-bottom(
  role="navigation",
  aria-label="main navigation"
)
  .navbar-brand
    a.navbar-burger.burger(
      role="button",
      aria-label="menu",
      aria-expanded="false",
      :class="{ 'is-active': menuOnOpen }",
      @click="$store.commit('open_menu', true)"
    )
      span(aria-hidden="true")
      span(aria-hidden="true") 
      span(aria-hidden="true")
  slot

  navigationHeader
</template>

<script>
import navigationHeader from "~/components/navlink/sideNav.vue";
import _groupBy from "lodash/groupBy";
import _value from "lodash/values";
import { mapState } from "vuex";
export default {
  name: "inner_mob",
  components: { navigationHeader },

  computed: {
    ...mapState({
      menuOnOpen: (state) => state.menu_on_open,
    }),
    link_list: (self) => {
      // console.log(self.$router.options.routes);
      let list_a = self.$router.options.routes
        .filter(
          (e) =>
            !e.path.includes("/:") &&
            !/[\w]+\//.test(e.name) &&
            !e.name.includes("404")
        )
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
          sub_path: list_b[key],
        });
      }
      return o;
    },
  },
  data: () => ({
    isOpened: false,
  }),
};
</script>
