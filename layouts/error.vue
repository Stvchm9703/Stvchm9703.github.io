  
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
        nuxt-link.error-link(, to="/") Back To Home


 
      
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
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0",
        },
      ],
    };
  },
  beforeMount() {
    if (this.$route.fullPath.includes("/doc/")) {
      // this.$router.push({ path: "/doc/" });
    } else if (this.$route.fullPath.includes("/post/")) {
    }
  },
};
</script>

<style lang="scss">
// .__nuxt-error-page {
//   padding: 1rem;
//   text-align: center;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   font-family: sans-serif;
//   font-weight: 100 !important;
//   -ms-text-size-adjust: 100%;
//   -webkit-text-size-adjust: 100%;
//   -webkit-font-smoothing: antialiased;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// }
// .__nuxt-error-page .error {
//   max-width: 450px;
// }
// .__nuxt-error-page a {
//   // color: #7f828b !important;
//   text-decoration: none;
// }
</style>