<template lang="pug">
client-only
  div 
    b-navbar.search-bar(fixed-top, :burger="false")
      template(slot="brand")
        button.button(@click="$store.commit('open_menu', true)") Menu
    .container(:class="{ 'empty-contain': in_loading || fail_load }")
      .section
        .content.is-1.disp_dark.docMD(
          v-if="!fail_load && !in_loading",
          v-html="$md.render(md_content)"
        )
</template>

<script>
import _isEmpty from "lodash/isEmpty";
import "highlight.js/scss/atom-one-dark.scss";
import { mapState, mapGetters } from "vuex";
export default {
  name: "docMDRender_old",
  data: () => ({
    fail_load: false,
    in_loading: true,
    md_content: "#Hello World",
  }),
  layout: "inner_page",
  computed: {
    reqFileList: (self) => self.$route.query["filePath"],
    ...mapGetters({
      mdFileList: "file_list/mdFileList",
    }),
  },
  methods: {
    async fetchPost() {
      let readme_url = this.mdFileList.filter(
        (e) =>
          e.name.toLowerCase().includes("readme") ||
          e.name.toLowerCase().includes("read_me")
      );
      let lip = "";
      if (readme_url.length > 0) {
        lip = await this.$axios.$get(readme_url[0].download_url);
      }
      this.md_content = lip;
    },
    async fetchFileList() {
      let request_url = "";
      if (
        !_isEmpty(this.$route.params["project_name"]) &&
        !_isEmpty(this.$route.params["user"])
      ) {
        request_url = `https://api.github.com/repos/${this.$route.params["user"]}/${this.$route.params["project_name"]}/contents/`;
      } else {
        throw "Unknown Repo";
      }
      let lip = await this.$axios.$get(request_url);
      this.$store.commit("reset_route_map");
      this.$store.commit("file_list/set_list", lip);
      // this.$store.commit("set_route_file_list", lip);
      let redList = lip.map((e) => ({
        name: e.name,
        path: e.path,
        _type: e.type,
      }));
      let pathList = redList[0].path.split("/");
      this.$store.commit("set_route_map", [
        {
          title: "Sub-Directory",
          subtitle:
            pathList.length > 1 ? pathList[pathList.length - 1] : "root",
          itemList: redList.filter((e) => e._type === "dir"),
        },
        {
          title: "Recent-Directory-File",
          subtitle:
            pathList.length > 1 ? pathList[pathList.length - 1] : "root",
          itemList: redList.filter((e) => e._type === "file"),
        },
      ]);
      this.$store.commit(
        "file_list/set_project_name",
        `${this.$route.params["user"]}/${this.$route.params["project_name"]}`
      );
    },
  },
  // life-cycle
  async beforeMount() {
    this.in_loading = true;
    console.log("fetch-up");
    await this.fetchFileList();
    await this.fetchPost();
    this.in_loading = false;
  },
};
</script>
