<template lang="pug">
a.column(:href="href")
  transition(name="slide-fade")
    .card.box.is-offset-1.sv-theme-card.has-background-light.hvr-grow(
      v-if="is_ready",
      :class="`tile-ani-delay-${sort_index}`"
    )
      article.media
        figure.media-left
          p.image.is-64x64
            img(src="https://bulma.io/images/placeholders/128x128.png")
        .media-content
          slot(name="content")
            .content.has-text-dark
              slot
</template>

<script>
export default {
  props: {
    is_ready: { type: Boolean, deafult: false },
    sort_index: { type: Number, default: 0 },
    href: { type: String, default: "" },
  },
};
</script>
