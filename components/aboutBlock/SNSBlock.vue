<template lang="pug">
.hero.is-large.aboutBlockMod.SNSBlock.background_layer(:style="img_style")
  .hero-body
    .container
      h1.title.is-1 SNS
      .cards.columns

        .column(v-for="k in 6/3")
          .card(v-for="k in 6/2")
            .card-content
              .media
                .media-left
                  figure.image.is-48x48
                    img(src="https://bulma.io/images/placeholders/96x96.png", alt="Placeholder image")
                .media-content
                  p.title.is-4 John Smith
                  p.subtitle.is-6 @johnsmith
              .content
                | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris. 
                a @bulmaio
                | .

                a(href="#") #css
                |  
                a(href="#") #responsive
                br
                time(datetime="2016-1-1") 11:09 PM - 1 Jan 2016
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