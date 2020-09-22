<template lang="pug">
client-only
  div
    b-navbar.search-bar(fixed-top, :burger="false")
      template(slot="brand")
        button.button(@click="$store.commit('open_menu', true)") Menu

    .container(:class="{ 'empty-contain': in_loading || fail_load }")
      .section
        .columns.is-multiline(v-if="!in_loading && !fail_load")
          ProjectCard(
            v-for="post in post_list",
            :key="post.id",
            :project_id="post.id",
            :project_name="post.name",
            :project_full_name="post.full_name",
            :fork="post.fork",
            :is_self_hosted="isSelfHosted(post)",
            :star_counted="post.stargazers_count",
            :forked_counted="post.forks_count",
            :language="post.language",
            :created_at="post.created_at",
            :updated_at="post.updated_at"
          )
          //  
        .columns.is-multiline(v-if="in_loading && !fail_load")
          ProjectEmptyCard(v-for="post in 6", :key="post")
</template>

<script>
import _isEmpty from "lodash/isEmpty";
import ProjectCard from "~/components/docMD/ProjectCard.vue";
import ProjectEmptyCard from "~/components/docMD/ProjectEmptyCard.vue";
export default {
  name: "doc-list",
  components: { ProjectCard, ProjectEmptyCard },
  layout: "inner_page",
  data: () => ({
    fail_load: false,
    in_loading: true,
    md_content: "#Hello World",
    post_list: [],
    raw_data: [],
  }),
  methods: {
    async fetchPorjectList() {
      this.in_loading = true;
      try {
        //
        this.post_list = await this.$axios.$get(
          "https://api.github.com/users/Stvchm9703/repos"
        );
        this.$store.commit("project_list/set_list", this.post_list);
      } catch (e) {
        console.warn("axios:", e);
        this.fail_load = true;
      } finally {
        this.in_loading = false;
      }
    },
    async fetchColorIndex() {
      try {
        //
        let colorIndex = await this.$axios.$get(
          "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
        );
        this.$store.commit("project_list/set_color_index", colorIndex);
      } catch (e) {
        this.fail_load = true;
      }
    },
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
    isSelfHosted(post) {
      return post.owner.login === "Stvchm9703";
    },
  },
  async fetch() {
    await Promise.all([this.fetchPorjectList(), this.fetchColorIndex()]);
  },
};
// TODO:
// 1. add fail-load component
// 2. add footer remark (flex? to page bottom)
// 3. add svg background
</script>


<style lang="scss" scoped>
.empty-contain {
  height: 80vh;
  width: 100%;
}
.search-bar.navbar.is-fixed-top {
  // top: 50px;
}
.container.search-contain {
  // padding-top: 50px;
}
</style>