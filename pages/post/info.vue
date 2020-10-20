<template lang="pug">
client-only
  .container.sv-theme-doc-render(
    :class="{ 'empty-contain': in_loading || fail_load }"
  )
    .section(v-if="!fail_load && !in_loading")
      //md-file
      .content.is-1.disp_dark.docMD(
        v-if="content_type === 'md'",
        v-html="md_content"
      )
      .content.is-1.disp_dark.docMD(v-if="content_type === 'ipynb'")
        IPynbRender(:nb_data="nb_format_data")
        // NotebookLab(:notebook="nb_format_data")
    .section(v-if="!fail_load && in_loading")
      // loading screen
      b-skeleton(height="40px")
      b-skeleton(:width="skelRandWidth()", :height="skelRandHeight()")
      b-skeleton(:width="skelRandWidth()", :height="skelRandHeight()")
      b-skeleton(:width="skelRandWidth()", :height="skelRandHeight()")
      b-skeleton(:width="skelRandWidth()", :height="skelRandHeight()")
      b-skeleton(:width="skelRandWidth()", :height="skelRandHeight()")
      b-skeleton(:width="skelRandWidth()", :height="skelRandHeight()")
      b-skeleton(:width="skelRandWidth()", :height="skelRandHeight()")
      b-skeleton(:width="skelRandWidth()", :height="skelRandHeight()")
      b-skeleton(:width="skelRandWidth()", :height="skelRandHeight()")
      b-skeleton(:width="skelRandWidth()", :height="skelRandHeight()")
    .section
      a(href="/post") back to post list
</template>

<script>
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import { mapState, mapGetters } from "vuex";
import IPynbRender from "~/components/post/IPynbRender";
export default {
  name: "postMDRender",
  layout: "inner_page",

  head: (self) => ({
    title: `Tech Post`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Steven Chm - Github Page",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Steven Chm - Github Page and Tech-Blog",
      },
      {
        hid: "og:url",
        property: "og:url",
        content: "https://stvchm9703.github.io/doc",
      },
      {
        hid: "og:image",
        property: "og:image",
        content:
          "https://avatars2.githubusercontent.com/u/15327054?s=400&u=167a64d9000e6ea245b6807fb4a7a1dab537d35a&v=4",
      },
      { hid: "og:type", property: "og:type", content: "website" },
    ],
  }),
  data: () => ({
    fail_load: false,
    in_loading: true,
    md_content: "#Hello World",
    nb_format_data: {},
    content_type: "md",
  }),
  components: { IPynbRender },

  methods: {
    skelRandHeight: () => (Math.random() * 20 + 16).toFixed(2) + "px",
    skelRandWidth: () => (Math.random() * 60 + 20).toFixed(2) + "%",
    async fetchPost() {
      if (
        this.$route.query["file"] == null ||
        this.$route.query["file"] == "" ||
        this.$route.query["file"] == undefined
      ) {
        throw "FILE_NAME_IS_EMPTY";
      }
      let url = "/page_io/post/" + this.$route.query["file"];
      let result = await this.$axios.$get(url);
      console.log(result);
      if (this.$route.query["file"].endsWith(".md")) {
        this.md_content = this.$md.render(result);
      } else if (this.$route.query["file"].endsWith(".ipynb")) {
        this.nb_format_data = result;
        this.content_type = "ipynb";
      }
    },
  },
  // life-cycle
  async beforeMount() {
    this.in_loading = true;
    try {
      console.log("fetch-up");
      await this.fetchPost();
    } catch (e) {
      this.fail_load = true;
      console.warn(e);
    } finally {
      this.in_loading = false;
    }
  },

  beforeDestroy() {},
  // async
};
</script>
