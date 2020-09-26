<template lang="pug">
div 
  // transition-group
  .front-layer
    .hero.is-medium
      .hero-body
        .container
          h1.title.is-1 More About ...
    infoBlock.is-large(index="1" , img_src="https://i.imgur.com/1CT7JYr.jpg")
      h1.title.is-1 Steven 
      h2.subtitle.is-3 Cheng Ho Man

    infoBlock(index="2", img_src="https://i.imgur.com/EiteW03h.png")
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
    header_row_block
    contact_row_block
</template>

<script scope>
//this page is for introduce self
import infoBlock from "~/components/aboutBlock/InfoBlock.vue";
import SNSBlock from "~/components/aboutBlock/SNSBlock.vue";
import header_row_block from "~/components/mbr/header_row_block";
import contact_row_block from "~/components/mbr/contact_row_block";
export default {
  layout: "inner_page",
  components: {
    infoBlock,
    SNSBlock,
    header_row_block,
    contact_row_block,
  },
  methods:{
    img_style: (img_src) => ({
      "background-image": `url("${img_src}")`,
    }),
  }
};
</script>
