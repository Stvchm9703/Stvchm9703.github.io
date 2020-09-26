<template lang="pug">
b-navbar.sv_navbar(active, fixed-bottom, is-centered, type="is-home-set")
  template(slot="start", is-centered)
    b-navbar-item.linkListItem(
      v-for="k in link_list",
      ref="startNav",
      tag="nuxt-link",
      prefetch,
      :to="k.path",
      :key="k.name"
    ) {{ k.name }}
    b-navbar-dropdown.linkListItem(
      tag="div",
      v-for="k in link_set",
      :label="k.name"
    )
      b-navbar-item(
        v-for="item in k.sub_path",
        tag="nuxt-link",
        prefetch,
        :to="item.path",
        :key="item.name"
      ) {{ item.name }}
</template>
<script>
import _groupBy from "lodash/groupBy";
import _value from "lodash/values";
export default {
  layout: "inner_page",
  computed: {
    link_list: (self) => {
      // console.log(self.$router.options.routes);
      let list_a = self.$router.options.routes
        .filter((e) => !e.path.includes("/:") && !/[\w]+\//.test(e.name))
        .map((e) => ({
          path: e.path,
          name: e.name,
        }));
      return list_a;
    },
    link_set: (self) => {
      let list_b = self.$router.options.routes
        .filter((e) => /[\w]+\//.test(e.name))
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
};
</script>
<style lang="scss" >
@import '~assets/css/media_rule.scss';
.sv_navbar {
  background: linear-gradient(
    0deg,
    rgba(9, 19, 121, 0.1) 0%,
    rgba(2, 0, 36, 0.7) 100%
  );
  max-height: 70px;
  height: 10%;
}
.navbar.is-fixed-bottom {
  .navbar-menu {
    .navbar-start {
      .navbar-item.has-dropdown.is-active {
        .navbar-dropdown {
          top: -165%;
          border-radius: 2px !important ;
        }
      }
    }
  }
}

.linkListItem {
  font-size: 20pt;
  color: #fff;
  height: 50px;
  font-family: "Copr";
  text-align: center;
  transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    color: rgba(2, 0, 36, 1);
    background-color: rgba($color: #fefefe, $alpha: 0.7);
    background: linear-gradient(
      0deg,
      rgba(9, 19, 121, 0.1) 0%,
      rgba($color: #fefefe, $alpha: 0.7) 100%
    );
  }
}
.navbar-start {
  width: 90%;
  .linkListItem {
    width: auto;
    flex: auto;
    flex-flow: column;
    @include when-mobile {
      flex: auto;
      flex-flow: auto;
    }
  }
}

</style>