<template lang="pug">
section.header6.mbr-fullscreen.mbr-parallax-background
  .mbr-overlay(style="opacity: 0.5; background-color: rgb(0, 0, 0);")
  .container
    h2.mbr-section-title.mbr-fonts-style.align-center.mbr-white.pb-4.display-1
      | Steven AO

  .mbr-arrow.hidden-sm-down(aria-hidden="true")
    a(href="#maps4-p", v-smooth-scroll)
      i.mbri-arrow-down.mbr-iconfont
</template>

<style lang="scss" scoped>

.mbr-arrow {
  background: #709faf !important;
  opacity: 0.7;
  i {
    color: #ffffff !important;
  }
}
.underline .line {
  width: 2rem;
  height: 1px;
  background: #ffffff;
  display: inline-block;
}
</style>