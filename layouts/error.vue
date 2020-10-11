  
<template lang="pug">

section.section.hero
  .__nuxt-error-page.hero-body
    .container.is-centered
      ErrorSvg
      p {{statusCode}}
      h1.title.is-size-1-desktop.is-size-3-touch.is-spaced.mb-6 {{ message }}

      p.subtitle.is-size-3-desktop.is-size-5-touch.mb-0(v-if="targetPage!=='error'") Maybe Not Your False, but those pages need to redirect. 
      p.subtitle.is-size-3-desktop.is-size-5-touch(v-if="targetPage!=='error'") Take a Coffee, Hold on, It will redirect to there. 

      p.subtitle.is-size-3-desktop.is-size-5-touch.mb-0(v-if="targetPage==='error'") Hmm, What is the page gone? 
      p.subtitle.is-size-3-desktop.is-size-5-touch(v-if="targetPage==='error'") Back To Home Page, Fetch it again 
      
      p.description
        nuxt-link.error-link(v-if="targetPage==='error'"  to="/") Back To Home      
        nuxt-link.error-link(v-if="targetPage==='doc'"  to="/") Back To Document list
        nuxt-link.error-link(v-if="targetPage==='post'"  to="/") Back To Post list

</template>

<script>
import ErrorSvg from "~/assets/svg/error_page_default.svg?inline";
export default {
  name: "NuxtError",
  components: { ErrorSvg },
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      return this.error.message || "<%= messages.client_error %>";
    },
    targetPage() {
      if (this.$route.fullPath.includes("/doc/")) {
        return "doc";
      } else if (this.$route.fullPath.includes("/post/")) {
        return "post";
      } else if (this.$route.fullPath.includes("/tag/")) {
        return "tag";
      } else {
        return "error";
      }
    },
  },

  head() {
    return {
      title: this.message,
      meta: [
      { name: "viewport", content: "width=device-width,initial-scale=1.0,minimum-scale=1.0", },
      { hid: "description", name: "description", content: "Steven Chm home page", },
      { hid: "og:title", property: "og:title", content: "Steven Chm - Github Page", },
      { hid: "og:description", property: "og:description", content: "Steven Chm - Github Page and Tech-Blog", },
      { hid: "og:url", property: "og:url", content: "https://stvchm9703.github.io/", },
      { hid: "og:image", property: "og:image", content: "https://avatars2.githubusercontent.com/u/15327054?s=400&u=167a64d9000e6ea245b6807fb4a7a1dab537d35a&v=4", },
      { hid: "og:type", property: "og:type", content: "website" },
      ],
    };
  },
};
</script>
