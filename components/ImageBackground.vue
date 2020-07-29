<template lang="pug">
.backgournd(:style="css_rend")
  slot
</template>

<script scoped>
export default {
  props: {
    src: { type: String },
  },
  computed: {
    css_rend: (self) => ({
      background: "url(" + require(`~/static/images/${self.src}`) + ")",
    }),
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.backgournd {
  min-width: 100vw;
  min-height: 100vh;
}
</style>