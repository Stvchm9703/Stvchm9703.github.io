  
<template lang="pug">
div 
  VueSlickCarousel(v-bind="settings")
    .background(v-for="f in src", :style="css_func(f)")
  slot
  // div(v-for="f in src")
  //   span {{f}}
</template>

<script scoped>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import _isArray from "lodash/isArray";
export default {
  props: {
    src: {},
  },
  data: () => ({
    settings: {
      dots: true,
      lazyLoad: "ondemand",
      dotsClass: "slick-dots custom-dot-class",
      edgeFriction: 0.35,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    },
  }),
  components: { VueSlickCarousel },
  computed: {
    isArray() {
      return _isArray(this.src);
    },
    css_rend: (self) => ({
      "background-image": "url(" + require(`~/static/images/${self.src}`) + ")",
    }),
  },
  methods: {
    css_func(s) {
      return {
        "background-image": "url(" + require(`~/static/images/${s}`) + ")",
      };
    },
    img_src(s) {
      return `/static/images/${s}`;
    },
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
}
</style>