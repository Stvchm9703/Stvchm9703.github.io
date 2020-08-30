<template lang="pug">
.backgournd(:style="css_rend")
  slot
</template>

<script scoped>
import _isArray from "lodash/isArray";
export default {
  props: {
    src: { type: String || Array },
  },
  data: () => ({
    css_rend: {},
  }),
  methods: {
    css_on_change() {
      if (_isArray(this.$props.src)) {
      }
    },
  },
  mouted() {},
};
</script>
<style lang="scss" scoped>
.backgournd {
  min-width: 100vw;
  min-height: 100vh;
  // transaction :
}
</style>