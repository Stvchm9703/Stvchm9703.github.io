<template lang="pug">
section
  b-sidebar(fullheight, :open="menuOnOpen", @close="onCancel()")
    .innerNav
      b-menu
        b-menu-list(label="Menu")
          b-menu-item.menu-item(
            v-for="k in link_list",
            tag="nuxt-link",
            prefetch,
            :label="k.name",
            :to="k.path",
            :key="k.name"
          )

      hr.navbar-divider
      b-menu(v-for="routeSet in extraRouteMap", :key="routeSet.title")
        b-menu-list(:label="routeSet.title")
          span {{ routeSet.subtitle }}
          b-menu-item.menu-item.extraRouteMap(
            v-for="k in listDocOnly(routeSet.itemList, showDocOnly)",
            tag="router-link",
            :label="k.name",
            :key="k.name",
            :to="k.routerPath"
          ) 
</template>

<script>
import _groupBy from "lodash/groupBy";
import _value from "lodash/values";
import { mapState, mapGetters } from "vuex";
export default {
  name: "inner-page-nav",
  computed: {
    ...mapState({
      menuOnOpen: (state) => state.menu_on_open,
      extraRouteMap: (state) => state.extra_route_map,
      showDocOnly: (state) => state.file_list.showMdOnly,
      currentPath: (state) => state.file_list.current_path,
    }),
    ...mapGetters({
      mdFileList: "file_list/mdFileList",
    }),
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
  data: () => ({ isOpened: false }),
  methods: {
    onCancel() {
      this.$store.commit("open_menu", false);
    },
    listDocOnly: (list, showDocOnly) =>
      showDocOnly
        ? list.filter((e) => {
            if (e._type === "file") {
              return e.name.includes(".md");
            } else {
              return true;
            }
          })
        : list,
  },
  created() {},
};
</script>


<style lang="scss" >

.innerNav {
  padding: 15px;
  font-family: "Copr";
  .menu-list {
    .menu-item {
      transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      a:hover {
        color: #fff;
        background-color: #7957d5;
      }
      a {
        font-size: 24px;
      }
      &.extraRouteMap a {
        font-size: 20px;
      }
    }
  }
}
// TODO : resolve the scoped issue
</style>