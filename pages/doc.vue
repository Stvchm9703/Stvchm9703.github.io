<template lang="pug">
client-only
  .section
    .content.is-1.disp_dark(
      v-if="!fail_load && !in_loading",
      v-html="$md.render(md_content)"
    )
    .footer
</template>

<script>
import _isEmpty from "lodash/isEmpty";
import "highlight.js/scss/atom-one-dark.scss";

export default {
  name: "docMDRender",
  data: () => ({
    fail_load: false,
    in_loading: true,
    md_content: "#Hello World",
  }),
  methods: {
    async fetchPost() {
      try {
        // console.log(this.topic);
        let ip = await this.$axios.$get("/host_md/README.md");
        let request_url = "";

        if (!_isEmpty(this.$route.params["project_name"])) {
          request_url = `https://raw.githubusercontent.com/Stvchm9703/${this.$route.params["project_name"]}/master/readme.md`;
        }
        this.in_loading = true;
        let lip = await this.$axios.$get(request_url);

        if (lip == "") {
          this.md_content = ip;
          this.in_loading = false;
          this.fail_load = true;
        } else {
          this.md_content = lip;
          this.in_loading = false;
        }
      } catch (e) {
        console.warn(e);
        // ** show the missing layout
        this.fail_load = true;
        this.in_loading = false;
        // this.$router.push({
        //   path: "/doc",
        // });
      }
    },
  },
  created() {
    this.fetchPost();
  },
};
</script>

<style lang="scss" >
.content.disp_dark {
  h1, h2, h3, h4, h5, h6 {
    color: #98b9dc;
  }
  span,
  p {
    color: #ffffff;
  }
  pre {
    background: #4a4a4a;
    code[class*="language-"],
    pre[class*="language-"] {
      color: white;
      text-shadow: none;
    }
  }
}
</style>

