<template lang="pug">
div
  .debug-color-ruler.a-set
    .columns(v-for="i in 13")
      .column(:class="mono_class(i)")
        span {{ i-1 }}
  .debug-color-ruler.b-set
    .columns(v-for="i in 13")
      .column(:class="mono_class(i)")
        span {{ i-1 }}
  .debug-color-ruler.c-set
    .columns(v-for="i in 13")
      .column(:class="inv_class(i)")
        span {{ i-1 }}
  .debug-color-ruler.d-set
    .columns(v-for="i in 13")
      .column(:class="comp_class(i)")
        span {{ i-1 }}
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
    }
  },
};
</script>

<style lang="scss" >
// @import "~color";
@import "~bulma/sass/utilities/_all";

@import "~/assets/css/color.scss";

$debug-mono-list: $mono-set-0, $mono-set-1, $mono-set-2, $mono-set-3,
  $mono-set-4, $mono-set-5, $mono-set-6, $mono-set-7, $mono-set-8, $mono-set-9,
  $mono-set-10, $mono-set-11, $mono-set-12, $mono-set-13;

@for $i from 1 through length($debug-mono-list) {
  $n-col : nth($debug-mono-list, $i);
  .debug-mono-#{$i} {
    background-color: $n-col;
  }
  .debug-mono-inv-#{$i} {
    background-color: invert($n-col);
  }
  .debug-mono-compl-#{$i}{
    background-color: complement($n-col); 
  }
}

.debug-color-ruler {
  height: 7.5em;
  width: 1em;
  position: fixed;
  top: 1.2em;
  z-index: 10000;
  &.b-set {
    right: 2em;
    span {
      color: #fff;
    }
  }
  &.a-set {
    right: 4em;
    span {
      color: #000;
    }
  }
  &.c-set {
    right: 6em;
    span {
      color: #fff;
    }
  }
  &.d-set {
    right: 8em;
    span {
      color: #fff;
    }
  }
}
</style>