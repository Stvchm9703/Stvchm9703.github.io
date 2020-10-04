<template>
  <svg
    version="1.1"
    baseProfile="full"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns:ev="http://www.w3.org/2001/xml-events"
    width="2560px"
    height="2560px"
  >
    <defs>
      <radialGradient id="gr" fx="50%" fy="50%" r="70%" spreadMethod="pad">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="1" />
        <stop offset="100%" stop-color="#000000" stop-opacity="1" />
      </radialGradient>
      <pattern
        id="svgbg-p1"
        patternUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="35"
        height="60.621778266"
        patternTransform="translate(1280,800) rotate(330 0 0)"
      >
        <path
          stroke="#fff"
          stroke-width="2"
          fill="none"
          d="M0 0V10.103629711 L17.5 20.207259422 L35 10.103629711V0M0 60.621778266 V50.518148555L17.5 40.414518844 L35 50.518148555V60.621778266M17.5 20.207259422v20.207259422"
        />
      </pattern>
      <linearGradient id="svgbg-grad" x2="1" y2="0.6">
        <stop class="stop-col-0" offset="0%" />
        <stop clasa="stop-col-100" offset="100%" />
      </linearGradient>
      <mask id="svgbg-msk" x="0" y="0" width="2560" height="1600">
        <path fill="#000" d="M0 0H2560V1600H0z" />
        <path fill="url(#svgbg-p1)" d="M0 0H2560V1600H0z" />
      </mask>
    </defs>
    <path fill="url(#svgbg-grad)" d="M0 0H2560V1600H0z" />
    <path mask="url(#svgbg-msk)" fill="url(#svgbg-gr)" d="M0 0H2560V1600H0z" />
  </svg>
</template>
<style lang="sass">
@import "~bulma/sass/utilities/_all"
@import "~/assets/css/scss/color.scss"
#svgbg-grad
  .stop-col-0 
    stop-color: $mono-set-13;
  .stop-col-100 
    stop-color: $mono-set-10;

.sv-light-mode
  #svgbg-grad
    .stop-col-0 
      stop-color: $mono-set-13;
    .stop-col-100 
      stop-color: $mono-set-10;

.sv-dark-mode 
  #svgbg-grad
    .stop-col-0 
      stop-color: $mono-set-13;
    .stop-col-100 
      stop-color: $mono-set-10;

</style>