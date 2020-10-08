<template lang="pug">
div
  client-only
    .container(:class="{ 'empty-contain': in_loading || fail_load }")
      .section
        .columns.is-multiline(v-if="!in_loading && !fail_load")
          ProjectCard.is-half-tablet.is-full-mobile.is-half-desktop.is-one-third-widescreen.is-one-third-fullhd(
            v-for="post in post_list",
            :key="post.id",
            :project_id="post.id",
            :project_name="post.name",
            :project_full_name="post.full_name",
            :fork="post.fork",
            :owner="post.owner.login",
            :is_self_hosted="isSelfHosted(post)",
            :star_counted="post.stargazers_count",
            :forked_counted="post.forks_count",
            :language="post.language",
            :created_at="toDisplayDate(post.created_at)",
            :updated_at="toDisplayDate(post.updated_at)"
          )
          //  
        .columns.is-multiline(v-if="in_loading && !fail_load")
          ProjectEmptyCard(v-for="post in 6", :key="post")
</template>

<script>
import _isEmpty from "lodash/isEmpty";
import ProjectCard from "~/components/docMD/ProjectCard.vue";
import ProjectEmptyCard from "~/components/docMD/ProjectEmptyCard.vue";
// import NavBarInner from '~/components/navlink/IndexMobile.vue';
import moment from "moment";
export default {
  name: "doc-list",
  components: { ProjectCard, ProjectEmptyCard },
  layout: "inner_page",
  head: (self) => ({
    title: `Document List - Stvchm9703`,
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
    post_list: [],
    raw_data: [],
    hash_project: "",
  }),
  methods: {
    async fetchPorjectList() {
      //
      this.post_list = await this.$axios.$get("/gh_api/users/Stvchm9703/repos");
      this.$store.commit("project_list/set_list", this.post_list);
    },
    async fetchColorIndex() {
      let colorIndex = await this.$axios.$get(
        "/gh_resx/ozh/github-colors/master/colors.json"
      );
      this.$store.commit("project_list/set_color_index", colorIndex);
    },
    isSelfHosted(post) {
      return post.owner.login === "Stvchm9703";
    },
    toDisplayDate(datetime_str) {
      return moment(datetime_str, "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD");
    },
  },
  async beforeMount() {
    // console.log(this);
    this.$nextTick(async () => {
      this.in_loading = true;
      if (!_isEmpty(this.$route.hash)) {
        let ytmp = this.$route.hash.split("/");
        if (ytmp.length > 1) {
          this.hash_project = ytmp[1];
        }
      }
      try {
        await Promise.all([this.fetchPorjectList(), this.fetchColorIndex()]);
      } catch (e) {
        console.warn("axios:", e);
        this.fail_load = true;
      } finally {
        this.in_loading = false;
      }
    });
  },
};
// TODO:
// 1. add fail-load component
// 2. add footer remark (flex? to page bottom)
// 3. add svg background
</script>


<style lang="scss" scoped>
</style>