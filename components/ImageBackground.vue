  
<template lang="pug">
.bgContainer
  b-carousel.background.customBackground(
    :indicator-inside="true",
    :indicator-background="true",
    indicator-mode="click",
    indicator-position="is-top is-mobile-top",
    :pause-hover="false",
    :pause-info="false",
    :arrow-hover="false",
    arrow-position="is-mobile-top"
  )
    b-carousel-item(v-for="(carousel, i) in carousels", :key="i")
      section.hero.background_layer.is-fullheight(:style="carousel.style")
        .hero-body(:style="carousel.filter_style")
          .container.is-large.is-fluid
            .columns.is-centered.sv-title-set
              .column.is-5.is-hidden-touch
              .column.has-text-left-tablet
                h1.title.is-size-1-desktop.is-size-3-touch.is-shadow {{ carousel.title }}
                h2.subtitle.is-size-3-desktop.is-size-5-touch.is-shadow {{ carousel.subtitle }}
    template(slot="indicators", slot-scope="props")
      span.al.image.is-hidden-touch(:style="carousels[props.i].style")
      span.indicator-style.is-dots.is-hidden-desktop
</template>

<script>
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
            subtitle: e.subtitle,
            style: !_isEmpty(e.image)
              ? { "background-image": "url(" + e.image + ")" }
              : { "background-color": "rgba(" + e.color + ")" },
            filter_style: !_isEmpty(e.image)
              ? {
                  background:
                    "linear-gradient( 180deg, rgba(" +
                    e.color +
                    " )12.5%, rgba(235, 248, 234, 0.1) 50%, rgba(246, 157, 60, 0.1)  100%)",
                }
              : {},
            _image: e.image,
          }));
        } catch (e) {
          console.warn(e);
        }
      } else {
        try {
          this.carousels = [
            {
              title: this.src.title,
              style: !_isEmpty(this.src.image)
                ? { "background-image": "url(" + this.src.image + ")" }
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
<style lang="scss">
@import "~/assets/css/media_rule.scss";

// index / image-background
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

.carousel.customBackground {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  @include when-small-mobile {
    .carousel-items .carousel-arrow,
    .carousel-items .carousel-arrow .icon {
      z-index: 100;
      height: 36px;
      width: 36px;
      .mdi::before {
        font-size: 36px;
      }
    }
    &[arrow-position="is-mobile-bottom"] {
      .carousel-items .carousel-arrow .icon {
        bottom: 25px;
        top: auto;
      }
    }
    &[arrow-position="is-mobile-top"] {
      .carousel-items .carousel-arrow .icon {
        top: 25px;
        bottom: auto;
      }
    }
  }

  // extendsion - index.vue
  .carousel-indicator {
    &.is-inside {
      transition-delay: 0.3s;
      transition-timing-function: ease-in-out;
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
      &.is-mobile-bottom {
        @include when-mobile {
          bottom: 0;
          top: auto;
        }
      }
      &.is-mobile-top {
        @include when-mobile {
          top: 0;
          bottom: auto;
        }
      }
    }
    // child
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
  }

  .sv-title-set {
    margin-bottom: 90px;
  }
}
</style>