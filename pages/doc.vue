<template lang="pug">
.section
  .content.is-1(v-html="$md.render(hello)")
  .footer
</template>
<script>
export default {
  name: "docMDRender",
  data: () => ({
    hello: "#Hello World",
  }),
  computed: {
    topic() {
      let a = this.$route.hash ? this.$route.hash.replace("#", "") : "";
      let b = this.$route.hash ? a.split("/") : [];
      let c = a.includes("https://") ? a : b;
      return c;
    },
  },
  watch: {
    topic() {
      this.fetchPost();
    },
  },
  methods: {
    async fetchPost() {
      try {
        console.log(this.topic);
        let ip = await this.$axios.$get("/host_md/README.md");
        let lip = await this.$axios.$get(this.topic);
        console.log(ip);
        console.log(lip);
        if (lip == "") this.hello = ip;
        else this.hello = lip;
      } catch (e) {
        console.warn(e);
        this.$router.push({
          path: "/doc",
        });
      }
    },
  },
  created() {
    this.fetchPost();
  },
};
</script>