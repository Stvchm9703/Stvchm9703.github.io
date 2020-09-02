<template lang="pug">
.bgContainer
  b-carousel.background(
    :indicator-inside="true",
    :indicator-background="true",
    :indicator-mode="click",
    indicator-position="is-top",
    :pause-hover="false",
    :pause-info="false",
    :arrow-hover="false"
  )
    b-carousel-item(v-for="(item, i) in 8", :key="i")
      section.background_layer.hero.is-medium(:style="ca_style(i)")

    template(slot="indicators", slot-scope="props")
      span.al.image
        img(:src="getImgUrl(props.i)", :title="props.i")
</template>

<script>
export default {
  methods: {
    getImgUrl(value) {
      return `https://picsum.photos/id/43${value}/1230/500`;
    },
    ca_style(item) {
      return {
        "background-image": "url(" + this.getImgUrl(item) + ")",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.bgContainer {
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.carousel.background {
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  .carousel-item section {
    height: 100vh;
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
      .al img {
        filter: grayscale(100%);
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