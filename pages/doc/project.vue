<template lang="pug">
client-only
  .container.sv-theme-doc-render(:class="{ 'empty-contain': in_loading || fail_load }")
    .section
      .content.is-1.disp_dark.docMD(
        v-if="!fail_load && !in_loading",
        v-html="$md.render(this.md_content)"
      )

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
</template>

<script>
import _isEmpty from "lodash/isEmpty";
import _cloneDeep from "lodash/cloneDeep";
import { mapState, mapGetters } from "vuex";
export default {
  name: "docMDRender_old",
  layout: "inner_page",

  head: (self) => ({
    title: `Document - ${self.$route.query["proj"]}`,
    meta: [],
  }),
  data: () => ({
    fail_load: false,
    in_loading: true,
    md_content: "#Hello World",
  }),
  computed: {
    reqFileList: (self) => self.$route.query["filePath"],
    ...mapGetters({
      mdFileList: "file_list/mdFileList",
    }),
  },
  watch: {
    async reqFileList(val) {
      console.log("watch: reFileList:", val);
      if (this.$route.query["type"] === "file") {
        // fetch file
        this.in_loading = true;
        try {
          await this.fetchPost(this.$route.query["filePath"]);
        } catch (e) {
          this.fail_load = true;
        } finally {
          this.in_loading = false;
        }
      } else if (this.$route.query["type"] === "dir") {
        try {
          await this.fetchFileList(this.$route.query["filePath"]);
        } catch (e) {
          this.fail_load = true;
        }
      }
    },
  },
  methods: {
    skelRandHeight: () => (Math.random() * 20 + 16).toFixed(2) + "px",
    skelRandWidth: () => (Math.random() * 60 + 20).toFixed(2) + "%",

    async fetchBranchList() {
      let user = this.$route.query["u"];
      let proj = this.$route.query["proj"];

      let req_url = `/gh_api/repos/${user}/${proj}/branches`;
      let lip = await this.$axios.$get(req_url);
      // console.log("branch:", lip);
      let branchRouteMap = {
        title: "Branch",
        subtitle:
          this.$store.state.file_list.current_branch === ""
            ? "Matser"
            : this.$store.state.file_list.current_branch,
        itemList: lip.map((e) => ({
          name: e.name,
          path: e.name,
          _type: "branch",
          routerPath: `/doc/project?u=${user}&proj=${proj}&filePath=${e.path}&type=${e.type}&branch=${e.name}`,
        })),
      };
      this.$store.commit("set_route_map", [branchRouteMap]);
      console.log("end fetch , route-map", this.$store.state.extra_route_map);
    },
    async fetchPost(fileName) {
      let lip = "";
      let user = this.$route.query["u"];
      let proj = this.$route.query["proj"];
      if (_isEmpty(fileName)) {
        let readme_url = this.mdFileList.filter(
          (e) =>
            e.name.toLowerCase().includes("readme") ||
            e.name.toLowerCase().includes("read_me")
        );
        if (readme_url.length > 0) {
          lip = await this.$axios.$get(readme_url[0].download_url);
        }
      } else {
        // console.log(
        //   `https://raw.githubusercontent.com/${this.$route.params["user"]}/${this.$route.params["project_name"]}/master/${fileName}`
        // );
        lip = await this.$axios.$get(
          `/gh_resx/${user}/${proj}/master/${fileName}`
        );
      }
      this.md_content = lip;
    },
    async fetchFileList(tarDir) {
      let request_url = "";
      let user = this.$route.query["u"];
      let proj = this.$route.query["proj"];
      if (!_isEmpty(user) && !_isEmpty(proj)) {
        request_url = `/gh_api/repos/${user}/${proj}/contents`;
        if (!_isEmpty(tarDir)) {
          request_url = `${request_url}/${tarDir}`;
        }
      } else {
        throw "Unknown Repo";
      }

      let lip = await this.$axios.$get(request_url);
      // this.$store.commit("reset_route_map");
      this.$store.commit("file_list/set_list", lip);
      // this.$store.commit("set_route_file_list", lip);
      let redList = lip.map((e) => ({
        name: e.name,
        path: e.path,
        _type: e.type,
        routerPath: `/doc/project?u=${user}&proj=${proj}&filePath=${e.path}&type=${e.type}`,
      }));
      let pathList = redList[0].path.split("/");
      let subDirRouteMap = {
        title: "Sub-Directory",
        subtitle: pathList.length > 1 ? pathList[pathList.length - 2] : "root",
        itemList: redList.filter((e) => e._type === "dir"),
      };
      if (pathList.length > 1) {
        let jk = pathList.slice(0, pathList.length - 2).join("/");
        subDirRouteMap.itemList.unshift({
          name: "..",
          path: pathList.slice(0, pathList.length - 2).join("/"),
          _type: "dir",
          routerPath: `/doc/project?u=${user}&proj=${proj}&filePath=${jk}&type=dir`,
        });
      }
      let fileRouteMap = {
        title: "Recent-Directory-File",
        subtitle: pathList.length > 1 ? pathList[pathList.length - 2] : "root",
        itemList: redList.filter((e) => e._type === "file"),
      };
      let branchMap = {};
      if (this.$store.state.extra_route_map.length > 0) {
        branchMap = _cloneDeep(this.$store.state.extra_route_map[0]);
        this.$store.commit("set_route_map", [
          branchMap,
          fileRouteMap,
          subDirRouteMap,
        ]);
      } else {
        this.$store.commit("set_route_map", [fileRouteMap, subDirRouteMap]);
      }
      // console.log(branchMap);

      this.$store.commit(
        "file_list/set_project_name",
        `${user}/${proj}`
      );
    },
  },
  // life-cycle
  async beforeMount() {
    this.in_loading = true;
    try {
      console.log("fetch-up");
      await this.fetchBranchList();
      await this.fetchFileList();
      await this.fetchPost();
    } catch (e) {
      this.fail_load = true;
    } finally {
      this.in_loading = false;
    }
  },

  beforeDestroy() {
    this.$store.commit("reset_route_map");
  },
  // async
};
</script>
