<template lang="pug">
b-navbar.sv_navbar(
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
  methods: {
    isToogledActive(event) {
      console.log(event);
      console.log("is toogle active");
    },
  },
};
</script>
<style lang="scss" >
@import "~assets/css/media_rule.scss";
@import "~bulma/sass/utilities/_all";
.sv_navbar {
  background: linear-gradient(
    0deg,
    rgba(9, 19, 121, 0.1) 0%,
    rgba(2, 0, 36, 0.7) 100%
  );
  max-height: 70px;
  height: 10%;
}
// resolve is-fix-bottom
.navbar.is-fixed-bottom {
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  @include when-mobile {
    display: none !important;
  }

  .navbar-menu {
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    .navbar-start {
      .navbar-item.has-dropdown.is-active {
        .navbar-dropdown {
          top: -165%;
          border-radius: 2px !important ;
        }
      }
    }
    @include when-mobile {
      position: absolute;
    }
  }
}

.linkListItem {
  font-size: 20pt;
  font-family: "Copr";
  color: #fff;
  height: 50px;
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
.navbar-link {
  color: #ffffff;
  transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  &::after {
    border-color: #ffffff;
    &:hover {
      color: #7957d5;
    }
  }
  &:hover {
    color: #7957d5;
  }
}

// @media screen and (max-width: 1023px)
// @import '~assets/css/theme.scss';
</style>