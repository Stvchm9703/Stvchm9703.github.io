<template lang="pug">
.column.is-half-tablet.is-full-mobile.is-one-half-desktop.is-one-third-widescreen.is-one-third-fullhd
  .card.is-offset-1
    header.card-header
      b-skeleton.card-header-title(height="48px")
    .card-content
      .content
        b-skeleton.field(width="80%")
        b-skeleton.field(width="60%")
        b-skeleton.field(width="40%")
        b-skeleton.field(width="60%")
        b-skeleton.field(width="50%")
        b-skeleton.field(width="70%")
    footer.card-footer
      .card-footer-item.has-background-primary.has-text-light
        b-skeleton(size="is-large")
      .card-footer-item.has-text-info 
        b-skeleton(size="is-large")
</template>
<script>
// TODO:
// 1. check up the card content beatify ?
</script>
