<template lang="pug">
div 
  // transition-group
  .front-layer
    .hero.is-medium
      .hero-body
        .container
          h1.title.is-1 More About ...
    infoBlock.is-large(index="1", img_src="https://i.imgur.com/1CT7JYrh.jpg")
      h1.title.is-size-1-desktop.is-size-3-touch Steven
      h2.subtitle.is-3 Cheng Ho Man
      span.is-size-4.
        A Hong Kong developer, mainly work in front-end web developing,
      br
      span.is-size-4.
        Also, Interested in game engine  

    infoBlock(index="2", img_src="https://i.imgur.com/EiteW03h.png")
      h1.title.is-size-1-desktop.is-size-3-touch Who am I ?
      section.section
        .timeline.is-center-manually
          header.timeline-header
            span.tag.is-medium.is-primary 2015

          .timeline-item.left-side
            .timeline-marker.is-icon.is-primary
              i.mdi.mdi-flag
            .timeline-content
              p.heading September 2015 - July 2017
              p.is-size-5 Student
              span Associate of Science in Information Systems Development
              span Community College Of City University

          .timeline-item.right-side
            .timeline-marker.is-image.is-32x32
              img(src="https://bulma.io/images/placeholders/32x32.png")
            .timeline-content
              p.heading November 2017 – May 2019
              p.is-size-5 Web Programmer
              span Teksbotics(Hong Kong) Limited
              p(lang="md").
                kndfkg 

          .timeline-item.left-side
            .timeline-marker.is-icon.is-primary
              i.mdi.mdi-flag
            .timeline-content
              p.heading September 2017 - September 2020
              p.is-size-5 Student (part-time)
              p School Of Continuing and Professional Education
              p Golang study
          .timeline-header
            span.tag.is-medium.is-primary Now

    infoBlock(index="3")
      h1.title.is-size-1-desktop.is-size-3-touch.has-text-right.
        Favour Programming Language
      section.section
        .columns.is-centered.is-multiline.is-variable.is-mobile.is-1-desktop.is-1-widescreen.is-1-fullhd
          ItemCard(
            v-for="k in fav_lang",
            :key="k.desp_title",
            :icon_image="k.icon_image",
            :desp_title="k.desp_title",
            :desp_subtitle="k.desp_subtitle"
          )
            p exp: {{ k.exp }}

    infoBlock(index="4")
      h1.title.is-size-1-desktop.is-size-3-touch.
        Available Programming Language
      section.section
        .columns.is-centered.is-multiline.is-variable.is-mobile.is-1-desktop.is-1-widescreen.is-1-fullhd
          ItemCard(
            v-for="k in avail_lang",
            :key="k.desp_title",
            :icon_image="k.icon_image",
            :desp_title="k.desp_title",
            :desp_subtitle="k.desp_subtitle"
          )
            p exp: {{ k.exp }}

    infoBlock(index="5")
      h1.title.is-size-1-desktop.is-size-3-touch.has-text-right.
</template>

<script scope>
//this page is for introduce self
import infoBlock from "~/components/aboutBlock/InfoBlock.vue";
import SNSBlock from "~/components/aboutBlock/SNSBlock.vue";
import ItemCard from "~/components/aboutBlock/itemCard.vue";

import header_row_block from "~/components/mbr/header_row_block";
import contact_row_block from "~/components/mbr/contact_row_block";
export default {
  layout: "inner_page",
  components: {
    infoBlock,
    SNSBlock,
    ItemCard,
    header_row_block,
    contact_row_block,
  },
  methods: {
    img_style: (img_src) => ({
      "background-image": `url("${img_src}")`,
    }),
  },
  data: () => ({
    fav_lang: [],
    avail_lang: [],
  }),
  asyncData: (context) => ({
    fav_lang: [
      {
        icon_image: "/images/icon_nodejs.svg",
        desp_title: "NodeJS",
        desp_subtitle: "Make Single Page App (SPA) Fast",
        exp: "2018~2020",
      },
      {
        icon_image: "/images/nuxt-square.svg",
        desp_title: "Nuxt / Vue",
        desp_subtitle: "Not just Vue SPA Render, But the Nuxt SSR Render",
        exp: "2018~2020",
      },
      {
        icon_image: "/images/GO_Logo_Blue.svg",
        desp_title: "Golang",
        desp_subtitle: "Make Console App To Faster Deploy",
        exp: "2019~2020",
      },
      {
        icon_image: "/images/rust.svg",
        desp_title: "Rust",
        desp_subtitle: "Make All Thing Run in Rapid And Safty",
        exp: "2020 ~ (still learning)",
      },
    ],

    avail_lang: [
      {
        icon_image: "/images/csharp.svg",
        desp_title: "C# (C Sharp)",
        desp_subtitle: "Large Scale Project, or just Unity Engine ",
        exp: "2017~2020",
      },
      {
        icon_image: "/images/icon_python.svg",
        desp_title: "Python",
        desp_subtitle: "Simple Web server / API server, while Python is RAM eater",
        exp: "2018~2020",
      },
      {
        icon_image: "/images/java.svg",
        desp_title: "Java",
        desp_subtitle: "Classic, Epic, but Cumbersome Structure",
        exp: "2017~2018",
      },
    ],
  }),
};
</script>
