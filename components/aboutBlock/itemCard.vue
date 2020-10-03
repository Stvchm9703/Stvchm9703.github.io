<template lang="pug">
.column.is-6-mobile.is-4-tablet.is-3-desktop.is-2-widescreen.is-2-fullhd.is-centered.lang-card-grid
  .card
    .card-image
      figure.image.is-2by1
        img(:src="icon_image")
    .card-content
      p.title.has-text-centered.is-size-4 {{ desp_title }}
      p.subtitle.is-size-6.is-hidden-touch {{ desp_subtitle }}
      slot
</template>

<script>
export default {
  props: ["icon_image", "desp_title", "desp_subtitle"],
};
</script>

