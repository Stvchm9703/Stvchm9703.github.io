  
<template lang="pug">
b-carousel.background(
  :indicator="indicator",
  :indicator-background="indicatorBackground",
  :indicator-inside="indicatorInside",
  :indicator-mode="indicatorMode",
  :indicator-position="indicatorPosition",
  :indicator-style="indicatorStyle",
  :pause-hover="false",
  :pause-info="false"
)
  b-carousel-item(v-for="(carousel, i) in carousels", :key="i")
    section.hero.is-medium(:style="carousel.style")
      .hero-body.has-text-centered
        h1.title {{ carousel.title }}
</template>

<script scoped>
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
export default {
  props: {
    src: {},
  },
  data: () => ({
    indicator: true,
    indicatorBackground: true,
    indicatorInside: true,
    indicatorMode: "hover",
    indicatorPosition: "is-top",
    indicatorStyle: "is-lines",
    carousels: [],
  }),
  methods: {
    init_set_list() {
      if (_isArray(this.src)) {
        try {
          this.carousels = this.src.map((e) => ({
            title: e.title,
            style: !_isEmpty(e.image)
              ? {
                  "background-image":
                    "url(" + require(`~/static/images/${e.image}`) + ")",
                }
              : { "background-color": "rgba(" + e.color + ")" },
          }));
          console.log(this.carousels);
        } catch (e) {
          console.warn(e);
        }
      } else {
        try {
          this.carousels = [
            {
              title: this.src.title,
              style: !_isEmpty(this.src.image)
                ? {
                    "background-image":
                      "url(" +
                      require(`~/static/images/${this.src.image}`) +
                      ")",
                  }
                : { "background-color": "rgba(" + this.src.color + ")" },
            },
          ];
        } catch (e) {
          console.warn(e);
        }
      }
    },
  },
  mounted() {
    this.init_set_list();
  },
};
</script>
<style lang="scss" scoped>
.background {
  min-width: 100vw;
  min-height: 100vh;
  background-repeat: no-repeat no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  .carousel-item section {
    height: 100vh;
  }
}
</style>