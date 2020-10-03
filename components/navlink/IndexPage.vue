<template lang="pug">
b-navbar.sv-navbar(
  :fixed-bottom="true",
  type="is-home-set",
  @toggleActive="isToogledActive()"
)
  template(slot="start", is-centered)
    b-navbar-item.linkListItem(
      v-for="k in link_list",
      ref="startNav",
      tag="nuxt-link",
      prefetch,
      :to="k.path",
      :key="k.name"
    ) {{ k.name }}
    // b-navbar-dropdown.linkListItem(
    //   tag="div",
    //   v-for="k in link_set",
    //   :label="k.name",
    //   :key="k.name"
    // )
    //   b-navbar-item(
    //     v-for="item in k.sub_path",
    //     key="item.name",
    //     tag="nuxt-link",
    //     prefetch,
    //     :to="item.path",
    //     :key="item.name"
    //   ) {{ item.name }}
</template>
<script>
// import _groupBy from "lodash/groupBy";
// import _value from "lodash/values";
export default {
  layout: "inner_page",
  computed: {
    link_list: (self) => {
      // console.log(self.$router.options.routes);
      let list_a = self.$router.options.routes
        .filter((e) => !e.path.includes("/:") && !/[\w]+\//.test(e.name) && !e.name.includes('index') )
        .map((e) => ({
          path: e.path,
          name: e.name,
        }))
        .sort((a, b) => a.path.length - b.path.length);

      return list_a;
    },
    // link_set: (self) => {
    //   let list_b = self.$router.options.routes
    //     .filter((e) => /[\w]+\//.test(e.name) && !e.path.includes("/:"))
    //     .map((e) => ({
    //       path: e.path,
    //       name: e.name,
    //       header: e.name.replace(/\/[\w]+/, ""),
    //     }));
    //   list_b = _groupBy(list_b, "header");
    //   let o = [];
    //   for (let key in list_b) {
    //     o.push({
    //       name: key,
    //       sub_path: list_b[key],
    //     });
    //   }
    //   return o;
    // },
  },
  data: () => ({
    isOpened: false,
  }),
  methods: {},
};
</script>
