<template lang="pug">
.container.is-fluid
  .section
    span.title.is-center.
      Tagged Post 
    .columns
      client-only
        // D3Network.column
    .columns
      .column
        span.has-text-light Last update :
          time(:datetime="last_updated") {{ last_updated }}
</template>

<script>
import _isEmpty from "lodash/isEmpty";
import _without from "lodash/without";
import D3Network from "vue-d3-network";

export default {
  name: "tag-graph",
  layout: "inner_page",
  components: { D3Network },
  data: () => ({
    in_loading: true,
    fail_load: false,
    node_list: [],
    last_updated: "",
    debug_list: [],
  }),
  fetchData: () => ({}),
  methods: {
    async fetchUpdated() {
      let tags = !_isEmpty(this.$route.query["tag"])
        ? this.$route.query["tag"]
        : "";
      let tagA = !_isEmpty(this.$route.query["t"])
        ? this.$route.query["t"]
        : "";
      tags = tags + "," + tagA;
      let tag_list = _without(tags.split(","), "");
      this.debug_list = tag_list;
      // console.log("tags", tag_list);
      let url = "/page_io/post/tag.json";
      let jdata = await this.$axios.$get(url);
      this.tag_list = jdata.post;
      this.last_updated = jdata.last_updated;
    },
  },
  async created() {
    try {
      await this.fetchUpdated();
    } catch (e) {
      this.fail_load = true;
    } finally {
      this.in_loading = false;
    }
  },
};
// TODO
// 1. tag list fetching from .io.page
// 2. tag render-graph
</script>

<style>
</style>
