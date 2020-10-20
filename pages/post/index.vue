<template lang="pug">
.container(
  :class="{ 'empty-contain': !end_fetch || fail_load || post_list.length < 9 }"
)
  .section.fix-top.pb-0
    .columns.pb-0
      .column.pb-0
        span.is-size-1.has-text-light-force.
          Post List 
      .column.has-text-right
        span.has-text-light-force Last update :
          time(:datetime="last_updated") {{ last_updated }}
  .section
    .columns.is-multiline(v-if="!end_fetch && !fail_load")
      PostCard.is-half-tablet.is-full-mobile.is-one-half-desktop.is-one-third-widescreen.is-one-third-fullhd(
        v-for="index in 6",
        :key="index",
        :sort_index="index",
        :is_ready="in_loading && !fail_load"
      )
        b-skeleton.field(width="80%")
        b-skeleton.field(width="60%")
        b-skeleton.field(width="40%")

    .columns.is-multiline(v-if="!in_loading && !fail_load")
      PostCard.is-half-tablet.is-full-mobile.is-one-half-desktop.is-one-third-widescreen.is-one-third-fullhd(
        v-for="(post, index) in post_list",
        :key="index",
        :sort_index="index",
        :is_ready="end_fetch && !fail_load",
        :href="'/post/info?file=' + post.file_name"
      )
        p.is-size-5 {{ post.name }}
        .field.is-grouped.is-grouped-multiline
          .control
            a.tag.mx-1(
              v-for="tag in post.tag",
              :key="tag",
              :href="`/topic?t=${tag}`"
            ).
              {{ tag }}
</template>

<script>
const isDev = process.env.NODE_ENV === "development";
import PostCard from "~/components/post/PostCard.vue";
export default {
  name: "post-list",
  layout: "inner_page",
  components: { PostCard },
  head: (self) => ({
    title: `Tech Post List`,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: process.env.npm_package_description || "", },
      { hid: "og:title", property: "og:title", content: "Steven Chm - Github Page", },
      { hid: "og:description", property: "og:description", content: "Steven Chm - Github Page and Tech-Blog", },
      { hid: "og:url", property: "og:url", content: "https://stvchm9703.github.io/doc", },
      { hid: "og:image", property: "og:image", content: "https://avatars2.githubusercontent.com/u/15327054?s=400&u=167a64d9000e6ea245b6807fb4a7a1dab537d35a&v=4", },
      { hid: "og:type", property: "og:type", content: "website" },
    ],
  }),
  data: () => ({
    end_fetch: false,
    in_loading: true,
    fail_load: false,
    post_list: [],
    last_updated: "2020-10-12 12:35:22",
  }),
  methods: {
    async fetchPost() {
      let url = "/page_io/post/list.json";
      let y = await this.$axios.get(url);
      this.post_list = [...this.post_list, ...y.data.posts];
    },
    navagate(file_name) {
      console.log(file_name);
      this.$router.push("/post/info/" + post.file_name);
    },
  },
  async beforeMount() {
    this.$nextTick(async () => {
      try {
        this.in_loading = true;
        await this.fetchPost();
        setTimeout(() => {
          this.end_fetch = true;
        }, 750);
      } catch (_e) {
        this.fail_load = true;
      } finally {
        this.in_loading = false;
      }
      // this.post_list =
    });
  },
};
</script>
