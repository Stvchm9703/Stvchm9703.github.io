  
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
      "background-image": "url(" + require(`~/static/images/${self.src}`) + ")",
    }),
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.backgournd {
  min-width: 100vw;
  min-height: 100vh;
  background-repeat: no-repeat no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
}
</style>