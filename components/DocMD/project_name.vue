<template lang="pug">
.section
  .content.is-1(v-if="!fail_load", v-html="$md.render(md_content)")
  .footer
</template>

<script>
import _isEmpty from "lodash/isEmpty";
export default {
  name: "docMDRender_old",
  data: () => ({
    fail_load: false,
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
        let lip = await this.$axios.$get(request_url);
        if (lip == "") this.md_content = ip;
        else this.md_content = lip;
      } catch (e) {
        console.warn(e);
        // ** show the missing layout

        // this.$router.push({
        //   path: "/doc",
        // });
      }
    },
  },
  // life-cycle
  created() {
    this.fetchPost();
  },
};
</script>

<style lang="scss">
html {
  background-color: #98b9dc;
}
</style>
