  
<template lang="pug">
.bgContainer
  b-carousel.background(
    :indicator-inside="true",
    :indicator-background="true",
    indicator-mode="click",
    indicator-position="is-top",
    :pause-hover="false",
    :pause-info="false",
    :arrow-hover="false"
  )
    b-carousel-item(v-for="(carousel, i) in carousels", :key="i")
      section.hero.background_layer.is-medium(:style="carousel.style")
        .hero-body.has-text-centered
          h1.title.is-shadow {{ carousel.title }}

    template(slot="indicators", slot-scope="props")
      span.al.image(:style="carousels[props.i].style")
</template>

<script scoped>
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
export default {
  props: {
    src: {},
  },
  data: () => ({
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
                  "background-image": "url(" + e.image + ")",
                }
              : { "background-color": "rgba(" + e.color + ")" },
            filter_style: {
              background: `linear-gradient(0.25turn, rgba(${e.color}) 12.5%, rgba(#ebf8e1,0.1), #f69d3c)`,
            },
            _image: e.image,
          }));
          // console.log(this.carousels);
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
                    "background-image": "url(" + this.src.image + ")",
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
<style lang="scss" scope>
// @import "~assets/css/theme.scss";
.bgContainer {
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.title.is-shadow {
  text-shadow: #1e1e1e 0 0 15px;
}
.carousel.background {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  .carousel-items {
    position: fixed;
  }
  .carousel-item section {
    height: 100vh;
    &.filter_layer {
    }
    &.background_layer {
      background-repeat: no-repeat no-repeat;
      background-position: center;
      background-attachment: fixed;
      background-size: cover;
    }
  }
  .carousel-indicator.is-inside {
    transition-delay: 0.3s;
    transition-timing-function: ease-in-out;
    .indicator-item {
      .al {
        height: 100px;
        width: 200px;
        background-repeat: no-repeat no-repeat;
        background-position: center;
        background-attachment: scroll;
        background-size: cover;
        img {
          filter: grayscale(100%);
        }
      }
      &.is-active {
        .al img {
          filter: grayscale(0%);
        }
      }
    }
    &.is-bottom {
      transition: bottom 0.7s;
      bottom: -70px;
      &:hover {
        bottom: 0px;
      }
    }
    &.is-top {
      transition: top 0.7s;
      top: -70px;
      &:hover {
        top: 0px;
      }
    }
  }
}
</style>