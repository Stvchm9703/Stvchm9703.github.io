<template lang="pug">
div
  client-only
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
// import NavBarInner from '~/components/navlink/IndexMobile.vue';
export default {
  name: "doc-list",
  components: { ProjectCard, ProjectEmptyCard },
  layout: "inner_page",
  head: (self) => ({
    title: `Document List - Stvchm9703`,
    meta: [],
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
      this.post_list = await this.$axios.$get(
        "https://api.github.com/users/Stvchm9703/repos"
      );
      this.$store.commit("project_list/set_list", this.post_list);
    },
    async fetchColorIndex() {
      let colorIndex = await this.$axios.$get(
        "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
      );
      this.$store.commit("project_list/set_color_index", colorIndex);
    },
    isSelfHosted(post) {
      return post.owner.login === "Stvchm9703";
    },
  },
  async beforeMount() {
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
  },
};
// TODO:
// 1. add fail-load component
// 2. add footer remark (flex? to page bottom)
// 3. add svg background
</script>


<style lang="scss" scoped>

</style>