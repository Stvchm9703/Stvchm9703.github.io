  
<template lang="pug">
.bgContainer
  b-carousel.background.customBackground(
    :indicator-inside="true",
    :indicator-background="true",
    indicator-mode="click",
    indicator-position="is-top is-mobile-top",
    :pause-hover="false",
    :pause-info="false",
    :arrow="false",
    :arrow-hover="false",
    arrow-position="is-mobile-top",
    :value="in_view"
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
      figure.al.image.is-hidden-touch.is-3by1
        img(:src="carousels[props.i]._image")
      span.indicator-style.is-dots.is-hidden-desktop

    .carousel-arrow
      span.icon.has-icons-left(@click="toggle_left()")
        leftArrowIcon
      span.icon.has-icons-right(@click="toggle_right()")
        rightArrowIcon
</template>

<script>
import _isArray from "lodash/isArray";
import _isEmpty from "lodash/isEmpty";
import leftArrowIcon from "mdi-vue/ChevronDoubleLeft.vue";
import rightArrowIcon from "mdi-vue/ChevronDoubleRight.vue";
export default {
  props: {
    src: {},
  },
  data: () => ({
    carousels: [],
    in_view: 0,
  }),
  components: { leftArrowIcon, rightArrowIcon },
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
              subtitle: e.subtitle,

              style: !_isEmpty(this.src.image)
                ? { "background-image": "url(" + this.src.image + ")" }
                : { "background-color": "rgba(" + this.src.color + ")" },
              _image: e.image,
            },
          ];
        } catch (e) {
          console.warn(e);
        }
      }
    },
    toggle_left() {
      console.log("toggle left ");
      if (this.in_view == 0) {
        this.in_view = this.carousels.length - 1;
      } else {
        this.in_view--;
      }
    },
    toggle_right() {
      console.log("toggle right ");
      if (this.in_view == this.carousels.length - 1) {
        this.in_view = 0;
      } else {
        this.in_view++;
      }
    },
  },
  mounted() {
    this.init_set_list();
  },
};
</script>
<style lang="scss">
@import "~/assets/css/scss/media_rule.scss";

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
      z-index: 10;
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
        // background-repeat: no-repeat no-repeat;
        // background-position: center;
        // background-attachment: scroll;
        // background-size: cover;
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