<template lang="pug">
div
  .debug-color-ruler.d-1-set
    .columns(v-for="i in 14")
      .column(:class="mono_class(i)")
        span {{ i - 1 }}
  .debug-color-ruler.d-2-set
    .columns(v-for="i in 14")
      .column(:class="mono_class(i)")
        span {{ i - 1 }}
  .debug-color-ruler.d-3-set
    .columns(v-for="i in 14")
      .column(:class="inv_class(i)")
        span {{ i - 1 }}
  .debug-color-ruler.d-4-set
    .columns(v-for="i in 14")
      .column(:class="comp_class(i)")
        span {{ i - 1 }}
  .debug-color-ruler.d-5-set
    .columns(v-for="i in 14")
      .column(:class="`debug-hue-${i}`")
        span {{ i - 1 }}
  .debug-color-ruler.d-6-set
    .columns(v-for="i in 14")
      .column(:class="`d-adj-hue-${i}`")
        span {{ i - 1 }}
</template>
<script>
export default {
  methods: {
    mono_class(i) {
      return "debug-mono-" + i;
    },
    inv_class(i) {
      return "debug-mono-inv-" + i;
    },
    comp_class(i) {
      return "debug-mono-compl-" + i;
    },
  },
};
</script>

<style lang="scss" >
// @import "~color";
@import "~bulma/sass/utilities/_all";

@import "~/assets/css/scss/color.scss";

$debug-mono-list: $mono-set-0, $mono-set-1, $mono-set-2, $mono-set-3,
  $mono-set-4, $mono-set-5, $mono-set-6, $mono-set-7, $mono-set-8, $mono-set-9,
  $mono-set-10, $mono-set-11, $mono-set-12, $mono-set-13;

@for $i from 1 through length($debug-mono-list) {
  $n-col: nth($debug-mono-list, $i);
  .debug-mono-#{$i} {
    background-color: $n-col;
  }
  .debug-mono-inv-#{$i} {
    background-color: invert($n-col);
  }
  .debug-mono-compl-#{$i} {
    background-color: complement($n-col);
  }

  .debug-hue-#{$i} {
    $hu : (360 / length($debug-mono-list)) * ($i - 1);
    background-color: hsb($hu , 70%,  85%);
  }

  .d-adj-hue-#{$i} {
    // $hu : (360 / length($debug-mono-list)) * ($i - 1);
    background-color: adjust-hue($n-col, 160);
  }
  
}

.debug-color-ruler {
  height: 7.5em;
  width: 1em;
  position: fixed;
  top: 1.2em;
  z-index: 10000;

  @for $i from 1 through 10 {
    &.d-#{$i}-set {
      right: #{2em * $i} ;
      span {
        color: #fff;
      }
    }
  }
}



</style>