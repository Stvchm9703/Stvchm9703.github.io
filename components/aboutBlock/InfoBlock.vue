<template lang="pug">
.hero.aboutBlockMod.background_layer(:style="img_style")
  .hero-body
    .container
      slot
</template>
<script>
export default {
  props: {
    img_src: { type: String, default: "" },
  },
  computed: {
    img_style: (self) => ({
      "background-image": `url("${self.$props.img_src}")`,
    }),
  },
};
</script>